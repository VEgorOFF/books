import "./style/baseStyle.scss";
import "./style/baseStyleTablets.scss";

import { initSlider } from "./modules/initSlider.js";
import { loadBooks } from "./modules/loadBooks.js";
import { loadLocalStorage } from "./modules/loadLocalStorage.js";

const booksList = document.querySelector(".books-list");
const divCircle = document.querySelector(".circle");

let jsonData;
if (localStorage.getItem("jsonData") !== null) {
  jsonData = JSON.parse(localStorage.getItem("jsonData"));
} else {
  jsonData = {};
  jsonData.books = [];
}
let nameCategory = "Architecture";
jsonData.nameCategory = nameCategory;
let page = 0;
jsonData.page = page;
let countBuyBooks = 0;

document.addEventListener("DOMContentLoaded", mainStart);

function mainStart() {
  if (localStorage.getItem("jsonData") !== null && JSON.parse(localStorage.getItem("jsonData")).nameCategory !== undefined) {
    //проверяем категорию в localStorage
    let localNameCategory = JSON.parse(localStorage.getItem("jsonData")).nameCategory;
    if (localNameCategory.includes("&")) {
      localNameCategory = localNameCategory.replace("&", " & ");
    }

    document.querySelectorAll(".categories-name").forEach(function (element, index) {
      // если есть то нахдим такой же текст в категориях и делаем его активным
      if (localNameCategory === element.textContent) {
        element.classList.add("active_category");
      }
    });
  } else {
    // если нет, то делаем указанную по умолчанию категорию активной (без знаков аперсанда и т.д.)
    document.querySelectorAll(".categories-name").forEach(function (element, index) {
      if (nameCategory === element.textContent) {
        element.classList.add("active_category");
      }
    });
  }

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

  if (localStorage.getItem("jsonData") !== null && JSON.parse(localStorage.getItem("jsonData")).countBuyBooks !== undefined) {
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

    if (event.target.classList.contains("load-more")) {
      //нажимаем на загрузить еще
      page = page + 6;
      jsonData.page = `${page}`;
      localStorage.setItem("jsonData", JSON.stringify(jsonData));

      loadBooks(); //передаем в функцию загрузки
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

export { nameCategory, page, jsonData, booksList };
