// Navigation
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeChat();
    initializeFilters();
    animateOnScroll();
    initializePrimaChart();
});

// Toggle mobile menu
function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('mobile-open');
}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Show corresponding section
            const sectionId = link.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
            
            // Close mobile menu if open
            const nav = document.getElementById('mainNav');
            if (nav.classList.contains('mobile-open')) {
                nav.classList.remove('mobile-open');
            }
        });
    });
}

// Chat functionality
let chatMessages = [];

function initializeChat() {
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('keypress', handleKeyPress);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        
        // Simulate IA response
        setTimeout(() => {
            const response = generateAureaResponse(message);
            addMessage(response, 'aurea');
        }, 1000);
    }
}

function sendQuickMessage(message) {
    const input = document.getElementById('messageInput');
    input.value = message;
    sendMessage();
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    const avatarSmall = document.createElement('div');
    avatarSmall.className = `avatar-small ${sender}`;
    avatarSmall.textContent = sender === 'aurea' ? 'Á' : 'JL';
    avatarDiv.appendChild(avatarSmall);
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    const p = document.createElement('p');
    p.textContent = text;
    contentDiv.appendChild(p);
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateAureaResponse(message) {
    const responses = {
        'How can I improve my score?': '🎯 Excellent question! I see your biggest opportunity area is rest. I recommend:\n\n1. Maintain a regular sleep routine\n2. Disconnect devices 1 hour before bed\n3. Try our guided nighttime meditation\n\nWould you like me to schedule reminders for you?',
        
        'What rewards can I redeem?': '🎁 You have 1,240 points available! I recommend:\n\n• Free month at gym (800 points) - Perfect for your fitness goal!\n• Nutritionist consultation (500 points)\n• Monthly nutrition plan (600 points)\n\nWhich one interests you most?',
        
        'What exercises do you recommend?': '🏃 Based on your profile and goals, I suggest:\n\n**This week:**\n- Monday: 30 min moderate cardio\n- Wednesday: Yoga or pilates (flexibility)\n- Friday: Strength training\n- Sunday: Active walk\n\nWould you like me to send you detailed routines?',
        
        'How is my progress?': '📊 Your progress is excellent! Here\'s your summary:\n\n✅ Bienvivir Score: 850/1000 (+12% this month)\n✅ Active streak: 23 days\n✅ Reduced premium: -15% (saving €28/month)\n✅ Points earned: 1,240\n\nKeep it up! You\'re in the top 10% of users 🌟'
    };
    
    // Check for exact match
    if (responses[message]) {
        return responses[message];
    }
    
    // Default responses based on keywords
    if (message.toLowerCase().includes('score')) {
        return responses['How can I improve my score?'];
    } else if (message.toLowerCase().includes('reward') || message.toLowerCase().includes('redeem')) {
        return responses['What rewards can I redeem?'];
    } else if (message.toLowerCase().includes('exercise') || message.toLowerCase().includes('routine')) {
        return responses['What exercises do you recommend?'];
    } else if (message.toLowerCase().includes('progress')) {
        return responses['How is my progress?'];
    } else {
        return 'I understand! 😊 I\'m here to help you with:\n\n• Your Bienvivir Score and how to improve it\n• Personalized exercise and nutrition recommendations\n• Managing your rewards and points\n• Information about your policy and benefits\n\nWhat would you like to talk about?';
    }
}

function clearChat() {
    const messagesContainer = document.getElementById('chatMessages');
    const initialMessage = messagesContainer.querySelector('.message');
    messagesContainer.innerHTML = '';
    if (initialMessage) {
        messagesContainer.appendChild(initialMessage);
    }
}

function openAurea() {
    const aureaLink = document.querySelector('.nav-link[data-section="aurea"]');
    if (aureaLink) {
        aureaLink.click();
    }
}

// Marketplace filters
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const rewardCards = document.querySelectorAll('.reward-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Filter cards
            const filter = btn.getAttribute('data-filter');
            
            rewardCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize Prima Chart
function initializePrimaChart() {
    const canvas = document.getElementById('primaChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = 300;
    
    // Data: Prima mensual de los últimos 6 meses
    const data = [105, 102, 98, 95, 92, 89];
    const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
    
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Calculate scales
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const valueRange = maxValue - minValue;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw grid lines
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        // Draw value labels
        const value = Math.round(maxValue - (valueRange / 5) * i);
        ctx.fillStyle = '#6B7280';
        ctx.font = '12px Inter';
        ctx.textAlign = 'right';
        ctx.fillText(value + '€', padding - 10, y + 4);
    }
    
    // Draw line
    ctx.strokeStyle = '#D2001B';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Create gradient fill
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(210, 0, 27, 0.2)');
    gradient.addColorStop(1, 'rgba(210, 0, 27, 0)');
    
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = height - padding - ((value - minValue) / valueRange) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Fill area under line
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw points
    data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        const y = height - padding - ((value - minValue) / valueRange) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#D2001B';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw labels
        ctx.fillStyle = '#6B7280';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(labels[index], x, height - padding + 20);
    });
}

// Score animation
function animateScore() {
    const scoreCircle = document.querySelector('.progress-ring-circle');
    if (!scoreCircle) return;
    
    const score = 850;
    const maxScore = 1000;
    const percentage = score / maxScore;
    const circumference = 2 * Math.PI * 90;
    const offset = circumference * (1 - percentage);
    
    scoreCircle.style.strokeDashoffset = offset;
}

// Initialize animations
setTimeout(() => {
    animateScore();
}, 500);

// Interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
        });
    });
    
    // Animate progress bars on load
    setTimeout(() => {
        const progressBars = document.querySelectorAll('.score-bar-fill');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }, 300);
    
    // Add click handlers to module cards
    const moduleCards = document.querySelectorAll('.module-card:not(.active)');
    moduleCards.forEach(card => {
        const addBtn = card.querySelector('.btn-add');
        if (addBtn) {
            addBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.add('active');
                addBtn.remove();
                const status = card.querySelector('.module-status');
                if (status) {
                    status.textContent = 'Active';
                    status.classList.remove('inactive');
                }
                
                // Show success message
                showNotification('Module successfully added! 🎉');
            });
        }
    });
    
    // Add click handlers to reward cards
    const rewardCards = document.querySelectorAll('.reward-card .btn-secondary:not([disabled])');
    rewardCards.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.disabled) {
                showNotification('Reward successfully redeemed! 🎁');
                btn.disabled = true;
                btn.textContent = 'Redeemed';
            }
        });
    });
});

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: linear-gradient(135deg, #D2001B 0%, #7D1128 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(210, 0, 27, 0.35);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Resize handler for chart
window.addEventListener('resize', () => {
    initializePrimaChart();
});

// Log to console for demo purposes
console.log('%c🎉 MAPFRE Bienvivir 360 - Prototipo MVP', 'color: #D2001B; font-size: 20px; font-weight: bold;');
console.log('%cDe asegurarte cuando caes, a acompañarte para que vivas mejor', 'color: #7D1128; font-size: 14px;');
