let userData = {};
let currentUser = "neulit";


// User.json 로드
async function loadUser() {
    try {
        const res = await fetch("/13_NeulIt_User.json");
        userData = await res.json();

        currentUser =
            localStorage.getItem("loginUser") ||
            userData.userId || "neulit";
    } catch (e) {
        console.error("User.json 로드 실패:", e);
    }
}


// 프로필 상단
function applyProfileHeader() {
    const idEl = document.querySelector(".profile-id");
    const nameEl = document.querySelector(".profile-name");

    if (idEl) idEl.textContent = userData.userId || "neulit";
    if (nameEl) nameEl.textContent = userData.name || "늘잇";
}


// JSON + localStorage 병합 //
function mergeArray(jsonArr = [], localArr = []) {
    return [...new Set([...jsonArr, ...localArr])];
}

function mergeCompleted(jsonData = {}, localData = {}) {
    const merged = { ...jsonData };

    for (let courseId in localData) {
        if (!merged[courseId]) {
            merged[courseId] = { ...localData[courseId] };
        } else {
            for (let lecId in localData[courseId]) {
                merged[courseId][lecId] = localData[courseId][lecId];
            }
        }
    }
    return merged;
}

function mergeMentoring(jsonList = [], localList = []) {
    return [...jsonList, ...localList];
}

function getRecentMerged() {
    const json = userData.recentLectures || [];
    const local = JSON.parse(localStorage.getItem("recentLectures_neulit") || "[]");

    const merged = [...json, ...local];

    const map = new Map();
    merged.forEach(item => map.set(item.courseId, item));

    return [...map.values()]
        .filter(r => allCourses[r.courseId])
        .sort((a, b) => new Date(b.lastPlayed) - new Date(a.lastPlayed));
}


