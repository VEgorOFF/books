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

export { fillStars };
