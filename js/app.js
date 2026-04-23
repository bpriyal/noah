document.addEventListener("DOMContentLoaded", () => {
    const chatHistory = document.getElementById("chat-history");
    const queryInput = document.getElementById("query-input");
    const sendBtn = document.getElementById("send-btn");

    // LLM System Architecture Prompt for Noah
    const systemPrompt = `
        You are Noah, the executive AI assistant and admin representative for Priyal Bhagwanani. 
        Your directive is strictly professional: synthesize and present information regarding Priyal's resume, GitHub projects, research papers, and explicit rules/additional info.
        Constraints:
        1. Refuse any personal questions politely but firmly.
        2. Adopt the tone of a high-end, luxury MBA sales presentation, calibrated precisely for software development and scientific mathematics. 
        3. Responses must be welcoming, extremely succinct, present-minded, and highlight her valid works dynamically.
    `;

    // Initialize conversation state
    let conversationState = [
        { role: "system", content: systemPrompt }
    ];

    // Initial greeting from Noah demonstrating the required persona
    const initialGreeting = "Welcome. I am Noah, the executive assistant to Priyal Bhagwanani. I am prepared to present her portfolio encompassing scientific mathematics, rigorous software engineering, and published research. How may I direct your inquiry today?";
    
    setTimeout(() => {
        appendMessage('noah', initialGreeting);
        conversationState.push({ role: "assistant", content: initialGreeting });
    }, 500);

    // Event Listeners
    sendBtn.addEventListener("click", handleUserSubmission);
    queryInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleUserSubmission();
    });

    function handleUserSubmission() {
        const text = queryInput.value.trim();
        if (!text) return;

        appendMessage('user', text);
        queryInput.value = '';
        conversationState.push({ role: "user", content: text });

        // Generate loading state for UI psychological feedback
        const loadingId = appendMessage('noah', 'Analyzing domain architectures...');

        // In a production environment, this is where you map to an API endpoint
        // reading from your "resume", "github_work", "research_papers", etc., folders.
        simulateLLMResponse(loadingId, text);
    }

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.id = 'msg-' + Date.now() + Math.floor(Math.random() * 1000);
        msgDiv.innerText = text;
        
        chatHistory.appendChild(msgDiv);
        
        // Auto-scroll to maintain present-minded UX
        chatHistory.scrollTop = chatHistory.scrollHeight;
        return msgDiv.id;
    }

    function updateMessage(id, newText) {
        const msgElement = document.getElementById(id);
        if (msgElement) {
            msgElement.innerText = newText;
        }
    }

    // Simulated response to demonstrate the UI behavior prior to API integration
    function simulateLLMResponse(loadingId, userText) {
        setTimeout(() => {
            let responseText = "Thank you. Priyal's work in that domain exhibits an exceptional fusion of mathematical precision and scalable software architecture. I am retrieving the exact metrics from her GitHub repositories and research papers to present to you shortly.";
            
            // Handle the 'no personal questions' rule [2]
            if(userText.toLowerCase().includes("personal") || userText.toLowerCase().includes("age") || userText.toLowerCase().includes("live")) {
                responseText = "I must respectfully decline. My purpose as Priyal's executive assistant is strictly professional, focusing exclusively on her software development and mathematical research portfolio.";
            }

            updateMessage(loadingId, responseText);
            conversationState.push({ role: "assistant", content: responseText });
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }, 1500); // 1.5s delay mimics processing time, adding to the psychological weight of the AI
    }
});
