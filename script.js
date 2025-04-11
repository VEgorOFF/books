function initSlider() {
  let images = [
    {
      url: "./img/banner1.png",
    },
    {
      url: "./img/banner2.png",
    },
    {
      url: "./img/banner3.png",
    },
  ];

  if (!images || !images.length) return;

  let sliderImages = document.querySelector(".slider_images");
  let sliderDots = document.querySelector(".slider_dots");

  initImages();
  initDots();

  function initImages() {
    //делает активным класс одной из картинки
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0 ? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }

  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="slider_dots-item n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider_dots-item").forEach((dot) => {
      dot.addEventListener("click", function () {
        moveSlider(this.dataset.index);
        sliderDots.querySelector(".active").classList.remove("active");
        this.classList.add("active");
      });
    });
  }

  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");
    sliderDots.querySelector(".active").classList.remove("active");
    sliderDots.querySelector(".n" + num).classList.add("active");
  }
}

async function loadBooks(url) {
  //загрузка книг с API
  console.log("worked loadBooks");
  console.log(url);
  let response = await fetch(url);
  let data = await response.json();

  const divItems = document.querySelectorAll(".items");
  divItems.forEach(function (element, index) {
    let imageLinks = data.items[index].volumeInfo.imageLinks.thumbnail;
    let authors = data.items[index].volumeInfo.authors;
    let title = data.items[index].volumeInfo.title;
    let averageRating = data.items[index].volumeInfo.averageRating;
    let ratingCount = data.items[index].volumeInfo.ratingsCount;
    let description = data.items[index].volumeInfo.description;
    let saleInfo = data.items[index].saleInfo.retailPrice;

    const divImageLinks = element.querySelector(".image_links");
    const divAuthors = element.querySelector(".author");
    const divTitle = element.querySelector(".title");
    const divAverageRating = element.querySelector(".average");
    const divRatingCount = element.querySelector(".count");
    const divDescription = element.querySelector(".description");
    const divSaleInfo = element.querySelector(".saleinfo");

    if (imageLinks !== undefined && imageLinks !== null) {
      divImageLinks.innerHTML = `<img src="${imageLinks}">`;
    }

    divAuthors.innerText = authors;
    divTitle.innerText = title;
    if (averageRating !== undefined && ratingCount !== undefined) {
      divAverageRating.style.display = "flex";
      divRatingCount.innerText = `${ratingCount} review`;

      let fullStars = Math.floor(averageRating);
      let allStars = divAverageRating.querySelectorAll("svg");
      let partStars = averageRating - fullStars;

      fillStars(fullStars, allStars, partStars);
    }

    if (description !== undefined) {
      divDescription.innerText = description;
    }

    if (saleInfo !== undefined) {
      divSaleInfo.innerText = saleInfo.currencyCode + saleInfo.amount;
    }
  });

  function fillStars(fullStars, allStars, partStars) {
    for (let i = 0; i < fullStars; i++) {
      allStars[i].querySelector("path").style.fill = "#F2C94C";
    }

    const maxRating = 5;
    const minRating = 0;

    if (fullStars < maxRating && fullStars > minRating) {
      let copyStar = allStars[fullStars].cloneNode(true);
      copyStar.style = `clip-path: inset(0 ${100 - partStars * 100}% 0 0);`;
      copyStar.querySelector("path").style.fill = "#F2C94C";
      allStars[fullStars].appendChild(copyStar);
    }
  }
}

function themesBooks() {
  //категории книг
  console.log("worked themeBooks");
  const divCategories = document.querySelector(".categories_names");
  const category = divCategories.querySelectorAll("span");

  category.forEach(function (element, index) {
    element.addEventListener("click", () => {
      //нажимаем на категорию
      const startIndex = 0;

      category.forEach(function (el, i) {
        //проверка и удаление активной категории при нажатии другой
        if ((el.classList = "active_category")) {
          el.classList.remove("active_category");
        }
      });

      let nameCategory = element.textContent.replaceAll(" ", "");
      let url = `https://www.googleapis.com/books/v1/volumes?q=%22subject:${nameCategory}%22&key=AIzaSyCltJSGvWItPOc-8e4Tp_vYsenGe86IMaM&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`;
      loadBooks(url); //передаем в функцию загрузки
      loadMore(startIndex, nameCategory); //передаем наименование категории в функцию загрузки
      element.className = "active_category";
    });
  });
}

function loadMore(index, nameCategory) {
  //загрузка новых книг
  console.log("worked loadMore");
  console.log(nameCategory);
  const btnLoadMore = document.querySelector(".load_more");

  btnLoadMore.addEventListener("click", () => {
    console.log("нажата");
    index = index + 6;
    let url = `https://www.googleapis.com/books/v1/volumes?q=%22subject:${nameCategory}%22&key=AIzaSyCltJSGvWItPOc-8e4Tp_vYsenGe86IMaM&printType=books&startIndex=${index}&maxResults=6&langRestrict=en`;
    loadBooks(url);
  });
}

document.addEventListener("DOMContentLoaded", mainStart);

function mainStart() {
  let url = "https://www.googleapis.com/books/v1/volumes?q=%22subject:Architecture%22&key=AIzaSyCltJSGvWItPOc-8e4Tp_vYsenGe86IMaM&printType=books&startIndex=0&maxResults=6&langRestrict=en";
  document.querySelector(".categories_names").children[0].className = "active_category";
  initSlider();
  loadBooks(url);
  themesBooks();
}
