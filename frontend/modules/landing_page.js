import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const response = await fetch(`${config.backendEndpoint}/cities`)
    const cities = await response.json();
    return cities;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let data = document.getElementById("data");

  let outerDiv = document.createElement("div");
  outerDiv.setAttribute("class", "col-sm-6 col-lg-3 mb-2");

  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", `pages/adventures/?city=${id}`);
  linkElement.setAttribute("id", id)

  let tileDiv = document.createElement("div");
  tileDiv.setAttribute("class", "tile");

  let imgElement = document.createElement("img");
  imgElement.setAttribute("src", image);
  imgElement.setAttribute("alt", id);
  imgElement.setAttribute("class", "img-fluid");
  tileDiv.append(imgElement);

  let tileText = document.createElement("div");
  tileText.setAttribute("class", "tile-text");

  let heading = document.createElement("h3");
  heading.textContent = city;
  tileText.append(heading);

  let para = document.createElement("p");
  para.textContent = description;
  tileText.append(para);

  tileDiv.append(tileText);
  linkElement.append(tileDiv);
  outerDiv.append(linkElement);

  data.append(outerDiv);
}

export { init, fetchCities, addCityToDOM };
