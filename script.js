import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://cart-item-6fba7-default-rtdb.firebaseio.com/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const moviesListInDB = ref(database, "MoviesList")
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const moviesListEl = document.getElementById("movies-list");
const add = document.createElement("p"); add.textContent = `Success added `; add.id = 'alertA'
const error = document.createElement("p"); error.textContent = `Please enter a movie title.`; error.id = 'alertN'
const deleted = document.createElement("p"); deleted.textContent = `The Movie Was Deleted `; deleted.id = 'alertD'

const id = document.getElementById('alerts')
const err = document.getElementById('alerts')
const del = document.getElementById('alerts')
 

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value.trim();
    
    if (inputValue === "") {

        if (err) {
            // Append the new element to the target element
            err.appendChild(error)
          
            // Remove the new element after 3 seconds
            setTimeout(function() {
              err.removeChild(error);
            }, 2000);
          } else {
            console.error("Target element not found.");
          }
        
    

       
    } else {
        if (id) {
            // Append the new element to the target element
            id.appendChild(add)
          
            // Remove the new element after 3 seconds
            setTimeout(function() {
              id.removeChild(add);
            }, 3000);
          } else {
            console.error("Target element not found.");
          }
        push(moviesListInDB, inputValue);
        clearInputFieldEl();
        
       
    }
});

onValue(moviesListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());
        clearMoviesList();

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            appendItemToMoviesListEl(currentItem);
        }
    } else {
        moviesListEl.innerHTML = "";
    }
});

function clearMoviesList() {
    moviesListEl.innerHTML = "";
}

function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function appendItemToMoviesListEl(item) {
    let itemID = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li");
    newEl.textContent = itemValue;

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `MoviesList/${itemID}`);
        
        remove(exactLocationOfItemInDB);
        
        if (del) {
            // Append the new element to the target element
            del.appendChild(deleted)
          
            // Remove the new element after 3 seconds
            setTimeout(function() {
              del.removeChild(deleted);
            }, 2000);
          } else {
            console.error("Target element not found.");
          }
    });

    moviesListEl.append(newEl);
}
