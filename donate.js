// ================= Donate Page JavaScript =================

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {

    // ===== Form Handling =====
    const donateForm = document.getElementById('donateForm');
    const successMessage = document.getElementById('successMessage');

    if (donateForm) {
      donateForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(donateForm);
        const data = {
          amount: formData.get('amount') || formData.get('customAmount'),
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          location: formData.get('location'),
          message: formData.get('message')
        };

        // Validate amount
        if (!data.amount) {
          alert('Please select or enter a donation amount');
          return;
        }

        // Log data (in production, send to server)
        console.log('Donation Data:', data);

        // Show success message
        if (successMessage) {
          successMessage.classList.add('show');
          successMessage.style.display = 'block';
          
          // Scroll to success message
          successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Send email (mock - implement with backend)
        sendDonationEmail(data);

        // Reset form
        donateForm.reset();
      });
    }

    // ===== Mock Email Function =====
    function sendDonationEmail(data) {
      // In production, this would call your backend API
      console.log('Sending donation email with data:', data);
      
      // Example: You can use EmailJS, FormSubmit, or your own backend
      // fetch('/api/donate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
    }

    // ===== Copy UPI ID Function =====
    window.copyUPI = function() {
      const upiId = 'onsnc@upi';
      
      // Create temporary input
      const tempInput = document.createElement('input');
      tempInput.value = upiId;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);

      // Show feedback
      const copyBtn = event.target;
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      copyBtn.style.background = '#27ae60';

      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '';
      }, 2000);
    };

    // ===== FAQ Accordion =====
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', function() {
        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });

        // Toggle current item
        item.classList.toggle('active');
      });
    });

    // ===== Smooth Scroll for Anchor Links =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const headerHeight = 80;
          const targetPosition = target.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // ===== Scroll Animations =====
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll(
      '.stat-card, .support-card, .gallery-item, .testimonial-card'
    );
    
    animateElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = `all 0.6s ease ${index * 0.1}s`;
      observer.observe(element);
    });

    // Add animation class
    const style = document.createElement('style');
    style.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);

    // ===== Form Input Validation =====
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
      // Real-time validation
      input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
          this.style.borderColor = '#e74c3c';
        } else {
          this.style.borderColor = '';
        }
      });

      input.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(231, 76, 60)') {
          this.style.borderColor = '';
        }
      });
    });

    // ===== Phone Number Validation =====
    const phoneInput = document.querySelector('input[name="phone"]');
    
    if (phoneInput) {
      phoneInput.addEventListener('input', function() {
        // Allow only numbers
        this.value = this.value.replace(/[^0-9]/g, '');
        
        // Limit to 10 digits
        if (this.value.length > 10) {
          this.value = this.value.slice(0, 10);
        }
      });
    }

    // ===== Custom Amount Input =====
    const customAmountInput = document.querySelector('input[name="customAmount"]');
    const amountRadios = document.querySelectorAll('input[name="amount"]');
    
    if (customAmountInput) {
      customAmountInput.addEventListener('input', function() {
        if (this.value) {
          // Uncheck radio buttons
          amountRadios.forEach(radio => radio.checked = false);
        }
      });
    }

    amountRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        if (this.checked && customAmountInput) {
          customAmountInput.value = '';
        }
      });
    });

    // ===== Sticky Header Effect =====
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.boxShadow = '';
      }
      
      lastScroll = currentScroll;
    });

    // ===== Button Click Effects =====
    const buttons = document.querySelectorAll('.btn-hero, .btn-submit, .btn-cta-primary, .btn-cta-secondary');
    
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
          left: ${x}px;
          top: ${y}px;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(rippleStyle);

    // ===== Form Progress Indicator =====
    const formSections = document.querySelectorAll('.form-section');
    let completedSections = 0;

    function updateProgress() {
      completedSections = 0;
      
      formSections.forEach(section => {
        const inputs = section.querySelectorAll('input[required], textarea[required]');
        let sectionComplete = true;
        
        inputs.forEach(input => {
          if (!input.value.trim()) {
            sectionComplete = false;
          }
        });
        
        if (sectionComplete && inputs.length > 0) {
          completedSections++;
        }
      });
    }

    formInputs.forEach(input => {
      input.addEventListener('input', updateProgress);
    });

    // ===== Gallery Lightbox Effect (Optional Enhancement) =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
      item.addEventListener('click', function() {
        // Can add lightbox functionality here
        console.log('Gallery item clicked');
      });
    });

    // ===== Testimonial Carousel (Optional Enhancement) =====
    // Can add carousel functionality for testimonials if needed

    // ===== Print Donation Receipt Function =====
    window.printReceipt = function(donationData) {
      // Create printable receipt
      const receiptWindow = window.open('', '', 'width=800,height=600');
      receiptWindow.document.write(`
        <html>
        <head>
          <title>Donation Receipt - ONSNC Foundation</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { color: #27ae60; }
            .info { margin: 20px 0; }
            .info label { font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>ONSNC Foundation</h1>
          <h2>Donation Receipt</h2>
          <div class="info">
            <p><label>Name:</label> ${donationData.name}</p>
            <p><label>Amount:</label> ₹${donationData.amount}</p>
            <p><label>Date:</label> ${new Date().toLocaleDateString()}</p>
            <p><label>Email:</label> ${donationData.email}</p>
          </div>
          <p>Thank you for your generous donation!</p>
        </body>
        </html>
      `);
      receiptWindow.document.close();
      receiptWindow.print();
    };

    // ===== Console Welcome Message =====
    console.log('%c🌍 Welcome to ONSNC Foundation Donation Page!', 'color: #27ae60; font-size: 20px; font-weight: bold;');
    console.log('%cThank you for considering supporting our mission!', 'color: #222; font-size: 14px;');

  });

})();

