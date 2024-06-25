//1] step one creating variables to pull its value
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productDescription = document.getElementById("productDescription");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var indexUpdate = 0;

//2] step two create an empty array, then push the object into the array
var productsArray = [];

//11]step eleven is to create if condition to check if their is a data in local storage to display or it's null
if (localStorage.getItem("products") != null) {
  //12] get the items and put it into the container then call display products function , but we need it JSON again so will parse it
  productsArray = JSON.parse(localStorage.getItem("products"));

  displayProducts(productsArray);
}

//4] step 4 create a function to start adding the products
function addProduct() {
  //3] step three  create an object then push the object into the array
  var productObjects = {
    name: productName.value,
    price: productPrice.value,
    des: productDescription.value,
  };

  productsArray.push(productObjects);
  //10]step 10 save the data directly in local storage after pushing the object in the array  We stringfiy the array
  localStorage.setItem("products", JSON.stringify(productsArray));
  //7] step seven invoke display product function inside add function
  //And display the array that we pass it as parameter arr => productsArray
  displayProducts(productsArray);
  //9] step nine invoke clearForm function
  clearForm();
}

//8] step 8  create a function to empty the value after adding a new product
function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productDescription.value = "";
}

//5] step 5 create display function in HTML
//arr => productsArray
function displayProducts(arr) {
  //6] step six create a loop to loop on every element to display the items by index

  var tableRow = ` `;
  for (var i = 0; i < arr.length; i++) {
    // productsArray[i];
    tableRow += ` <tr>
       <td >${arr[i].name}</td>
       <td>${arr[i].price}</td>
       <td>${arr[i].des}</td>
       <td><button onclick="deleteProduct(${i}) "class="btn btn-outline-danger">Delete</button>
       <button onclick="SetFormForUpdate(${i})" class="btn btn-outline-warning  ">Update</button>
       </td>
     </tr>`;
  }
  document.getElementById("tableBody").innerHTML = tableRow;
}

function deleteProduct(productIndexInArray) {
  productsArray.splice(productIndexInArray, 1);
  //13] to be able to remove item from array yoi need to get it again from local storage
  localStorage.setItem("products", JSON.stringify(productsArray));

  //10] step 10 invoke the display product again
  displayProducts(productsArray);
}

function SetFormForUpdate(productIndex) {
  indexUpdate = productIndex;
  console.log(indexUpdate);

  // var updateProduct= productsArray[productIndex]

  productName.value = productsArray[productIndex].name;
  productPrice.value = productsArray[productIndex].price;
  productDescription.value = productsArray[productIndex].des;

  addBtn.classList.replace("d-block", "d-none");
  updateBtn.classList.replace("d-none", "d-block");
}

function updateData() {
  var productObjects = {
    name: productName.value,
    price: productPrice.value,
    des: productDescription.value,
  };

  productsArray.splice(indexUpdate, 1, productObjects);
  console.log(productsArray);
  localStorage.setItem("products", JSON.stringify(productsArray));
  displayProducts(productsArray);

  updateBtn.classList.replace("d-block", "d-none");
  addBtn.classList.replace("d-none", "d-block");
  clearForm();
}

//14] is to make search function and compare search word with every element in array
function searchByProductName(searchWord) {
  var matchedProductsArray = [];

  for (var i = 0; i < productsArray.length; i++) {
    if (
      productsArray[i].name.toLowerCase().includes(searchWord.toLowerCase()) ===
      true
    ) {
      matchedProductsArray.push(productsArray[i]);
    }
  }
  console.log(matchedProductsArray);

  displayProducts(matchedProductsArray);
}