// 메인
document.addEventListener("DOMContentLoaded", async () => {

    await loadUser();
    applyProfileHeader();


    // 병합 데이터 생성
    const purchasedLocal = JSON.parse(localStorage.getItem("purchased_neulit") || "[]");
    const purchasedMerged = mergeArray(userData.purchased, purchasedLocal);

    const completedLocal = JSON.parse(localStorage.getItem("completedLectures_neulit") || "{}");
    const completedMerged = mergeCompleted(userData.completedLectures, completedLocal);

    const recentMerged = getRecentMerged();

    const mentoringLocal = JSON.parse(localStorage.getItem("mentoringReservations") || "[]");
    const mentoringMerged = mergeMentoring(userData.mentoringReservations, mentoringLocal);


    // 최근 학습 강의
    const titleEl = document.querySelector(".course-title");
    const progressEl = document.querySelector(".course-progress");
    const playBtn = document.querySelector(".play-btn");
    const titleClickableArea = document.querySelector(".course-info");

    let targetCourseId = null;

    if (recentMerged.length > 0) {
        targetCourseId = recentMerged[0].courseId;
    } else if (purchasedMerged.length > 0) {
        targetCourseId = purchasedMerged[purchasedMerged.length - 1];
    } else {
        titleEl.innerHTML = `<p class="empty-text">강의가 없습니다.</p>`;
        return;
    }

    const course = allCourses[targetCourseId];
    if (!course) return;

    titleEl.textContent = course.title;

    const flat = course.sections.flatMap(s => s.lectures);
    const done = flat.filter(lec => completedMerged[targetCourseId]?.[lec.lectureId]).length;
    const total = flat.length;

    progressEl.textContent = `${done} / ${total}강 (${Math.round(done / total * 100)}%)`;

    playBtn.onclick = titleClickableArea.onclick = () =>
        location.href = `../Player/13_NeulIt_Player.html?courseId=${targetCourseId}`;


    // 멘토링
    const mentorBox = document.querySelector(".mentor-info");
    const statusTag = document.querySelector(".mentoring-status");

    if (mentoringMerged.length === 0) {
        mentorBox.innerHTML = `<p class="empty-text">예약된 멘토링이 없습니다.</p>`;
        statusTag.style.display = "none";
    } else {
        function parseMentoringDate(str) {
            const match = str.match(/(\d+)월\s+(\d+)일/);
            if (!match) return new Date(2100, 0, 1);
            return new Date(2025, match[1] - 1, match[2]);
        }

        mentoringMerged.sort((a, b) => parseMentoringDate(a.date) - parseMentoringDate(b.date));

        const next = mentoringMerged[0];    
        mentorBox.innerHTML = `
            <p class="mentor-name">${next.mentor} <span class="mentor-field">· ${next.field}</span></p>
            <p class="mentor-date">📅 ${next.date} ${next.time}</p>
        `;
        statusTag.textContent = "예약 확정";
    }


    // 스킬 태그
    const skillsBox = document.querySelector(".skills");
    let tagSet = new Set();

    purchasedMerged.forEach(id => {
        const c = allCourses[id];
        if (c?.tags) c.tags.forEach(t => tagSet.add(t));
    });

    skillsBox.innerHTML =
        tagSet.size === 0
            ? `<p class="empty-text">학습 스킬이 없습니다.</p>`
            : [...tagSet].map(t => `<span class="tag">#${t}</span>`).join("");


    // 스킬 태그 전체보기
    const tagViewAll = document.getElementById("tagViewAll");
    const tagAllModal = document.getElementById("tagAllModal");
    const tagAllList = document.getElementById("tagAllList");
    const tagClose = document.querySelector(".tag-all-close");

    tagViewAll.onclick = () => {
        let modalTagSet = new Set();
        purchasedMerged.forEach(id => {
            const c = allCourses[id];
            if (c?.tags) c.tags.forEach(t => modalTagSet.add(t));
        });

        tagAllList.innerHTML = [...modalTagSet]
            .map(t => `<span class="tag">#${t}</span>`)
            .join("");

        tagAllModal.style.display = "flex";
    };

    tagClose.onclick = () => tagAllModal.style.display = "none";
    tagAllModal.onclick = e => {
        if (e.target === tagAllModal) tagAllModal.style.display = "none";
    };


    // 레벨 계산
    const levelThresholds = [0, 50, 150, 300, 500, 800, 1200, 1700, 2300, 3000];

    function computeXP() {
        let xp = 0;
        purchasedMerged.forEach(courseId => {
            const c = allCourses[courseId];
            if (!c) return;

            const flat = c.sections.flatMap(s => s.lectures);
            const done = flat.filter(lec => completedMerged[courseId]?.[lec.lectureId]).length;

            xp += done * 2;
            if (done === flat.length) xp += 20;
        });
        return xp;
    }

    const xp = computeXP();
    const level = levelThresholds.filter(t => xp >= t).length;
    const nextXP = levelThresholds[level] ?? null;

    document.getElementById("levelEmoji").textContent =
        level <= 4 ? "🌱" : level <= 7 ? "🌿" : "🌳";

    document.getElementById("levelText").textContent = `Lv. ${level}`;
    document.getElementById("levelDesc").textContent =
        nextXP ? `다음 레벨까지 ${nextXP - xp} XP` : "최고 레벨입니다";


    // 수료증
    const certBox = document.getElementById("certPreviewBox");

    const completedCourses = purchasedMerged.filter(courseId => {
        const course = allCourses[courseId];
        if (!course) return false;

        const flat = course.sections.flatMap(s => s.lectures);
        const done = flat.filter(lec => completedMerged[courseId]?.[lec.lectureId]).length;

        return flat.length === done;
    });

    if (completedCourses.length === 0) {
        certBox.innerHTML = `<p class="empty-text">수료한 강의가 없습니다.</p>`;
    } else {
        certBox.innerHTML = completedCourses.slice(0, 2).map(id => {
            const c = allCourses[id];
            return `
                <div class="cert-item">
                    <img src="${c.thumbnail}" class="cert-thumb">
                    <div class="cert-info">
                        <p class="cert-title">${c.title}</p>
                        <p class="cert-complete">수료 완료 ✔</p>
                    </div>
                </div>
            `;
        }).join("");
    }


    // 최근 학습 전체보기
    const recentViewAll = document.querySelector(".course-list");
    if (recentViewAll) {
        recentViewAll.addEventListener("click", () => {
            location.href = "13_NeulIt_ProfileLecture.html?tab=studying";
        });
    }


    // 수료증 전체보기
    const certViewAll = document.getElementById("certViewAll");
    if (certViewAll) {
        certViewAll.addEventListener("click", () => {
            location.href = "13_NeulIt_ProfileLecture.html?tab=certificate";
        });
    }

});