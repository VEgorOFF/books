import { fillStars } from "./fillStars.js";
import { nameCategory, page, jsonData, booksList } from "../script.js";

async function loadBooks() {
  // Получаем ссылку на индикатор загрузки
  const loadingIndicator = document.getElementById("loading-indicator");
  // Добавляем индикатор загрузки до загрузки скрипта
  loadingIndicator.style.width = "100px";
  loadingIndicator.style.margin = "0 auto";
  loadingIndicator.style.display = "flex";

  //загрузка книг с API
  const url = `https://www.googleapis.com/books/v1/volumes?q=%22subject:${nameCategory}%22&key=AIzaSyCltJSGvWItPOc-8e4Tp_vYsenGe86IMaM&printType=books&startIndex=${page}&maxResults=6&langRestrict=en`;
  let response = await fetch(url);
  let data = await response.json();
  loadingIndicator.style.display = "none"; // Скрываем индикатор загрузки
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
      jsonData.books[indexBookJson].saleInfo = [];
      jsonData.books[indexBookJson].saleInfo.push(`${saleInfo.currencyCode}`);
      jsonData.books[indexBookJson].saleInfo.push(`${saleInfo.amount}`);
    }

    localStorage.setItem("jsonData", JSON.stringify(jsonData));
  });
}

export { loadBooks };
