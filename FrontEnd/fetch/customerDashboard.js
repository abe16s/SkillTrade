import {fetchCustomerProfile} from "./CustomerFetch.js"
import {readBookingsOfCustomerFromServer, deleteBookingFromServer} from "./BookingsFetch.js"
import {fetchTechnicianProfile} from './technicianFetch.js'

let infoDiv = document.getElementsByClassName("basic-info")[0]
let customerData = await fetchCustomerProfile(localStorage.getItem("userId"))

infoDiv.innerHTML = `<p><strong>Name:</strong> ${customerData.fullName}</p>
                    <p><strong>Email:</strong> ${customerData.email}</p>
                    <p><strong>Phone:</strong> ${customerData.phone}</p>`

function saveForm(id) {  
    let editButton = document.getElementById("booking-"+id).querySelector('.edit'); 
    let saveButton = document.getElementById("booking-"+id).querySelector('.save');
    let cancelButton = document.getElementById("booking-"+id).querySelector('.cancel');
    enableFormFields(false, id);
    saveButton.classList.toggle("button_is_hidden");
    cancelButton.classList.toggle("button_is_hidden");
    editButton.classList.toggle("button_is_hidden");
}
function editForm(id) {
    let editButton = document.getElementById("booking-"+id).querySelector('.edit'); 
    let saveButton = document.getElementById("booking-"+id).querySelector('.save');
    let cancelButton = document.getElementById("booking-"+id).querySelector('.cancel');
    console.log(document.getElementById("booking-"+id))
    enableFormFields(true, id);
    saveButton.classList.toggle("button_is_hidden");
    cancelButton.classList.toggle("button_is_hidden");
    editButton.classList.toggle("button_is_hidden");
}

function cancelForm(id) {
    let editButton = document.getElementById("booking-"+id).querySelector('.edit'); 
    let saveButton = document.getElementById("booking-"+id).querySelector('.save');
    let cancelButton = document.getElementById("booking-"+id).querySelector('.cancel');
    document.getElementById("serviceForm-"+id).reset();
    enableFormFields(false, id);
    saveButton.classList.toggle("button_is_hidden");
    cancelButton.classList.toggle("button_is_hidden");
    editButton.classList.toggle("button_is_hidden");
}

function enableFormFields(enable, id) {
  let form = document.getElementById("serviceForm-"+id);
  let formElements = form.elements;

  for (let i = 1; i < formElements.length - 4; i++) {
      formElements[i].disabled = !enable;
  }
}

function deleteBooking(id){
  let sure = confirm("Are you sure you want to delete this booking?")
  if (sure) {
    let bookingToBeDeleted = document.getElementById("booking-"+id);
    deleteBookingFromServer(id)
    bookingToBeDeleted.remove()
  }
}

let customerBookings = await readBookingsOfCustomerFromServer();
customerBookings = customerBookings.bookings

let prevBookings = document.getElementsByClassName("previous-bookings")[0];

for (let i = customerBookings.length -1; i >= 0 ; i--) {

    let bookedFor = await fetchTechnicianProfile(customerBookings[i].technicianId);
    let temp = document.createElement("div");
    temp.classList.add("technician");
    temp.id = "booking-" + customerBookings[i].id 
    prevBookings.appendChild(temp)
    temp.innerHTML = `
    <div>
      <h4>Booked with</h4>
      <h3>${bookedFor.fullName}</h3>
      <h5>Specialty: ${bookedFor.skills}</h5>
      <h5>Phone: ${bookedFor.phone}</h5>
      <h5>Email: ${bookedFor.email}</h5>
    </div>
    <div>
      <form
        class="service-form"
        id="serviceForm-${customerBookings[i].id}"
        onsubmit="return false"
      >
        <label for="bookedDate" class="form-label"
          ><strong>Booked Date</strong>:</label
        >
        <input
          type="text"
          id="bookedDate-${customerBookings[i].id}"
          name="bookedDate"
          class="form-input"
          value="${customerBookings[i].createdDate}"
          required
          disabled
        />

        <label for="serviceDate" class="form-label"
          ><strong>Service Date</strong>:</label
        >
        <input
          type="text"
          id="serviceDate-${customerBookings[i].id}"
          name="serviceDate"
          class="form-input"
          value="${customerBookings[i].serviceDate}"
          required
          disabled
        />

        <label for="serviceNeeded" class="form-label"
          ><strong>Service Needed</strong>:</label
        >
        <input
          type="text"
          id="serviceNeeded-${customerBookings[i].id}"
          name="serviceNeeded"
          class="form-input"
          value="${customerBookings[i].serviceNeeded}"
          required
          disabled
        />

        <label for="problemDescription" class="form-label"
          ><strong>Problem Description</strong>:</label
        >
        <textarea
          id="problemDescription-${customerBookings[i].id}"
          name="problemDescription"
          class="form-textarea"
          rows="4"
          required
          disabled
        >${customerBookings[i].problemDescription}</textarea>
        <label for="serviceLocation" class="form-label"
          ><strong>Service Location</strong>:</label
        >
        <input
          type="text"
          id="serviceLocation-${temp.id}"
          name="serviceLocation"
          class="form-input"
          value="${customerBookings[i].serviceLocation}"
          required
          disabled
        />

        <label for="status" class="form-label"
          ><strong>Status</strong>:</label
        >

        <input
          type="text"
          id="status-${customerBookings[i].id}"
          name="status"
          class="form-input"
          value="${customerBookings[i].status}"
          required
          disabled
        />

        <button class="form-button edit">
          edit
        </button>
        <button
          class="form-button button_is_hidden save">
          save
        </button>
        <button class="form-button button_is_hidden cancel-button cancel">
          cancel
        </button>
      </form>
      <button class="booking-delete">Delete Booking</button>
    </div>
  </div>`
  temp.querySelector(".edit").addEventListener("click", () => editForm(customerBookings[i].id))
  temp.querySelector(".cancel").addEventListener("click", () => cancelForm(customerBookings[i].id))
  temp.querySelector(".save").addEventListener("click", () => saveForm(customerBookings[i].id))
  temp.querySelector(".booking-delete").addEventListener("click", () => deleteBooking(customerBookings[i].id))
}
