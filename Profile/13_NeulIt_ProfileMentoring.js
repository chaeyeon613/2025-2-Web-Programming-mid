function parseDate(dateStr) {
    const match = dateStr.match(/(\d+)월\s*(\d+)일/);
    if (!match) return new Date("2100-01-01");
    const month = Number(match[1]);
    const day = Number(match[2]);
    return new Date(2025, month - 1, day);
  }
  
  document.addEventListener("DOMContentLoaded", () => {

      const container = document.querySelector(".mentoring-list");
      const tabBtns = document.querySelectorAll(".status-btn");
  
      const doneCard = document.querySelector(".done-fixed");
  
      let data = JSON.parse(localStorage.getItem("mentoringReservations") || "[]");
  
      data.sort((a, b) => parseDate(a.date) - parseDate(b.date));
  
      const today = new Date();
  
      function render(type) {
  
          if (type === "done") {
              container.innerHTML = "";
              if (doneCard) container.appendChild(doneCard);
              return;
            }
  
          container.innerHTML = "";
  
          let filtered = [];
  
          if (type === "all") {
              filtered = data.filter(m => parseDate(m.date) >= today);
            }
          if (type === "confirmed") {
              filtered = data.filter(m => parseDate(m.date) >= today);
            }
  
          filtered.forEach(m => {
              const card = `
                  <a href="../Mentoring/13_NeulIt_MentoringDetail.html" class="card-link">
                    <div class="mentoring-card">
                        <img src="../Images/woman1.jpg" class="mentor-img">
                        <h3 class="mentor-name">${m.mentor}</h3>
                        <p class="mentor-category">${m.field}</p>
  
                        <p class="mentoring-date">${m.date} ${m.time}</p>
                        <span class="mentoring-status confirmed">예약 확정</span>
                    </div>
                  </a>
              `;
              container.insertAdjacentHTML("beforeend", card);
            });
  
          if (type === "all" && doneCard) {
              container.appendChild(doneCard);
            }
        }
  
      render("all");
  
      tabBtns.forEach((btn, idx) => {
          btn.addEventListener("click", () => {
  
              tabBtns.forEach(b => b.classList.remove("active"));
  
              btn.classList.add("active");
  
              if (idx === 0) render("all");
              if (idx === 1) render("confirmed");
              if (idx === 2) render("done");
            });
        });
    }
);