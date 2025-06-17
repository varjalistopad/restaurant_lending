document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('bookingModal');
    const buttons = document.querySelectorAll('.cta-button');
    const closeButton = document.querySelector('.close-button');
    const bookingForm = document.getElementById('bookingForm');
    const modalTitle = document.getElementById('modalTitle');
    
    let currentEvent = '';
    
    // Open modal with event details
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            currentEvent = this.getAttribute('data-event');
            const eventName = this.parentElement.querySelector('h2').textContent;
            
            modalTitle.textContent = `Prenotazione: ${eventName}`;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const guests = document.getElementById('guests').value;
        
        // Here you would typically send data to a server
        console.log('Booking submitted:', {
            event: currentEvent,
            name: name,
            email: email,
            guests: guests
        });
        
        // Show success message
        alert(`Grazie ${name}! La tua prenotazione per ${guests} persone è stata registrata. Ti abbiamo inviato una conferma all'email ${email}`);
        
        // Reset form and close modal
        bookingForm.reset();
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Animate event cards on scroll
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});