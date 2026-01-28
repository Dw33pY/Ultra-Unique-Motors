// ====== GLOBAL UTILITY FUNCTIONS ======

// Loading Screen Handler
function initLoadingScreen() {
  const loader = document.getElementById('loader');
  if (loader) {
    // Hide loader after page loads
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 800);
    });
    
    // Safety: hide loader after 3 seconds max
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 3000);
  }
}

// Mobile Menu Handler
function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('show');
      menuBtn.innerHTML = nav.classList.contains('show') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking links
    document.querySelectorAll('.nav a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('show');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }
}

// Header Scroll Effect
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

// Scroll Reveal Animation (with fix for cars page)
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 100;
      
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('show');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
  
  return revealOnScroll;
}

// FAQ Accordion
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current item
        item.classList.toggle('active');
      });
    }
  });
}

// Contact Form Handler
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name')?.value;
      const email = document.getElementById('email')?.value;
      const subject = document.getElementById('subject')?.value;
      const message = document.getElementById('message')?.value;
      
      // Basic validation
      if (!name || !email || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }
      
      // Simulate form submission
      showFormMessage('Sending your message...', 'success');
      
      setTimeout(() => {
        showFormMessage(`Thank you ${name}! Your message has been sent successfully. We'll contact you within 24 hours.`, 'success');
        contactForm.reset();
      }, 1500);
    });
  }
  
  function showFormMessage(text, type) {
    const messageDiv = document.getElementById('formMessage');
    if (messageDiv) {
      messageDiv.textContent = text;
      messageDiv.className = `form-message ${type}`;
      
      // Auto-hide message after 5 seconds
      setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'form-message';
      }, 5000);
    }
  }
}

// Parallax Effect
function initParallax() {
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      hero.style.transform = `translateY(${scrolled * 0.1}px)`;
    });
  }
}

// Car Card Hover Effects
function initCarCardHover() {
  document.querySelectorAll('.car-card, .car-card-page').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });
}

