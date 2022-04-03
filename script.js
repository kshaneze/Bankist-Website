'use strict';
// Scroll on button
const btnLearnMore = document.querySelector('.btn__learn-more');

const scrollToSection = function () {
  const section = document.getElementById('section-1');
  section.scrollIntoView({ behavior: 'smooth' });
};
btnLearnMore.addEventListener('click', scrollToSection);

// Bubbling event
const navbar__list = document.querySelectorAll('.navbar__list');
const nav__bar = document.querySelector('.nav-bar');
const list = document.querySelectorAll('li');
const nav__link = document.querySelector('.nav__link');

// Selecting every element in navbar, except the one that is mouseovered,  and chaging opacity so we get this amazing effect

const mouseHandler = function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const clicked = e.target;

    const links = clicked.closest('.nav-bar').querySelectorAll('.nav__link');
    const logo = clicked.closest('.nav-bar').querySelector('.navbar__logo');

    links.forEach(el => {
      if (el !== clicked) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

nav__bar.addEventListener('mouseover', mouseHandler.bind(0.5));
// This function just brings everything back to normal as soon as we leave navbar
nav__bar.addEventListener('mouseout', mouseHandler.bind(1));

// Smooth scrolling
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    document
      .querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// Sticky Navigation

const header = document.querySelector('.section__header');

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav__bar.classList.add('sticky__nav');
  else nav__bar.classList.remove('sticky__nav');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-90px`,
});

headerObserver.observe(header);

// Tabbed components

const tabContainer = document.querySelector('.content__box-container');
// Selecting whole  Box Container and adding eventListener to it
tabContainer.addEventListener('click', function (e) {
  e.preventDefault();

  // Then with closest method search for closest button element
  const clickButton = e.target.closest('.btn');

  // If click event is not element with class btn, do nothing (return);
  if (!clickButton) return;
  const clicked = e.target;

  // Selecting clicked button (all of them)
  const buttons = clicked
    .closest('.content__box-buttons')
    .querySelectorAll('.btn');

  // In this forEach method
  buttons.forEach(button => {
    // If click event is on one of these 3 buttons, add active-box class only to clicked button
    if (clicked === button) {
      button.classList.add('active-box');
    } else {
      // And for other buttons remove active-box class
      button.classList.remove('active-box');
    }
  });

  // Selecting all text-box containers
  const boxes = document.querySelectorAll('.text-box');

  // ForEach box add hidden class
  boxes.forEach(box => {
    box.classList.add('hidden');
  });

  // In this step the right text container has to be selected, in order to display appropriate content for clicked button
  // This is done with selection of box__contnet class (they have 1, 2, 3 on the end of class) and buttons with id  1 2 3
  // We Select .box__content--(and then add number to it, equal to clicked button id)${1, 2, 3}
  document
    .querySelector(`.box__content--${clicked.getAttribute('id')}`)
    .classList.remove('hidden');
});

// Scroll components

const sliderBtnRight = document.querySelector('.slider__btn--right');
const sliderBtnLeft = document.querySelector('.slider__btn--left');
const slides = document.querySelectorAll('.slides');

let maxSlides = slides.length;
let currentSlide = 0;

// Dots
const dotsContainer = document.querySelector('.dots__container');

// Create dots
const createDots = function () {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots" data-slide="${i}"></button>`
    );
  });
};
createDots();

// Activate acitve class on current dot
const activateDot = function (slide) {
  const dots = document.querySelectorAll('.dots');
  dots.forEach(dot => {
    dot.classList.remove('active__dot');
  });

  document
    .querySelector(`.dots[data-slide="${slide}"]`)
    .classList.add('active__dot');
};
activateDot(0);

//

// Implementing sliding functionality
const gotoSlide = function (slide) {
  slides.forEach((el, i) => {
    el.style.transform = `translateX(${80 * (i - slide)}rem)`;
  });
};
gotoSlide(0);

const rightSlide = function () {
  if (currentSlide === maxSlides - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  gotoSlide(currentSlide);
  activateDot(currentSlide);
};

const leftSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlides - 1;
  } else {
    currentSlide--;
  }
  gotoSlide(currentSlide);
  activateDot(currentSlide);
};

sliderBtnRight.addEventListener('click', rightSlide);
sliderBtnLeft.addEventListener('click', leftSlide);

// Adding functionality on keys
document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowLeft') {
    leftSlide();
  }
  if (event.key === 'ArrowRight') rightSlide();
});

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots')) {
    const slide = e.target.dataset.slide;
    gotoSlide(slide);
    activateDot(slide);
  }
});

// Reveal sections on scroll

const sections = document.querySelectorAll('.section');

const revealSections = function (entries, observe) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.remove('section-hidden');
  } else {
    return;
  }
  observe.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});

sections.forEach(section => {
  section.classList.add('section-hidden');
  sectionObserver.observe(section);
});

// const stickyNav = function (entries) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) nav__bar.classList.add('sticky__nav');
//   else nav__bar.classList.remove('sticky__nav');
// };

// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-90px`,
// });

// headerObserver.observe(header);
