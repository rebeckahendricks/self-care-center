// DOM Elements
const optionsKebab = document.querySelector(".options-button");
const cardContainer = document.querySelector(".card-container");
const isFavoritesView = window.location.href.includes("favorites.html");

var currentMessage;
let draggedElement = null;
let placeholder = document.createElement("div");
placeholder.className = "placeholder";

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  loadData();
  displayMessages();
});

cardContainer.addEventListener("dragover", handleDragOver, false);
cardContainer.addEventListener("drop", handleDrop, false);

optionsKebab.addEventListener("click", function () {
    toggleOptionsKebab();
});

// Helper Functions
function displayMessages() {
  Object.keys(messageData).forEach((type) => {
    if (type !== "other") {
      let categoryContainer = document.createElement("div");
      categoryContainer.id = `${type}-messages`;
      categoryContainer.className = "message-category";

      const categoryTitle = document.createElement("h2");
      categoryTitle.textContent = messageData[type].displayValue;

      cardContainer.appendChild(categoryTitle);
      cardContainer.appendChild(categoryContainer);

      messageData[type].messages.forEach((message, index) => {
        if (!isFavoritesView || (isFavoritesView && message.isFavorite)) {
          const card = document.createElement("div");
          card.className = "message-card";
          card.draggable = true;
          card.setAttribute("data-id", `${type}-${index}`);

          // Create Favorite Buttons
          const favoriteButton = document.createElement("button");
          favoriteButton.className = "favorite-button";
          favoriteButton.setAttribute("aria-label", "Add to favorites");
          favoriteButton.setAttribute("title", "Add to Favorites");

          favoriteButton.innerHTML = `
                        <img class="heart-regular-icon hidden" src="./assets/heart-regular.svg" alt="Unfavorited">
                        <img class="heart-solid-icon" src="./assets/heart-solid.svg" alt="Favorited">
                    `;

          updateFavoriteIcon(favoriteButton, message.isFavorite);

          favoriteButton.onclick = function () {
            toggleFavorite(type, index);
            updateFavoriteIcon(favoriteButton, message.isFavorite);
          };

          // Create Delete Buttons
          const deleteButton = document.createElement("button");
          deleteButton.className = "delete-button";
          deleteButton.setAttribute("aria-label", "Delete Message");
          deleteButton.setAttribute("title", "Delete Message");

          deleteButton.innerHTML = `<img class="trash-solid-icon" src="./assets/trash-solid.svg" alt="Delete">`

          deleteButton.onclick = function () {
            deleteMessage(message, card);
          }

          const messageText = document.createElement("p");
          messageText.className = "message-text-card";
          messageText.textContent = message.text;

          card.appendChild(favoriteButton);
          card.appendChild(deleteButton);
          card.appendChild(messageText);
          categoryContainer.appendChild(card);

          card.addEventListener("dragstart", handleDragStart, false);
          card.addEventListener("dragend", handleDragEnd, false);
        }
      });

      handleNoFavorites(categoryContainer, categoryTitle);
    }
  });
}

function handleDragStart(e) {
  this.style.opacity = "0.4";
  e.dataTransfer.setData("text/plain", this.getAttribute("data-id"));
  this.parentNode.insertBefore(placeholder, this.nextSibling);
  placeholder.style.width = `${this.offsetWidth}px`;
  placeholder.style.height = `${this.offsetHeight}px`;
}

function handleDragOver(e) {
  e.preventDefault();
  let target = e.target.closest(".message-card");
  if (target) {
    let container = target.parentNode;
    if (
      e.clientY <
      target.getBoundingClientRect().top +
        target.getBoundingClientRect().height / 2
    ) {
      container.insertBefore(placeholder, target);
    } else {
      container.insertBefore(placeholder, target.nextSibling);
    }
  }
}

function handleDragEnter(e) {
  let target = e.target.closest(".message-card");
  if (target && !target.classList.contains("dragging")) {
    let found = false;
    const cards = document.querySelectorAll(".message-card");
    cards.forEach((card) => {
      if (card === target) {
        found = true;
      }
      if (found) {
        card.classList.add("over");
      }
    });
  }
}

function handleDrop(e) {
  e.preventDefault();
  let sourceId = e.dataTransfer.getData("text/plain");
  let sourceElement = document.querySelector(`[data-id="${sourceId}"]`);
  placeholder.replaceWith(sourceElement);
  sourceElement.style.opacity = "";
}

function handleDragEnd(_e) {
  placeholder.remove();
  this.style.opacity = "";
}

function toggleOptionsKebab() {
    const optionsMenu = document.querySelector(".options-menu");
    optionsMenu.classList.toggle("hidden");
  }

function toggleFavorite(type, index) {
  const message = messageData[type].messages[index];
  message.isFavorite = !message.isFavorite;

  if (currentMessage && message.text === currentMessage.text) {
    currentMessage.isFavorite = !currentMessage.isFavorite;
  }

  saveData();
  removeUnfavorited(type, index, message);
}

function removeUnfavorited(type, index, message) {
  if (!message.isFavorite && isFavoritesView) {
    const unfavoritedCard = document.querySelector(
      `[data-id="${type}-${index}"]`
    );
    if (unfavoritedCard) {
      unfavoritedCard.remove();
    }
  }
}

function updateFavoriteIcon(button, isFavorite) {
  const regularIcon = button.querySelector(".heart-regular-icon");
  const solidIcon = button.querySelector(".heart-solid-icon");

  regularIcon.classList.toggle("hidden", isFavorite);
  solidIcon.classList.toggle("hidden", !isFavorite);
}

function handleNoFavorites(categoryContainer, categoryTitle) {
  if (categoryContainer.children.length === 0) {
    const messageElement = document.createElement("p");
    const noFavoritesMessage = `"${categoryTitle.innerText}" has no favorites.`;

    messageElement.textContent = noFavoritesMessage;
    messageElement.className = "no-favorites-message";

    categoryContainer.appendChild(messageElement);
  }
}

function deleteMessage(selectedMessage, card) {
    for (const category in messageData) {
      const messages = messageData[category].messages;
      const index = messages.findIndex(
        (message) => message.text === selectedMessage.text
      );
      if (index !== -1) {
        messages.splice(index, 1);
        console.log("Message removed:", selectedMessage);
        break;
      }
    }

    card.remove();
    saveData();
    console.log('messageData', messageData);
  }

function saveData() {
  sessionStorage.setItem("messageData", JSON.stringify(messageData));
  if (currentMessage) {
    sessionStorage.setItem("currentMessage", JSON.stringify(currentMessage));
  }
}

function loadData() {
  var storedData = sessionStorage.getItem("messageData");
  var storedCurrentMessage = sessionStorage.getItem("currentMessage");

  if (storedData) {
    messageData = JSON.parse(storedData);
  }

  if (storedCurrentMessage) {
    currentMessage = JSON.parse(storedCurrentMessage);
  }

  if (!storedData && !storedCurrentMessage) {
    console.log("No data found in sessionStorage.");
  }
}
