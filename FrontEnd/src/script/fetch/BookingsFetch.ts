const bookingsAPI = 'http://localhost:9000/bookings';
const technicianBookingsAPI = 'http://localhost:9000/bookings/technician';
const customerBookingsAPI = 'http://localhost:9000/bookings/customer';

//Post booking on server
function postBookingToServer(bookedForTemp: number): void  {
    let bookedByTemp: number
    if (localStorage.getItem("userId")) {
        bookedByTemp = parseInt(localStorage.getItem("userId") as string);
    } else {
        return
    }

    if (!(bookedForTemp)) {
        return;
    }

    let serviceDateTemp: HTMLInputElement | null  = document.getElementById("serviceDate") as HTMLInputElement;
    let serviceNeededTemp: HTMLInputElement | null  = document.getElementById("serviceNeeded") as HTMLInputElement;
    let problemDescriptionTemp: HTMLInputElement | null  = document.getElementById("problemDescription") as HTMLInputElement;
    let serviceLocationTemp: HTMLInputElement | null  = document.getElementById("serviceLocation") as HTMLInputElement;

    if (!(serviceDateTemp.checkValidity() && serviceNeededTemp.checkValidity() && problemDescriptionTemp.checkValidity() && serviceLocationTemp.checkValidity())) {
        return;
    }


    
    fetch(bookingsAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify({ "customerId": bookedByTemp, "technicianId": bookedForTemp, "serviceDate": serviceDateTemp.value, "serviceNeeded": serviceNeededTemp.value, "problemDescription": problemDescriptionTemp.value, "serviceLocation": serviceLocationTemp.value})
    })
    .then((response) => response.json())
    .then((data) => {
        if ("error" in data) {
            alert("Please you have to sign in first to book");
            return
        }
        console.log(data);
        alert("Booked Successfully!")
        window.location.reload();
    })
    .catch((error) => console.error("Error adding booking!", error));   
}


//Read bookings

//Get bookings specific to technician
export async function readBookingsOfTechnicianFromServer() {
    const technicianURL = `${technicianBookingsAPI}/${localStorage.getItem("userId")}`;
    try {
        let response = await fetch(technicianURL, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken') as string)
            }
        })
        let data = await response.json()
        console.log(data);
        return data
    } catch(error) { return console.error("Error fetching bookings:", error); };
}

//Get bookings specific to customer
export async function readBookingsOfCustomerFromServer() {
    const customerURL =  `${customerBookingsAPI}/${localStorage.getItem("userId")}`;
    try {
        const response = await fetch(customerURL, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken') as string)
            }
        })
        const data = await response.json()
        console.log(data);
        return data
    }

    catch(error) { return console.error("Error fetching bookings:", error); };
}


//Update booking

//Update booking on html
function updateBooking(): void {
    let bookingToBeUpdated: HTMLElement | null = document.getElementById("");
    if (bookingToBeUpdated) {
        // bookingToBeUpdated.innerHTML = createBooking(booking, tempTechnician, tempCustomer).innerHTML
    }
}

let updatedBookingChanges: any = {"serviceDate": "2030-01-10", "serviceNeeded": "Wha'ever"}

//Update booking on server
export function updateBookingOnServer(id: number, updates: any) {
    var updateUrl = "".concat(bookingsAPI, "/").concat(id.toString());
    fetch(updateUrl, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken') as string)
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

export function deleteBookingFromServer(id: number) {
    var deleteUrl = "".concat(bookingsAPI, "/").concat(id.toString());
    fetch(deleteUrl, {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken') as string)
        }
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log(data);
    })
        .catch(function (error) { return console.error("Error deleting booking!", error); });
}