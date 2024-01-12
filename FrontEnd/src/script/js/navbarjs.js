let navbar = document.querySelector("nav");

navbar.innerHTML = `<input id="nav-toggle" type="checkbox" />
      <img src="../img/logo.jpg" alt="logo" class="logo" />
      <ul class="links">
        
      </ul>
      <label for="nav-toggle" class="icon-burger">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </label>`

let navs = navbar.getElementsByClassName("links")[0]
if (localStorage.getItem('jwtToken')) {
    if (localStorage.getItem('userRole') == "customer") {
        navs.innerHTML = `<li><a href="index.html">Home</a></li>
             <li><a href="find_tec.html">Find Technicians</a></li>
            <li><a href="customer-profile.html">Dashboard</a></li>
            <li class="btn">Log out</li>`
    } else {
        navs.innerHTML = `<li><a href="index.html">Home</a></li>
                <li><a href="technician-profile.html">Dashboard</a></li>
                <li class="btn">Log out</li>`
    }
    navs.getElementsByClassName("btn")[0].addEventListener("click", logout)
} else {
    navs.innerHTML = `
                <a href="login.html"><li class="btn">Login</li></a>
                <a href="signup.html"><li class="btn">Sign Up</li></a>`
}

function logout() {
    let sure = confirm("Are you sure you want to log out?")
    if (sure) {
        localStorage.setItem("jwtToken", "");
        window.location.href = "index.html"
    }
    console.log(localStorage.getItem("jwtToken"))
}