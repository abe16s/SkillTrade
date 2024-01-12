let technicianAPI = 'http://localhost:9000/technician';
let technicianParent = document.getElementsByClassName("technicians")[0];


//Create technicians div in html
function createTechnician(id, fullName, skills) {
    let technicianCard = document.createElement("div");
    technicianCard.id = "technician-" + id;
    technicianCard.classList.add("technician-card");
    technicianCard.innerHTML = `<img src="img/logo-tech.png" alt="Technician pic" />
                                <h2>${fullName}</h2>
                                <p>Specialty: ${skills}</p>
                                <a href="booking.html" class="book-btn">Get Technician</a>`
    technicianCard.getElementsByClassName("book-btn")[0].addEventListener("click", redirectToIndividualTechnician)
    technicianParent.appendChild(technicianCard)
}

// Get all technicians
function getAllTechnicians() {
    fetch(technicianAPI) 
    .then((response) => response.json())
    .then((data) => {
        if ("error" in data) {
            return
        }
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            createTechnician(data[i].id, data[i].fullName, data[i].skills)
        }
})
    .catch((error) => console.error("Error fetching bookings:", error));
}




function redirectToIndividualTechnician(e) {
    let techId = e.target.parentNode.id.split("-")[1]
    localStorage.setItem("individualTech", techId)
    
}


getAllTechnicians();
document.body.style.background = "yellow"
