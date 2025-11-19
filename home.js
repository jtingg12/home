// ---------------- Navbar Elements ----------------
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const navButtons = document.querySelector('.nav-buttons');
const backToTop = document.createElement('button');

// Navbar shadow + Back to top
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    backToTop.style.display = 'block';
  } 
  else {
    navbar.classList.remove('scrolled');
    backToTop.style.display = 'none';
  }
});

// Create Back to Top button
backToTop.id = 'backToTop';
backToTop.innerHTML = '↑';
document.body.appendChild(backToTop);

// Smooth scroll to top
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------------- Active Link Logic ----------------
const navItems = document.querySelectorAll('.nav-links li a');
const quizBtn = document.querySelector('.quiz-btn');
const loginBtn = document.querySelector('.login-btn');

// When clicking on a regular navigation item
navItems.forEach(link => {
  link.addEventListener('click', () => {
    navItems.forEach(l => l.classList.remove('active'));
    quizBtn.classList.remove('active');
    loginBtn.classList.remove('active');
    link.classList.add('active');
  });
});

// Click the Quiz button
quizBtn.addEventListener('click', () => {
  navItems.forEach(l => l.classList.remove('active'));
  quizBtn.classList.add('active');
  loginBtn.classList.remove('active');
});

// Click the Login button
loginBtn.addEventListener('click', () => {
  navItems.forEach(l => l.classList.remove('active'));
  loginBtn.classList.add('active');
  quizBtn.classList.remove('active');
});

// Automatically detect
const currentPage = window.location.pathname.split("/").pop();
navItems.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// ---------------- Toggle Mobile Menu ----------------
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navButtons.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// ---------------- Login Overlay ----------------
const overlay = document.getElementById('overlay');
const openLogin = document.querySelector('.login-btn');
const btn = document.getElementById('login-btn');
const form = document.getElementById('loginForm');
const uname = document.getElementById('uname');
const pass = document.getElementById('pass');
const msg = document.getElementById('msg');

btn.disabled = true;

uname.addEventListener('input', showMsg);
pass.addEventListener('input', showMsg);

openLogin.addEventListener('click', (e) => {
  e.preventDefault();
  overlay.classList.add('active');
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.classList.remove('active');
});

function showMsg() {
  const isEmpty = uname.value === '' || pass.value === '';
  btn.classList.toggle('no-shift', !isEmpty);

  if (isEmpty) {
    btn.disabled = true;
    msg.style.color = 'rgb(218,49,49)';
    msg.style.fontSize = '14px';
    msg.innerText = 'Please fill the input fields before proceeding~';
  } else {
    msg.innerText = 'Great! Now you can proceed~';
    msg.style.color = '#ffb457';
    btn.disabled = false;
    btn.classList.add('no-shift');
  }
}

// Actions performed when “Log In” is clicked
btn.addEventListener('click', (e) => {
  e.preventDefault();

  const email = uname.value.trim();
  const password = pass.value.trim();

  if (email && password) {
    // Simulated login successful
    msg.innerText = 'Login successful!';
    msg.style.color = '#008404ff';

    // Simulated storage users
    const fakeUser = {
      name: email.split('@')[0],
      email: email,
      picture: 'images/login/fakeuser.png'
    };

    localStorage.setItem('starkit_user', JSON.stringify(fakeUser));

    // Update navigation bar avatar
    const navAvatar = document.getElementById('nav-avatar');
    navAvatar.src = fakeUser.picture;
    navAvatar.style.display = 'inline-block';

    // Close login pop-up
    setTimeout(() => {
      overlay.classList.remove('active');
    }, 800);
  } 
  
  else {
    msg.innerText = 'Please fill in all fields!';
    msg.style.color = 'rgb(218,49,49)';
  }
});

// =============== GOOGLE DECODE TOKEN ===============
function decodeJwtResponse(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

// =============== GOOGLE CALLBACK (MAIN) ===============
window.handleCredentialResponse = function(response) {
  const payload = decodeJwtResponse(response.credential);
  console.log("Google Login Success:", payload);

  // Save user
  localStorage.setItem('starkit_user', JSON.stringify(payload));

  // Show avatar
  const navAvatar = document.getElementById("nav-avatar");
  navAvatar.src = payload.picture;
  navAvatar.style.display = "inline-block";

  // Close login popup
  overlay.classList.remove("active");
};

// ---------------- Google Sign-In ----------------
const googleLoginBtn = document.getElementById('googleLogin');
googleLoginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  google.accounts.id.prompt(); // Trigger Google login window
})

