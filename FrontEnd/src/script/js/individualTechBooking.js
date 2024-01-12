import {fetchTechnicianProfile} from '../fetch/technicianFetch.js'
import {postBookingToServer} from '../fetch/BookingsFetch.js'

var techProfile = document.getElementsByClassName("profile-detail")[0];
var allContainer = document.getElementsByClassName("all-container")[0];
var bookedForTemp;
if (allContainer) {
    allContainer.id = "container-" + localStorage.getItem("individualTech");
    bookedForTemp = parseInt(allContainer.id.split("-")[1]);
}
var submitBooking = document.getElementById("submitBooking");
if (submitBooking) {
    submitBooking.addEventListener("click", () => postBookingToServer(bookedForTemp));
}

function showTechnicianProfile(tech) {
    if (techProfile) {
        techProfile.innerHTML = "<h2>".concat(tech.fullName, "</h2>\n        <p><strong>Email</strong>: ").concat(tech.email, "</p>\n        <p><strong>Phone</strong> : ").concat(tech.phone, "</p>\n        <p><strong>Skills</strong> : ").concat(tech.skills, "</p>\n        <p><strong>Experience</strong> : ").concat(tech.experience, "</p>\n        <p><strong>Education Level</strong> : ").concat(tech.educationLevel, "</p>\n        <p><strong>Available Location</strong> : ").concat(tech.availableLocation, "</p>\n        <p>\n        <strong>Additional Bio</strong> : ").concat(tech.additionalBio, "\n        </p>");
    }
}


let tech = await fetchTechnicianProfile(localStorage.getItem("individualTech"));
showTechnicianProfile(tech);