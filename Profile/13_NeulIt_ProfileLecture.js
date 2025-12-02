document.addEventListener("DOMContentLoaded", () => {
    const lectureList = document.querySelector(".lecture-list");
    const btnStudying = document.querySelector(".status-btn:nth-child(1)");
    const btnCompleted = document.querySelector(".status-btn:nth-child(2)");

    const purchased = JSON.parse(localStorage.getItem("purchased") || "[]");

    // 강의 렌더링
    function renderLectures(status) {
        lectureList.innerHTML = "";

        const completedStore = JSON.parse(localStorage.getItem("completedLectures") || "{}");

        purchased.forEach(id => {
            const c = allCourses[id];
            if (!c) return;

            const allLectures = [];
            c.sections?.forEach(sec => sec.lectures.forEach(lec => allLectures.push(lec)));

            const total = allLectures.length;
            const done = allLectures.filter(
                lec => (completedStore[id] || {})[lec.lectureId]
            ).length;

            const rate = total === 0 ? 0 : Math.round((done / total) * 1000) / 10;

            if (status === "studying" && rate === 100) return;
            if (status === "completed" && rate < 100) return;

            const card = document.createElement("a");
            card.href = `../Player/13_NeulIt_Player.html?courseId=${id}`;
            card.className = "card-link";

            card.innerHTML = `
                <div class="lecture-card">
                    <img src="${c.thumbnail}" class="lecture-thumb">
                    <div class="lecture-info">
                        <h3 class="lecture-title">${c.title}</h3>
                        <p class="lecture-author">${c.instructor} | 무제한 수강</p>

                        <div class="lecture-progress">
                            <div class="progress-bar" style="width: ${rate}%;"></div>
                        </div>
                        <p class="lecture-status">${rate}% 완료</p>
                    </div>
                </div>
            `;

            lectureList.appendChild(card);
        });

    }

    renderLectures("studying");

    // 버튼 이벤트
    btnStudying.addEventListener("click", () => {
        btnStudying.classList.add("active");
        btnCompleted.classList.remove("active");
        renderLectures("studying");
    });

    btnCompleted.addEventListener("click", () => {
        btnCompleted.classList.add("active");
        btnStudying.classList.remove("active");
        renderLectures("completed");
    });
});
