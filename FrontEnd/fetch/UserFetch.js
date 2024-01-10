var authCustomerAPI = 'localhost:3000/users';
var authTechnicianAPI = 'localhost:3000/users';
var signUpAPI2 = 'http://localhost:9000/trader/signup';
var signInAPI2 = 'http://localhost:9000/trader/signin';
// var user = authenticateUser();
//signUp - create account
//As a Customer
function signUpCustomer() {
    console.log("Hello")
    var fullNameTemp = "Abenezer Seifu";
    var emailTemp = "abenezer1234@gmail.com";
    var phoneTemp = 912561209;
    var passwordTemp = "123";
    var roleTemp = "customer";
    fetch(signUpAPI2, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "fullName": fullNameTemp, "email": emailTemp, "phone": phoneTemp, "password": passwordTemp, "role": roleTemp })
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log(data);
        // signInUser(emailTemp, passwordTemp)
    })
        .catch(function (error) { return console.error("Error signing up customer!", error); });
}
//As a Technician
function signUpTechnician() {
    var fullNameTemp = "Abenezer Seifu";
    var emailTemp = "abenezer123@gmail.com";
    var phoneTemp = "0912324544";
    var passwordTemp = "123";
    var skillsTemp = "Electrician, Dish Network Installer";
    var experienceTemp = "More than 3 Years";
    var educationLevelTemp = "BSc. in Electrical Engineering";
    var availableLocationTemp = "Addis Ababa, Gulele & Arada sub city";
    var additionalBioTemp = "Exceptional in my performance I have been working on installing and maintaining electrical equipments from small house holds to big construction sites";
    fetch(signUpAPI2, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"role": "technician",  "fullName": fullNameTemp, "email": emailTemp, "phone": phoneTemp, "password": passwordTemp, "skills": skillsTemp, "experience": experienceTemp, "educationLevel": educationLevelTemp, "availableLocation": availableLocationTemp, "additionalBio": additionalBioTemp })
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log(data);
        // signInUser(emailTemp, passwordTemp);
    })
        .catch(function (error) { return console.error("Error signing up customer!", error); });
}
//signIn
function signInUser() {
    var emailTemp = "abenezer123@gmail.com";
    var passwordTemp = "123";
    fetch(signInAPI2, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"role": "technician" , "email": emailTemp, "password": passwordTemp })
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        // if (user == "Technician") {
        //     console.log("Redirect to Technician Page");
        // }
        // else {
        //     console.log("Redirect to Customer Page");
        // }
        console.log(data);
    })
        .catch(function (error) { return console.error("Error signing in user!", error); });
}

document.body.style.background = "red";
var btn = document.getElementById("hi");
if (btn) {
    btn.addEventListener("click", signInUser);
}
