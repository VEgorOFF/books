let nameCategory = "Architecture";
let page = 0;
let countBuyBooks = 0;
const booksList = document.querySelector(".books-list");
const divCircle = document.querySelector(".circle");

let jsonData;
if (localStorage.getItem("jsonData") !== null) {
  jsonData = JSON.parse(localStorage.getItem("jsonData"));
} else {
  jsonData = {};
  jsonData.books = [];
}

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

async function loadBooks() {
  //загрузка книг с API
  const url = `https://www.googleapis.com/books/v1/volumes?q=%22subject:${nameCategory}%22&key=AIzaSyCltJSGvWItPOc-8e4Tp_vYsenGe86IMaM&printType=books&startIndex=${page}&maxResults=6&langRestrict=en`;

  let response = await fetch(url);
  let data = await response.json();

  data.items.forEach(function (element, index) {
    jsonData.books.push({});

    let imageLinks = data.items[index].volumeInfo.imageLinks;
    let authors = data.items[index].volumeInfo.authors;
    let title = data.items[index].volumeInfo.title;
    let averageRating = data.items[index].volumeInfo.averageRating;
    let ratingCount = data.items[index].volumeInfo.ratingsCount;
    let description = data.items[index].volumeInfo.description;
    let saleInfo = data.items[index].saleInfo.retailPrice;

    const divItem = document.createElement("div");
    divItem.classList.add("items");
    booksList.appendChild(divItem);

    const divImageLinks = document.createElement("div");
    divImageLinks.classList.add("image_links");
    divItem.appendChild(divImageLinks);

    const divInformation = document.createElement("div");
    divInformation.classList.add("informaton");
    divItem.appendChild(divInformation);

    const divAuthorTitleRating = document.createElement("div");
    divAuthorTitleRating.classList.add("authot_title_rating");
    divInformation.appendChild(divAuthorTitleRating);

    const divAuthor = document.createElement("div");
    divAuthor.classList.add("author");
    divAuthorTitleRating.appendChild(divAuthor);

    const divTitle = document.createElement("div");
    divTitle.classList.add("title");
    divAuthorTitleRating.appendChild(divTitle);

    const divRating = document.createElement("div");
    divRating.classList.add("rating");
    divAuthorTitleRating.appendChild(divRating);

    const divAverage = document.createElement("div");
    divAverage.classList.add("average");
    divAverage.innerHTML = `                <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#EEEDF5" />
                    </svg>
                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#EEEDF5" />
                    </svg>
                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#EEEDF5" />
                    </svg>
                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#EEEDF5" />
                    </svg>
                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#EEEDF5" />
                    </svg>`;
    divRating.appendChild(divAverage);

    const divCount = document.createElement("div");
    divCount.classList.add("count");
    divRating.appendChild(divCount);

    const divDescription = document.createElement("div");
    divDescription.classList.add("description");
    divInformation.appendChild(divDescription);

    const divSaleInfo = document.createElement("div");
    divSaleInfo.classList.add("saleinfo");
    divInformation.appendChild(divSaleInfo);

    const button = document.createElement("button");
    button.classList.add("buy_now");
    button.innerText = "buy now";
    divInformation.appendChild(button);

    let indexBookJson = document.querySelectorAll(".items").length - 1;

    if (imageLinks !== undefined && imageLinks !== null) {
      divImageLinks.innerHTML = `<img src="${imageLinks.thumbnail}">`;
      jsonData.books[indexBookJson].imageLinks = `${imageLinks.thumbnail}`;
    }

    divAuthor.innerText = authors;
    jsonData.books[indexBookJson].authors = `${authors}`;

    divTitle.innerText = title;
    jsonData.books[indexBookJson].title = `${title}`;

    if (averageRating !== undefined && ratingCount !== undefined) {
      divAverage.style.display = "flex";
      divCount.innerText = `${ratingCount} review`;
      jsonData.books[indexBookJson].ratingCount = `${ratingCount}`;
      jsonData.books[indexBookJson].averageRating = `${averageRating}`;

      let fullStars = Math.floor(averageRating);
      let allStars = divAverage.querySelectorAll("svg");
      let partStars = averageRating - fullStars;

      fillStars(fullStars, allStars, partStars);
    }

    if (description !== undefined) {
      divDescription.innerText = description;
      jsonData.books[indexBookJson].description = `${description}`;
    }

    if (saleInfo !== undefined) {
      divSaleInfo.innerText = saleInfo.currencyCode + saleInfo.amount;
      // jsonData.books[indexBookJson].saleInfo = `${saleInfo}`;
      jsonData.books[indexBookJson].saleInfo = [];
      jsonData.books[indexBookJson].saleInfo.push(`${saleInfo.currencyCode}`);
      jsonData.books[indexBookJson].saleInfo.push(`${saleInfo.amount}`);
    }

    localStorage.setItem("jsonData", JSON.stringify(jsonData));
  });
}

