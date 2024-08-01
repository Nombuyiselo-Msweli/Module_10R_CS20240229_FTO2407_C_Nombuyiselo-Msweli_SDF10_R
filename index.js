//=== DATABASE CONNECTION SECTION ===
//creating communication between the app and the database by firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref , push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://food-cart-15a72-default-rtdb.asia-southeast1.firebasedatabase.app/"    //link to firebase real time database
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")    //creates a "folder" on our database to which our items will be added

//==== APP SECTION ====
//input field functionality --> getting typed input, pushing it to the database and displaying it in an element of it's own
let inputFieldEl = document.getElementById("input-field")
let shoppingListEl = document.getElementById("shopping-list") // BUG: had to swap the position of variables. Error was that shoppingListEL was not defined at button event.
let addButtonEl = document.getElementById("add-button")



addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)

    clearInputFieldEl()                  //clears text box after input has been pushed
    
    updateShoppingListElWithItem(inputValue) //pushes new list item from text input to the list of items in the shopping cart

    
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function  updateShoppingListElWithItem(itemValue) {
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}





