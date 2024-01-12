let technicianAPI: string = 'http://localhost:9000/technician';

// Get all technicians
export async function getAllTechnicians() {
    try {
        const response = await fetch(technicianAPI, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken') as string)
            }
        }) 
        const data: any = await response.json()
        if ("error" in data) {
            return
        }
        return data
    } catch(error) { return console.error("Error fetching all technicians!", error); };
}


export async function fetchTechnicianProfile(id: number) {
    var techApi = "".concat(technicianAPI, "/").concat(id.toString());
    try {
        const response: any = await fetch(techApi, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('jwtToken') as string)
            }
        })
            const data: any = await response.json()
            console.log(data);
            return data
        }
        catch(error) { return console.error("Error fetching technician:", error); };
}

