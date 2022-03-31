'use strict';

// Bubbling event
const navbar__list = document.querySelectorAll('.navbar__list');
const nav__bar = document.querySelector('.nav-bar');
const list = document.querySelectorAll('li');
const nav__link = document.querySelector('.nav__link');

nav__bar.addEventListener('mouseover', function (e) {
  const mouseOvered = e.target;

  document.querySelectorAll('.nav__link').forEach(li => {
    li.style.opacity = 0.5;
  });
});

// nav__bar.addEventListener('mouseout', function (e) {
//   const mouseOvered = e.target;
//   document.querySelectorAll('li').forEach(li => {
//     mouseOvered.style.opacity = 1;
//     li.style.opacity = 1;
//   });
// });

// Sticky Navigation
