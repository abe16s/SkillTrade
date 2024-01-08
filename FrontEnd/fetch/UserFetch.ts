const userAPI = 'localhost:3000/users'

interface User {
    id: number,
    fullName: string,
    email: string,
    phone: string,
    role: "Admin" | "Customer",
    password: string
}


//signUp - create account

function signUpUser(): void {
    let idTemp: number = 2
    let fullNameTemp: string = "Abenezer Seifu"
    let emailTemp: string = "abenezer@gmail.com"
    let phoneTemp: string = "0912561209"
    let roleTemp: "Admin" | "Customer" = "Admin"
    let passwordTemp: string = "123"

    fetch(userAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id: idTemp, fullName: fullNameTemp, email: emailTemp, phone: phoneTemp, role: roleTemp, password: passwordTemp})
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        signInUser()
    })
    .catch((error) => console.error("Error signing up user!", error));
}

//signIn
function signInUser(): void {
    let emailTemp: string = "abenezer@gmail.com"
    let passwordTemp: string = "123"
    fetch(userAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email: emailTemp, password: passwordTemp})
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })
    .catch((error) => console.error("Error signing in user!", error));
}
