import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let response = await fetch(`${config.backendEndpoint}/reservations`);
    let reservations = await response.json();
    return reservations;
  } catch (error) {
    return null;
  }
}

const formattedTime = (time) => {
  let timeArray = time.split(":");
  let hours = parseInt(timeArray[0], 10);
  let minutes = timeArray[1];
  let seconds = timeArray[2];

  var period = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return hours + ":" + minutes + ":" + seconds + " " + period;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  if (reservations.length) {
    document.getElementById("reservation-table-parent").style.display = "block";
    document.getElementById("no-reservation-banner").style.display = "none";
  } else {
    document.getElementById("reservation-table-parent").style.display = "none";
    document.getElementById("no-reservation-banner").style.display = "block";
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

  let table = document.getElementById("reservation-table");

  reservations.map((reservation) => {
    let {id, name, adventureName, person, price, adventure, date, time} = reservation;

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let bookingTime = new Date(time);
    let formattedDate = `${bookingTime.getDate()} ${month[bookingTime.getMonth()]} ${bookingTime.getFullYear()}, ${formattedTime(bookingTime.getHours() + ":" + bookingTime.getMinutes() + ":" + bookingTime.getSeconds())}`
    
    let row = document.createElement("tr");
    row.innerHTML = `
      <th>${id}</th>
      <td>${name}</td>
      <td>${adventureName}</td>
      <td>${person}</td>
      <td>${new Date(date).toLocaleDateString("en-IN")}</td>
      <td>${price}</td>
      <td>${formattedDate}</td>
      <td>
        <div id=${id}>
          <a href=../detail/?adventure=${adventure} class="reservation-visit-button">Visit Adventure</a>
        </div>
      </td>
    `;

    table.append(row);
  })

}

export { fetchReservations, addReservationToTable };
