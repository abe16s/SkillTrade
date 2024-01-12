let customerAPI = 'http://localhost:9000/customer';
export async function fetchCustomerProfile(id) {
    var custAPI = "".concat(customerAPI, "/").concat(id);
    try {
        const response = await fetch(custAPI, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken'))
            }
        })
    
        const data = await response.json()
        return data
    }
    catch(error) { return console.error("Error fetching technician:", error); };
}
