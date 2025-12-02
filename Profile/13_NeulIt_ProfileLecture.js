document.addEventListener("DOMContentLoaded", () => {
    const lectureList = document.querySelector(".lecture-list");
    const btnStudying = document.querySelector(".status-btn:nth-child(1)");
    const btnCompleted = document.querySelector(".status-btn:nth-child(2)");
    const sortSelect = document.getElementById("sortSelect");
    const sortContainer = document.querySelector(".lecture-dropdown");

    const purchased = JSON.parse(localStorage.getItem("purchased") || "[]");

    // 진행률 계산 함수
    function getRate(id) {
        const c = allCourses[id];
        if (!c) return 0;

        const completedStore = JSON.parse(localStorage.getItem("completedLectures") || "{}");

        const all = [];
        c.sections?.forEach(sec => sec.lectures.forEach(lec => all.push(lec)));

        const total = all.length;
        const done = all.filter(lec => (completedStore[id] || {})[lec.lectureId]).length;

        return total === 0 ? 0 : Math.floor((done / total) * 100);
    }

    // 정렬 함수
    function sortCourses(list, sortType, progress) {
        if (sortType === "latest") {
            return list.sort((a, b) => {
                const A = progress.find(p => p.id === a)?.lastPlayed;
                const B = progress.find(p => p.id === b)?.lastPlayed;
    
                if (!A) return 1;
                if (!B) return -1;
    
                return new Date(B) - new Date(A);
            });
        }
    
        if (sortType === "rate") {
            return list.sort((a, b) => getRate(b) - getRate(a));
        }
    
        return list;
    }
    

    // 강의 렌더링
    function renderLectures(status) {
        lectureList.innerHTML = "";

        let list = purchased.slice();

        let progress = JSON.parse(localStorage.getItem("lectureProgress") || "[]");

        if (status === "studying") {
            sortContainer.style.display = "block";
            list = sortCourses(list, sortSelect.value, progress);
        } else {
            sortContainer.style.display = "none";
        }

        const completedStore = JSON.parse(localStorage.getItem("completedLectures") || "{}");

        list.forEach(id => {
            const c = allCourses[id];
            if (!c) return;

            const rate = getRate(id);

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

    // 탭 전환 이벤트
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

    // 정렬 선택 이벤트
    sortSelect.addEventListener("change", () => {
        renderLectures("studying");
    });

    renderLectures("studying");
});