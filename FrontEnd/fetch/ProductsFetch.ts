const productsAPI: string = 'localhost:3000/products'
const addNewProduct: HTMLElement | null = document.getElementById("new-product")

interface Product {
    id: number,
    designType: string,
    quantity: number,
    price: number,
    creatorAdminId: number
}

//Create Product

//Create HTML tag for product
function createProduct(product: Product): void {
    
}

//Post product on server
function postProductToServer(): void  {
    let designTemp: string = 'Office Chair'
    let quantityTemp: number = 50
    let priceTemp: number = 10000
    let adminIdTemp: number = 3
    fetch(productsAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({design: designTemp, quantity: quantityTemp, price: priceTemp, adminId: adminIdTemp})
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        createProduct(data);
    })
    .catch((error) => console.error("Error adding product!", error));   
}


//Read products
function readProductsFromServer(): void {
    fetch(productsAPI)
    .then((response) => response.json())
    .then((data) => {
        for(let i = 0; i < data.length; i++) {
            console.log(data[i].id,data[i].design)
            createProduct(data);
        }
    })
    .catch((error) => console.error("Error fetching products:", error));
}


//Update product

//Update product on html
function updateProduct(product: Product): void {

}
let updatedProductChanges: Object = {}

//Update product on server
function updateProductOnServer(product: Product): void {
    const updateUrl = `${productsAPI}/${product.id}`;
    fetch(updateUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProductChanges),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })
    .catch((error) => console.error("Error updating product!", error));
}


//Delete product

function deleteProductFromServer(product: Product): void {
    const deleteUrl = `${productsAPI}/${product.id}`;
    let productToBeDeleted: HTMLElement | null = document.getElementById("");
    fetch(deleteUrl, {
      method: "DELETE",
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        //productToBeDeleted.remove();
    })
      .catch((error) => console.error("Error deleting product!", error));
  
}
  