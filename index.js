/*
Challenge:
Make it so that when you click the 'Add to cart' button, whatever is written in the input field should be console logged.
*/

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    console.log(inputValue)
})

