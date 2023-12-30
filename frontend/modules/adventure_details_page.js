import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search)
  const adventure = params.get('adventure')
  return adventure;

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const response = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    const adventures = await response.json();
    return adventures;
  } catch (e) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let name = document.getElementById("adventure-name");
  name.textContent = adventure.name;

  let subTitle = document.getElementById("adventure-subtitle");
  subTitle.textContent = adventure.subtitle;

  adventure.images.forEach((image) => {
    let divElement = document.createElement("div");
    let imgElement = document.createElement("img");
    imgElement.setAttribute("src", image);
    imgElement.setAttribute("class", "activity-card-image")
    divElement.append(imgElement);
    document.getElementById("photo-gallery").append(divElement);
  })

  let content = document.getElementById("adventure-content");
  content.textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  document.getElementById("photo-gallery").innerHTML = `
    <div id="carouselExampleIndicators" class="carousel slide">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">

      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;
  let imageCarousel = document.querySelector(".carousel-inner")

  images.forEach((image, index) => {
    let divElement = document.createElement("div");
    if(index) {
      divElement.setAttribute("class", "carousel-item");
    } else {
      divElement.setAttribute("class", "carousel-item active");
    }

    let img = document.createElement("img");
    img.setAttribute("src", image);
    img.setAttribute("class", "d-block w-100");

    divElement.append(img);
    imageCarousel.append(divElement);
  })
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-available").style.display = "none"; 
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").textContent = adventure.costPerHead * persons;
}

//Implementation of reservation form submission
async function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let myForm = document.getElementById("myForm");
  myForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    let person = document.getElementById("person").value;

    const data = {
      name,
      date,
      person,
      adventure: adventure.id
    };

    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const postData = await fetch(`${config.backendEndpoint}/reservations/new`, options);
      const response = await postData.json();
      if (response.success) {
        alert("Success!");
        window.location.reload();
      }
      // return adventures;
    } catch (e) {
      return null;
    }
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