// Navigation Active State
function initNavigationActiveState() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav a');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || 
        (currentPage === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// URL Parameter Handler (for contact form pre-fill)
function initURLParameters() {
  if (window.location.href.includes('contact.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const carParam = urlParams.get('car');
    
    if (carParam) {
      const messageField = document.getElementById('message');
      if (messageField) {
        messageField.value = `I'm interested in the ${decodeURIComponent(carParam)}. Please send me more information and schedule a test drive.`;
      }
    }
  }
}

// ====== CARS PAGE SPECIFIC CODE ======

// Car Data
const carData = [
  {
    id: 1,
    name: "Toyota Prado",
    price: "Ksh 4,200,000",
    image: "https://images.pexels.com/photos/34166839/pexels-photo-34166839.jpeg",
    category: "suv",
    year: "2021",
    mileage: "45,000 km",
    engine: "3.0L Diesel",
    badge: "Premium"
  },
  {
    id: 2,
    name: "Mercedes C200",
    price: "Ksh 2,650,000",
    image: "https://images.pexels.com/photos/3778776/pexels-photo-3778776.jpeg",
    category: "luxury",
    year: "2022",
    mileage: "28,000 km",
    engine: "2.0L Turbo",
    badge: "Luxury"
  },
  {
    id: 3,
    name: "Subaru Forester",
    price: "Ksh 1,850,000",
    image: "https://images.pexels.com/photos/30454655/pexels-photo-30454655.jpeg",
    category: "suv",
    year: "2020",
    mileage: "32,000 km",
    engine: "2.5L Boxer",
    badge: "Best Value"
  },
  {
    id: 4,
    name: "BMW X5",
    price: "Ksh 5,800,000",
    image: "https://images.pexels.com/photos/7154531/pexels-photo-7154531.jpeg",
    category: "luxury",
    year: "2023",
    mileage: "15,000 km",
    engine: "3.0L Turbo",
    badge: "Premium"
  },
  {
    id: 5,
    name: "Toyota Hilux",
    price: "Ksh 3,200,000",
    image: "https://images.pexels.com/photos/19143603/pexels-photo-19143603.jpeg",
    category: "suv",
    year: "2021",
    mileage: "38,000 km",
    engine: "2.8L Diesel",
    badge: "Popular"
  },
  {
    id: 6,
    name: "Porsche 911",
    price: "Ksh 12,500,000",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    category: "performance",
    year: "2022",
    mileage: "8,500 km",
    engine: "3.0L Twin-Turbo",
    badge: "Exclusive"
  },
  {
    id: 7,
    name: "Honda Civic",
    price: "Ksh 2,100,000",
    image: "https://images.pexels.com/photos/17357663/pexels-photo-17357663.jpeg",
    category: "sedan",
    year: "2021",
    mileage: "25,000 km",
    engine: "1.5L Turbo",
    badge: "Fuel Efficient"
  },
  {
    id: 8,
    name: "Range Rover Sport",
    price: "Ksh 8,900,000",
    image: "https://images.pexels.com/photos/28496683/pexels-photo-28496683.jpeg",
    category: "luxury",
    year: "2022",
    mileage: "22,000 km",
    engine: "3.0L Diesel",
    badge: "Luxury"
  }
];

// Cars Page Render Function - FIXED VERSION
function initCarsPage() {
  const carsGrid = document.getElementById('carsGrid');
  if (!carsGrid) return;
  
  console.log("Initializing cars page...");
  
  // FIX 1: Make filters and search visible immediately
  const filterElements = document.querySelectorAll('.filter-options .reveal, .search-box.reveal');
  filterElements.forEach(el => {
    el.classList.add('show');
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
  
  // Function to render cars
  const renderCars = (cars) => {
    console.log(`Rendering ${cars.length} cars`);
    carsGrid.innerHTML = '';
    
    if (cars.length === 0) {
      const noResults = document.getElementById('noResults');
      if (noResults) {
        noResults.style.display = 'block';
      }
      return;
    }
    
    const noResults = document.getElementById('noResults');
    if (noResults) {
      noResults.style.display = 'none';
    }
    
    cars.forEach(car => {
      const carHTML = `
        <div class="car-card-page reveal show" data-category="${car.category}" data-price="${parseFloat(car.price.replace(/[^\d.]/g, '')) / 1000000}" data-year="${car.year}">
          <div class="car-badge">${car.badge}</div>
          <img src="${car.image}" alt="${car.name}" class="car-img">
          <div class="car-card-content">
            <h3>${car.name}</h3>
            <p class="car-price">${car.price}</p>
            <div class="features-list">
              <span class="engine"><i class="fas fa-cog"></i> ${car.engine}</span>
              <span class="mileage"><i class="fas fa-tachometer-alt"></i> ${car.mileage}</span>
              <span class="year"><i class="fas fa-calendar"></i> ${car.year}</span>
            </div>
            <div class="car-actions">
              <button class="btn-view" data-car-name="${car.name}" data-car-price="${car.price}" data-car-engine="${car.engine}" data-car-year="${car.year}" data-car-mileage="${car.mileage}">View Details</button>
              <button class="btn-inquire" data-car-name="${car.name}">Inquire Now</button>
            </div>
          </div>
        </div>
      `;
      
      carsGrid.innerHTML += carHTML;
    });
    
    // Add event listeners to the buttons
    setTimeout(() => {
      document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', function() {
          const carName = this.getAttribute('data-car-name');
          const carPrice = this.getAttribute('data-car-price');
          const carEngine = this.getAttribute('data-car-engine');
          const carYear = this.getAttribute('data-car-year');
          const carMileage = this.getAttribute('data-car-mileage');
          alert(`Viewing details for: ${carName}\nPrice: ${carPrice}\nEngine: ${carEngine}\nYear: ${carYear}\nMileage: ${carMileage}`);
        });
      });
      
      document.querySelectorAll('.btn-inquire').forEach(btn => {
        btn.addEventListener('click', function() {
          const carName = this.getAttribute('data-car-name');
          window.location.href = `contact.html?car=${encodeURIComponent(carName)}`;
        });
      });
      
      // FIX 2: Trigger scroll reveal for new car cards
      const newReveals = document.querySelectorAll('.car-card-page.reveal');
      newReveals.forEach(el => {
        el.classList.add('show');
      });
    }, 50);
  };
  
  // Initial render
  renderCars(carData);
  
  // Filter functionality - FIXED
  const categoryFilter = document.getElementById('categoryFilter');
  const priceFilter = document.getElementById('priceFilter');
  const yearFilter = document.getElementById('yearFilter');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const resetFilters = document.getElementById('resetFilters');
  
  const applyFilters = () => {
    const category = categoryFilter ? categoryFilter.value : 'all';
    const priceRange = priceFilter ? priceFilter.value : 'all';
    const yearRange = yearFilter ? yearFilter.value : 'all';
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    const filteredCars = carData.filter(car => {
      // Category filter
      if (category !== 'all' && car.category !== category) return false;
      
      // Price filter
      if (priceRange !== 'all') {
        const price = parseFloat(car.price.replace(/[^\d.]/g, '')) / 1000000;
        if (priceRange === '0-2' && price > 2) return false;
        if (priceRange === '2-4' && (price < 2 || price > 4)) return false;
        if (priceRange === '4+' && price < 4) return false;
      }
      
      // Year filter
      if (yearRange !== 'all') {
        const year = parseInt(car.year);
        if (yearRange === '2023-2024' && (year < 2023 || year > 2024)) return false;
        if (yearRange === '2020-2022' && (year < 2020 || year > 2022)) return false;
        if (yearRange === '2017-2019' && (year < 2017 || year > 2019)) return false;
      }
      
      // Search filter
      if (searchTerm && !car.name.toLowerCase().includes(searchTerm) && 
          !car.engine.toLowerCase().includes(searchTerm)) {
        return false;
      }
      
      return true;
    });
    
    renderCars(filteredCars);
  };
  
  // Event listeners for filters
  if (categoryFilter) {
    categoryFilter.addEventListener('change', applyFilters);
    console.log("Category filter initialized");
  }
  if (priceFilter) {
    priceFilter.addEventListener('change', applyFilters);
    console.log("Price filter initialized");
  }
  if (yearFilter) {
    yearFilter.addEventListener('change', applyFilters);
    console.log("Year filter initialized");
  }
  if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') applyFilters();
    });
    console.log("Search input initialized");
  }
  if (searchBtn) {
    searchBtn.addEventListener('click', applyFilters);
    console.log("Search button initialized");
  }
  if (resetFilters) {
    resetFilters.addEventListener('click', () => {
      if (categoryFilter) categoryFilter.value = 'all';
      if (priceFilter) priceFilter.value = 'all';
      if (yearFilter) yearFilter.value = 'all';
      if (searchInput) searchInput.value = '';
      applyFilters();
    });
    console.log("Reset filters initialized");
  }
  
  console.log("All filters initialized");
}

// ====== MAIN INITIALIZATION ======

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM Content Loaded - Initializing website...");
  
  // Initialize loading screen
  initLoadingScreen();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize header scroll effect
  initHeaderScroll();
  
  // Initialize FAQ accordion
  initFAQAccordion();
  
  // Initialize contact form
  initContactForm();
  
  // Initialize parallax
  initParallax();
  
  // Initialize car card hover effects
  initCarCardHover();
  
  // Initialize navigation active state
  initNavigationActiveState();
  
  // Initialize URL parameters
  initURLParameters();
  
  // Initialize cars page if we're on it
  if (window.location.pathname.includes('cars.html')) {
    initCarsPage();
  } else {
    // Only initialize scroll reveal on non-cars pages
    initScrollReveal();
  }
  
  console.log("Website initialization complete!");
});

// Safety: Force hide loader after 5 seconds
setTimeout(() => {
  const loader = document.getElementById('loader');
  if (loader && !loader.classList.contains('hidden')) {
    console.log("Safety timeout: Hiding loader");
    loader.classList.add('hidden');
  }
}, 5000);
