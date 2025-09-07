// Responsive carousel: supports multiple carousels, auto-wraps raw <img>, handles resize
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    if (!track) return;

    // Wrap raw imgs into .carousel-slide if not already wrapped
    if (track.querySelectorAll('.carousel-slide').length === 0) {
      const imgs = Array.from(track.querySelectorAll('img'));
      imgs.forEach(img => {
        const wrap = document.createElement('div');
        wrap.className = 'carousel-slide';
        img.parentNode.insertBefore(wrap, img);
        wrap.appendChild(img);
      });
    }

    const slideNodes = Array.from(track.querySelectorAll('.carousel-slide'));
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');

    let currentIndex = 0;

    function update(noTransition = false) {
      if (noTransition) track.style.transition = 'none';
      const w = carousel.getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * w}px)`;
      if (noTransition) {
        // force reflow before restoring transition
        track.offsetHeight;
        track.style.transition = 'transform 0.45s ease-in-out';
      }
    }

    // Init after images load
    function initAfterImagesLoaded() {
      const imgs = track.querySelectorAll('img');
      const promises = Array.from(imgs).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => img.addEventListener('load', resolve));
      });
      Promise.all(promises).then(() => {
        update(true); // initial position, no transition
      });
    }

    initAfterImagesLoaded();

    function setSlideWidths() {
      const w = carousel.getBoundingClientRect().width;
      slideNodes.forEach(slide => {
        slide.style.width = `${w}px`;
      });
    }


    // Button controls
    nextBtn && nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slideNodes.length;
      update();
    });

    prevBtn && prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slideNodes.length) % slideNodes.length;
      update();
    });

    // Recompute on resize (no transition)
    let resizeTimer;
   window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setSlideWidths();
      update(true);
    }, 150);
});

  });
});
