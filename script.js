document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.video-container');
  const videos = container.querySelectorAll('video');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const dotsContainer = document.getElementById('video-dots');

  let current = 0;
  const total = videos.length;

  function showVideo(index) {
    // Останавливаем все видео
    videos.forEach(v => {
      v.pause();
      v.currentTime = 0;
    });

    // Смещаем контейнер
    container.style.transform = `translateX(-${index * 100}vw)`;

    // Воспроизводим выбранное
    videos[index].play();

    // Обновляем активную точку
    updateDots();
  }

  function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  // Добавляем точки
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === current) dot.classList.add('active');
    dot.addEventListener('click', () => {
      current = i;
      showVideo(current);
    });
    dotsContainer.appendChild(dot);
  }

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + total) % total;
    showVideo(current);
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % total;
    showVideo(current);
  });

  // Воспроизведение первого видео
  showVideo(current);
});
