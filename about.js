// About page features
document.addEventListener('DOMContentLoaded', function() {
    console.log('About page loaded successfully');
});

// Ribbon animation
function initRibbonAnimation() {
  const testSection = document.querySelector('.test-section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, {
    threshold: 0.3, 
    rootMargin: '0px 0px -50px 0px' 
  });

  if (testSection) {
    observer.observe(testSection);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  initRibbonAnimation();
});

// Section 5 & 6
document.addEventListener('DOMContentLoaded', function() {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px' // 提前100px检测
  });

  // Observe sections
  const sections = document.querySelectorAll('.section-five-six');
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
});

// Section 7 
document.addEventListener('DOMContentLoaded', function() {
  const sectionSevenObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -25px 0px'
  });

  const sectionSeven = document.querySelector('.section-seven');
  if (sectionSeven) {
    sectionSevenObserver.observe(sectionSeven);
  }
});

// Section 8 Observer
document.addEventListener('DOMContentLoaded', function() {
  const sectionEightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -25px 0px'
  });

  const sectionEight = document.querySelector('.section-eight');
  if (sectionEight) {
    sectionEightObserver.observe(sectionEight);
  }
});