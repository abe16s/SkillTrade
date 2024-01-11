let signUpAPI = 'http://localhost:9000/trader/signup';
let signInAPI = 'http://localhost:9000/trader/signin';
let userAPI = 'http://localhost:9000/user';
//signUp - create account
//As a Customer
function signUpCustomer() {
    let fullNameTemp = document.getElementById("customer-fullName");
    let emailTemp = document.getElementById("customer-email");
    let phoneTemp = document.getElementById("customer-phone");
    let passwordTemp = document.getElementById("customer-password");
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!(fullNameTemp.checkValidity() && phoneTemp.checkValidity() && passwordTemp.checkValidity())) {
        return;
    }
    if (!(emailRegex.test(emailTemp.value) && emailTemp.checkValidity())) {
        alert("Please enter a valid email!");
        return;
    }
    fetch(signUpAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "fullName": fullNameTemp.value, "email": emailTemp.value, "phone": phoneTemp.value, "password": passwordTemp.value, "role": "customer" })
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        if ("error" in data) {
            alert("A user with that email already exists! Please try Login");
            console.log(data);
            return;
        }
        console.log(data);
        alert("Successfully registered");
        if (emailTemp && passwordTemp) {
            signInUser(emailTemp.value, passwordTemp.value, "customer");
        }
    })
        .catch(function (error) { return console.error("Error signing up customer!", error); });
}
//As a Technician
function signUpTechnician() {
    let fullNameTemp = document.getElementById("technician-fullName");
    let emailTemp = document.getElementById("technician-email");
    let phoneTemp = document.getElementById("technician-phone");
    let passwordTemp = document.getElementById("technician-password");
    let skillsTemp = document.getElementById("technician-skills");
    let experienceTemp = document.getElementById("technician-experience");
    let educationLevelTemp = document.getElementById("technician-educationLevel");
    let availableLocationTemp = document.getElementById("technician-availableLocation");
    let additionalBioTemp = document.getElementById("technician-additionalBio");
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!(fullNameTemp.checkValidity() && phoneTemp.checkValidity() && passwordTemp.checkValidity() && skillsTemp.checkValidity() && experienceTemp.checkValidity() && educationLevelTemp.checkValidity() && availableLocationTemp.checkValidity())) {
            return;
    }
    if (!(emailRegex.test(emailTemp.value) && emailTemp.checkValidity())) {
        alert("Please enter a valid email!");
        return;
    }
    fetch(signUpAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "role": "technician", "fullName": fullNameTemp.value, "email": emailTemp.value, "phone": phoneTemp.value, "password": passwordTemp.value, "skills": skillsTemp.value, "experience": experienceTemp.value, "educationLevel": educationLevelTemp.value, "availableLocation": availableLocationTemp.value, "additionalBio": additionalBioTemp.value })
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        if ("error" in data) {
            alert("A user with that email already exists! Please try Login");
            console.log(data);
            return;
        }
        console.log(data);
        alert("Successfully registered")
        if (emailTemp && passwordTemp) {
            signInUser(emailTemp.value, passwordTemp.value, "technician");
        }
    })
        .catch(function (error) { return console.error("Error signing up customer!", error); });
}
//signIn
function signInUser(email, password, role) {
    fetch(signInAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "role": role, "email": email, "password": password })
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        if ("error" in data) {
            alert("Incorrect credentials / email, password or role is incorrect");
            console.log(data);
            return;
        }
        console.log(data);
        localStorage.setItem('jwtToken', data.access_token);
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userId", data.userId);
        if (data.role == "technician") {
            console.log("Redirect to Technician Page");
        }
        else {
            console.log("Redirect to Customer Page");
        }
    })
        .catch(function (error) { return console.error("Error signing in user!", error); });
}
let updatedProfileChanges = { "email": "abc@com.com", "phone": 923823 };
//Update profile on server
function updateProfile(user) {
    let updateUrl = "".concat(userAPI, "/").concat(6);
    fetch(updateUrl, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken'))
        },
        body: JSON.stringify(updatedProfileChanges),
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log(data);
    })
        .catch(function (error) { return console.error("Error updating profile!", error); });
}
// Manipulate DOM
let customerBtn = document.getElementById("customer-signup");
if (customerBtn) {
    customerBtn.addEventListener("click", signUpCustomer);
}
let technicianBtn = document.getElementById("technician-signup");
if (technicianBtn) {
    technicianBtn.addEventListener("click", signUpTechnician);
}
let loginBtn = document.getElementById("login-btn");
if (loginBtn) {
    loginBtn.addEventListener("click", function () {
        let emailTemp = document.getElementById("login-email");
        let passwordTemp = document.getElementById("login-password");
        let roleTemp = "";
        let userType = document.getElementsByName('login-user-type');
        let isAnySelected = false;
        for (let i = 0; i < userType.length; i++) {
            if (userType[i].checked) {
                roleTemp = userType[i].value;
                isAnySelected = true;
                break;
            }
        }
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!(passwordTemp.checkValidity() && isAnySelected)) {
            return;
        }
        if (!(emailRegex.test(emailTemp.value) && emailTemp.checkValidity())) {
            alert("Please enter a valid email!");
            return;
        }
        signInUser(emailTemp.value, passwordTemp.value, roleTemp);
    });
}
