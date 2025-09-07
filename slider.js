// script.js  — robust multiple-carousel handler with debug logs
document.addEventListener('DOMContentLoaded', () => {
  const carousels = Array.from(document.querySelectorAll('.carousel'));
  console.log('[carousel] found carousels:', carousels.length);

  carousels.forEach((carousel, i) => {
    try {
      const track = carousel.querySelector('.carousel-track');
      if (!track) {
        console.warn(`[carousel ${i}] missing .carousel-track — skipping`);
        return;
      }

      // Ensure every image is wrapped in a .carousel-slide
      let slides = Array.from(track.querySelectorAll('.carousel-slide'));
      if (slides.length === 0) {
        const imgs = Array.from(track.querySelectorAll('img'));
        if (imgs.length === 0) {
          console.warn(`[carousel ${i}] no .carousel-slide and no <img> children found — skipping`);
          return;
        }
        // wrap imgs into .carousel-slide
        imgs.forEach(img => {
          const wrapper = document.createElement('div');
          wrapper.className = 'carousel-slide';
          img.parentNode.insertBefore(wrapper, img);
          wrapper.appendChild(img);
        });
        slides = Array.from(track.querySelectorAll('.carousel-slide'));
        console.log(`[carousel ${i}] wrapped ${slides.length} images into .carousel-slide`);
      }

      const prevButton = carousel.querySelector('.carousel-btn.prev') || carousel.querySelector('.prev');
      const nextButton = carousel.querySelector('.carousel-btn.next') || carousel.querySelector('.next');

      if (!prevButton || !nextButton) {
        console.warn(`[carousel ${i}] prev/next button not found. prev:${!!prevButton} next:${!!nextButton}`);
      }

      let currentIndex = 0;
      let animating = false;

      function updateCarousel(animate = true) {
        const slideWidth = carousel.getBoundingClientRect().width;
        if (!animate) {
          track.style.transition = 'none';
        } else {
          track.style.transition = 'transform 0.45s ease-in-out';
        }
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        // re-enable transition after disabling
        if (!animate) requestAnimationFrame(() => track.style.transition = 'transform 0.45s ease-in-out');
      }

      nextButton && nextButton.addEventListener('click', () => {
        if (animating) return;
        animating = true;
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel(true);
        setTimeout(() => animating = false, 480);
      });

      prevButton && prevButton.addEventListener('click', () => {
        if (animating) return;
        animating = true;
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel(true);
        setTimeout(() => animating = false, 480);
      });

      // Responsive: recompute transform on resize
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        // small debounce to avoid too many reflows
        resizeTimer = setTimeout(() => updateCarousel(false), 120);
      });

      // init position
      updateCarousel(false);
      console.log(`[carousel ${i}] initialized — slides: ${slides.length}`);

    } catch (err) {
      console.error(`[carousel ${i}] error:`, err);
    }
  });
});
