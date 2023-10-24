const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

// NASA API
const count = 10;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

// function to uptdate DOM
function updateDOM() {
  resultsArray.forEach((element) => {
    // creating card element
    const card = document.createElement("div");
    card.classList.add("card");
    // creating link
    const link = document.createElement("a");
    link.href = element.hdurl;
    link.setAttribute("title", element.title);
    link.setAttribute("target", "_blank");
    // creating img element
    const image = document.createElement("img");
    image.setAttribute("src", element.hdurl);
    image.setAttribute("alt", element.title);
    image.loading = "lazy";
    image.classList.add("img-card-top");
    // creating card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    // creating body elements
    const titleElement = document.createElement("h5");
    titleElement.textContent = element.title;
    titleElement.classList.add("card-title");
    const addFavorite = document.createElement("p");
    addFavorite.textContent = "Add to Favorite";
    addFavorite.classList.add("clickable2");
    const cardText = document.createElement("p");
    cardText.textContent = element.explanation;
    cardText.classList.add("card-text");
    const footerCardText = document.createElement("small");
    footerCardText.classList.add("text-muted");
    const dateElement = document.createElement("strong");
    dateElement.textContent = element.date;
    const copyRightCard = document.createElement("span");
    copyRightCard.textContent = element.copyright
      ? element.copyright
      : " Copy Right";
    // Append each element
    card.appendChild(link);
    link.appendChild(image);
    card.appendChild(cardBody);
    cardBody.appendChild(titleElement);
    cardBody.appendChild(addFavorite);
    cardBody.appendChild(cardText);
    cardBody.appendChild(footerCardText);
    footerCardText.appendChild(dateElement);
    footerCardText.appendChild(copyRightCard);

    imagesContainer.appendChild(card);
  });
}

// get 10 pictures from NASA API
async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    console.log(resultsArray);
    updateDOM();
  } catch (error) {
    console.log(error);
  }
}

getNasaPictures();
