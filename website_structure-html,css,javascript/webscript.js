// Hamburger Menu
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

hamburger.onclick = () => {
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
};

// Skill Animation
const skills = document.querySelectorAll(".progress div");

const animateSkills = () => {
    skills.forEach(skill => {
        skill.style.width = skill.getAttribute("data-width") + "%";
    });
};

window.addEventListener("scroll", () => {
    const section = document.getElementById("skills");
    if (section.getBoundingClientRect().top < window.innerHeight) {
        animateSkills();
    }
});

// Contact Form Validation
document.getElementById("contactForm").addEventListener("submit", e => {
    e.preventDefault();
    alert("Thank you! Your message has been submitted.");
});
const chatbotButton = document.getElementById('chatbot-button');
const chatbotWindow = document.getElementById('chatbot-window');
const closeChat = document.getElementById('close-chat');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendMessage = document.getElementById('send-message');

const chatResponses = {
    services: "We offer Web Development, Mobile Apps, Cloud Solutions, UI/UX Design, Cybersecurity, and Consulting services.",
    contact: "Reach us at info@sculptortechpvtltd.com or call +91 XXXXX XXXXX. Our office is in Pune!",
    about: "SculptorTech helps SMEs achieve revenue goals through modern technology and business solutions.",
    web: "We build custom websites, e-commerce platforms, and PWAs using modern frameworks.",
    mobile: "We create native iOS/Android apps and cross-platform solutions using React Native and Flutter.",
    cloud: "Our cloud solutions include AWS/Azure deployment and DevOps automation.",
    pricing: "Pricing varies by project. Contact us for a custom quote!",
    default: "I'm here to help! Ask about our services, pricing, or contact info."
};

function addMessage(text, isBot = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isBot ? 'bot-message' : 'user-message'}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addQuickReplies() {
    const repliesDiv = document.createElement('div');
    repliesDiv.className = 'quick-replies';
    const replies = [
        { text: '💼 Services', key: 'services' },
        { text: '📞 Contact', key: 'contact' },
        { text: 'ℹ️ About', key: 'about' },
        { text: '💰 Pricing', key: 'pricing' }
    ];
    replies.forEach(reply => {
        const btn = document.createElement('button');
        btn.className = 'quick-reply-btn';
        btn.textContent = reply.text;
        btn.onclick = () => {
            addMessage(reply.text, false);
            setTimeout(() => {
                addMessage(chatResponses[reply.key]);
            }, 500);
            repliesDiv.remove();
        };
        repliesDiv.appendChild(btn);
    });
    chatMessages.appendChild(repliesDiv);
}

chatbotButton.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
    if (chatMessages.children.length === 0) {
        setTimeout(() => {
            addMessage("Hello 👋 I'm your Tech Assistant. How can I help you today?");
            addQuickReplies();
        }, 300);
    }
});

closeChat.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
});

function handleUserMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    addMessage(message, false);
    chatInput.value = '';

    setTimeout(() => {
        const lower = message.toLowerCase();
        let response = chatResponses.default;
        if (lower.includes('servic')) response = chatResponses.services;
        else if (lower.includes('contact') || lower.includes('email')) response = chatResponses.contact;
        else if (lower.includes('web')) response = chatResponses.web;
        else if (lower.includes('price') || lower.includes('cost')) response = chatResponses.pricing;

        addMessage(response);
    }, 600);
}

sendMessage.addEventListener('click', handleUserMessage);
chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleUserMessage(); });
