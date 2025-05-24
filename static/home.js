const savedAvatar = localStorage.getItem("chosenAvatar");
if (savedAvatar) {
  const avatarElement = document.getElementById("profile-photo");
  if (avatarElement) {
    avatarElement.src = savedAvatar;
  }
}
