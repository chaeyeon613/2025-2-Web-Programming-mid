document.addEventListener("DOMContentLoaded", () => {

    // == 최근 학습 강의 == //
    const titleEl = document.querySelector(".course-title");
    const progressEl = document.querySelector(".course-progress");
    const playBtn = document.querySelector(".play-btn");
    const titleClickableArea = document.querySelector(".course-info");
    const listBtn = document.querySelector(".course-list");

    let recent = JSON.parse(localStorage.getItem("recentLectures") || "[]");
    let purchased = JSON.parse(localStorage.getItem("purchased") || "[]");   // ✔ 여기만 사용

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


    // == 스킬 태그 == //
    // 스킬 태그 생성
    const skillsBox = document.querySelector(".skills");
    const tagSet = new Set();

    purchased.forEach(id => {
        const c = allCourses[id];
        if (c?.tags) c.tags.forEach(t => tagSet.add(t));
    });

    if (tagSet.size === 0) {
        skillsBox.innerHTML = `<p style="color:#888;">아직 학습 스킬이 없습니다.</p>`;
    } else {
        skillsBox.innerHTML = "";
        [...tagSet].forEach(tag => {
            const span = document.createElement("span");
            span.className = "tag";
            span.textContent = `#${tag}`;
            skillsBox.appendChild(span);
        });
    }

    // 모달 창
    const tagViewAll = document.getElementById("tagViewAll");
    const tagAllModal = document.getElementById("tagAllModal");
    const tagAllList = document.getElementById("tagAllList");


    // 전체보기 클릭 → 전체 태그 창
    tagViewAll.addEventListener("click", () => {

        tagAllList.innerHTML = "";

        [...tagSet].forEach(tag => {
            const span = document.createElement("span");
            span.className = "tag";
            span.textContent = `#${tag}`;
            tagAllList.appendChild(span);
        });

        tagAllModal.style.display = "flex";
    });

    document.querySelector(".tag-all-close").addEventListener("click", () => {
        tagAllModal.style.display = "none";
    });

    tagAllModal.addEventListener("click", (e) => {
        if (e.target === tagAllModal) tagAllModal.style.display = "none";
    });

    // == 수료증 == //
    const certViewAll = document.getElementById("certViewAll");
    const certBox = document.getElementById("certPreviewBox");

    let completedStore2 = JSON.parse(localStorage.getItem("completedLectures") || "{}");

    let completedCourses = purchased.filter(courseId => {
        const course = allCourses[courseId];
        if (!course) return false;

        const completed = completedStore2[courseId] || {};
        const totalLectures = course.sections.reduce((cnt, s) => cnt + s.lectures.length, 0);
        const doneLectures = Object.values(completed).filter(v => v === true).length;

        return doneLectures === totalLectures; // 100% 완료된 강의만
    });

    let previewList = completedCourses.slice(0, 2);

    if (previewList.length === 0) {
        certBox.innerHTML = `<p style="color:#888;">아직 수료한 강의가 없습니다.</p>`;
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

    certViewAll.addEventListener("click", () => {
        location.href = "13_NeulIt_ProfileLecture.html?tab=certificate";
    });

});
