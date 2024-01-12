import {getAllTechnicians} from "../fetch/technicianFetch.js"

let technicianParent = document.getElementsByClassName("technicians")[0];

//Create technicians div in html
function createTechnician(id, fullName, skills) {
    let technicianCard = document.createElement("div");
    technicianCard.id = "technician-" + id;
    technicianCard.classList.add("technician-card");
    technicianCard.innerHTML = `<img src="../img/logo-tech.png" alt="Technician pic" />
                                <h2>${fullName}</h2>
                                <p>Specialty: ${skills}</p>
                                <a href="booking.html" class="book-btn">Get Technician</a>`
    technicianCard.getElementsByClassName("book-btn")[0].addEventListener("click", redirectToIndividualTechnician)
    technicianParent.appendChild(technicianCard)
}


function redirectToIndividualTechnician(e) {
    let techId = e.target.parentNode.id.split("-")[1]
    localStorage.setItem("individualTech", techId)
    
}

let allTechnicians =  await getAllTechnicians()
for (let i = 0; i < allTechnicians.length; i++) {
    createTechnician(allTechnicians[i].id, allTechnicians[i].fullName, allTechnicians[i].skills)
}