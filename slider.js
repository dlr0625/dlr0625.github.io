const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

let currentIndex = 0;

function updateSlide(index) {
  const width = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${index * width}px)`;
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlide(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlide(currentIndex);
});
