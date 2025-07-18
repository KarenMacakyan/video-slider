document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.video-container');
  const videos = container.querySelectorAll('video');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const dotsContainer = document.getElementById('video-dots');
  const titleEl = document.getElementById('videoTitle');
  const titles = ["Видео 1", "Видео 2", "Видео 3", "Видео 4", "Видео 5"];

  let current = 0;
  const total = videos.length;
  const dots = [];

  function showVideo(index) {
    videos.forEach((v) => {
      v.pause();
      v.currentTime = 0;
    });

    container.style.transform = `translateX(-${index * 100}vw)`;
    videos[index].play();

    dots.forEach(dot => {
      dot.classList.remove('active');
      dot.style.setProperty('--duration', '0s');
    });

    const duration = videos[index].duration || 5;
    dots[index].classList.add('active');
    dots[index].style.setProperty('--duration', `${duration}s`);

    titleEl.textContent = titles[index];
    titleEl.style.animation = 'none';
    void titleEl.offsetWidth;
    titleEl.style.animation = 'fadeSlide 1.5s ease forwards';

    clearTimeout(showVideo.timeout);
    showVideo.timeout = setTimeout(() => {
      current = (current + 1) % total;
      showVideo(current);
    }, duration * 1000);
  }

  videos.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
      current = i;
      showVideo(current);
    });
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + total) % total;
    showVideo(current);
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % total;
    showVideo(current);
  });

  // свайп
  let startX = 0;
  const slider = document.getElementById("slider");

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      current = (current + 1) % total;
      showVideo(current);
    } else if (endX - startX > 50) {
      current = (current - 1 + total) % total;
      showVideo(current);
    }
  });

  videos[0].addEventListener('loadedmetadata', () => {
    showVideo(0);
  });
});
