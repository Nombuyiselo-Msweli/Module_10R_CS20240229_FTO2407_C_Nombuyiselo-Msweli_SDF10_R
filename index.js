//creating communication between the app and the database by firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref , push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://food-cart-15a72-default-rtdb.asia-southeast1.firebasedatabase.app/"    //link to firebase real time database
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


//input field functionality --> getting typed input and siplaying it in an element of it's own
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)

    console.log(inputValue)
})

