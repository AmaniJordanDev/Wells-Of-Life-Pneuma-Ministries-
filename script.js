// ============================================
// WELLS OF LIFE PNEUMA CHURCH
// Main JavaScript File
// ============================================

console.log('Church website loaded successfully');

/* ============================================
   MOBILE NAVIGATION - HAMBURGER MENU
   ============================================ */

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Make sure elements exist before adding listeners
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        console.log('Hamburger clicked'); // Debug
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
} else {
    console.log('Hamburger or navMenu not found');
}

/* ============================================
   SERMON FILTER FUNCTIONALITY
   ============================================ */

const filterButtons = document.querySelectorAll('.filter-btn');
const sermonCards = document.querySelectorAll('.sermon-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get the filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Show/hide sermon cards based on filter
            sermonCards.forEach(card => {
                if (filterValue === 'all') {
                    // Show all cards
                    card.style.display = 'flex';
                    card.classList.add('fade-in');
                } else {
                    // Get the series of the card
                    const cardSeries = card.getAttribute('data-series');
                    
                    if (cardSeries === filterValue) {
                        // Show matching cards
                        card.style.display = 'flex';
                        card.classList.add('fade-in');
                    } else {
                        // Hide non-matching cards
                        card.style.display = 'none';
                        card.classList.remove('fade-in');
                    }
                }
            });
        });
    });
}

/* ============================================
   SUBSCRIBE FORM FUNCTIONALITY
   ============================================ */

const subscribeForm = document.querySelector('.subscribe-form');

if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get the email input
        const emailInput = subscribeForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show success message
        showMessage('Thank you for subscribing! Check your email for confirmation.', 'success');
        
        // Clear the input
        emailInput.value = '';
        
        // Log the subscription
        console.log('New subscriber:', email);
    });
}

/* ============================================
   MESSAGE DISPLAY FUNCTION
   ============================================ */

function showMessage(message, type) {
    // Only show message if subscribe form exists
    if (!subscribeForm) return;
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    
    // Add styles
    messageDiv.style.cssText = `
        padding: 15px 20px;
        margin-top: 15px;
        border-radius: 6px;
        text-align: center;
        font-weight: 600;
        animation: slideDown 0.3s ease;
    `;
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#10b981';
        messageDiv.style.color = 'white';
    } else if (type === 'error') {
        messageDiv.style.backgroundColor = '#ef4444';
        messageDiv.style.color = 'white';
    }
    
    // Remove any existing messages
    const existingMessage = subscribeForm.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Add message to form
    subscribeForm.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

/* ============================================
   FADE-IN ANIMATION FOR FILTERED CARDS
   ============================================ */

const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in {
        animation: slideDown 0.3s ease;
    }
`;
document.head.appendChild(style);