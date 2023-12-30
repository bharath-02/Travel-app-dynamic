
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search)
  const city = params.get('city')
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const response = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    const adventures = await response.json();
    return adventures;
  } catch (e) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  if (adventures) {
    let data = document.getElementById("data");
    adventures.forEach((key) => {      
      let card = `<div class="col-sm-6 col-lg-3 mb-2">
        <a href="detail/?adventure=${key.id}" id=${key.id}>
          <div class="activity-card">
            <p class="category-banner">${key.category}</p>
            <img src=${key.image} class="card-img-top" alt=${key.category}>
            <div class="w-100 p-2">
              <div class="d-flex justify-content-between">
                <p class="text-start">${key.name}</p>
                <p class="text-end">${key.currency} ${key.costPerHead}</p>
              </div>
              <div class="d-flex justify-content-between">
                <p class="text-start">Duration</p>
                <p class="text-end">${key.duration}</p>
              </div>
            </div>
          </div>
        </a>
      </div>`;

      data.innerHTML += card;
    });
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let result = list.filter(l => l.duration > low && l.duration <= high);
  if (result.length) {
    return result;
  }
  return list;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let result = list.filter(l => categoryList.includes(l.category));
  if (result.length) {
    return result;
  }
  return list;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  if (filters["category"].length && filters.duration) {
    let low = parseInt(filters.duration.split("-")[0]);
    let high = parseInt(filters.duration.split("-")[1]);
    let filteredByDuration = filterByDuration(list, low, high);
    let filteredByCategories = filterByCategory(filteredByDuration, filters["category"]);
    return filteredByCategories;
  } 
  else if (filters["category"].length) {
    let filteredByCategories = filterByCategory(list, filters["category"]);
    return filteredByCategories;
  } 
  else if (filters.duration) {
    let low = filters.duration.split("-")[0];
    let high = filters.duration.split("-")[1];
    let filteredByDuration = filterByDuration(list, low, high);
    return filteredByDuration;
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem("filters"));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value = filters.duration;

  filters.category.forEach((key) => {
    let ele = document.createElement("div");
    ele.className = "category-filter";
    ele.innerHTML = `<div>${key}</div>`;

    document.getElementById("category-list").appendChild(ele);
  })

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
