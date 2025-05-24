// let selectedAvatar = "default.png";
// function changeAvatar(element) {
//     const mainAvatar = document.getElementById("main-avatar");
//     mainAvatar.src = element.src;
//     selectedAvatar = element.src;
//   }

//   function saveAvatar() {
//     // Сохраняем выбранный аватар в localStorage
//     localStorage.setItem("chosenAvatar", selectedAvatar);
  
//   }


  const savedAvatar = localStorage.getItem("chosenAvatar");
  if (savedAvatar) {
    const avatarElement = document.getElementById("profile-photo");
    if (avatarElement) {
      avatarElement.src = savedAvatar;
    }
  }