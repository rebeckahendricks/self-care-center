const quoteForm = document.querySelector('.form')
const message = document.getElementById('message')
const icon = document.getElementById('icon')
const displayMessage = document.querySelector('.display-message')

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

quoteForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedRadio = document.querySelector('input[name="message"]:checked');

    if (selectedRadio) {
        icon.classList.add('hidden')
        message.classList.remove('hidden')

        const messageType = selectedRadio.value;

        if (messageData[messageType]) {
            displayRandomMessage(messageData[messageType].messages);
        }
    } else {
        console.log('No message type selected.');
    }
})

function displayRandomMessage(messages) {
    const randomIndex = Math.floor(Math.random() * messages.length);
    currentMessage = messages[randomIndex];
    displayMessage.innerText = currentMessage
}