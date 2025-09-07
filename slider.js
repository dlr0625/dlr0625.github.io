document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prevButton = carousel.querySelector('.prev');
  const nextButton = carousel.querySelector('.next');
  
  let currentIndex = 0;

  function updateCarousel() {
    const slideWidth = carousel.offsetWidth; // dynamically get width
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  // Update when window is resized
  window.addEventListener('resize', updateCarousel);
});
