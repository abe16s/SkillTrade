const signUpAPI: string = 'http://localhost:9000/trader/signup'
const signInAPI: string = 'http://localhost:9000/trader/signin'
const userAPI: string = 'http://localhost:9000/user'

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


//signUp - create account

//As a Customer
function signUpCustomer(): void {
    let fullNameTemp: HTMLInputElement | null = document.getElementById("customer-fullName") as HTMLInputElement;
    let emailTemp: HTMLInputElement | null =  document.getElementById("customer-email") as HTMLInputElement;
    let phoneTemp: HTMLInputElement | null =  document.getElementById("customer-phone") as HTMLInputElement;
    let passwordTemp: HTMLInputElement | null =  document.getElementById("customer-password") as HTMLInputElement;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!(fullNameTemp.checkValidity() && phoneTemp.checkValidity() && passwordTemp.checkValidity())) {
        return
    }
    if (!(emailRegex.test(emailTemp.value) && emailTemp.checkValidity())) {
        alert("Please enter a valid email!")
        return
    }
    

    fetch(signUpAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "fullName": fullNameTemp.value, "email": emailTemp.value, "phone": phoneTemp.value, "password": passwordTemp.value, "role": "customer" })
    })
    .then((response) => response.json())
    .then((data) => {
        if ("error" in data) {
            alert("A user with that email already exists! Please try Login")
            console.log(data)
            return 
        }
        console.log(data);
        alert("Successfully registered")
        if (emailTemp && passwordTemp) {
            signInUser(emailTemp.value, passwordTemp.value, "customer");
        }
    })
    .catch((error) => console.error("Error signing up customer!", error));
}

//As a Technician
function signUpTechnician(): void {
    let fullNameTemp: HTMLInputElement | null = document.getElementById("technician-fullName") as HTMLInputElement;
    let emailTemp: HTMLInputElement | null =  document.getElementById("technician-email") as HTMLInputElement;
    let phoneTemp: HTMLInputElement | null =  document.getElementById("technician-phone") as HTMLInputElement;
    let passwordTemp: HTMLInputElement | null =  document.getElementById("technician-password") as HTMLInputElement;
    let skillsTemp: HTMLInputElement | null = document.getElementById("technician-skills") as HTMLInputElement;
    let experienceTemp: HTMLInputElement | null = document.getElementById("technician-experience") as HTMLInputElement;
    let educationLevelTemp: HTMLInputElement | null = document.getElementById("technician-educationLevel") as HTMLInputElement;
    let availableLocationTemp: HTMLInputElement | null = document.getElementById("technician-availableLocation") as HTMLInputElement;
    let additionalBioTemp: HTMLInputElement | null = document.getElementById("technician-additionalBio") as HTMLInputElement;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!(fullNameTemp.checkValidity() && phoneTemp.checkValidity() && passwordTemp.checkValidity() && experienceTemp.checkValidity() && availableLocationTemp.checkValidity())) {
        return
    }
    
    if (!(emailRegex.test(emailTemp.value) && emailTemp.checkValidity())) {
        alert("Please enter a valid email!")
        return
    }

    fetch(signUpAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "role": "technician", "fullName": fullNameTemp.value, "email": emailTemp.value, "phone": phoneTemp.value, "password": passwordTemp.value, "experience": experienceTemp.value, "availableLocation": availableLocationTemp.value, "additionalBio": additionalBioTemp.value })
    })
    .then((response) => response.json())
    .then((data) => {
        if ("error" in data) {
            alert("A user with that email already exists! Please try Login")
            console.log(data)
            return 
        }
        console.log(data);
        alert("Successfully registered")
        if (emailTemp && passwordTemp) {
            signInUser(emailTemp.value, passwordTemp.value, "technician");
        }
    })
    .catch((error) => console.error("Error signing up customer!", error));
}

//signIn
function signInUser(email: string, password: string, role: string): void {
    fetch(signInAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"role": role , "email": email, "password": password })
    })
    .then((response) => response.json())
    .then((data) => {
        if ("error" in data) {
            alert("Incorrect credentials / email, password or role is incorrect")
            console.log(data)
            return 
        }
        console.log(data);
        localStorage.setItem('jwtToken', data.access_token);
        localStorage.setItem("userRole", data.role);
        if (data.role == "technician") {
            console.log("Redirect to Technician Page");
        }
        else {
            console.log("Redirect to Customer Page");
        }
    })
    .catch((error) => console.error("Error signing in user!", error));
}




let updatedProfileChanges: any = {"email": "abc@com.com", "phone": 923823}

//Update profile on server
function updateProfile(user: any): void {
    const updateUrl = `${userAPI}/${6}`;
    fetch(updateUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      },
      body: JSON.stringify(updatedProfileChanges),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })
    .catch((error) => console.error("Error updating profile!", error));
}



// Manipulate DOM
let customerBtn: HTMLElement| null = document.getElementById("customer-signup")
if (customerBtn) {
    customerBtn.addEventListener("click",signUpCustomer)
}

let technicianBtn: HTMLElement| null = document.getElementById("technician-signup")
if (technicianBtn) {
    technicianBtn.addEventListener("click",signUpTechnician)
}

let loginBtn: HTMLElement| null = document.getElementById("login-btn")
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        let emailTemp: HTMLInputElement | null = document.getElementById("login-email") as HTMLInputElement;
        let passwordTemp: HTMLInputElement | null = document.getElementById("login-password") as HTMLInputElement;
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

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!(passwordTemp.checkValidity() && isAnySelected)) {
            return
        }
        if (!(emailRegex.test(emailTemp.value) && emailTemp.checkValidity())) {
            alert("Please enter a valid email!")
            return
        }
        
        signInUser(emailTemp.value, passwordTemp.value, roleTemp)
    })
}