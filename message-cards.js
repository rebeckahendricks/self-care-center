// DOM Elements
const optionsKebab = document.querySelector('.options-button');

// Data


// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    loadData()
})

optionsKebab.addEventListener('click', function() {
    const optionsMenu = document.querySelector('.options-menu');
    optionsMenu.classList.toggle('hidden');
})

function saveData() {
    sessionStorage.setItem('messageData', JSON.stringify(messageData));
}

function loadData() {
    var storedData = sessionStorage.getItem('messageData');
    if (storedData) {
        messageData = JSON.parse(storedData);
    } else {
        console.log('No data found in localStorage.');
    }
}