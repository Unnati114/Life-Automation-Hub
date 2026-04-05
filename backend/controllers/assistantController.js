const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Function to add a message to the chat window
function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    
    // Check if sender is user or assistant to apply CSS classes
    if (sender === 'User') {
        messageDiv.className = 'user-msg';
        messageDiv.innerHTML = `<strong>You:</strong> ${text}`;
    } else {
        messageDiv.className = 'assistant-msg';
        messageDiv.innerHTML = `<strong>AI:</strong> ${text}`;
    }
    
    chatBox.appendChild(messageDiv);
    
    // Auto-scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Logic to handle the "Send" action
async function handleSend() {
    const message = userInput.value.trim();
    
    if (message === "") return; // Don't send empty messages

    // 1. Show User Message
    appendMessage('User', message);
    userInput.value = ""; // Clear input field

    // 2. Show "Thinking..." placeholder
    appendMessage('Assistant', "Thinking...");

    // 3. Simulate a delay (like a real AI)
    setTimeout(() => {
        // Remove the "Thinking..." message and add a real one
        chatBox.lastChild.remove(); 
        
        // Simple logic for response (Replace this with API call later)
        let aiResponse = "That's an interesting question! I am your LETAH assistant.";
        
        if(message.toLowerCase().includes("hello")) {
            aiResponse = "Hello! How can I help you today?";
        } else if(message.toLowerCase().includes("name")) {
            aiResponse = "My name is LETAH AI.";
        }

        appendMessage('Assistant', aiResponse);
    }, 1000);
}

// Event Listeners
sendBtn.addEventListener('click', handleSend);

// Allow pressing "Enter" to send
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSend();
    }
});
