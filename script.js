document.addEventListener('DOMContentLoaded', function() {
    // Language translations
    const translations = {
        it: {
            "main_title": "Eventi Gastronomici",
            "subtitle": "Scopri i migliori eventi della stagione",
            "event1_title": "Festival della Cucina Creativa",
            "event1_period": "Per 3 settimane",
            "event1_desc": "Chef stellati presenteranno piatti innovativi che rivoluzioneranno la tua concezione del gusto.",
            "event1_location": "📍 Via Roma, 15",
            "event1_time": "🕒 19:00-23:00",
            "event2_title": "Festa della Pizza Napoletana",
            "event2_period": "Quest'estate",
            "event2_desc": "Autentica pizza napoletana cotta in forni a legna da maestri pizzaioli certificati.",
            "event2_location": "📍 Via Dante, 72",
            "event2_time": "🕒 18:00-24:00",
            "event3_title": "Degustazione Vini Toscani",
            "event3_period": "Quest'autunno",
            "event3_desc": "I migliori vini della Toscana selezionati dall'enologo Marco Rossi.",
            "event3_location": "📍 Via Milano, 8",
            "event3_time": "🕒 20:00-22:30",
            "book_button": "Prenota Posto",
            "contacts_title": "Contatti",
            "language_title": "Lingua",
            "current_lang": "Italiano",
            "follow_title": "Seguici",
            "instagram": "Instagram",
            "facebook": "Facebook",
            "copyright": "© 2023 Eventi Gastronomici. Tutti i diritti riservati.",
            "form_name": "Nome Completo",
            "form_email": "Email",
            "form_date": "Seleziona Data",
            "form_guests": "Numero di Persone",
            "guest1": "1 persona",
            "guest2": "2 persone",
            "guest3": "3 persone",
            "guest4": "4 persone",
            "guest5": "5+ persone",
            "form_submit": "Conferma Prenotazione",
            "contact_popup_title": "Contattaci",
            "contact_popup_text": "Per ulteriori informazioni, chiamaci o inviaci un'email:",
            "phone_label": "Telefono:",
            "email_label": "Email:",
            "social_popup_title": "Seguici sui Social",
            "social_popup_text": "Resta aggiornato sui nostri eventi:",
            "close_button": "Chiudi"
        },
        en: {
            "main_title": "Gastronomic Events",
            "subtitle": "Discover the best events of the season",
            "event1_title": "Creative Cuisine Festival",
            "event1_period": "For 3 weeks",
            "event1_desc": "Michelin-starred chefs will present innovative dishes that will revolutionize your taste perception.",
            "event1_location": "📍 Via Roma, 15",
            "event1_time": "🕒 7:00-11:00 PM",
            "event2_title": "Neapolitan Pizza Festival",
            "event2_period": "This summer",
            "event2_desc": "Authentic Neapolitan pizza cooked in wood-fired ovens by certified master pizzaiolos.",
            "event2_location": "📍 Via Dante, 72",
            "event2_time": "🕒 6:00 PM-12:00 AM",
            "event3_title": "Tuscan Wine Tasting",
            "event3_period": "This autumn",
            "event3_desc": "The best Tuscan wines selected by enologist Marco Rossi.",
            "event3_location": "📍 Via Milano, 8",
            "event3_time": "🕒 8:00-10:30 PM",
            "book_button": "Book Now",
            "contacts_title": "Contacts",
            "language_title": "Language",
            "current_lang": "English",
            "follow_title": "Follow Us",
            "instagram": "Instagram",
            "facebook": "Facebook",
            "copyright": "© 2023 Gastronomic Events. All rights reserved.",
            "form_name": "Full Name",
            "form_email": "Email",
            "form_date": "Select Date",
            "form_guests": "Number of Guests",
            "guest1": "1 person",
            "guest2": "2 people",
            "guest3": "3 people",
            "guest4": "4 people",
            "guest5": "5+ people",
            "form_submit": "Confirm Booking",
            "contact_popup_title": "Contact Us",
            "contact_popup_text": "For more information, call us or send us an email:",
            "phone_label": "Phone:",
            "email_label": "Email:",
            "social_popup_title": "Follow Us on Social Media",
            "social_popup_text": "Stay updated on our events:",
            "close_button": "Close"
        }
    };

    // Initialize calendar
    const datepicker = flatpickr("#event-date", {
        locale: "it",
        minDate: "today",
        dateFormat: "d F Y",
        disable: [
            function(date) {
                return true; // Initially disable all dates
            }
        ]
    });

    // Language switcher
    let currentLang = 'it';
    const langButtons = document.querySelectorAll('.language-btn, .language-dropdown-content a');
    
    function changeLanguage(lang) {
        currentLang = lang;
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
                
                // Update placeholder for datepicker
                if (key === "form_date") {
                    datepicker.set("placeholder", translations[lang][key]);
                }
            }
        });
        
        // Update current language button text
        document.querySelector('.language-dropbtn').textContent = translations[lang]["current_lang"];
        
        // Update calendar locale
        datepicker.set('locale', lang);
    }
    
    langButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.dataset.lang;
            if (lang) {
                changeLanguage(lang);
            }
        });
    });

    // Modal functionality
    const bookingModal = document.getElementById('bookingModal');
    const contactModal = document.getElementById('contactModal');
    const socialModal = document.getElementById('socialModal');
    const bookingButtons = document.querySelectorAll('.cta-button');
    const contactLinks = document.querySelectorAll('.contact-link');
    const socialLinks = document.querySelectorAll('.social-icon');
    const closeButtons = document.querySelectorAll('.close-button, .close-popup-btn');
    
    // Open booking modal with event-specific dates
    bookingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventDates = this.dataset.dates.split(',');
            
            // Update calendar with available dates for this event
            datepicker.set('disable', [
                function(date) {
                    const dateStr = date.getFullYear() + "-" + 
                                  String(date.getMonth() + 1).padStart(2, '0') + "-" + 
                                  String(date.getDate()).padStart(2, '0');
                    return !eventDates.includes(dateStr);
                }
            ]);
            
            // Clear any previously selected date
            datepicker.clear();
            
            const eventName = this.parentElement.querySelector('h2').textContent;
            document.getElementById('modalTitle').textContent = 
                currentLang === 'it' 
                    ? `Prenotazione: ${eventName}` 
                    : `Booking: ${eventName}`;
            
            bookingModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Open contact modal
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            contactModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Open social modal
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            socialModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            bookingModal.style.display = 'none';
            contactModal.style.display = 'none';
            socialModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === bookingModal || event.target === contactModal || event.target === socialModal) {
            bookingModal.style.display = 'none';
            contactModal.style.display = 'none';
            socialModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form submission
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('event-date').value;
        const guests = document.getElementById('guests').value;
        
        if (!date) {
            alert(currentLang === 'it' 
                ? "Per favore seleziona una data" 
                : "Please select a date");
            return;
        }
        
        // Here you would typically send data to a server
        console.log('Booking submitted:', {
            name: name,
            email: email,
            date: date,
            guests: guests
        });
        
        // Show success message
        alert(
            currentLang === 'it'
                ? `Grazie ${name}! La tua prenotazione per ${guests} persone il ${date} è stata registrata. Ti abbiamo inviato una conferma all'email ${email}`
                : `Thank you ${name}! Your booking for ${guests} people on ${date} has been registered. We've sent a confirmation to ${email}`
        );
        
        // Reset form and close modal
        this.reset();
        datepicker.clear();
        bookingModal.style.display = 'none';
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
    
    // Initialize with Italian language
    changeLanguage('it');
});