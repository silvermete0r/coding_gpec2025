// Image paths configuration
const IMAGES = {
    destinations: {
        'orbital-hotel': '/static/imgs/artemis.png',
        'lunar-colony': '/static/imgs/lunar.png',
        'mars-base': '/static/imgs/mars.png'
    },
    ai: '/static/imgs/ai-assistant.jpg',
    logo: '/static/imgs/logo.png'
};

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const modalCloseButtons = document.querySelectorAll('.modal-close');
const showSignupBtn = document.getElementById('show-signup');
const showLoginBtn = document.getElementById('show-login');
const bookingForm = document.getElementById('booking-form');
const bookingModal = document.getElementById('booking-modal');
const confirmationModal = document.getElementById('confirmation-modal');
const closeConfirmation = document.getElementById('close-confirmation');
const confirmBookingBtn = document.getElementById('confirm-booking');
const bookNowBtn = document.getElementById('bookNowBtn');

// Modal Handling
function toggleModal(modal) {
    if (modal) {
        modal.classList.toggle('active');
    }
}

// Initialize modals
if (loginBtn) loginBtn.addEventListener('click', () => toggleModal(loginModal));
if (modalCloseButtons) {
    modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) modal.classList.remove('active');
        });
    });
}

if (showSignupBtn) {
    showSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (loginModal) loginModal.classList.remove('active');
        if (signupModal) signupModal.classList.add('active');
    });
}

if (showLoginBtn) {
    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (signupModal) signupModal.classList.remove('active');
        if (loginModal) loginModal.classList.add('active');
    });
}

// Countdown Timer
function updateCountdown(element) {
    const launchDate = new Date(element.dataset.launch);
    const now = new Date();
    const diff = launchDate - now;

    if (diff <= 0) {
        element.innerHTML = '<div class="text-neon-blue">Launched!</div>';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    element.querySelector('.days').textContent = String(days).padStart(2, '0');
    element.querySelector('.hours').textContent = String(hours).padStart(2, '0');
    element.querySelector('.minutes').textContent = String(minutes).padStart(2, '0');
    element.querySelector('.seconds').textContent = String(seconds).padStart(2, '0');
    
    element.querySelectorAll('.countdown-value').forEach(value => {
        if (value.textContent !== value.dataset.previous) {
            value.classList.add('countdown-update');
            setTimeout(() => value.classList.remove('countdown-update'), 300);
            value.dataset.previous = value.textContent;
        }
    });
}

document.querySelectorAll('.countdown-timer').forEach(timer => {
    setInterval(() => updateCountdown(timer), 1000);
    updateCountdown(timer);
});

// Booking Form Handling
if (bookingForm) {
    // Helper functions for pricing and information
    function getDestinationName(destinationValue) {
        const destinations = {
            'orbital-luxury': 'Orbital Hotel Artemis',
            'lunar-resort': 'Lunar Colony Alpha',
            'mars-base': 'Mars Base One'
        };
        return destinations[destinationValue] || destinationValue;
    }

    function getClassName(classValue) {
        const classes = {
            'economy': 'Economy Shuttle',
            'business': 'Business Class',
            'luxury': 'Luxury Cabin',
            'vip': 'VIP Zero-G Suite'
        };
        return classes[classValue] || classValue;
    }

    function getAccommodationName(accommodationValue) {
        const accommodations = {
            'standard': 'Standard Pod',
            'premium': 'Premium Suite',
            'deluxe': 'Deluxe Observatory'
        };
        return accommodations[accommodationValue] || accommodationValue;
    }

    function getBasePrice(destination) {
        const prices = {
            'orbital-luxury': 250000,
            'lunar-resort': 450000,
            'mars-base': 1200000
        };
        return prices[destination] || 0;
    }

    function getClassMultiplier(travelClass) {
        const multipliers = {
            'economy': 1,
            'business': 1.5,
            'luxury': 2,
            'vip': 3
        };
        return multipliers[travelClass] || 1;
    }

    function getAccommodationSurcharge(accommodation) {
        const surcharges = {
            'standard': 0,
            'premium': 50000,
            'deluxe': 120000
        };
        return surcharges[accommodation] || 0;
    }

    function getSeatsAvailable(destination) {
        const seats = {
            'orbital-luxury': 24,
            'lunar-resort': 16,
            'mars-base': 8
        };
        return seats[destination] || 0;
    }

    // Generate a random booking reference
    function generateBookingReference() {
        const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    // Update booking summary in real-time
    function updateBookingSummary() {
        const form = bookingForm;
        const destination = form.destination.value;
        const travelClass = form.travelClass.value;
        const travelers = parseInt(form.travelers.value) || 1;
        const departureDate = form.departureDate.value;
        const returnDate = form.returnDate.value;
        const accommodation = form.accommodation.value;
        
        // Update summary displays
        document.getElementById('summary-destination').textContent = destination ? 
            getDestinationName(destination) : '--';
        document.getElementById('summary-departure').textContent = departureDate || '--';
        document.getElementById('summary-return').textContent = returnDate || '--';
        document.getElementById('summary-class').textContent = travelClass ? 
            getClassName(travelClass) : '--';
        document.getElementById('summary-accommodation').textContent = accommodation ? 
            getAccommodationName(accommodation) : '--';
        document.getElementById('summary-travelers').textContent = travelers;
        
        // Calculate price
        const basePrice = getBasePrice(destination);
        const classMultiplier = getClassMultiplier(travelClass);
        const accommodationSurcharge = getAccommodationSurcharge(accommodation);
        
        const totalPrice = basePrice * classMultiplier * travelers + accommodationSurcharge;
        document.getElementById('summary-price').textContent = totalPrice ? 
            `$${totalPrice.toLocaleString()}` : '--';
        
        // Show seats availability
        const seatsAvailable = getSeatsAvailable(destination);
        document.getElementById('seats-available').textContent = seatsAvailable ? 
            `${seatsAvailable} seats available` : '--';
        
        return totalPrice;
    }

    // Form submission handler
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            fullName: bookingForm.fullName.value,
            email: bookingForm.email.value,
            phone: bookingForm.phone.value,
            nationality: bookingForm.nationality.value,
            departureDate: bookingForm.departureDate.value,
            returnDate: bookingForm.returnDate.value,
            destination: bookingForm.destination.value,
            travelers: bookingForm.travelers.value,
            travelClass: bookingForm.travelClass.value,
            accommodation: bookingForm.accommodation.value
        };
        
        try {
            // In a real app, this would send the data to the server
            // For demonstration purposes, we'll simulate a successful booking
            
            // Generate booking reference
            const bookingReference = generateBookingReference();
            
            // Update confirmation modal with booking details
            document.getElementById('booking-reference').textContent = bookingReference;
            document.getElementById('confirm-destination').textContent = getDestinationName(formData.destination);
            document.getElementById('confirm-departure').textContent = formData.departureDate;
            
            const totalPrice = updateBookingSummary();
            document.getElementById('confirm-price').textContent = `$${totalPrice.toLocaleString()}`;
            
            // Hide booking modal, show confirmation modal
            bookingModal.classList.remove('active');
            confirmationModal.classList.add('active');
            
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('There was an error processing your booking. Please try again.');
        }
    });

    // Form input event listeners to update summary in real-time
    bookingForm.destination.addEventListener('change', updateBookingSummary);
    bookingForm.departureDate.addEventListener('change', updateBookingSummary);
    bookingForm.returnDate.addEventListener('change', updateBookingSummary);
    bookingForm.travelers.addEventListener('input', updateBookingSummary);
    bookingForm.travelClass.addEventListener('change', updateBookingSummary);
    bookingForm.accommodation.addEventListener('change', updateBookingSummary);
}

