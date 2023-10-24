const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

// NASA API
const count = 4;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

// Add to favorites function
function saveFavorite(itemUrl) {
  // loop result array to select favorite
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);
      localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    }
  });
}

// create DOMNodes
function createDOMNodes(page) {
  const currentArray =
    page === "favorites" ? Object.values(favorites) : resultsArray;
  // Object.values because favorites is an object so then like this can use the forEach method
  console.log("current array", currentArray);
  currentArray.forEach((element) => {
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
    image.setAttribute("src", element.url);
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
    // Creagint add to favorites
    const addFavorite = document.createElement("p");
    addFavorite.textContent = "Add to Favorite";
    addFavorite.classList.add("clickable2");
    addFavorite.setAttribute("onclick", `saveFavorite('${element.url}')`);
    // Creating description
    const cardText = document.createElement("p");
    cardText.textContent = element.explanation;
    cardText.classList.add("card-text");
    // Footer
    const footerCardText = document.createElement("small");
    footerCardText.classList.add("text-muted");
    const dateElement = document.createElement("strong");
    dateElement.textContent = element.date;
    const copyRightCard = document.createElement("span");
    copyRightCard.textContent = element.copyright
      ? element.copyright
      : " Copy Right";
    // Append each element
    cardBody.append(titleElement, addFavorite, cardText, footerCardText);
    footerCardText.append(dateElement, copyRightCard);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

// function to uptdate DOM
function updateDOM(page) {
  // get favorites from localStoraga
  if (localStorage.getItem("nasaFavorites")) {
    favorites = JSON.parse(localStorage.getItem("nasaFavorites"));
    console.log(favorites);
  }
  createDOMNodes(page);
}

// get 10 pictures from NASA API
async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    updateDOM("favorites");
  } catch (error) {
    console.log(error);
  }
}

getNasaPictures();

// event listeners
resultsNav.addEventListener("click", () => {
  console.log(favorites);
});
