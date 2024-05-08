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
const messageTextInput = document.getElementById('messageTextInput');

// Data:
const messageData = {
    mantra: {
        type: "mantra",
        displayValue: "Mantra",
        messages: ["Be present.", "Release resistance.", "Trust the journey.", "Stay grounded.", "Breathe deeply.", "Embrace change.", "Seek balance.", "Open your heart.", "Choose peace.", "Let go."]
    },
    affirmation: {
        type: "affirmation",
        displayValue: "Affirmation",
        messages: ["I am enough.", "I believe in my skills.", "I am worthy of happiness.", "I embrace who I am.", "I am resilient.", "I deserve success.", "I am strong and confident.", "I grow with every challenge.", "I am grateful for today.", "I radiate positive energy."]
    },
    other: {
        type: "other",
        displayValue: "Other (Please specify)",
        messages: [],
    }
};

var currentMessage;

// Event Listeners:
document.addEventListener('DOMContentLoaded', function() {
    populateMessageTypeSelect();
})

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
    if (this.value === 'other') {
        hideOtherTypeInput(false)
    } else {
        hideOtherTypeInput(true);
    }
});

addMessageForm.addEventListener('submit', function(event) {
    event.preventDefault()

    var messageTypeInput = messageTypeSelect.value;
    const [type, displayValue] = validateMessageType(messageTypeInput)
    const text = messageTextInput.value; //TODO: text = validateMessageText(text) --> Error handle if text input is '' or too long.

    createMessage(type, displayValue, text)
    resetForm(addMessageForm);
    showMessageDisplay()
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

function createMessage(type, typeInput, text) {        
    messageData[type] = { type: type, displayValue: typeInput, messages: [] }
    messageData[type].messages.push(text)
    
    currentMessage = text;
};

function validateMessageType(typeInput) {
    let displayValue;
    if (typeInput === 'other') {
        const otherInput = document.getElementById('otherType');
        displayValue = otherInput.value;
    } else {
        displayValue = typeInput;
    }

    searchType = displayValue.toLowerCase();
    for (let typeKey in messageData) {
        let messageObject = messageData[typeKey];
        if (messageObject.type === searchType) {
            return [messageObject.type, displayValue]
        }
    }
    
    return [searchType, displayValue]
    // TODO: Add error handling for typeInput === '' or too long
}

function populateMessageTypeSelect() {
    messageTypeSelect.innerHTML = '';
    Object.values(messageData).forEach(typeObj => {
        const option = document.createElement('option');
        option.value = typeObj.type;
        option.textContent = typeObj.displayValue;
        messageTypeSelect.appendChild(option);
    });
}

function resetForm() {
    addMessageForm.reset();
    hideOtherTypeInput(true);
    populateMessageTypeSelect();
}

function hideOtherTypeInput(boolean) {
    var otherTypeInput = document.getElementById('otherType');
    if (otherTypeInput && boolean === true) {
        otherTypeInput.classList.add('hidden');
    } else if (otherTypeInput && boolean === false) {
        otherTypeInput.classList.remove('hidden');
    }
}