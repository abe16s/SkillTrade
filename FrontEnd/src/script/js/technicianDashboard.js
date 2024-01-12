import {readBookingsOfTechnicianFromServer, updateBookingOnServer} from "../fetch/BookingsFetch.js"
import {fetchCustomerProfile} from '../fetch/CustomerFetch.js'

let container = document.getElementsByClassName("profile-container")[0];


let techniciansBookings = await readBookingsOfTechnicianFromServer();
techniciansBookings = techniciansBookings.bookings

if (techniciansBookings.length == 0) {
    let noBooking = document.createElement("h3")
    noBooking.innerText = "You don't have any bookings yet"
    noBooking.classList.add ("no-bookings")
    container.appendChild(noBooking);
}  

for (let i = techniciansBookings.length-1; i >= 0; i--) {
    let bookedBy = await fetchCustomerProfile(techniciansBookings[i].customerId);

    let temp = document.createElement("div")
    container.appendChild(temp)
    temp.id = "booking-"+techniciansBookings[i].id
    temp.classList.add = "booking-item"
    temp.innerHTML = `<div class="technician">
                <div>
                <h4>Booked with</h4>
                <h3>${bookedBy.fullName}</h3>
                <h5>Phone: ${bookedBy.phone}</h5>
                <h5>Email:${bookedBy.email}</h5>
                </div>
                <div>
                <p>Booked Date: ${techniciansBookings[i].createdDate.substring(0, 10)}</p>
                <p>Service Date: ${techniciansBookings[i].serviceDate.substring(0, 10)}</p>
                <p>Service Needed: ${techniciansBookings[i].serviceNeeded}</p>
                <p>Problem Description: ${techniciansBookings[i].problemDescription}</p>
                <p>Service Location: ${techniciansBookings[i].serviceLocation}</p>
                <p>Status: ${techniciansBookings[i].status}</p>
                </div>
            <div class="booking-buttons">
                <button class="edit-button" >Accept</button>
                <button class="save-button">Serviced</button>
                <button class="cancel-button">Decline</button>
            </div>
            </div>
           `
        temp.querySelector(".edit-button").addEventListener("click", () => changeStatus(techniciansBookings[i].id, "accepted"));
        temp.querySelector(".save-button").addEventListener("click", () => changeStatus(techniciansBookings[i].id, "serviced"));
        temp.querySelector(".cancel-button").addEventListener("click", () => changeStatus(techniciansBookings[i].id, "declined"));
}


function changeStatus(id, status) {

    updateBookingOnServer(id, {"status": status})
    window.location.reload();
}