// DOM elements:
const quoteForm = document.querySelector('.form')
const message = document.getElementById('message')
const icon = document.getElementById('icon')
const displayMessage = document.querySelector('.display-message')
const submitButton = document.getElementById('submitButton');
const radioButtons = document.querySelectorAll('input[name="message"]');

// Data:
const messageData = {
    mantra: {
        type: "mantra",
        messages: ["Be present.", "Release resistance.", "Trust the journey.", "Stay grounded.", "Breathe deeply.", "Embrace change.", "Seek balance.", "Open your heart.", "Choose peace.", "Let go."]
    },
    affirmation: {
        type: "affirmation",
        messages: ["I am enough.", "I believe in my skills.", "I am worthy of happiness.", "I embrace who I am.", "I am resilient.", "I deserve success.", "I am strong and confident.", "I grow with every challenge.", "I am grateful for today.", "I radiate positive energy."]
    }
};

var currentMessage;

// Event Listeners:
radioButtons.forEach(button => {
    button.addEventListener('change', function() {
        if (this.checked) {
            submitButton.disabled = false;
        }
    });
});

quoteForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedRadio = document.querySelector('input[name="message"]:checked');

    if (selectedRadio) {
        const messageType = selectedRadio.value;
        if (messageData[messageType]) {
            const messageArray = messageData[messageType].messages
            displayRandomMessage(messageArray);
        }
    } else {
        event.preventDefault();
    }
})

// Helper Functions:
function displayRandomMessage(messageArray) {
    const randomIndex = Math.floor(Math.random() * messageArray.length);
    currentMessage = messageArray[randomIndex];

    icon.classList.add('hidden')
    message.classList.remove('hidden')
    displayMessage.innerText = currentMessage
}