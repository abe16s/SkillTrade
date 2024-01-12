let signUpAPI: string = 'http://localhost:9000/trader/signup';
let signInAPI: string = 'http://localhost:9000/trader/signin';
let technicianAPI: string = 'http://localhost:9000/technician';
let homeAPI: string = 'http://localhost:9000'
//signUp - create account
//As a Customer
function signUpCustomer() {
    let fullNameTemp: HTMLInputElement | null = document.getElementById("customer-fullName") as HTMLInputElement;
    let emailTemp: HTMLInputElement | null = document.getElementById("customer-email") as HTMLInputElement;
    let phoneTemp: HTMLInputElement | null = document.getElementById("customer-phone") as HTMLInputElement;
    let passwordTemp: HTMLInputElement | null = document.getElementById("customer-password") as HTMLInputElement;
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
    let fullNameTemp: HTMLInputElement | null  = document.getElementById("technician-fullName") as HTMLInputElement;
    let emailTemp: HTMLInputElement | null  = document.getElementById("technician-email") as HTMLInputElement;
    let phoneTemp: HTMLInputElement | null = document.getElementById("technician-phone") as HTMLInputElement;
    let passwordTemp: HTMLInputElement | null = document.getElementById("technician-password") as HTMLInputElement;
    let skillsTemp: HTMLInputElement | null  = document.getElementById("technician-skills") as HTMLInputElement;
    let experienceTemp: HTMLInputElement | null  = document.getElementById("technician-experience") as HTMLInputElement;
    let educationLevelTemp: HTMLInputElement | null  = document.getElementById("technician-educationLevel") as HTMLInputElement;
    let availableLocationTemp: HTMLInputElement | null  = document.getElementById("technician-availableLocation") as HTMLInputElement;
    let additionalBioTemp: HTMLInputElement | null  = document.getElementById("technician-additionalBio") as HTMLInputElement;
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
function signInUser(email: string, password: string, role: string) {
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
            window.location.href = "technician-profile.html" 
        }
        else {
            window.location.href = "customer-profile.html" 
        }
    })
        .catch(function (error) { return console.error("Error signing in user!", error); });
}
let updatedProfileChanges = { "email": "abc@com.com", "phone": 923823 };
//Update profile on server
function updateProfile(user:number, updatedProfileChanges:any) {
    let updateUrl = "".concat(technicianAPI, "/").concat(user.toString());
    fetch(updateUrl, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken') as string)
        },
        body: JSON.stringify(updatedProfileChanges),
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
            alert("You have successfully updated your profile!")
            return data
    })
        .catch(function (error) { return console.error("Error updating profile!", error); });
}

// fetch for user profile
async function fetchUserProfile(id: number){
    let userProfileURL = `${homeAPI}/technician/${id}`;
    try {
        const response = await fetch(userProfileURL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        return {};
    }
}


const profileUpdateBtn: HTMLElement | null = document.querySelector(".btn-update-profile")
const saveUpdatedBtn: HTMLElement | null = document.querySelector(".save-profile-update")
const cancelUpdatedBtn: HTMLElement | null = document.querySelector(".cancel-profile-update")
const profile: HTMLElement | null = document.querySelector(".updated-profile-card")

let unsavedChanges: any = {}
function recordChanges(key: string){
    let elem: HTMLInputElement | null = document.getElementById(key) as HTMLInputElement
    if (elem) {
        unsavedChanges[key] = elem.value
    }
}

let technicianId= localStorage.getItem("userId")

function formInputDisabler(enable: boolean){
    for (let i = 0; i < 8; i++) {
        if (i != 4 && profile){
            let temp: HTMLInputElement| null = profile.querySelector(".input-"+i) as HTMLInputElement
            if (temp) {
                temp.disabled = !enable;
            }
        }
    }

}
function updateHandler(event: any, enable: boolean){
    if (saveUpdatedBtn) {saveUpdatedBtn.classList.toggle("is_hidden")}
    if (cancelUpdatedBtn) {cancelUpdatedBtn.classList.toggle("is_hidden")}
    if (profileUpdateBtn) {profileUpdateBtn.classList.toggle("is_hidden")}
    formInputDisabler(true)
    console.log(profile)
}   

async function displayProfile(){
    if (!(technicianId)) {return}
    let result = await fetchUserProfile(parseInt(technicianId))
    let labels = {
        fullName: "Full name",
        skills: "Skills",
        phone: "Phone",
        experience: "Experience",
        email: "Email",
        educationLevel: "Educational level",
        availableLocation: "Available location",
        additionalBio: "Additional bio"
    }
    let i = 0;
    // Object.entries(result).map(([key, value]: [string, string]) => {
    //     let field = document.createElement("div")
    //       field.innerHTML = `<div class="profile-input" key=${key}>
    //       <label for=${key}>${labels[key]}</label>
    //       <input class="inputRow input-${i++}" onchange="recordChanges('${key}','${result}')" value ='${value}' id=${key} disabled />
    //     </div>`
    //     if (profile) {profile.appendChild(field)}
    //   });

}


function saveUpdated(event: any){
    if (!(technicianId && saveUpdatedBtn && cancelUpdatedBtn && profileUpdateBtn)) {return false}
    updateProfile(parseInt(technicianId), unsavedChanges)
    saveUpdatedBtn.classList.toggle("is_hidden")
    cancelUpdatedBtn.classList.toggle("is_hidden")
    profileUpdateBtn.classList.toggle("is_hidden")
    formInputDisabler(false)

}

function cancelUpdating(event: any){
    if (!(profile && saveUpdatedBtn && cancelUpdatedBtn && profileUpdateBtn)) {return false}
    profile.innerHTML = ""
    displayProfile()
    saveUpdatedBtn.classList.toggle("is_hidden")
    cancelUpdatedBtn.classList.toggle("is_hidden")
    profileUpdateBtn.classList.toggle("is_hidden")
    formInputDisabler(false)
}


// Manipulate DOM
let customerBtn: HTMLElement| null = document.getElementById("customer-signup");
if (customerBtn) {
    customerBtn.addEventListener("click", signUpCustomer);
}
let technicianBtn: HTMLElement| null = document.getElementById("technician-signup");
if (technicianBtn) {
    technicianBtn.addEventListener("click", signUpTechnician);
}
let loginBtn: HTMLElement| null = document.getElementById("login-btn");
if (loginBtn) {
    loginBtn.addEventListener("click", function () {
        let emailTemp: HTMLInputElement| null = document.getElementById("login-email") as HTMLInputElement;
        let passwordTemp: HTMLInputElement| null = document.getElementById("login-password") as HTMLInputElement;
        let roleTemp: string = "";
        let userType: NodeListOf<HTMLInputElement> = document.getElementsByName('login-user-type') as NodeListOf<HTMLInputElement>;
        let isAnySelected: boolean = false;

        for (var i = 0; i < userType.length; i++) {
            if (userType[i].checked) {
                roleTemp = userType[i].value 
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
