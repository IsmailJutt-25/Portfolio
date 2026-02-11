 // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });

    // Theme Toggle
    function toggleTheme() {
      document.body.classList.toggle('light');
      localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
    }

    // Load saved theme
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light');
    }

    // Animated counter
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const animateCounters = () => {
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(animateCounters, 20);
        } else {
          counter.innerText = target + (target === 99 ? '%' : '+');
        }
      });
    };

    // Trigger counters when in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    });

    document.querySelector('.hero-stats') && observer.observe(document.querySelector('.hero-stats'));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('nav');
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
        nav.style.backdropFilter = 'blur(20px)';
      } else {
        nav.style.background = 'rgba(10, 10, 15, 0.8)';
      }
      
      lastScroll = currentScroll;
    });