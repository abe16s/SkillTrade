let customerAPI: string = 'http://localhost:9000/customer';
export async function fetchCustomerProfile(id: number) {
    var custAPI: string = "".concat(customerAPI, "/").concat(id.toString());
    try {
        const response: any = await fetch(custAPI, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken') as string)
            }
        })
    
        const data: any = await response.json()
        return data
    }
    catch(error) { 
        alert("You are not authorized to access this data")
        return console.error("Error fetching technician:", error); 
    };
}