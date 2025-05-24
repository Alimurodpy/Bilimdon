document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('startBtn');
    if (btn) {
      btn.addEventListener('click', function () {
        window.location.href = 'start.html'; // Замените на ваш путь
      });
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('registerBtn');
    if (btn) {
      btn.addEventListener('click', function () {
        window.location.href = 'registration.html'; // Замените на ваш путь
      });
    }
  });