function fillStars(fullStars, allStars, partStars) {
  //функция заполнения звезд рейтинга в карточках
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

function loadLocalStorage() {
  jsonData.books.forEach(function (element, index) {
    let imageLinks = jsonData.books[index].imageLinks;
    let authors = jsonData.books[index].authors;
    let title = jsonData.books[index].title;
    let averageRating = jsonData.books[index].averageRating;
    let ratingCount = jsonData.books[index].ratingCount;
    let description = jsonData.books[index].description;
    let saleInfo = jsonData.books[index].saleInfo;

    const divItem = document.createElement("div");
    divItem.classList.add("items");
    booksList.appendChild(divItem);

    const divImageLinks = document.createElement("div");
    divImageLinks.classList.add("image_links");
    divItem.appendChild(divImageLinks);

    const divInformation = document.createElement("div");
    divInformation.classList.add("informaton");
    divItem.appendChild(divInformation);

    const divAuthorTitleRating = document.createElement("div");
    divAuthorTitleRating.classList.add("authot_title_rating");
    divInformation.appendChild(divAuthorTitleRating);

    const divAuthor = document.createElement("div");
    divAuthor.classList.add("author");
    divAuthorTitleRating.appendChild(divAuthor);

    const divTitle = document.createElement("div");
    divTitle.classList.add("title");
    divAuthorTitleRating.appendChild(divTitle);

    const divRating = document.createElement("div");
    divRating.classList.add("rating");
    divAuthorTitleRating.appendChild(divRating);

    const divAverage = document.createElement("div");
    divAverage.classList.add("average");
    divAverage.innerHTML = `                <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#EEEDF5" />
                </svg>
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#EEEDF5" />
                </svg>
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#EEEDF5" />
                </svg>
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#EEEDF5" />
                </svg>
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z" fill="#EEEDF5" />
                </svg>`;
    divRating.appendChild(divAverage);

    const divCount = document.createElement("div");
    divCount.classList.add("count");
    divRating.appendChild(divCount);

    const divDescription = document.createElement("div");
    divDescription.classList.add("description");
    divInformation.appendChild(divDescription);

    const divSaleInfo = document.createElement("div");
    divSaleInfo.classList.add("saleinfo");
    divInformation.appendChild(divSaleInfo);

    const button = document.createElement("button");
    button.classList.add("buy_now");
    button.innerText = "buy now";
    divInformation.appendChild(button);

    if (imageLinks !== undefined && imageLinks !== null) {
      divImageLinks.innerHTML = `<img src="${imageLinks}">`;
    }

    divAuthor.innerText = authors;

    divTitle.innerText = title;

    if (averageRating !== undefined && ratingCount !== undefined) {
      divAverage.style.display = "flex";
      divCount.innerText = `${ratingCount} review`;

      let fullStars = Math.floor(averageRating);
      let allStars = divAverage.querySelectorAll("svg");
      let partStars = averageRating - fullStars;

      fillStars(fullStars, allStars, partStars);
    }

    if (description !== undefined) {
      divDescription.innerText = description;
    }

    if (saleInfo !== undefined) {
      divSaleInfo.innerText = saleInfo[0] + saleInfo[1];
    }
  });
}

document.addEventListener("DOMContentLoaded", mainStart);

function mainStart() {
  document.querySelector(".categories").children[0].classList.add("active_category");
  initSlider();

  if (localStorage.getItem("jsonData") !== null && JSON.parse(localStorage.getItem("jsonData")).books !== null) {
    // если в localStorage есть книги, то подгружаем из localStorage, иначе загружаем из API
    loadLocalStorage();
  } else {
    loadBooks();
  }

  if (localStorage.getItem("jsonData") !== null && JSON.parse(localStorage.getItem("jsonData")).nameCategory !== null) {
    //категория в localStorage
    nameCategory = JSON.parse(localStorage.getItem("jsonData")).nameCategory;
  }

  if (localStorage.getItem("jsonData") !== null && JSON.parse(localStorage.getItem("jsonData")).page !== null) {
    //страница в localStorage
    page = parseInt(JSON.parse(localStorage.getItem("jsonData")).page);
  }

  if (localStorage.getItem("jsonData") !== null && JSON.parse(localStorage.getItem("jsonData")).countBuyBooks !== null) {
    //число купленных книг в localStorage
    countBuyBooks = parseInt(JSON.parse(localStorage.getItem("jsonData")).countBuyBooks);
    divCircle.style.display = "flex";
    divCircle.innerText = countBuyBooks;
  }

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("categories-name")) {
      //нажимаем на категории
      jsonData.books = [];
      page = 0;
      jsonData.page = `${page}`;
      localStorage.setItem("jsonData", JSON.stringify(jsonData));

      booksList.innerHTML = "";
      document.querySelector(".categories-name.active_category").classList.remove("active_category");
      event.target.classList.add("active_category");

      nameCategory = event.target.textContent.replaceAll(" ", "");
      jsonData.nameCategory = `${nameCategory}`;
      localStorage.setItem("jsonData", JSON.stringify(jsonData));

      loadBooks(); //передаем в функцию загрузки
    }

    if (event.target.classList.contains("load_more")) {
      //нажимаем на загрузить еще
      page = page + 6;
      jsonData.page = `${page}`;
      localStorage.setItem("jsonData", JSON.stringify(jsonData));

      loadBooks();
    }

    if (event.target.classList.contains("buy_now")) {
      //нажимаем на купить
      divCircle.style.display = "flex";
      countBuyBooks = countBuyBooks + 1;
      divCircle.innerText = countBuyBooks;
      jsonData.countBuyBooks = `${countBuyBooks}`;
      localStorage.setItem("jsonData", JSON.stringify(jsonData));
    }
  });
}
