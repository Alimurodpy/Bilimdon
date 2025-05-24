function submitForm() {
    const fullname = document.getElementById("fullname").value;
    const birthdate = document.getElementById("birthdate").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
  
    if (!fullname || !birthdate || !phone || !password) {
      alert("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }
  
    // Bu yerda siz ma'lumotlarni serverga yuborishingiz yoki boshqa sahifaga o'tishingiz mumkin
    alert("Ro'yxatdan o'tish muvaffaqiyatli!");
  
    // Misol: boshqa sahifaga o'tish
    window.location.href = "avatars.html";
  }