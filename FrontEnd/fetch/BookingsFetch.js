var bookingsAPI = 'http://localhost:9000/bookings';
var technicianBookingsAPI = 'http://localhost:9000/bookings/technician';
var customerBookingsAPI = 'http://localhost:9000/bookings/customer';
var addNewBooking = document.getElementById("new-booking");
var bookingsParent = document.getElementById("bookings");
var userRole = authenticateUser();
function authenticateUser() { return "Technician"; }
;
var tempCustomer = {
    id: 3,
    fullName: "Abenezer Seifu",
    email: "abenezer@gmail.com",
    phone: "0936127755",
    password: ""
};
var tempTechnician = {
    id: 7,
    fullName: "Abebe Kebede",
    email: "AbeKebe@gmail.com",
    phone: "0912435833",
    password: "",
    skills: "Electrician, Dish Satellite Installation",
    experience: "More than 3 years",
    educationLevel: "BSc. in Electrical Engineer",
    availableLocation: "Addis Ababa, Gulele & Arada sub city",
    additionalBio: "Exceptional in my performance I have been working on installing and maintaining electrical equipments from small house holds to big construction sites"
};
//Create Booking
//Create HTML tag for booking
function createBooking(booking, technician, customer) {
    var bookingDiv = document.createElement("div");
    bookingDiv.classList.add("booking-" + booking.id);
    var bookingInfoDiv = document.createElement("div");
    bookingInfoDiv.classList.add("booking");
    bookingDiv.appendChild(bookingInfoDiv);
    var role = customer;
    if (userRole == "customer") {
        var editButton = document.createElement("button");
        editButton.innerText = "Edit";
        bookingDiv.appendChild(editButton);
        var saveButton = document.createElement("button");
        saveButton.innerText = "Save Changes";
        bookingDiv.appendChild(saveButton);
        var deleteButton = document.createElement("button");
        deleteButton.innerText = "Save Changes";
        bookingDiv.appendChild(deleteButton);
    }
    else if (userRole == "Technician") {
        role = technician;
        var acceptButton = document.createElement("button");
        acceptButton.innerText = "Accept";
        bookingDiv.appendChild(acceptButton);
        var declineButton = document.createElement("button");
        declineButton.innerText = "Decline";
        bookingDiv.appendChild(declineButton);
        var servicedButton = document.createElement("button");
        servicedButton.innerText = "Serviced";
        bookingDiv.appendChild(servicedButton);
    }
    var bookingInfo = "<h3>".concat(booking.serviceNeeded, "</h3>\n                        <div class=\"technician-info\">\n                            <h4>Booked with<h4>\n                            <p>Name: ").concat(role.fullName, "</p>\n                            <p>E-Mail: ").concat(role.email, "</p>\n                            <p>Phone No: ").concat(role.phone, "</p>\n                        </div>\n                        <p>Problem description: ").concat(booking.problemDescription, "</p>\n                        <p>Service date: ").concat(booking.serviceDate, "</p>\n                        <p>Location: ").concat(booking.serviceLocation, "<p>\n                        <p>Status<p>");
    bookingInfoDiv.innerHTML = bookingInfo;
    return bookingDiv;
}
//Post booking on server
function postBookingToServer() {
    var bookedByTemp = 11;
    var bookedForTemp = 12;
    var serviceDateTemp = new Date();
    var serviceNeededTemp = "Electric Lightning installation";
    var problemDescriptionTemp = " I want full electric installation on 5 rooms house with all electric appliances being installed like sockets, switches and bulbs etc";
    var serviceLocationTemp = "Addis Ababa, Gulele";
    fetch(bookingsAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "customerId": bookedByTemp, "technicianId": bookedForTemp, "serviceDate": serviceDateTemp, "serviceNeeded": serviceNeededTemp, "problemDescription": problemDescriptionTemp})
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log(data);
        // createBooking(data, tempTechnician, tempCustomer);
    })
        .catch(function (error) { return console.error("Error adding booking!", error); });
}
//Read bookings
//Get all bookings - **outdated
function readAllBookingsFromServer() {
    fetch(bookingsAPI)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        
        console.log(data[i].id, data[i].design);
    })
        .catch(function (error) { return console.error("Error fetching bookings:", error); });
}


//Get bookings specific to technician
function readBookingsOfTechnicianFromServer(technician) {
    var technicianURL = `${technicianBookingsAPI}/${3}`;
    fetch(technicianURL)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            console.log(data);
            // createBooking(data, tempTechnician, tempCustomer);
    })
        .catch(function (error) { return console.error("Error fetching bookings:", error); });
}
//Get bookings specific to customer
function readBookingsOfCustomerFromServer(customer) {
    var customerURL =  `${customerBookingsAPI}/${5}`;
    fetch(customerURL)
    .then(function (response) { return response.json(); })
    .then(function (data) {    
        console.log(data);
    })
        .catch(function (error) { return console.error("Error fetching bookings:", error); });
}
//Update booking
//Update booking on html
function updateBooking(booking) {
    var bookingToBeUpdated = document.getElementById("");
    if (bookingToBeUpdated) {
        bookingToBeUpdated.innerHTML = createBooking(booking, tempTechnician, tempCustomer).innerHTML;
    }
}


var updatedBookingChanges = {"serviceDate": "2030-01-10", "serviceNeeded": "Wha'ever"};
//Update booking on server
function updateBookingOnServer(booking) {
    var updateUrl = `${bookingsAPI}/${6}`;
    fetch(updateUrl, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
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
function deleteBookingFromServer(booking) {
    var deleteUrl = `${bookingsAPI}/${1}`;
    var bookingToBeDeleted = document.getElementById("");
    fetch(deleteUrl, {
        method: "DELETE",
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
document.body.style.background = "green";
var btn = document.getElementById("hi");
if (btn) {
    btn.addEventListener("click", postBookingToServer);
}
