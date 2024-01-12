const bookingsAPI = 'http://localhost:9000/bookings';
const technicianBookingsAPI = 'http://localhost:9000/bookings/technician';
const customerBookingsAPI = 'http://localhost:9000/bookings/customer';
let technicianAPI = 'http://localhost:9000/technician';
const addNewBooking: HTMLElement | null = document.getElementById("new-booking")
const bookingsParent: HTMLElement | null = document.getElementById("bookings")
const allContainer: HTMLElement| null = document.getElementsByClassName("all-container")[0] as HTMLElement;

if (allContainer) {
    allContainer.id = "container-" + localStorage.getItem("individualTech");
}

const techProfile: HTMLElement| null = document.getElementsByClassName("profile-detail")[0] as HTMLElement;

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
function postBookingToServer(): void  {
    let bookedByTemp: number
    if (localStorage.getItem("userId")) {
        bookedByTemp = parseInt(localStorage.getItem("userId") as string);
    } else {
        return
    }

    let bookedForTemp: number
    if (allContainer) {
        bookedForTemp = parseInt(allContainer.id.split("-")[1]);
    } else {
        return
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
        console.log(data)
        window.location.reload();
    })
    .catch((error) => console.error("Error adding booking!", error));   
}


//Read bookings

//Get bookings specific to technician
function readBookingsOfTechnicianFromServer(): void {
    const technicianURL = `${technicianBookingsAPI}/${localStorage.getItem("userId")}`;
    fetch(technicianURL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }
    })
    .then((response) => response.json())
    .then((data) => {    
        console.log(data)
        // createBooking(data, tempTechnician, tempCustomer);
    })
    .catch((error) => console.error("Error fetching bookings:", error));
}

//Get bookings specific to customer
function readBookingsOfCustomerFromServer(): void {
    const customerURL =  `${customerBookingsAPI}/${localStorage.getItem("userId")}`;
    fetch(customerURL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        // createBooking(data, tempTechnician, tempCustomer);
    })
    .catch((error) => console.error("Error fetching bookings:", error));
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
function updateBookingOnServer(): void {
    const updateUrl = `${bookingsAPI}/${6}`;
    fetch(updateUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      },
      body: JSON.stringify(updatedBookingChanges),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })
    .catch((error) => console.error("Error updating booking!", error));
}


//Delete booking

function deleteBookingFromServer(): void {
    const deleteUrl = `${bookingsAPI}/${1}`;
    let bookingToBeDeleted: HTMLElement | null = document.getElementById("");
    fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        if (bookingToBeDeleted) {bookingToBeDeleted.remove();}
    })
    .catch((error) => console.error("Error deleting booking!", error));
}


let submitBooking: HTMLElement| null = document.getElementById("submitBooking")

if (submitBooking) {
    submitBooking.addEventListener("click", postBookingToServer)
}


function fetchTechnicianProfile(){
    let techApi = `${technicianAPI}/${localStorage.getItem("individualTech")}`;
    fetch(techApi, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }
    })
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
        showTechnicianProfile(data)
    })
        .catch((error) => console.error("Error fetching technician:", error));
}

function showTechnicianProfile(tech: any) {
    if (techProfile) {
        techProfile.innerHTML = `<h2>${tech.fullName}</h2>
        <p><strong>Email</strong>: ${tech.email}</p>
        <p><strong>Phone</strong> : ${tech.phone}</p>
        <p><strong>Skills</strong> : ${tech.skills}</p>
        <p><strong>Experience</strong> : ${tech.experience}</p>
        <p><strong>Education Level</strong> : ${tech.educationLevel}</p>
        <p><strong>Available Location</strong> : ${tech.availableLocation}</p>
        <p>
        <strong>Additional Bio</strong> : ${tech.additionalBio}
        </p>`
    }
}

fetchTechnicianProfile()