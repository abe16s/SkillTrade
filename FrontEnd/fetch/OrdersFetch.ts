const ordersAPI: string = 'localhost:3000/orders'
const addNewOrder: HTMLElement | null = document.getElementById("new-order")

interface Order {
    id: number,
    orderedBy: number,
    orderDate: Date,
    deliveryDate: Date,
    quantity: number,
    orderReceiverAdmin: number,
    status: string,
    deliveryLocation: string
}

//Create Order

//Create HTML tag for order
function createOrder(order: Order): void {
    
}

//Post order on server
function postOrderToServer(): void {
    let orderedByTemp: number = 4
    let orderDateTemp: Date = new Date()
    let deliveryDateTemp: Date = new Date()
    let quantityTemp: number = 30
    let orderReceiverAdminTemp: number = 4
    let statusTemp: string = "On going"
    let deliveryLocationTemp: string = "Gulele, Addis Ababa"
    fetch(ordersAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({orderedBy: orderedByTemp, orderDate: orderDateTemp, deliveryDate: deliveryDateTemp, quantity: quantityTemp, orderReceiverAdmin: orderReceiverAdminTemp, status: statusTemp, deliveryLocation: deliveryLocationTemp})
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        createOrder(data);
    })
    .catch((error) => console.error("Error adding order!", error));
      
}


//Read orders
function readOrdersFromServer(): void  {
    fetch(ordersAPI)
    .then((response) => response.json())
    .then((data) => {
        for(let i = 0; i < data.length; i++) {
            console.log(data)
            createOrder(data);
        }
    })
    .catch((error) => console.error("Error fetching orders:", error));
}


//Update order

//Update order on html
function updateOrder(order: Order): void  {

}
let updatedOrderChanges: Object = {}

//Update order on server
function updateOrderOnServer(order: Order): void {
    const updateUrl = `${ordersAPI}/${order.id}`;
    fetch(updateUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrderChanges),
    })
    .then((response) => response.json())
    .then((data) => {
    console.log(data)
    })
    .catch((error) => console.error("Error updating order!", error));
}


//Delete order

function deleteOrderFromServer(order: Order): void {
    const deleteUrl = `${ordersAPI}/${order.id}`;
    // let orderToBeDeleted: Object = document.getElementById("");
    fetch(deleteUrl, {
      method: "DELETE",
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        //orderToBeDeleted.remove();
    })
      .catch((error) => console.error("Error deleting order!", error));
  
}
  