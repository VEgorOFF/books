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
      let imageDiv = `<div class="image n${index} ${
        index === 0 ? "active" : ""
      }" style="background-image:url(${
        images[index].url
      });" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }

  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="slider_dots-item n${index} ${
        index === 0 ? "active" : ""
      }" data-index="${index}"></div>`;
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

export { initSlider };
