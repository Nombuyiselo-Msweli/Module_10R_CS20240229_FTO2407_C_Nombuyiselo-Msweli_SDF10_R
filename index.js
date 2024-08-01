//=== DATABASE CONNECTION SECTION ===
//creating communication between the app and the database by firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref , push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
})

onValue(shoppingListInDB, function(snapshot) {

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())         //converting object in databse to an array visible in the browser, console.log(itemsArray) to check that it works, object.values for values without ids
        
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {         //returns items as separate 
            let currentItem = itemsArray[i]

            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            updateShoppingListElWithItem(currentItem)       
        }
} else {
    shoppingListEl.innerHTML = "No items here... yet"
}
})

function clearShoppingListEl(){
    shoppingListEl.innerHTML = "" 
}

function clearInputFieldEl() {        
    inputFieldEl.value = ""
}

function  updateShoppingListElWithItem(item) {           
    //shoppingListEl.innerHTML += `<li>${itemValue}</li>` //updateShoppingListElWithItem(inputValue) //pushes new list item from text input to the list of items in the shopping cart.

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {                                  //removes item from shopping list database folder using the ID of the item
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl) 
}






