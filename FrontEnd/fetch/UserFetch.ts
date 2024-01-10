const authCustomerAPI: string = 'localhost:3000/users'
const authTechnicianAPI: string = 'localhost:3000/users'
const signInAPI: string = 'localhost:3000/users'
const user: string = authenticateUser();

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
    let fullNameTemp: string = "Abenezer Seifu"
    let emailTemp: string = "abenezer@gmail.com"
    let phoneTemp: string = "0912561209"
    let passwordTemp: string = "123"

    fetch(authCustomerAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({fullName: fullNameTemp, email: emailTemp, phone: phoneTemp, password: passwordTemp})
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        signInUser(emailTemp, passwordTemp)
    })
    .catch((error) => console.error("Error signing up customer!", error));
}

//As a Technician
function signUpTechnician(): void {
    let fullNameTemp: string = "Abenezer Seifu"
    let emailTemp: string = "abenezer@gmail.com"
    let phoneTemp: string = "0912324544"
    let passwordTemp: string = "123"
    let skillsTemp: string = "Electrician, Dish Network Installer"
    let experienceTemp: string = "More than 3 Years"
    let educationLevelTemp: string = "BSc. in Electrical Engineering"
    let availableLocationTemp: string = "Addis Ababa, Gulele & Arada sub city"
    let additionalBioTemp: string = "Exceptional in my performance I have been working on installing and maintaining electrical equipments from small house holds to big construction sites"
    fetch(authTechnicianAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({fullName: fullNameTemp, email: emailTemp, phone: phoneTemp, password: passwordTemp, skills: skillsTemp,experience: experienceTemp, educationLevel: educationLevelTemp, availableLocation: availableLocationTemp, additionalBio: additionalBioTemp})
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        signInUser(emailTemp, passwordTemp)
    })
    .catch((error) => console.error("Error signing up customer!", error));
}

//signIn
function signInUser(email: string, password: string): void {
    fetch(signInAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email: email, password: password})
    })
    .then((response) => response.json())
    .then((data) => {
        if (user == "Technician") {
            console.log("Redirect to Technician Page")
        } else {
            console.log("Redirect to Customer Page")
        }
        console.log(data)
    })
    .catch((error) => console.error("Error signing in user!", error));
}

