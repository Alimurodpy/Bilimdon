// const users = [
//     { name: "Ism-familiya", points: 20 },
//     { name: "Ism-familiya", points: 20 },
//     { name: "Ism-familiya", points: 20 },
//     { name: "Ism-familiya", points: 20 },
//     { name: "Ism-familiya", points: 20 },
//     { name: "Ism-familiya", points: 20 },
//     { name: "Ism-familiya", points: 20 },
//   ];
  
//   function renderLeaderboard(data) {
//     const container = document.getElementById("leaderboard");
//     container.innerHTML = "";
//     data.forEach((user, index) => {
//       container.innerHTML += `
//         <div class="leader">
//           <span>${index + 1}</span>
//           <span>${user.name}</span>
//           <span>${user.points} ⭐</span>
//         </div>
//       `;
//     });
//   }
  
//   function changeTab(tab) {
//     const buttons = document.querySelectorAll(".tabs button");
//     buttons.forEach(btn => btn.classList.remove("active"));
//     event.target.classList.add("active");
  
//     // Bu yerda tab bo‘yicha filter qilsa bo‘ladi
//     renderLeaderboard(users); // Faqat demo
//   }
  
//   // Boshlang‘ich yuklash
//   renderLeaderboard(users);

  const data = {
    weekly: [
      { name: "Ism-familiya", score: 20 },
      { name: "Ism-familiya", score: 20 },
      { name: "Ism-familiya", score: 20 },
      { name: "Ism-familiya", score: 20 },
      { name: "Ism-familiya", score: 20 },
      { name: "Ism-familiya", score: 20 },
      { name: "Ism-familiya", score: 20 },
      { name: "Ism-familiya", score: 20 },
      { name: "Ism-familiya", score: 20 },
    ],
    monthly: [
      { name: "Ism-familiya", score: 20 },
      { name: "Ism-familiya", score: 20 },
      { name: "Ism-familiya", score: 20 }
    ],
    alltime: [
      { name: "Ism-familiya", score: 20 },
      { name: "Ism-familiya", score: 20 },
      { name: "Ism-familiya", score: 20 }
    ]
  };
  
  const tableBody = document.querySelector("#leaderboard-table tbody");
  const tabs = document.querySelectorAll(".tab");
  
  function renderTable(tabKey) {
    tableBody.innerHTML = "";
    const rows = data[tabKey];
  
    rows.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry.name}</td>
        <td>${entry.score} <span class="star">&#9733;</span></td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelector(".tab.active").classList.remove("active");
      tab.classList.add("active");
      renderTable(tab.dataset.tab);
    });
  });
  
  // Initial render
  renderTable("weekly");
  