// Close confirmation modal
if (closeConfirmation) {
    closeConfirmation.addEventListener('click', () => {
        confirmationModal.classList.remove('active');
    });
}

// Show booking modal when "Book Now" is clicked
if (bookNowBtn) {
    bookNowBtn.addEventListener('click', () => {
        bookingModal.classList.add('active');
    });
}

// Also trigger booking modal from launch cards and package buttons
document.querySelectorAll('.launch-card button, .package-footer button').forEach(btn => {
    btn.addEventListener('click', () => {
        bookingModal.classList.add('active');
        
        // If from a specific destination, pre-select it
        const launchCard = btn.closest('.launch-card');
        if (launchCard) {
            const destination = launchCard.querySelector('.launch-destination').textContent;
            if (destination.includes('Orbital Hotel')) {
                bookingForm.destination.value = 'orbital-luxury';
                updateBookingSummary();
            } else if (destination.includes('Lunar Colony')) {
                bookingForm.destination.value = 'lunar-resort';
                updateBookingSummary();
            } else if (destination.includes('Mars Base')) {
                bookingForm.destination.value = 'mars-base';
                updateBookingSummary();
            }
        }
        
        // If from a package card, pre-select the class
        const packageCard = btn.closest('.package-card');
        if (packageCard) {
            const packageTitle = packageCard.querySelector('.package-header h3').textContent;
            if (packageTitle.includes('Economy')) {
                bookingForm.travelClass.value = 'economy';
                updateBookingSummary();
            } else if (packageTitle.includes('Business')) {
                bookingForm.travelClass.value = 'business';
                updateBookingSummary();
            } else if (packageTitle.includes('VIP')) {
                bookingForm.travelClass.value = 'vip';
                updateBookingSummary();
            }
        }
    });
});

