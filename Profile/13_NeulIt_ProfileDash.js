let userData = {};
let currentUser = "";

// User.json 로드
async function loadUser() {
    try {
        const res = await fetch("/User.json");
        userData = await res.json();

        currentUser =
            localStorage.getItem("loginUser") ||
            userData.userId || "neulit";

    } catch (e) {
        console.error("User.json 로드 실패:", e);
    }
}

// 프로필 상단 정보 반영
function applyProfileHeader() {
    const idEl = document.querySelector(".profile-id");
    const nameEl = document.querySelector(".profile-name");

    if (idEl) idEl.textContent = userData.userId || "사용자";
    if (nameEl) nameEl.textContent = userData.name || "사용자";
}

document.addEventListener("DOMContentLoaded", async () => {

    await loadUser();
    applyProfileHeader();

    // 최근 학습 강의
    const titleEl = document.querySelector(".course-title");
    const progressEl = document.querySelector(".course-progress");
    const playBtn = document.querySelector(".play-btn");
    const titleClickableArea = document.querySelector(".course-info");
    const listBtn = document.querySelector(".course-list");

    let recent = JSON.parse(localStorage.getItem("recentLectures") || "[]");
    let purchased = JSON.parse(localStorage.getItem("purchased") || "[]");

    let targetCourseId = null;
    let targetLectureTitle = null;

    if (recent.length > 0) {
        recent.sort((a, b) => new Date(b.lastPlayed) - new Date(a.lastPlayed));
        targetCourseId = recent[0].courseId;
        targetLectureTitle = recent[0].lectureTitle;
    } else if (purchased.length > 0) {
        targetCourseId = purchased[purchased.length - 1];
        targetLectureTitle = null;
    } else {
        titleEl.textContent = "";
        progressEl.textContent = "";
        playBtn.style.display = "none";
        titleEl.innerHTML = `<p class="empty-text">강의가 없습니다.</p>`;
        return;
    }

    const course = allCourses[targetCourseId];
    if (!course) return;

    titleEl.textContent = course.title;

    if (!targetLectureTitle) {
        const first = course.sections[0].lectures[0];
        targetLectureTitle = first.title;
    }

    let completedStore = JSON.parse(localStorage.getItem("completedLectures") || "{}");
    let completedForCourse = completedStore[targetCourseId] || {};

    let allLectures = [];
    course.sections.forEach(sec => sec.lectures.forEach(lec => allLectures.push(lec)));

    const total = allLectures.length;
    const done = allLectures.filter(lec => completedForCourse[lec.lectureId]).length;
    const rate = Math.round((done / total) * 100);

    progressEl.textContent = `${done} / ${total}강 (${rate}%)`;

    playBtn.addEventListener("click", () =>
        location.href = `../Player/13_NeulIt_Player.html?courseId=${targetCourseId}`
    );

    titleClickableArea.addEventListener("click", () =>
        location.href = `../Player/13_NeulIt_Player.html?courseId=${targetCourseId}`
    );

    listBtn.addEventListener("click", () =>
        location.href = "13_NeulIt_ProfileLecture.html"
    );


    // 멘토링 현황
    const card = document.querySelector(".mentor-info");
    const statusTag = document.querySelector(".mentoring-status");

    let list = JSON.parse(localStorage.getItem("mentoringReservations") || "[]");

    if (list.length === 0) {
        card.innerHTML = `<p class="empty-text">예약된 멘토링이 없습니다.</p>`;
        statusTag.style.display = "none";
    } else {
        const today = new Date();
        const parseDate = (dateStr) => {
            const [_, month, day] = dateStr.match(/(\d+)월\s+(\d+)일/);
            return new Date(2025, month - 1, day);
        };

        const upcoming = list.filter(m => parseDate(m.date) >= today);

        if (upcoming.length === 0) {
            card.innerHTML = `<p class="empty-text">예약된 멘토링이 없습니다.</p>`;
            statusTag.style.display = "none";
        } else {
            upcoming.sort((a, b) => parseDate(a.date) - parseDate(b.date));
            const next = upcoming[0];

            card.innerHTML = `
                <p class="mentor-name">${next.mentor} <span class="mentor-field">· ${next.field}</span></p>
                <p class="mentor-date">📅 ${next.date} ${next.time}</p>
            `;

            statusTag.classList.add("confirmed");
            statusTag.textContent = "예약 확정";
        }
    }


    // 스킬 태그
    const skillsBox = document.querySelector(".skills");
    let tagSet = new Set();

    purchased.forEach(id => {
        const c = allCourses[id];
        if (c?.tags) c.tags.forEach(t => tagSet.add(t));
    });

    if (tagSet.size === 0) {
        skillsBox.innerHTML = `<p class="empty-text">학습 스킬이 없습니다.</p>`;
    } else {
        skillsBox.innerHTML = "";
        [...tagSet].forEach(tag => {
            const span = document.createElement("span");
            span.className = "tag";
            span.textContent = `#${tag}`;
            skillsBox.appendChild(span);
        });
    }


    // 스킬 태그 전체보기 
    const tagViewAll = document.getElementById("tagViewAll");
    const tagAllModal = document.getElementById("tagAllModal");
    const tagAllList = document.getElementById("tagAllList");
    const tagClose = document.querySelector(".tag-all-close");

    tagViewAll.addEventListener("click", () => {

        let modalTagSet = new Set();

        purchased.forEach(id => {
            const c = allCourses[id];
            if (c?.tags) c.tags.forEach(t => modalTagSet.add(t));
        });

        tagAllList.innerHTML = "";

        [...modalTagSet].forEach(tag => {
            const span = document.createElement("span");
            span.className = "tag";
            span.textContent = `#${tag}`;
            tagAllList.appendChild(span);
        });

        tagAllModal.style.display = "flex";
    });

    tagClose.addEventListener("click", () => {
        tagAllModal.style.display = "none";
    });

    tagAllModal.addEventListener("click", (e) => {
        if (e.target === tagAllModal) tagAllModal.style.display = "none";
    });



    // 나의 레벨
    const levelThresholds = [0, 50, 150, 300, 500, 800, 1200, 1700, 2300, 3000];

    function computeTotalXP() {
        const purchased = JSON.parse(localStorage.getItem("purchased") || "[]");
        const completed = JSON.parse(localStorage.getItem("completedLectures") || "{}");

        let xp = 0;

        purchased.forEach(courseId => {
            const course = allCourses[courseId];
            if (!course) return;

            const comp = completed[courseId] || {};
            const flatLectures = course.sections.flatMap(s => s.lectures);

            const total = flatLectures.length;
            const done = flatLectures.filter(lec => comp[lec.lectureId]).length;

            xp += done * 2;

            if (done === total) {
                xp += 20;
            }
        });

        return xp;
    }

    function getLevel(xp) {
        for (let i = levelThresholds.length - 1; i >= 0; i--) {
            if (xp >= levelThresholds[i]) return i + 1;
        }
        return 1;
    }

    function getLevelEmoji(level) {
        if (level <= 4) return "🌱";
        if (level <= 7) return "🌿";
        return "🌳";
    }

    function updateLevelUI() {
        const emoji = document.getElementById("levelEmoji");
        const text = document.getElementById("levelText");
        const desc = document.getElementById("levelDesc");

        if (!emoji || !text || !desc) return;

        const xp = computeTotalXP();
        const level = getLevel(xp);
        const nextXP = levelThresholds[level] ?? levelThresholds[levelThresholds.length - 1];
        const xpLeft = nextXP - xp;

        emoji.textContent = getLevelEmoji(level);
        text.textContent = `Lv. ${level}`;
        desc.textContent = xpLeft > 0 ? `다음 레벨까지 ${xpLeft} XP` : "최고 레벨입니다";
    }


    updateLevelUI();

    
    

    // 수료증
    const certViewAll = document.getElementById("certViewAll");
    const certBox = document.getElementById("certPreviewBox");

    let completedStore2 = JSON.parse(localStorage.getItem("completedLectures") || "{}");

    let completedCourses = purchased.filter(courseId => {
        const course = allCourses[courseId];
        if (!course) return false;

        const completed = completedStore2[courseId] || {};
        const totalLectures = course.sections.reduce((cnt, s) => cnt + s.lectures.length, 0);
        const doneLectures = Object.values(completed).filter(v => v === true).length;

        return doneLectures === totalLectures;
    });

    let previewList = completedCourses.slice(0, 2);

    if (previewList.length === 0) {
        certBox.innerHTML = `<p class="empty-text">수료한 강의가 없습니다.</p>`;
    } else {
        certBox.innerHTML = "";
        previewList.forEach(id => {
            const c = allCourses[id];

            const item = document.createElement("div");
            item.className = "cert-item";

            item.innerHTML = `
                <img src="${c.thumbnail}" class="cert-thumb">
                <div class="cert-info">
                    <p class="cert-title">${c.title}</p>
                    <p class="cert-complete">수료 완료 ✔</p>
                </div>
            `;
            certBox.appendChild(item);
        });
    }

    certViewAll.addEventListener("click", (e) => {
        e.preventDefault();
        location.href = "13_NeulIt_ProfileLecture.html?tab=certificate";
    });

});
