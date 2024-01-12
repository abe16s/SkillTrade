var bookingsAPI = 'http://localhost:9000/bookings';
var technicianBookingsAPI = 'http://localhost:9000/bookings/technician';
var customerBookingsAPI = 'http://localhost:9000/bookings/customer';
var technicianAPI = 'http://localhost:9000/technician';
var addNewBooking = document.getElementById("new-booking");
var bookingsParent = document.getElementById("bookings");
var allContainer = document.getElementsByClassName("all-container")[0];
if (allContainer) {
    allContainer.id = "container-" + localStorage.getItem("individualTech");
}
var techProfile = document.getElementsByClassName("profile-detail")[0];
//Create Booking
//Create HTML tag for booking
// function createBooking(booking: any, technician: any, customer: any): HTMLElement {
//     const bookingDiv = document.createElement("div");
//     bookingDiv.classList.add("booking-"+booking.id);
//     const bookingInfoDiv = document.createElement("div");
//     bookingInfoDiv.classList.add("booking")
//     bookingDiv.appendChild(bookingInfoDiv)
//     let role = customer
//     let userRole = localStorage.getItem('userRole')
//     if (userRole == "customer") {
//         const editButton = document.createElement("button");
//         editButton.innerText = "Edit"
//         bookingDiv.appendChild(editButton)
//         const saveButton = document.createElement("button");
//         saveButton.innerText = "Save Changes"
//         bookingDiv.appendChild(saveButton)        
//         const deleteButton = document.createElement("button");
//         deleteButton.innerText = "Save Changes"
//         bookingDiv.appendChild(deleteButton)
//     } else if (userRole == "technician") {
//         role = technician;
//         const acceptButton = document.createElement("button");
//         acceptButton.innerText = "Accept"
//         bookingDiv.appendChild(acceptButton)
//         const declineButton = document.createElement("button");
//         declineButton.innerText = "Decline"
//         bookingDiv.appendChild(declineButton)
//         const servicedButton = document.createElement("button");
//         servicedButton.innerText = "Serviced"
//         bookingDiv.appendChild(servicedButton)
//     }
//     let bookingInfo = `<h3>${booking.serviceNeeded}</h3>
//                         <div class="technician-info">
//                             <h4>Booked with<h4>
//                             <p>Name: ${role.fullName}</p>
//                             <p>E-Mail: ${role.email}</p>
//                             <p>Phone No: ${role.phone}</p>
//                         </div>
//                         <p>Problem description: ${booking.problemDescription}</p>
//                         <p>Service date: ${booking.serviceDate}</p>
//                         <p>Location: ${booking.serviceLocation}<p>
//                         <p>Status<p>`
//     bookingInfoDiv.innerHTML = bookingInfo;
//     return bookingDiv
// }
//Post booking on server
function postBookingToServer() {
    var bookedByTemp;
    if (localStorage.getItem("userId")) {
        bookedByTemp = parseInt(localStorage.getItem("userId"));
    }
    else {
        return;
    }
    var bookedForTemp;
    if (allContainer) {
        bookedForTemp = parseInt(allContainer.id.split("-")[1]);
    }
    else {
        return;
    }
    var serviceDateTemp = document.getElementById("serviceDate");
    var serviceNeededTemp = document.getElementById("serviceNeeded");
    var problemDescriptionTemp = document.getElementById("problemDescription");
    var serviceLocationTemp = document.getElementById("serviceLocation");
    if (!(serviceDateTemp.checkValidity() && serviceNeededTemp.checkValidity() && problemDescriptionTemp.checkValidity() && serviceLocationTemp.checkValidity())) {
        return;
    }
    fetch(bookingsAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken'))
        },
        body: JSON.stringify({ "customerId": bookedByTemp, "technicianId": bookedForTemp, "serviceDate": serviceDateTemp.value, "serviceNeeded": serviceNeededTemp.value, "problemDescription": problemDescriptionTemp.value, "serviceLocation": serviceLocationTemp.value })
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        if ("error" in data) {
            alert("Please you have to sign in first to book");
            return;
        }
        console.log(data);
        window.location.reload();
    })
        .catch(function (error) { return console.error("Error adding booking!", error); });
}
//Read bookings
//Get bookings specific to technician
function readBookingsOfTechnicianFromServer() {
    var technicianURL = "".concat(technicianBookingsAPI, "/").concat(localStorage.getItem("userId"));
    fetch(technicianURL, {
        method: 'GET',
        headers: {
            'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken'))
        }
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log(data);
        // createBooking(data, tempTechnician, tempCustomer);
    })
        .catch(function (error) { return console.error("Error fetching bookings:", error); });
}
//Get bookings specific to customer
function readBookingsOfCustomerFromServer() {
    var customerURL = "".concat(customerBookingsAPI, "/").concat(localStorage.getItem("userId"));
    fetch(customerURL, {
        method: 'GET',
        headers: {
            'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken'))
        }
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log(data);
        // createBooking(data, tempTechnician, tempCustomer);
    })
        .catch(function (error) { return console.error("Error fetching bookings:", error); });
}
//Update booking
//Update booking on html
function updateBooking() {
    var bookingToBeUpdated = document.getElementById("");
    if (bookingToBeUpdated) {
        // bookingToBeUpdated.innerHTML = createBooking(booking, tempTechnician, tempCustomer).innerHTML
    }
}
var updatedBookingChanges = { "serviceDate": "2030-01-10", "serviceNeeded": "Wha'ever" };
//Update booking on server
function updateBookingOnServer() {
    var updateUrl = "".concat(bookingsAPI, "/").concat(6);
    fetch(updateUrl, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken'))
        },
        body: JSON.stringify(updatedBookingChanges),
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log(data);
    })
        .catch(function (error) { return console.error("Error updating booking!", error); });
}
//Delete booking
function deleteBookingFromServer() {
    var deleteUrl = "".concat(bookingsAPI, "/").concat(1);
    var bookingToBeDeleted = document.getElementById("");
    fetch(deleteUrl, {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken'))
        }
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log(data);
        if (bookingToBeDeleted) {
            bookingToBeDeleted.remove();
        }
    })
        .catch(function (error) { return console.error("Error deleting booking!", error); });
}
var submitBooking = document.getElementById("submitBooking");
if (submitBooking) {
    submitBooking.addEventListener("click", postBookingToServer);
}
function fetchTechnicianProfile() {
    var techApi = "".concat(technicianAPI, "/").concat(localStorage.getItem("individualTech"));
    fetch(techApi, {
        method: 'GET',
        headers: {
            'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken'))
        }
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log(data);
        showTechnicianProfile(data);
    })
        .catch(function (error) { return console.error("Error fetching technician:", error); });
}
function showTechnicianProfile(tech) {
    if (techProfile) {
        techProfile.innerHTML = "<h2>".concat(tech.fullName, "</h2>\n        <p><strong>Email</strong>: ").concat(tech.email, "</p>\n        <p><strong>Phone</strong> : ").concat(tech.phone, "</p>\n        <p><strong>Skills</strong> : ").concat(tech.skills, "</p>\n        <p><strong>Experience</strong> : ").concat(tech.experience, "</p>\n        <p><strong>Education Level</strong> : ").concat(tech.educationLevel, "</p>\n        <p><strong>Available Location</strong> : ").concat(tech.availableLocation, "</p>\n        <p>\n        <strong>Additional Bio</strong> : ").concat(tech.additionalBio, "\n        </p>");
    }
}
fetchTechnicianProfile();
