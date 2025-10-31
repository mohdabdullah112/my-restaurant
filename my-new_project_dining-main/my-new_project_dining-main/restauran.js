// document.addEventListener('DOMContentLoaded', () => {

//     // --- MOBILE MENU TOGGLE ---
//     const menuToggle = document.getElementById('mobile-menu-toggle');
//     const mainNav = document.getElementById('main-nav');

//     if (menuToggle && mainNav) {
//         menuToggle.addEventListener('click', () => {
//             mainNav.classList.toggle('is-open');
//             // Optional: Change icon on toggle
//             const icon = menuToggle.querySelector('i');
//             if (mainNav.classList.contains('is-open')) {
//                 icon.classList.remove('fa-bars');
//                 icon.classList.add('fa-xmark');
//             } else {
//                 icon.classList.remove('fa-xmark');
//                 icon.classList.add('fa-bars');
//             }
//         });
//     }


    // --- SCROLLING DOWN ANIMATION ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When the element is in view
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing the element once it's visible to save resources
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is in view
    });

    // Observe each animated element
    animatedElements.forEach(el => {
        observer.observe(el);
    });



// header

  const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".nav-menu");
        const dropdownToggle = document.querySelector(".dropdown-toggle");
        const dropdownMenu = document.querySelector(".dropdown-menu");

        // Toggle mobile menu
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Toggle dropdown in mobile view
        dropdownToggle.addEventListener("click", (e) => {
            // Check if we are in mobile view (hamburger is visible)
            if (window.getComputedStyle(hamburger).display !== "none") {
                e.preventDefault(); // Prevent link navigation
                dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
            }
        });

        // Close mobile menu if a non-dropdown link is clicked
        document.querySelectorAll(".nav-link").forEach(link => {
            if (!link.classList.contains("dropdown-toggle")) {
                link.addEventListener("click", () => {
                    if (navMenu.classList.contains("active")) {
                        hamburger.classList.remove("active");
                        navMenu.classList.remove("active");
                    }
                });
            }
        });


















        
        //Quote Form
//         $(document).ready(function() {

//     // Listen for the submit event on the form with the ID 'restaurant-form'
//     $('#restaurant-form').on('submit', function(event) {
        
//         // 1. Prevent the default form submission (which causes a page reload)
//         event.preventDefault();

//         // --- Cache jQuery selections for performance ---
//         const $form = $(this);
//         const $submitBtn = $form.find('.submit-btn');
//         const $messageArea = $('#form-message');
        
//         // 2. Collect all form data into a URL-encoded string
//         const formData = $form.serialize();

//         // 3. Provide immediate feedback to the user
//         $submitBtn.prop('disabled', true).text('Submitting...');
//         $messageArea.hide().removeClass('success-message error-message');

//         // 4. Simulate an AJAX (Asynchronous JavaScript and XML) call to a server
//         // In a real application, you would replace this with a real $.ajax() call.
//         console.log("Form data to be sent:", formData);

//         // We use setTimeout to mimic the delay of a network request (2 seconds)
//         setTimeout(function() {
//             // --- This is where you would handle the server's response ---
//             // For this demo, we will randomly succeed or fail.
//             const isSuccess = Math.random() > 0.2; // 80% chance of success

//             if (isSuccess) {
//                 // --- ON SUCCESS ---
                
//                 // Show a success message
//                 $messageArea.addClass('success-message').text('Thank you! Your quote request has been sent. We will be in touch shortly.').slideDown();
                
//                 // Reset the form fields
//                 $form[0].reset();

//                 // Reset the button after a short delay to allow the user to read the message
//                 setTimeout(function() {
//                     $submitBtn.prop('disabled', false).text('Get a Quote');
//                     $messageArea.slideUp();
//                 }, 4000); // Hide message and reset button after 4 seconds

//             } else {
//                 // --- ON FAILURE ---
                
//                 // Show an error message
//                 $messageArea.addClass('error-message').text('Sorry, something went wrong. Please check your connection and try again.').slideDown();
                
//                 // Re-enable the button so the user can try again
//                 $submitBtn.prop('disabled', false).text('Get a Quote');
//             }

//         }, 2000); // 2-second simulated network delay
//     });
// });
















//slider
    document.addEventListener('DOMContentLoaded', () => {
        const sliderWrapper = document.querySelector('.slider-wrapper');
        const dotsContainer = document.querySelector('.slider-dots');
        const slides = Array.from(document.querySelectorAll('.testimonial-card'));
        const totalSlides = slides.length;

        let currentIndex = 0;
        let slidesPerView = getSlidesPerView();
        let totalPages = calculateTotalPages();

        function getSlidesPerView() {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        }

        function calculateTotalPages() {
            // How many "pages" or "views" of slides are there
            return Math.max(totalSlides - slidesPerView + 1, 1);
        }

        function createDots() {
            dotsContainer.innerHTML = ''; // Clear previous dots
            totalPages = calculateTotalPages();
            
            if (totalPages > 1) {
                for (let i = 0; i < totalPages; i++) {
                    const dot = document.createElement('button');
                    dot.classList.add('dot');
                    dot.setAttribute('aria-label', `Go to slide page ${i + 1}`);
                    dot.addEventListener('click', () => {
                        currentIndex = i;
                        updateSlider();
                    });
                    dotsContainer.appendChild(dot);
                }
            }
        }
        
        function updateSlider() {
            // Calculate the total width of a single card including its margin
            const card = slides[0];
            const cardWidth = card.offsetWidth;
            const cardMargin = parseInt(window.getComputedStyle(card).marginRight) * 2;
            const totalShift = cardWidth + cardMargin;
            
            // Apply the transformation
            const offset = -currentIndex * totalShift;
            sliderWrapper.style.transform = `translateX(${offset}px)`;

            // Update the active dot
            const dots = dotsContainer.querySelectorAll('.dot');
            if (dots.length > 0) {
                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[currentIndex]) {
                    dots[currentIndex].classList.add('active');
                }
            }
        }
        
        function initSlider() {
            slidesPerView = getSlidesPerView();
            createDots();
            
            // Adjust currentIndex if it's now out of bounds after a resize
            if (currentIndex >= totalPages) {
                currentIndex = Math.max(totalPages - 1, 0);
            }

            updateSlider();
        }

        // Initial setup and event listener for responsiveness
        initSlider();
        window.addEventListener('resize', initSlider);
    });













    // faq-section 

     document.addEventListener('DOMContentLoaded', () => {
            const faqItems = document.querySelectorAll('.faq-item');

            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');

                question.addEventListener('click', () => {
                    // Check if the clicked item is already active
                    const isAlreadyActive = item.classList.contains('active');

                    // First, close all other items
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                    });
                    
                    // If the clicked item was not already active, open it
                    if (!isAlreadyActive) {
                        item.classList.add('active');
                    }
                });
            });
        });


// hero-quote-form
        document.getElementById('quoteForm').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the default form submission

        // Get the value of the selected option
        const selectedOption = document.getElementById('restaurant_type').value;

        if (selectedOption) {
            // Redirect to the URL based on the selected option
            window.location.href = selectedOption;
        }
    });

    



    //scroll down animation
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  
  



   $(document).ready(function () {
    $('#restaurant-form').on('submit', function (e) {
      e.preventDefault(); // prevent default form submission
      
      // Show the message
      $('#form-message').fadeIn().text("Thank you! Your form has been submitted.");

      // Optionally, send the form using AJAX if you're using a server or API
      // For now, reset the form after showing message
      this.reset();

      // Hide the message after 5 seconds
      setTimeout(() => {
        $('#form-message').fadeOut();
      }, 5000);
    });
  });