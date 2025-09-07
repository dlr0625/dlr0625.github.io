// Responsive carousel: ensures slides fit carousel width, supports multiple carousels
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    if (!track) return;

    // Wrap raw images in .carousel-slide if needed
    if (track.querySelectorAll('.carousel-slide').length === 0) {
      Array.from(track.querySelectorAll('img')).forEach(img => {
        const wrap = document.createElement('div');
        wrap.className = 'carousel-slide';
        img.parentNode.insertBefore(wrap, img);
        wrap.appendChild(img);
      });
    }

    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    let currentIndex = 0;

    // Set slide width to fit carousel
    function setSlideWidths() {
      const w = carousel.clientWidth;
      slides.forEach(slide => slide.style.width = `${w}px`);
    }

    function update(noTransition = false) {
      if (noTransition) track.style.transition = 'none';
      const w = carousel.clientWidth;
      track.style.transform = `translateX(-${currentIndex * w}px)`;
      if (noTransition) {
        // Force reflow then restore transition
        track.offsetHeight;
        track.style.transition = 'transform 0.45s ease-in-out';
      }
    }

    // Wait until images load to set initial widths
    const imgs = track.querySelectorAll('img');
    const loadPromises = Array.from(imgs).map(img => img.complete ? Promise.resolve() : new Promise(r => img.addEventListener('load', r)));
    Promise.all(loadPromises).then(() => {
      setSlideWidths();
      update(true);
    });

    // Button navigation
    nextBtn?.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      update();
    });

    prevBtn?.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      update();
    });

    // Resize handling
    window.addEventListener('resize', () => {
      setSlideWidths();
      update(true);
    });
  });
});
