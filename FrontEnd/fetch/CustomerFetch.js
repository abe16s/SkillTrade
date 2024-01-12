let customerAPI = 'http://localhost:9000/customer';
export async function fetchCustomerProfile() {
    var custAPI = "".concat(customerAPI, "/").concat(localStorage.getItem("userId"));
    try {
        const response = await fetch(custAPI, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken'))
            }
        })
    
        const data = await response.json()
        console.log(data);
        return data
    }
    catch(error) { return console.error("Error fetching technician:", error); };
}