// Prevent internal link refresh
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');

    // Internal page links
    if(href && !href.startsWith('http') && href !== '#') {
      e.preventDefault();           // Prevent refresh
      loadPage(href);               // Dynamically loaded content
      history.pushState({ page: href }, '', href); // Update URL
      setActiveLink(link);          // Update navigation highlighting
    }
  });
});

// Browser forward/back support
window.addEventListener('popstate', (e) => {
  if(e.state && e.state.page) {
    loadPage(e.state.page);
  }
});

// Load page content to main
function loadPage(page) {
  fetch(page)
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const mainContent = doc.querySelector('main');
      if(mainContent) {
        document.querySelector('main').innerHTML = mainContent.innerHTML;
      }
    });
}

// Update navigation highlighting
function setActiveLink(link) {
  const navItems = document.querySelectorAll('.nav-links li a');
  navItems.forEach(l => l.classList.remove('active'));
  quizBtn.classList.remove('active');
  loginBtn.classList.remove('active');
  link.classList.add('active');
}

// Home Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Add active class to home link in navigation
  const homeLink = document.querySelector('.nav-links li a[href="home.html"]');
  if (homeLink) {
    homeLink.classList.add('active');
  }
  
  // Handle quiz button click in hero section
  const heroQuizBtn = document.querySelector('.cta-button');
  const navQuizBtn = document.querySelector('.quiz-btn');
  
  if (heroQuizBtn) {
    heroQuizBtn.addEventListener('click', function(e) {
      e.preventDefault();
      // Add active state to quiz button in navigation
      const navItems = document.querySelectorAll('.nav-links li a');
      navItems.forEach(l => l.classList.remove('active'));
      navQuizBtn.classList.add('active');
      
      // Here you would typically redirect to the quiz page
      console.log('Redirect to quiz page');
    });
  }
});

// Fox Friends Cards Animation
document.addEventListener('DOMContentLoaded', function() {
  // Add click effect to individual cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', function() {
      // Add a temporary animation class
      this.style.transform = this.style.transform + ' scale(0.95)';
      setTimeout(() => {
        this.style.transform = this.style.transform.replace(' scale(0.95)', '');
      }, 300);
    });
  });
});

// Sticky Notes Carousel 
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('stickyCarousel');
  const items = document.querySelectorAll('.sticky-carousel img');
  
  if (items.length === 0) return;
  
  function duplicateItems() {
    const originalItems = Array.from(items);
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      carousel.appendChild(clone);
    });
  }
  
  // Initialization
  duplicateItems();
  
  const itemWidth = items[0].offsetWidth + 30; // Image width + gap
  let animation;
  
  function startAnimation() {
    // Reset position
    carousel.style.transform = 'translateX(0)';
    carousel.style.transition = 'none';
    
    // Start animation
    setTimeout(() => {
      carousel.style.transition = 'transform 20s linear infinite';
      carousel.style.transform = `translateX(-${itemWidth * 10}px)`; 
    }, 50);
  }
  
  function stopAnimation() {
    carousel.style.transition = 'none';
  }
  
  function resumeAnimation() {
    carousel.style.transition = 'transform 20s linear infinite';
    carousel.style.transform = `translateX(-${itemWidth * 10}px)`;
  }
  
  // Mouse hover control
  carousel.addEventListener('mouseenter', stopAnimation);
  carousel.addEventListener('mouseleave', resumeAnimation);
  
  // Responsive processing
  function handleResize() {
    const newItemWidth = items[0].offsetWidth + 30;
    if (newItemWidth !== itemWidth) {
      stopAnimation();
      setTimeout(startAnimation, 100);
    }
  }
  
  window.addEventListener('resize', handleResize);
  
  // Start animation
  startAnimation();
});

//FAQs
document.addEventListener("DOMContentLoaded", () =>{
  const questions = document.querySelectorAll(".faq-question");
  
  questions.forEach(question => {
    question.addEventListener("click", ()=> {
      question.classList.toggle("active");
      const answer = question.nextElementSibling;
      const icon = question.querySelector(".icon");
      
      if (answer.style.display === "block") {
        answer.style.display = "none";
        icon.textContent = "▾";
      } else {
        answer.style.display = "block";
        icon.textContent ="-";
      }
    });
  });
});
