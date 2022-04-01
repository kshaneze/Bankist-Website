'use strict';

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

let callBack = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      nav__bar.classList.add('sticky__nav');
    } else {
      nav__bar.classList.remove('sticky__nav');
    }
  });
};

let options = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};

let observer = new IntersectionObserver(callBack, options);

observer.observe(header);
