"use strict";
const name = document.querySelector(".name");
const text = "i'm Mohammed abd elaziz".split("");
const nav = document.querySelector(".nav-bar");
const aboutSection = document.querySelector("#about");
const arrowDown = document.querySelector("[data-arrow='about']");
const arrowUp = document.querySelector("[data-arrow='home']");
const skillsSection = document.querySelector(".skills-section");
const header = document.querySelector(".header");
const allSections = document.querySelectorAll("[data-section='section']");
const links = document.querySelectorAll(".nav-link");
const homeSection = document.querySelector("#home");
let time = 500;

for (let i = 0; i < text.length; i++) {
  time += 130;
  setTimeout(() => {
    name.textContent += text[i];
  }, time);
}

// nav-links scroll smaoth
nav.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// sticky nav-bar

const navHeight = nav.getBoundingClientRect().height;
const navSticky = function (entires) {
  const [entire] = entires;

  if (!entire.isIntersecting) {
    nav.classList.add("sticky");
  } else nav.classList.remove("sticky");
};

const navObserve = new IntersectionObserver(navSticky, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
navObserve.observe(header);

// arrow smooth scroll
const goTo = function (arrow, section) {
  arrow.addEventListener("click", (e) => {
    e.preventDefault();
    section.scrollIntoView({ behavior: "smooth" });
  });
};
goTo(arrowDown, aboutSection);
goTo(arrowUp, homeSection);

// reveal section
const revealMethod = function (entires, observer) {
  const [entiry] = entires;
  if (!entiry.isIntersecting) return;

  entiry.target.classList.remove("section--hidden");
  observer.unobserve(entiry.target);
};

const revealSection = new IntersectionObserver(revealMethod, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  section.classList.add("section--hidden");
  revealSection.observe(section);
});
