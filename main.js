// DOM elements:
const messageText = document.querySelector('.message-text');

const messageDisplay = document.getElementById('message-display');
const iconDisplay = document.getElementById('icon-display');
const addMessageDisplay = document.getElementById('add-message-display');

const messageTypeForm = document.getElementById('message-type-form');
const addMessageForm = document.getElementById('add-message-form')

const radioButtons = document.querySelectorAll('input[name="message-type"]');
const submitButton = document.getElementById('submitButton');
const clearButton = document.getElementById('clearButton');
const addMessageButton = document.getElementById('addMessageButton');

const messageTypeSelect = document.getElementById('messageTypeSelect');

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

clearButton.addEventListener('click', function() {
    clearMessage()
});

messageTypeForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedType = document.querySelector('input[name="message-type"]:checked');

    if (selectedType) {
        const messageType = selectedType.value;
        if (messageData[messageType]) {
            const messageArray = messageData[messageType].messages
            randomizeCurrentMessage(messageArray);
            showMessageDisplay()
        }
    } else {
        event.preventDefault();
    }
})

addMessageButton.addEventListener('click', function() {
    showAddMessageDisplay()
});

messageTypeSelect.addEventListener('change', function() {
    var otherTypeInput = document.getElementById('otherType');

    if (this.value === 'other') {
        otherTypeInput.style.display = 'block';
    } else {
        otherTypeInput.style.display = 'none';
    }
});

addMessageForm.addEventListener('submit', function(event) {
    event.preventDefault()

    const messageType = document.getElementById('messageTypeSelect').value;

    let type;
    if (messageType === 'other') {
        const otherTypeInput = document.getElementById('otherType');
        type = otherTypeInput.value;
    } else {
        type = messageType;
    }

    const messageText = document.getElementById('messageText').value;

    createMessage(type, messageText)
});

// Helper Functions:
function randomizeCurrentMessage(messageArray) {
    const randomIndex = Math.floor(Math.random() * messageArray.length);
    currentMessage = messageArray[randomIndex];
}

function showMessageDisplay() {
    messageText.innerText = currentMessage
    
    messageDisplay.classList.remove('hidden')
    iconDisplay.classList.add('hidden')
    addMessageDisplay.classList.add('hidden')

    clearButton.disabled = false;
}

function showIconDisplay() {
    iconDisplay.classList.remove('hidden')
    messageDisplay.classList.add('hidden')
    addMessageDisplay.classList.add('hidden')
}

function showAddMessageDisplay() {
    addMessageDisplay.classList.remove('hidden')
    iconDisplay.classList.add('hidden')
    messageDisplay.classList.add('hidden')
}

function clearMessage() {
    radioButtons.forEach(button => {
        button.checked = false;
    });

    submitButton.disabled = true;
    clearButton.disabled = true;

    showIconDisplay()
}

function createMessage(type, message) {
    console.log('message type:', type);
    console.log('message:', message);
}