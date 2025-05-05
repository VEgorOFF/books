import { fillStars } from "./fillStars.js";
import { jsonData, booksList } from "../script.js";

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

export { loadLocalStorage };
