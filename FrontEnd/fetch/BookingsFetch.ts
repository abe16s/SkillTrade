const bookingsAPI = 'http://localhost:9000/bookings';
const technicianBookingsAPI = 'http://localhost:9000/bookings/technician';
const customerBookingsAPI = 'http://localhost:9000/bookings/customer';
const addNewBooking: HTMLElement | null = document.getElementById("new-booking")
const bookingsParent: HTMLElement | null = document.getElementById("bookings")

interface Booking {
    id: number,
    bookedBy: number,
    bookedFor: number,
    bookedDate: Date,
    serviceDate: Date,
    serviceNeeded: string,
    problemDescription: string,
    serviceLocation: string,
    status: string
}

interface Customer {
    id: number,
    fullName: string,
    email: string,
    phone: string,
    password: string
}

interface Technician {
    id: number,
    fullName: string,
    email: string,
    phone: string,
    password: string,
    skills: string,
    experience: string,
    educationLevel: string,
    availableLocation: string,
    additionalBio: string
}

let tempCustomer: Customer = {
    id: 3,
    fullName: "Abenezer Seifu",
    email: "abenezer@gmail.com",
    phone: "0936127755",
    password: ""
}

let  tempTechnician: Technician = {
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
}

//Create Booking

//Create HTML tag for booking
function createBooking(booking: Booking, technician: Technician, customer: Customer): HTMLElement {
    const bookingDiv = document.createElement("div");
    bookingDiv.classList.add("booking-"+booking.id);
    
    const bookingInfoDiv = document.createElement("div");
    bookingInfoDiv.classList.add("booking")
    bookingDiv.appendChild(bookingInfoDiv)

    let role = customer
    let userRole = localStorage.getItem('userRole')
    if (userRole == "customer") {
        const editButton = document.createElement("button");
        editButton.innerText = "Edit"
        bookingDiv.appendChild(editButton)

        const saveButton = document.createElement("button");
        saveButton.innerText = "Save Changes"
        bookingDiv.appendChild(saveButton)        
        
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Save Changes"
        bookingDiv.appendChild(deleteButton)
    } else if (userRole == "technician") {
        role = technician;
        const acceptButton = document.createElement("button");
        acceptButton.innerText = "Accept"
        bookingDiv.appendChild(acceptButton)

        const declineButton = document.createElement("button");
        declineButton.innerText = "Decline"
        bookingDiv.appendChild(declineButton)

        const servicedButton = document.createElement("button");
        servicedButton.innerText = "Serviced"
        bookingDiv.appendChild(servicedButton)
    }

    let bookingInfo = `<h3>${booking.serviceNeeded}</h3>
                        <div class="technician-info">
                            <h4>Booked with<h4>
                            <p>Name: ${role.fullName}</p>
                            <p>E-Mail: ${role.email}</p>
                            <p>Phone No: ${role.phone}</p>
                        </div>
                        <p>Problem description: ${booking.problemDescription}</p>
                        <p>Service date: ${booking.serviceDate}</p>
                        <p>Location: ${booking.serviceLocation}<p>
                        <p>Status<p>`
    bookingInfoDiv.innerHTML = bookingInfo;
    return bookingDiv
}

//Post booking on server
function postBookingToServer(): void  {
    let bookedByTemp: number = 11
    let bookedForTemp: number = 12
    let serviceDateTemp: Date = new Date()
    let serviceNeededTemp: string = "Electric Lightning installation"
    let problemDescriptionTemp: string = " I want full electric installation on 5 rooms house with all electric appliances being installed like sockets, switches and bulbs etc"
    let serviceLocationTemp: string = "Addis Ababa, Gulele" 

    fetch(bookingsAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify({ "customerId": bookedByTemp, "technicianId": bookedForTemp, "serviceDate": serviceDateTemp, "serviceNeeded": serviceNeededTemp, "problemDescription": problemDescriptionTemp, "serviceLocation": serviceLocationTemp})
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        // createBooking(data, tempTechnician, tempCustomer);
    })
    .catch((error) => console.error("Error adding booking!", error));   
}


//Read bookings

//Get bookings specific to technician
function readBookingsOfTechnicianFromServer(technician: Technician): void {
    const technicianURL = `${technicianBookingsAPI}/${3}`;
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
function readBookingsOfCustomerFromServer(customer: Customer): void {
    const customerURL =  `${customerBookingsAPI}/${5}`;
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
function updateBooking(booking: Booking): void {
    let bookingToBeUpdated: HTMLElement | null = document.getElementById("");
    if (bookingToBeUpdated) {
        bookingToBeUpdated.innerHTML = createBooking(booking, tempTechnician, tempCustomer).innerHTML}
}

let updatedBookingChanges: any = {"serviceDate": "2030-01-10", "serviceNeeded": "Wha'ever"}

//Update booking on server
function updateBookingOnServer(booking: Booking): void {
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

function deleteBookingFromServer(booking: Booking): void {
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