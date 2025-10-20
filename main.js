// Services disponibles (plus de 10 services)
const services = [
    {
        id: 'banque_populaire',
        name: 'البنك الشعبي',
        icon: 'bi-bank',
        hours: '08:00 - 16:00',
        status: 'open',
        wait: '15 دقيقة',
        queue: 12
    },
    {
        id: 'poste',
        name: 'بريد المغرب',
        icon: 'bi-mailbox',
        hours: '08:30 - 17:00',
        status: 'busy',
        wait: '25 دقيقة',
        queue: 18
    },
    {
        id: 'prefecture',
        name: 'العمالة',
        icon: 'bi-building',
        hours: '09:00 - 15:30',
        status: 'open',
        wait: '30 دقيقة',
        queue: 15
    },
    {
        id: 'cnss',
        name: 'الصندوق الوطني',
        icon: 'bi-file-earmark-text',
        hours: '08:00 - 16:30',
        status: 'open',
        wait: '20 دقيقة',
        queue: 8
    },
    {
        id: 'cmi',
        name: 'بنك المغرب التجاري',
        icon: 'bi-credit-card',
        hours: '08:30 - 16:30',
        status: 'open',
        wait: '12 دقيقة',
        queue: 6
    },
    {
        id: 'bmce',
        name: 'بنك المغرب للتجارة الخارجية',
        icon: 'bi-building-check',
        hours: '08:00 - 16:00',
        status: 'busy',
        wait: '35 دقيقة',
        queue: 22
    },
    {
        id: 'cih',
        name: 'بنك الإسكان والتعمير',
        icon: 'bi-house-door',
        hours: '08:30 - 16:00',
        status: 'open',
        wait: '18 دقيقة',
        queue: 10
    },
    {
        id: 'barid_bank',
        name: 'بريد بنك',
        icon: 'bi-envelope-paper',
        hours: '08:00 - 17:00',
        status: 'open',
        wait: '22 دقيقة',
        queue: 14
    },
    {
        id: 'commune',
        name: 'الجماعة الحضرية',
        icon: 'bi-geo-alt',
        hours: '08:30 - 16:30',
        status: 'open',
        wait: '28 دقيقة',
        queue: 16
    },
    {
        id: 'tresorerie',
        name: 'الخزينة العامة',
        icon: 'bi-safe',
        hours: '08:00 - 15:00',
        status: 'busy',
        wait: '40 دقيقة',
        queue: 25
    },
    {
        id: 'douane',
        name: 'إدارة الجمارك',
        icon: 'bi-truck',
        hours: '08:00 - 16:00',
        status: 'open',
        wait: '45 دقيقة',
        queue: 11
    },
    {
        id: 'tribunal',
        name: 'المحكمة الابتدائية',
        icon: 'bi-journal-text',
        hours: '09:00 - 15:00',
        status: 'open',
        wait: '50 دقيقة',
        queue: 7
    },
    {
        id: 'hopital',
        name: 'المستشفى الإقليمي',
        icon: 'bi-hospital',
        hours: '24/7',
        status: 'open',
        wait: '60 دقيقة',
        queue: 35
    },
    {
        id: 'radeema',
        name: 'رادايما',
        icon: 'bi-droplet',
        hours: '08:00 - 16:00',
        status: 'closed',
        wait: 'مغلق',
        queue: 0
    }
];

let tickets = [];

document.addEventListener('DOMContentLoaded', function() {
    loadServices();
    loadTickets();
});

function loadServices() {
    const container = document.getElementById('servicesContainer');
    container.innerHTML = '';
    
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4 col-xl-3';
        
        card.innerHTML = `
            <div class="card service-card">
                <div class="card-body text-center">
                    <div class="service-icon">
                        <i class="${service.icon}"></i>
                    </div>
                    <h5 class="service-title">${service.name}</h5>
                    <p class="service-hours">
                        <i class="bi bi-clock ms-1"></i>
                        ${service.hours}
                    </p>
                    <span class="service-status status-${service.status}">
                        ${getStatusText(service.status)}
                    </span>
                    <div class="service-info">
                        <small>
                            <i class="bi bi-people ms-1"></i>
                            ${service.queue} في الطابور
                        </small>
                        <small>
                            <i class="bi bi-clock-history ms-1"></i>
                            الانتظار: ${service.wait}
                        </small>
                    </div>
                    <button class="btn btn-primary w-100" 
                            onclick="takeTicket('${service.id}')"
                            ${service.status === 'closed' ? 'disabled' : ''}>
                        <i class="bi bi-ticket-perforated ms-2"></i>
                        ${service.status === 'closed' ? 'مغلق' : 'خذ تذكرة'}
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function getStatusText(status) {
    switch(status) {
        case 'open': return 'مفتوح';
        case 'closed': return 'مغلق';
        case 'busy': return 'مزدحم';
        default: return 'مفتوح';
    }
}

function takeTicket(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (!service || service.status === 'closed') return;
    
    if (tickets.find(t => t.serviceId === serviceId)) {
        showAlert('لديك تذكرة لهذه الخدمة بالفعل!', 'warning');
        return;
    }
    
    const ticket = {
        id: 'TKT' + Date.now(),
        serviceId: serviceId,
        serviceName: service.name,
        number: Math.floor(Math.random() * 900) + 100,
        time: new Date(),
        wait: service.wait,
        position: service.queue + 1
    };
    
    tickets.push(ticket);
    service.queue++;
    
    showTicketModal(ticket);
    loadServices();
    loadTickets();
    showAlert('تم إنشاء التذكرة بنجاح!', 'success');
}

function showTicketModal(ticket) {
    const modal = new bootstrap.Modal(document.getElementById('ticketModal'));
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="text-center">
            <div class="mb-4">
                <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
            </div>
            <h4 class="mb-3">تم إنشاء التذكرة!</h4>
            <div class="ticket-preview">
                <h5 class="text-primary mb-3">تذكرة #${ticket.number}</h5>
                <p class="mb-2"><strong>الخدمة:</strong> ${ticket.serviceName}</p>
                <p class="mb-2"><strong>الترتيب:</strong> ${ticket.position} في الطابور</p>
                <p class="mb-2"><strong>الانتظار المتوقع:</strong> ${ticket.wait}</p>
                <small class="text-muted">
                    تم الإنشاء في ${ticket.time.toLocaleTimeString('ar-MA')}
                </small>
            </div>
        </div>
    `;
    
    modal.show();
}

