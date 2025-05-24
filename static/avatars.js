let selectedAvatar = "default.png";
function changeAvatar(element) {
    const mainAvatar = document.getElementById("main-avatar");
    mainAvatar.src = element.src;
    selectedAvatar = element.src;
  }

  function saveAvatar() {
    // Сохраняем выбранный аватар в localStorage
    localStorage.setItem("chosenAvatar", selectedAvatar);
  
    // Переход на следующую страницу
    window.location.href = "home.html";
  }