// responsive carousel: uses carousel.clientWidth for sliding, handles multiple carousels
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach((carousel, idx) => {
    const track = carousel.querySelector('.carousel-track');
    if (!track) return;
    // ensure slide wrappers exist (.carousel-slide)
    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    const prevBtn = carousel.querySelector('.carousel-btn.prev') || carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next') || carousel.querySelector('.next');

    if (slides.length === 0) {
      // wrap any raw imgs into .carousel-slide automatically
      const imgs = Array.from(track.querySelectorAll('img'));
      imgs.forEach(img => {
        const wrap = document.createElement('div');
        wrap.className = 'carousel-slide';
        img.parentNode.insertBefore(wrap, img);
        wrap.appendChild(img);
      });
    }

    const slideNodes = Array.from(track.querySelectorAll('.carousel-slide'));
    let currentIndex = 0;

    function update() {
      const w = carousel.getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * w}px)`;
    }

    // Init after images have loaded — helps with layout
    function initAfterImagesLoaded() {
      const imgs = track.querySelectorAll('img');
      const imgPromises = Array.from(imgs).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => img.addEventListener('load', resolve));
      });
      Promise.all(imgPromises).then(() => {
        // initial set
        update();
        // small tick to ensure transition isn't applied on first paint
        requestAnimationFrame(() => track.style.transition = 'transform 0.45s ease-in-out');
      });
    }

    initAfterImagesLoaded();

    nextBtn && nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slideNodes.length;
      update();
    });

    prevBtn && prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slideNodes.length) % slideNodes.length;
      update();
    });

    // Recompute on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(update, 120);
    });
  });
});