// تحميل التذاكر
function loadTickets() {
    const container = document.getElementById('ticketsContainer');
    
    if (tickets.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-ticket-perforated"></i>
                <h4>لا توجد تذاكر</h4>
                <p class="text-muted">لم تحصل على أي تذكرة بعد. اذهب إلى الخدمات للحصول على واحدة.</p>
                <button class="btn btn-primary" onclick="scrollToSection('services')">
                    عرض الخدمات
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    tickets.forEach(ticket => {
        const ticketDiv = document.createElement('div');
        ticketDiv.className = 'ticket-card';
        
        ticketDiv.innerHTML = `
            <div class="ticket-header">
                <div class="ticket-number">
                    #${ticket.number}
                    <small>${ticket.serviceName}</small>
                </div>
                <i class="bi bi-clock-history" style="font-size: 2rem; opacity: 0.7;"></i>
            </div>
            <div class="ticket-body">
                <div class="ticket-info">
                    <div class="ticket-info-item">
                        <small>الترتيب في الطابور</small>
                        <div class="queue-position">${ticket.position}</div>
                    </div>
                    <div class="ticket-info-item">
                        <small>الانتظار المتوقع</small>
                        <strong>${ticket.wait}</strong>
                    </div>
                </div>
                <div class="ticket-actions">
                    <small class="text-muted">
                        <i class="bi bi-clock ms-1"></i>
                        ${getTimeAgo(ticket.time)}
                    </small>
                    <button class="btn btn-outline-danger btn-sm" onclick="cancelTicket('${ticket.id}')">
                        <i class="bi bi-trash ms-1"></i>
                        إلغاء
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(ticketDiv);
    });
}

function getTimeAgo(time) {
    const now = new Date();
    const diff = Math.floor((now - time) / 60000);
    
    if (diff < 1) return 'الآن';
    if (diff < 60) return `منذ ${diff} دقيقة`;
    
    const hours = Math.floor(diff / 60);
    return `منذ ${hours} ساعة`;
}

function cancelTicket(ticketId) {
    if (confirm('هل تريد إلغاء هذه التذكرة؟')) {
        tickets = tickets.filter(t => t.id !== ticketId);
        loadTickets();
        showAlert('تم إلغاء التذكرة', 'info');
    }
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

function showAlert(message, type = 'info') {
    
    const existingAlerts = document.querySelectorAll('.custom-alert');
    existingAlerts.forEach(alert => alert.remove());
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} custom-alert position-fixed`;
    alert.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);';
    
    const iconMap = {
        'success': 'bi-check-circle',
        'warning': 'bi-exclamation-triangle',
        'info': 'bi-info-circle',
        'danger': 'bi-x-circle'
    };
    
    alert.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="${iconMap[type] || iconMap.info} ms-2"></i>
            <span class="flex-grow-1">${message}</span>
            <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        if (alert.parentElement) {
            alert.style.opacity = '0';
            alert.style.transform = 'translateX(100%)';
            setTimeout(() => alert.remove(), 300);
        }
    }, 4000);
}

setInterval(() => {
    services.forEach(service => {
        if (service.status !== 'closed') {
            const change = Math.floor(Math.random() * 3) - 1; // -1, 0, أو 1
            service.queue = Math.max(0, service.queue + change);
            
            if (service.queue === 0) {
                service.wait = '5 دقائق';
            } else if (service.queue < 5) {
                service.wait = '10 دقائق';
            } else if (service.queue < 10) {
                service.wait = '20 دقيقة';
            } else if (service.queue < 15) {
                service.wait = '30 دقيقة';
            } else {
                service.wait = '45 دقيقة';
            }
            
            // تحديث الحالة بناء على حجم الطابور
            if (service.queue > 20) {
                service.status = 'busy';
            } else {
                service.status = 'open';
            }
        }
    });
    
    if (document.getElementById('services').getBoundingClientRect().top < window.innerHeight) {
        loadServices();
    }
}, 60000);

setInterval(() => {
    let updated = false;
    tickets.forEach(ticket => {
        if (ticket.position > 1 && Math.random() > 0.5) {
            ticket.position--;
            updated = true;
        }
    });
    
    if (updated) {
        loadTickets();
    }
}, 30000);
