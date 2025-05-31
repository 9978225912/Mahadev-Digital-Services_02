document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const navbar = document.querySelector('.navbar');
    const backToTopButton = document.getElementById('back-to-top');

    // --- Hamburger Menu Toggle ---
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.classList.toggle('no-scroll'); // Optional: prevent body scroll when menu is open
    });

    // --- Close menu when a link is clicked or outside menu ---
    function closeMenu() {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove('no-scroll');
    }
    navLinks.forEach(n => n.addEventListener("click", closeMenu));
    
    // Close menu if clicking outside of it (useful for overlay menus)
    document.addEventListener('click', function(event) {
        const isClickInsideNavMenu = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        if (!isClickInsideNavMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });


    // --- Modal Functionality ---
    const modalContainer = document.getElementById('modal-container');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.querySelector('.modal-content .close-button'); // Scoped close button

    const modalData = {
        'about-us': {
            title: 'About Us',
            content: `<p>We are a professional digital service provider who provides you modern and creative digital solutions according to your needs. Our services include mobile apps, websites, business cards, professional resumes, business ads, Facebook and Instagram ads, digital forms and business logo design. Our goal is to help your business get recognition and grow in the digital world.</p>`
        },
        'privacy-policy': { /* Same content as before */ },
        'terms-service': { /* Same content as before */ }
    };
    // Populate Privacy & Terms from previous version to save space here, or copy them fully
    modalData['privacy-policy'].content = `
        <p>We take your privacy seriously. Our services such as mobile apps, websites, business cards, professional resumes, digital forms, business and social media ads (Facebook/Instagram), and when providing logo design, we collect only the necessary information.</p>
        <h4>Information we collect:</h4>
        <ul>
            <li>Name, email, phone number</li>
            <li>Information related to business or personal needs</li>
            <li>Your design preferences</li>
        </ul>
        <h4>How we use information:</h4>
        <ul>
            <li>To customize services</li>
            <li>To contact clients and provide updates</li>
            <li>To fulfill and deliver orders</li>
        </ul>
        <p>We do not share your information, except when it is required by law.</p>
        <p>Your information is secure. We do not sell your data to any third parties and follow appropriate security measures. If you need to contact us to update, delete your information or for any other questions, please contact us on our email or mobile number.</p>
    `;
    modalData['terms-service'].content = `
        <p><strong>1. Nature of service:</strong> We provide digital services such as website, mobile app, business cards, professional resume, social media ads (Facebook/Instagram), digital forms and business logo.</p>
        <p><strong>2. Payment and Refunds:</strong><br>
        All services are paid for in advance. No refunds will be given once the service has commenced.</p>
        <p><strong>3. Deadlines:</strong><br>
        The deadlines for each project are determined based on the complexity of the service. Provide the client with the required information and materials on time.</p>
        <p><strong>4. Client's responsibility:</strong><br>
        The client is solely responsible for the legality of the design, text, logos, images and other content. We are not responsible for copyright infringement.</p>
        <p><strong>5. Revisions:</strong><br>
        We provide limited revisions (1-2 times) for each service. Additional revisions may incur additional charges.</p>
        <p><strong>6. Privacy:</strong><br>
        We keep all information related to your business confidential and do not share it with any third party.</p>
        <p><strong>7. Rights:</strong><br>
        The final rights of the design/coding/graphics are transferred to the customer after delivery.</p>
        <p><strong>8. Refusal of Service:</strong><br>
        We reserve the right to refuse any service if the content is illegal, offensive or objectionable.</p>
        <p><strong>9. Technical support:</strong><br>
        Basic technical support will be provided for 7 days after project delivery. After that additional charges may be taken for support.</p>
    `;


    function openModal(type) {
        if (modalData[type]) {
            modalTitle.textContent = modalData[type].title;
            modalBody.innerHTML = modalData[type].content;
            modalContainer.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent background scroll when modal is open
        }
    }

    function closeModalDialog() {
        modalContainer.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore background scroll
    }

    document.getElementById('about-us-link').addEventListener('click', (e) => { e.preventDefault(); openModal('about-us'); });
    document.getElementById('about-nav-link').addEventListener('click', (e) => { // For nav link
        e.preventDefault();
        openModal('about-us');
        closeMenu(); // Close mobile menu if open
    });
    document.getElementById('privacy-policy-link').addEventListener('click', (e) => { e.preventDefault(); openModal('privacy-policy'); });
    document.getElementById('terms-service-link').addEventListener('click', (e) => { e.preventDefault(); openModal('terms-service'); });

    if(closeButton) closeButton.addEventListener('click', closeModalDialog);
    window.addEventListener('click', (event) => {
        if (event.target === modalContainer) closeModalDialog();
    });
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalContainer.style.display === 'flex') closeModalDialog();
    });


    // --- Navbar Scroll Behavior & Back to Top Button ---
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // Navbar effects (optional: hide on scroll down, show on scroll up)
        if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight){
            navbar.style.top = `-${navbar.offsetHeight}px`; // Hide navbar
        } else {
            navbar.style.top = "0"; // Show navbar
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling

        // Navbar style change on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to Top Button
        if (backToTopButton) {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                backToTopButton.style.display = "block";
                backToTopButton.style.opacity = "1";
            } else {
                backToTopButton.style.opacity = "0";
                setTimeout(() => { if(window.scrollY <= 100) backToTopButton.style.display = "none"; }, 300); // Hide after fade out
            }
        }
    });

    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // --- Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || '0s';
                entry.target.style.transitionDelay = delay;
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Optional: Stop observing once animated
            } else {
                 // Optional: re-hide if you want animations every time
                // entry.target.classList.remove('visible');
                // entry.target.style.transitionDelay = '0s'; 
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    function navHighlighter() {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150; // Adjusted offset
            let sectionId = current.getAttribute('id');
            
            let navLinkForSection = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                if(navLinkForSection) navLinkForSection.classList.add('active');
            } else {
                if(navLinkForSection) navLinkForSection.classList.remove('active');
            }
        });
    }
    window.addEventListener('scroll', navHighlighter);
    navHighlighter(); // Call on load

});

// Add this to your CSS if you use body.no-scroll for mobile menu
/*
body.no-scroll {
    overflow: hidden;
}
*/