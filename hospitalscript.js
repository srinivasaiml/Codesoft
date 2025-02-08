const chatMessages = document.querySelector('.chat__messages');
const userInput = document.querySelector('.chat__input input');
const sendBtn = document.querySelector('.chat__send');

async function sendMessage() {
    let userInputText = userInput.value.trim();
    if (!userInputText) return;

    appendMessage(userInputText, "user-message", "https://res.cloudinary.com/dddwl6off/image/upload/v1738606598/userpng_rbe0bb.png");
    const typingIndicator = createTypingIndicator();
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        let response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInputText })
        });

        let data = await response.json();
        chatMessages.removeChild(typingIndicator);

        if (data.response === "redirect") {
            window.location.href = "appointment.html";  // Redirect to the appointment page
        } else {
            appendMessage(data.response, "bot-message", "https://res.cloudinary.com/dddwl6off/image/upload/v1738606598/botpng_wh3m6f.png");
        }
    } catch (error) {
        console.error("Error:", error);
        chatMessages.removeChild(typingIndicator);
        appendMessage("Oops! Something went wrong. Please try again.", "bot-message", "https://res.cloudinary.com/dddwl6off/image/upload/v1738606598/botpng_wh3m6f.png");
    }

    userInput.value = "";
}

function createTypingIndicator() {
    const container = document.createElement('div');
    container.className = 'message bot-message';

    const wrapper = document.createElement('div');
    wrapper.className = 'typing-indicator';

    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot';
        dot.style.animationDelay = `${i * 0.2}s`;
        wrapper.appendChild(dot);
    }

    container.innerHTML = `
        <img src="https://res.cloudinary.com/dddwl6off/image/upload/v1738606598/botpng_wh3m6f.png" 
             class="message-icon" 
             alt="Bot icon">
    `;
    container.appendChild(wrapper);
    return container;
}
function appendMessage(message, className, icon) {
    const chatBox = document.getElementById("chat-messages");
    
    if (!chatBox) {
        console.error("Error: chat-messages element not found!");
        return;
    }

    const messageContainer = document.createElement("div");
    messageContainer.className = `message ${className}`;

    messageContainer.innerHTML = `
        <img src="${icon}" class="message-icon" alt="${className === 'bot-message' ? 'Bot' : 'User'} icon">
        <div class="message-bubble">${message}</div>
    `;

    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
