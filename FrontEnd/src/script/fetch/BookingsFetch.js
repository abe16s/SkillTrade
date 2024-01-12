var bookingsAPI = 'http://localhost:9000/bookings';
var technicianBookingsAPI = 'http://localhost:9000/bookings/technician';
var customerBookingsAPI = 'http://localhost:9000/bookings/customer';

//Post booking on server
export function postBookingToServer(bookedForTemp) {
    var bookedByTemp;
    if (localStorage.getItem("userId")) {
        bookedByTemp = parseInt(localStorage.getItem("userId"));
    }
    else {
        return;
    }
    
    if (!(bookedForTemp)) {
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
        if ("message" in data) {
            alert(data.message)
            return
        }
        console.log(data);
        alert("Booked Successfully!")
        window.location.reload();
    })
        .catch(function (error) { return console.error("Error adding booking!", error); });
}
//Read bookings
//Get bookings specific to technician
export async function readBookingsOfTechnicianFromServer() {
    var technicianURL = "".concat(technicianBookingsAPI, "/").concat(localStorage.getItem("userId"));
    try {
        let response = await fetch(technicianURL, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken'))
            }
        })
        let data = await response.json()
        console.log(data);
        return data
    } catch(error) { return console.error("Error fetching bookings:", error); };
}
//Get bookings specific to customer
export async function readBookingsOfCustomerFromServer() {
    var customerURL = "".concat(customerBookingsAPI, "/").concat(localStorage.getItem("userId"));
    try {
        const response = await fetch(customerURL, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken'))
            }
        })
        const data = await response.json()
        return data
    }

    catch(error) { return console.error("Error fetching bookings:", error); };
}
//Update booking
//Update booking on html
function updateBooking() {
    var bookingToBeUpdated = document.getElementById("");
    if (bookingToBeUpdated) {
        // bookingToBeUpdated.innerHTML = createBooking(booking, tempTechnician, tempCustomer).innerHTML
    }
}

//Update booking on server
export function updateBookingOnServer(id, updates) {
    var updateUrl = "".concat(bookingsAPI, "/").concat(id);
    console.log(id)
    console.log(updates)
    fetch(updateUrl, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken'))
        },
        body: JSON.stringify(updates),
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
            alert("You have successfully updated your booking!")
            console.log(data)
    })
        .catch(function (error) { return console.error("Error updating booking!", error); });
}
//Delete booking
export function deleteBookingFromServer(id) {
    var deleteUrl = "".concat(bookingsAPI, "/").concat(id);
    fetch(deleteUrl, {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken'))
        }
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log(data);
    })
        .catch(function (error) { return console.error("Error deleting booking!", error); });
}



