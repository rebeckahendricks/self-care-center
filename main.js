// DOM elements:
const messageText = document.querySelector('.message-text');

const messageDisplay = document.getElementById('message-display');
const iconDisplay = document.getElementById('icon-display');
const addMessageDisplay = document.getElementById('add-message-display');

const messageTypeForm = document.getElementById('message-type-form');
const addMessageForm = document.getElementById('add-message-form')

let radioButtons = document.querySelectorAll('input[name="message-type"]');
const submitButton = document.getElementById('submitButton');
const clearButton = document.getElementById('clearButton');
const addMessageButton = document.getElementById('addMessageButton');

const messageTypeSelect = document.getElementById('messageTypeSelect');
const messageTextInput = document.getElementById('messageTextInput');
const radioButtonDiv = document.querySelector('.radio-buttons');

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
    populateRadioButtons();
})

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
    const text = messageTextInput.value;

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
    radioButtons = document.querySelectorAll('input[name="message-type"]');
    radioButtons.forEach(button => {
        button.checked = false;
    });

    submitButton.disabled = true;
    clearButton.disabled = true;

    showIconDisplay()
}

function createMessage(type, typeInput, text) {   
    if (!messageData[type]) {
        messageData[type] = { type: type, displayValue: typeInput, messages: [] }
    }    
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

function populateRadioButtons() {
    radioButtonDiv.innerHTML = '';
    Object.values(messageData).forEach(typeObj => {
        if (typeObj.type !== 'other') {
            const label = document.createElement('label');
            label.htmlFor = typeObj.type;
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.id = typeObj.type;
            input.name = 'message-type'
            input.value = typeObj.type;
    
            label.appendChild(input);
    
            const text = document.createTextNode(typeObj.type);
            label.appendChild(text);
    
            radioButtonDiv.appendChild(label);
        }
    });
    radioButtons = document.querySelectorAll('input[name="message-type"]');
    radioButtons.forEach(button => {
        button.addEventListener('change', function() {
            if (this.checked) {
                submitButton.disabled = false;
            }
        });
    });
}

function resetForm() {
    addMessageForm.reset();
    hideOtherTypeInput(true);
    populateMessageTypeSelect();
    populateRadioButtons();
}

function hideOtherTypeInput(boolean) {
    var otherTypeInput = document.getElementById('otherType');
    if (otherTypeInput && boolean === true) {
        otherTypeInput.classList.add('hidden');
        otherTypeInput.required = false;
    } else if (otherTypeInput && boolean === false) {
        otherTypeInput.classList.remove('hidden');
        otherTypeInput.required = true;
    }
}