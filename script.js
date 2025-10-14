// Navigation
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeChat();
    initializeFilters();
    animateOnScroll();
    initializePrimaChart();
});

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
        '¿Cómo puedo mejorar mi score?': '¡Excelente pregunta! 🎯 Veo que tu área de mayor oportunidad es el descanso. Te recomiendo:\n\n1. Mantén una rutina de sueño regular\n2. Desconecta dispositivos 1 hora antes de dormir\n3. Prueba nuestra meditación guiada nocturna\n\n¿Te gustaría que te programe recordatorios?',
        
        '¿Qué recompensas puedo canjear?': '🎁 ¡Tienes 1,240 puntos disponibles! Te recomiendo:\n\n• Mes gratis en gimnasio (800 puntos) - ¡Perfecto para tu objetivo fitness!\n• Consulta nutricionista (500 puntos)\n• Plan nutricional mensual (600 puntos)\n\n¿Cuál te interesa más?',
        
        '¿Qué ejercicios me recomiendas?': '🏃 Basándome en tu perfil y objetivos, te sugiero:\n\n**Esta semana:**\n- Lunes: 30 min cardio moderado\n- Miércoles: Yoga o pilates (flexibilidad)\n- Viernes: Entrenamiento de fuerza\n- Domingo: Caminata activa\n\n¿Quieres que te envíe rutinas detalladas?',
        
        '¿Cómo está mi progreso?': '📊 ¡Tu progreso es excelente! Aquí está tu resumen:\n\n✅ Score Bienvivir: 850/1000 (+12% este mes)\n✅ Racha activa: 23 días\n✅ Prima reducida: -15% (ahorras 28€/mes)\n✅ Puntos ganados: 1,240\n\n¡Sigue así! Estás en el top 10% de usuarios 🌟'
    };
    
    // Check for exact match
    if (responses[message]) {
        return responses[message];
    }
    
    // Default responses based on keywords
    if (message.toLowerCase().includes('score')) {
        return responses['¿Cómo puedo mejorar mi score?'];
    } else if (message.toLowerCase().includes('recompensa') || message.toLowerCase().includes('canje')) {
        return responses['¿Qué recompensas puedo canjear?'];
    } else if (message.toLowerCase().includes('ejercicio') || message.toLowerCase().includes('rutina')) {
        return responses['¿Qué ejercicios me recomiendas?'];
    } else if (message.toLowerCase().includes('progreso')) {
        return responses['¿Cómo está mi progreso?'];
    } else {
        return '¡Entiendo! 😊 Estoy aquí para ayudarte con:\n\n• Tu Score Bienvivir y cómo mejorarlo\n• Recomendaciones personalizadas de ejercicios y nutrición\n• Gestión de tus recompensas y puntos\n• Información sobre tu póliza y beneficios\n\n¿Sobre qué te gustaría hablar?';
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
                    status.textContent = 'Activo';
                    status.classList.remove('inactive');
                }
                
                // Show success message
                showNotification('¡Módulo añadido correctamente! 🎉');
            });
        }
    });
    
    // Add click handlers to reward cards
    const rewardCards = document.querySelectorAll('.reward-card .btn-secondary:not([disabled])');
    rewardCards.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.disabled) {
                showNotification('¡Recompensa canjeada con éxito! 🎁');
                btn.disabled = true;
                btn.textContent = 'Canjeado';
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
