let index = 0;
const slides = document.querySelector(".slides");
const totalSlides = slides.children.length;
const slideWidth = 600; // must match .slider width in CSS

function showSlide() {
  index = (index + 1) % totalSlides;
  slides.style.transform = `translateX(${-index * slideWidth}px)`;
}

setInterval(showSlide, 3000); // auto slide every 3s
