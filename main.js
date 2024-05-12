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
const cancelButton = document.getElementById('cancel');
const favoriteButton = document.querySelector('.favorite-button');
const optionsKebab = document.querySelector('.options-button');

const heartRegularIcon = document.querySelector('.heart-regular-icon');
const heartSolidIcon = document.querySelector('.heart-solid-icon');

const messageTypeSelect = document.getElementById('messageTypeSelect');
const messageTextInput = document.getElementById('messageTextInput');
const radioButtonDiv = document.querySelector('.radio-buttons');

// Data:
let messageData = {
    mantra: {
        type: "mantra",
        displayValue: "Mantra",
        messages: [
            { text: "Breathing in, I send myself love. Breathing out, I send love to someone else who needs it.", isFavorite: false },
            { text: "Don’t let yesterday take up too much of today.", isFavorite: false },
            { text: "Every day is a second chance.", isFavorite: false },
            { text: "Tell the truth and love everyone.", isFavorite: false },
            { text: "I am free from sadness.", isFavorite: false },
            { text: "I am enough.", isFavorite: false },
            { text: "In the beginning it is you, in the middle it is you and in the end it is you.", isFavorite: false },
            { text: "I love myself.", isFavorite: false },
            { text: "I am present now.", isFavorite: false },
            { text: "Inhale the future, exhale the past.", isFavorite: false },
            { text: "This too shall pass.", isFavorite: false },
            { text: "Yesterday is not today.", isFavorite: false },
            { text: "The only constant is change.", isFavorite: false },
            { text: "Onward and upward.", isFavorite: false },
            { text: "I am the sky, the rest is weather.", isFavorite: false }
        ]
    },
    affirmation: {
        type: "affirmation",
        displayValue: "Affirmation",
        messages: [
            { text: "I forgive myself and set myself free.", isFavorite: false },
            { text: "I believe I can be all that I want to be.", isFavorite: false },
            { text: "I am in the process of becoming the best version of myself.", isFavorite: false },
            { text: "I have the freedom & power to create the life I desire.", isFavorite: false },
            { text: "I choose to be kind to myself and love myself unconditionally.", isFavorite: false },
            { text: "My possibilities are endless.", isFavorite: false },
            { text: "I am worthy of my dreams.", isFavorite: false },
            { text: "I am enough.", isFavorite: false },
            { text: "I deserve to be healthy and feel good.", isFavorite: false },
            { text: "I am full of energy and vitality and my mind is calm and peaceful.", isFavorite: false },
            { text: "Every day I am getting healthier and stronger.", isFavorite: false },
            { text: "I honor my body by trusting the signals that it sends me.", isFavorite: false },
            { text: "I manifest perfect health by making smart choices.", isFavorite: false }
        ]
    },
    other: {
        type: "other",
        displayValue: "Other (Please specify)",
        messages: []
    }
};

var currentMessage;

// Event Listeners:
document.addEventListener('DOMContentLoaded', function() {
    var storedData = sessionStorage.getItem('messageData');
    if (!storedData) {
        saveData();
    }
    loadData();
    if (currentMessage) {
        showMessageDisplay()
    }
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

favoriteButton.addEventListener('click', function() {
    toggleFavorite()
});

optionsKebab.addEventListener('click', function() {
    const optionsMenu = document.querySelector('.options-menu');
    optionsMenu.classList.toggle('hidden');
})

cancelButton.addEventListener('click', function() {
    showIconDisplay()
    resetForm()
})

// Helper Functions:
function randomizeCurrentMessage(messageArray) {
    const randomIndex = Math.floor(Math.random() * messageArray.length);
    currentMessage = messageArray[randomIndex];
    saveData()
}

function showMessageDisplay() {
    messageText.innerText = currentMessage.text
    
    messageDisplay.classList.remove('hidden')
    iconDisplay.classList.add('hidden')
    addMessageDisplay.classList.add('hidden')

    displayFavorite()

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

    saveData()
    showIconDisplay()
}

function createMessage(type, typeInput, text) {   
    if (!messageData[type]) {
        messageData[type] = { type: type, displayValue: typeInput, messages: [] }
    }    
    currentMessage = {text: text, isFavorite: false}
    messageData[type].messages.push(currentMessage)
    
    saveData()
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

function displayFavorite() {
    if (currentMessage.isFavorite) {
        heartSolidIcon.classList.remove('hidden');
        heartRegularIcon.classList.add('hidden');
    } else if (!currentMessage.isFavorite) {
        heartSolidIcon.classList.add('hidden');
        heartRegularIcon.classList.remove('hidden');
    }
}

function toggleFavorite() {
    currentMessage.isFavorite = !currentMessage.isFavorite
    displayFavorite()
    saveData()
}

function saveData() {
    sessionStorage.setItem('messageData', JSON.stringify(messageData));
    if (currentMessage) {
        sessionStorage.setItem('currentMessage', JSON.stringify(currentMessage));
    }
}

function loadData() {
    var storedData = sessionStorage.getItem('messageData');
    var storedCurrentMessage = sessionStorage.getItem('currentMessage');

    if (storedData) {
        messageData = JSON.parse(storedData);
    } 

    if (storedCurrentMessage) {
        currentMessage = JSON.parse(storedCurrentMessage);
    } 
    
    if (!storedData && !storedCurrentMessage) {
        console.log('No data found in localStorage.');
    }
}