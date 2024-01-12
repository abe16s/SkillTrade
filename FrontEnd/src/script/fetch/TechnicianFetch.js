let technicianAPI = 'http://localhost:9000/technician';

// Get all technicians
export async function getAllTechnicians() {
    try {
        const response = await fetch(technicianAPI, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken'))
            }
        }) 
        const data = await response.json()
        if ("error" in data) {
            return
        }
        return data
    } catch(error) { return console.error("Error fetching all technicians!", error); };
}


export async function fetchTechnicianProfile(id) {
    var techApi = "".concat(technicianAPI, "/").concat(id);
    try {
        const response = await fetch(techApi, {
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

