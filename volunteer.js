// Google Forms Integration
document.addEventListener('DOMContentLoaded', function() {
    const volunteerForm = document.getElementById('volunteerForm');
    const formMessage = document.getElementById('formMessage');
    const hiddenIframe = document.getElementById('hidden_iframe');

    // Listen for form submission
    volunteerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values for validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const city = document.getElementById('city').value.trim();
        const interest = document.getElementById('interest').value;
        const availability = document.getElementById('availability').value;
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || !email || !phone || !city || !interest || !availability || !message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        if (!isValidPhone(phone)) {
            showMessage('Please enter a valid 10-digit phone number.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = document.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        
        // Submit to Google Forms
        setTimeout(() => {
            // Create a temporary form for submission
            const tempForm = document.createElement('form');
            tempForm.action = volunteerForm.action;
            tempForm.method = volunteerForm.method;
            tempForm.target = 'hidden_iframe';
            tempForm.style.display = 'none';
            
            // Add all form fields
            const formData = new FormData(volunteerForm);
            for (let [name, value] of formData) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = name;
                input.value = value;
                tempForm.appendChild(input);
            }
            
            document.body.appendChild(tempForm);
            tempForm.submit();
            
            // Show success message after a delay
            setTimeout(() => {
                showMessage('Thank you for your application! Our team will contact you within 48 hours.', 'success');
                volunteerForm.reset();
                
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1000);
            
            // Clean up
            setTimeout(() => document.body.removeChild(tempForm), 2000);
            
        }, 1000);
    });
    
    // Listen for iframe load to detect form submission completion
    hiddenIframe.addEventListener('load', function() {
        console.log('Form submitted to Google Forms');
    });
    
    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    }
    
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
    }
    
    // Smooth scrolling for CTA button
    document.querySelector('a[href="#join-form"]').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Add animation on scroll for sections
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
});

