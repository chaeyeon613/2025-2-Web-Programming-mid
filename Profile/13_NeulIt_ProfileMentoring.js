let userData = {};
let currentUser = "";

// User.json 로드
async function loadUser() {
    try {
        const res = await fetch("/13_NeulIt_User.json");
        userData = await res.json();
        currentUser = userData.userId || "neulit";
    } catch (e) {
        console.error("User.json 로드 실패:", e);
    }
}

// 프로필 상단 아이디/이름 적용
function applyProfileHeader() {
    const idEl = document.querySelector(".profile-id");
    const nameEl = document.querySelector(".profile-name");

    if (idEl) idEl.textContent = userData.userId || "사용자";
    if (nameEl) nameEl.textContent = userData.name || "사용자";
}

// JSON + localStorage 병합
function mergeMentoring(jsonArr = [], localArr = []) {
    const map = new Map();

    [...jsonArr, ...localArr].forEach(m => {
        const key = `${m.mentor}_${m.date}_${m.time}`;
        map.set(key, m);
    });

    return [...map.values()];
}

// 날짜 파싱
function parseDateToObj(str) {
    const match = str.match(/(\d+)월\s*(\d+)일/);
    if (!match) return null;
    return new Date(2025, match[1] - 1, match[2]);
}

// 멘토 정보 매칭
function attachMentorInfo(list) {
    if (typeof allMentors === "undefined") return list;

    return list.map(m => {
        const cleanName = m.mentor.replace(" 멘토", "").trim();

        for (const key in allMentors) {
            const info = allMentors[key];
            if (info.name === cleanName) {
                return {
                    ...m,
                    id: info.id,
                    img: info.img,
                    field: info.job
                };
            }
        }
        return m;
    });
}

// 카드 렌더링
function renderMentoringList(list, container) {
    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = `<p class="empty-text">해당되는 멘토링이 없습니다.</p>`;
        return;
    }

    list.forEach(m => {
        const imgSrc = m.img || "../Images/woman1.jpg";
        const idParam = m.id ? `?id=${m.id}` : "";

        const card = `
            <a href="../Mentoring/13_NeulIt_MentoringDetail.html${idParam}" class="card-link">
                <div class="mentoring-card">
                    <img src="${imgSrc}" class="mentor-img">
                    <h3 class="mentor-name">${m.mentor}</h3>
                    <p class="mentor-category">${m.field || ""}</p>
                    <p class="mentoring-date">${m.date} ${m.time}</p>
                    <span class="mentoring-status confirmed">예약 확정</span>
                </div>
            </a>
        `;
        container.insertAdjacentHTML("beforeend", card);
    });
}

// 메인 실행
document.addEventListener("DOMContentLoaded", async () => {

    await loadUser();
    applyProfileHeader();

    const container = document.querySelector(".mentoring-list");
    const tabBtns = document.querySelectorAll(".status-btn");
    const doneCard = document.querySelector(".done-fixed");

    const localData = JSON.parse(localStorage.getItem("mentoringReservations") || "[]");
    const jsonData = userData.mentoringReservations || [];

    let merged = mergeMentoring(jsonData, localData);
    merged = attachMentorInfo(merged);

    merged.sort((a, b) => parseDateToObj(a.date) - parseDateToObj(b.date));

    const today = new Date();

    function renderTab(type) {
        let target = [];

        if (type === "all") {
            target = merged.filter(m => parseDateToObj(m.date) >= today);
            renderMentoringList(target, container);
            if (doneCard) container.appendChild(doneCard);
        }

        if (type === "confirmed") {
            target = merged.filter(m => parseDateToObj(m.date) >= today);
            renderMentoringList(target, container);
        }

        if (type === "done") {
            target = merged.filter(m => parseDateToObj(m.date) < today);
            container.innerHTML = "";

            if (doneCard) container.appendChild(doneCard);

            target.forEach(m => {
                const imgSrc = m.img || "../Images/woman1.jpg";
                const card = `
                    <div class="mentoring-card">
                        <img src="${imgSrc}" class="mentor-img">
                        <h3 class="mentor-name">${m.mentor}</h3>
                        <p class="mentor-category">${m.field || ""}</p>
                        <p class="mentoring-date">${m.date} ${m.time}</p>
                        <span class="mentoring-status done">이용 완료</span>
                    </div>
                `;
                container.insertAdjacentHTML("beforeend", card);
            });
        }
    }

    renderTab("all");

    tabBtns.forEach((btn, idx) => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            if (idx === 0) renderTab("all");
            if (idx === 1) renderTab("confirmed");
            if (idx === 2) renderTab("done");
        });
    });
});