// Enhanced AI Chat Functionality
const chatMessages = document.getElementById('aiChatMessages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const suggestedQuestionsContainer = document.querySelector('.suggested-questions');

// List of suggested questions
const suggestedQuestions = [
    "What destinations do you offer?",
    "How much does a trip to the Orbital Hotel cost?",
    "What's included in the VIP package?",
    "How long is the training program?",
    "Is space travel safe?",
    "What are the health requirements?",
    "Can children travel to space?",
    "What's the best time to visit Mars?"
];

// Add a message to the chat
function addMessage(message, isUser = false) {
    const avatar = isUser ? 
        '<div class="chat-avatar"><i class="fas fa-user text-sm"></i></div>' : 
        '<div class="chat-avatar"><i class="fas fa-robot text-sm"></i></div>';
    
    const html = `
        <div class="chat-message ${isUser ? 'user' : 'ai'}">
            ${!isUser ? avatar : ''}
            <div class="chat-bubble">${message}</div>
            ${isUser ? avatar : ''}
        </div>
    `;
    
    chatMessages.insertAdjacentHTML('beforeend', html);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const html = `
        <div class="chat-message ai typing-message">
            <div class="chat-avatar"><i class="fas fa-robot text-sm"></i></div>
            <div class="chat-bubble">
                <div class="typing-indicator-container">
                    <span class="typing-indicator"></span>
                    <span class="typing-indicator"></span>
                    <span class="typing-indicator"></span>
                </div>
            </div>
        </div>
    `;
    
    chatMessages.insertAdjacentHTML('beforeend', html);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingMessage = chatMessages.querySelector('.typing-message');
    if (typingMessage) {
        typingMessage.remove();
    }
}

// Add suggested questions
function addSuggestedQuestions() {
    if (!suggestedQuestionsContainer) return;
    suggestedQuestionsContainer.innerHTML = '';
    
    // Take 5 random questions from the list
    const randomQuestions = [...suggestedQuestions]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
    
    randomQuestions.forEach(question => {
        const button = document.createElement('button');
        button.className = 'suggested-question glass-btn text-sm py-2 px-3 mb-2';
        button.textContent = question;
        button.addEventListener('click', () => {
            sendMessage(question);
        });
        
        suggestedQuestionsContainer.appendChild(button);
    });
}

// Send message to the AI
async function sendMessage(message) {
    if (!message.trim() || !chatMessages) return;
    
    // Add user message to chat
    addMessage(message, true);
    
    // Clear input
    if (chatInput) chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Send to backend
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        
        const data = await response.json();
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Add AI response
        if (data.status === 'success') {
            addMessage(data.response);
            
            // Refresh suggested questions after AI response
            addSuggestedQuestions();
        } else {
            addMessage("I'm sorry, but I'm having trouble processing your request. Please try again in a moment.");
        }
    } catch (error) {
        console.error('Error sending message:', error);
        removeTypingIndicator();
        addMessage("I apologize, but I'm currently unable to connect to my knowledge base. Please try again later.");
    }
}

// Initialize chat
function initializeChat() {
    if (!chatMessages) return;
    
    // Clear existing messages
    chatMessages.innerHTML = '';
    
    // Add welcome message
    addMessage("Hello! I'm NOVA, your personal space travel assistant. How can I help you plan your journey to the stars today?");
    
    // Add suggested questions
    addSuggestedQuestions();
    
    // Set up event listener for form submission
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (chatInput && chatInput.value.trim()) {
                sendMessage(chatInput.value.trim());
            }
        });
    }
    
    // Enable enter key to send
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (chatForm) chatForm.dispatchEvent(new Event('submit'));
            }
        });
    }
}

// Floating planets parallax effect
function handleParallax() {
    const planets = document.querySelectorAll('.floating-planet');
    if (planets.length === 0) return;
    
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        planets.forEach((planet, index) => {
            const speed = index + 1;
            const x = (clientX - centerX) * speed * 0.005;
            const y = (clientY - centerY) * speed * 0.005;
            planet.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Smooth scroll handling
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (!element) return;
    
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Update navigation active state
function updateNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Main initialization on document load
document.addEventListener('DOMContentLoaded', () => {
    // Set favicon
    if (!document.querySelector('link[rel="icon"]')) {
        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.href = IMAGES.logo;
        document.head.appendChild(favicon);
    }

    // Set logo images
    document.querySelectorAll('.logo img').forEach(img => {
        img.src = IMAGES.logo;
    });

    // Set destination images
    document.querySelectorAll('.destination-card').forEach(card => {
        const destId = card.dataset.destination;
        const imgElement = card.querySelector('.destination-img img');
        if (imgElement && IMAGES.destinations[destId]) {
            imgElement.src = IMAGES.destinations[destId];
        }
    });

    // Set AI assistant image
    const aiImage = document.querySelector('#ai-assistant-img');
    if (aiImage) {
        aiImage.src = IMAGES.ai;
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && document.querySelector(href)) {
                smoothScroll(href);
            }
        });
    });

    // Show destination section when "Explore Destinations" is clicked
    const exploreDestsBtn = document.getElementById('exploreDests');
    if (exploreDestsBtn) {
        exploreDestsBtn.addEventListener('click', () => {
            smoothScroll('#destinations');
        });
    }

    // Initialize parallax effect
    handleParallax();

    // Initialize navigation
    updateNavigation();
    
    // Initialize chat functionality
    initializeChat();
});