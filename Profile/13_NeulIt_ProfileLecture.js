let userData = {};
let currentUser = "neulit";


// User.json 로드
async function loadUser() {
    try {
        const res = await fetch("/13_NeulIt_User.json");
        userData = await res.json();

        userData.userId = "neulit";
        userData.name = userData.name || "늘잇";

    } catch (e) {
        console.error("User.json 로드 실패:", e);
    }
}


// 프로필 상단 정보 적용
function applyProfileHeader() {
    const idEl = document.querySelector(".profile-id");
    const nameEl = document.querySelector(".profile-name");

    if (idEl) idEl.textContent = "neulit";
    if (nameEl) nameEl.textContent = userData.name || "늘잇";
}


// localStorage 헬퍼
function loadArray(key) {
    return JSON.parse(localStorage.getItem(`${key}_neulit`) || "[]");
}

function saveArray(key, arr) {
    localStorage.setItem(`${key}_neulit`, JSON.stringify(arr));
}

function loadObject(key) {
    return JSON.parse(localStorage.getItem(`${key}_neulit`) || "{}");
}

function saveObject(key, obj) {
    localStorage.setItem(`${key}_neulit`, JSON.stringify(obj));
}


// 메인 로직
document.addEventListener("DOMContentLoaded", async () => {

    await loadUser();
    applyProfileHeader();

    // localStorage 데이터 불러오기
    const purchasedLocal = loadArray("purchased");
    const completedLocal = loadObject("completedLectures");
    const recentLocal = loadArray("recentLectures");

    // JSON + local 병합
    const purchased = Array.from(
        new Set([...(userData.purchased || []), ...purchasedLocal])
    );

    const completedStore = {
        ...(userData.completedLectures || {}),
        ...(completedLocal || {})
    };

    const recent = [...recentLocal];

    // DOM 요소 가져오기
    const lectureList = document.querySelector(".lecture-list");
    const certificateList = document.querySelector(".certificate-list");
    const statusContainer = document.querySelector(".profile-status");
    const sortContainer = document.querySelector(".lecture-dropdown");

    const btnStudying = document.querySelector(".status-btn:nth-child(1)");
    const btnCompleted = document.querySelector(".status-btn:nth-child(2)");
    const sortSelect = document.getElementById("sortSelect");

    const tabBtns = document.querySelectorAll(".profile-tabs .tab-btn");


    // URL 파라미터에 따라 탭 유지
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");

    function activateTab(tab) {
        tabBtns.forEach(btn => btn.classList.remove("active"));

        if (tab === "certificate") {
            tabBtns[1].classList.add("active");
            renderCertificates();
        } else {
            tabBtns[0].classList.add("active");
            renderLectures("studying");
        }
    }

    activateTab(tabParam);


    // 완강률 계산
    function getRate(courseId) {
        const c = allCourses[courseId];
        if (!c) return 0;

        const doneMap = completedStore[courseId] || {};

        const lectures = c.sections.flatMap(s => s.lectures);
        const total = lectures.length;
        const completed = lectures.filter(lec => doneMap[lec.lectureId]).length;

        return Math.floor((completed / total) * 100);
    }


    // 정렬
    function sortCourses(list, type) {
        if (type === "latest") {
            return list.sort((a, b) => {
                const A = recent.find(r => r.courseId == a);
                const B = recent.find(r => r.courseId == b);

                if (!A && !B) return 0;
                if (!A) return 1;
                if (!B) return -1;

                return new Date(B.lastPlayed) - new Date(A.lastPlayed);
            });
        }

        if (type === "rate") {
            return list.sort((a, b) => getRate(b) - getRate(a));
        }

        return list;
    }


    // 강의 목록 렌더링
    function renderLectures(mode) {

        lectureList.style.display = "block";
        certificateList.style.display = "none";

        statusContainer.style.display = "flex";
        sortContainer.style.display = mode === "completed" ? "none" : "block";

        lectureList.innerHTML = "";

        if (purchased.length === 0) {
            lectureList.innerHTML = `<p style="color:#777;">구매한 강의가 없습니다.</p>`;
            return;
        }

        let list = sortCourses([...purchased], sortSelect.value);

        let count = 0;

        list.forEach(id => {
            const c = allCourses[id];
            if (!c) return;

            const rate = getRate(id);

            if (mode === "studying" && rate === 100) return;
            if (mode === "completed" && rate < 100) return;

            count++;

            const card = document.createElement("a");
            card.href = `../Player/13_NeulIt_Player.html?courseId=${id}`;
            card.className = "card-link";

            lectureList.appendChild(card);

            card.innerHTML = `
                <div class="lecture-card">
                    <img src="${c.thumbnail}" class="lecture-thumb">
                    <div class="lecture-info">
                        <h3 class="lecture-title">${c.title}</h3>
                        <p class="lecture-author">${c.instructor} | 무제한 수강</p>
                        <div class="lecture-progress">
                            <div class="progress-bar" style="width:${rate}%"></div>
                        </div>
                        <p class="lecture-status">${rate}% 완료</p>
                    </div>
                </div>
            `;
        });

        if (count === 0) {
            lectureList.innerHTML =
                `<p style="color:#777;">${
                    mode === "studying" ? "학습 중인 강의가 없습니다." : "수료한 강의가 없습니다."
                }</p>`;
        }
    }


    // 수료증 렌더링
    function renderCertificates() {

        lectureList.style.display = "none";
        certificateList.style.display = "block";

        statusContainer.style.display = "none";
        sortContainer.style.display = "none";

        const box = document.querySelector(".certificate-list");
        box.innerHTML = "";

        const completedCourses = purchased.filter(id => {
            const c = allCourses[id];
            if (!c) return false;

            const doneMap = completedStore[id] || {};
            const total = c.sections.reduce((sum, s) => sum + s.lectures.length, 0);
            const done = Object.values(doneMap).filter(v => v).length;

            return total === done;
        });

        if (completedCourses.length === 0) {
            box.innerHTML = `<p style="color:#777;">아직 수료한 강의가 없습니다.</p>`;
            return;
        }

        completedCourses.forEach(id => {
            const c = allCourses[id];

            box.innerHTML += `
                <div class="cert-card">
                    <img src="${c.thumbnail}">
                    <div class="cert-info">
                        <p class="cert-title">${c.title}</p>
                        <p class="cert-instructor">${c.instructor}</p>
                    </div>
                    <button class="cert-btn" data-id="${id}">수료증 발급</button>
                </div>
            `;
        });
    }


    // 탭 버튼 이벤트
    tabBtns[0].addEventListener("click", () => activateTab("studying"));
    tabBtns[1].addEventListener("click", () => activateTab("certificate"));

    btnStudying.addEventListener("click", () => renderLectures("studying"));
    btnCompleted.addEventListener("click", () => renderLectures("completed"));

    if (sortSelect) {
        sortSelect.addEventListener("change", () => {
            renderLectures("studying");
        });
    }
});
