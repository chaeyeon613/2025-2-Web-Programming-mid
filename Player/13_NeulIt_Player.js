let userData = {};
let currentUser = "";

// User.json + localStorage 로드
async function loadUser() {
    try {
        const res = await fetch("/User.json");
        userData = await res.json();
        currentUser = userData.userId || "devUser";
    } catch (err) {
        console.error("User.json 로드 실패:", err);
    }
}

function mergeCompletedLectures() {
    const jsonData = userData.completedLectures || {};
    const localData = JSON.parse(localStorage.getItem("completedLectures") || "{}");

    const merged = {};

    for (let courseId in jsonData) {
        merged[courseId] = { ...jsonData[courseId] };
    }

    for (let courseId in localData) {
        if (!merged[courseId]) merged[courseId] = {};
        merged[courseId] = { ...merged[courseId], ...localData[courseId] };
    }

    return merged;
}

// DOM 로드, 메인 흐름
document.addEventListener("DOMContentLoaded", async () => {

    await loadUser();

    const url = new URLSearchParams(location.search);
    const courseId = url.get("courseId");

    const course = allCourses[courseId];
    if (!course) {
        alert("강의 정보를 찾을 수 없습니다.");
        return;
    }

    const video = document.getElementById("video-player");
    const videoSource = document.getElementById("video-source");
    const titleCourse = document.getElementById("course-title");
    const titleLecture = document.getElementById("current-title");
    const btnComplete = document.getElementById("complete-btn");

    let completedStore = mergeCompletedLectures();

    if (!completedStore[courseId]) completedStore[courseId] = {};
    let completed = completedStore[courseId];

    let currentLecture = null;

    // 커리큘럼 렌더링
    function renderCurriculum() {
        const container = document.getElementById("curriculum-container");
        container.innerHTML = "";

        titleCourse.innerText = course.title;

        const progressText = document.createElement("div");
        progressText.id = "progress-text";
        progressText.className = "progress-text";
        container.appendChild(progressText);

        course.sections.forEach(section => {
            const header = document.createElement("div");
            header.className = "section-header";
            header.innerHTML = `
                <div class="section-left">
                    <span class="section-title">${section.title}</span>
                    <span class="section-info">${section.info}</span>
                </div>
                <span class="arrow">▼</span>
            `;
            container.appendChild(header);

            const content = document.createElement("div");
            content.className = "section-content";
            content.style.display = "none";
            container.appendChild(content);

            header.onclick = () => {
                const open = content.style.display === "block";
                content.style.display = open ? "none" : "block";
                header.querySelector(".arrow").style.transform = open ? "rotate(0deg)" : "rotate(180deg)";
            };

            section.lectures.forEach(lec => {
                const item = document.createElement("div");
                item.className = "curri-item";
                if (completed[lec.lectureId]) item.classList.add("done");

                item.innerHTML = `
                    <div class="curri-left">
                        <span class="icon-status">${completed[lec.lectureId] ? "✔" : "▶"}</span>
                        <span class="item-title">${lec.title}</span>
                    </div>
                    <span class="item-time">${lec.time}</span>
                `;

                item.onclick = () => selectLecture(lec);
                content.appendChild(item);
            });
        });

        updateProgress();
    }

    // 강의 선택
    function selectLecture(lec) {
        currentLecture = lec;
        titleLecture.innerText = lec.title;
        videoSource.src = lec.video;
        video.load();
        video.play();
        updateCompleteBtn();
        saveRecentLecture();
    }

    // 최근 학습 저장
    function saveRecentLecture() {
        if (!currentLecture) return;

        let recent = JSON.parse(localStorage.getItem("recentLectures") || "[]");

        recent = recent.filter(r => r.courseId !== courseId);

        recent.unshift({
            courseId,
            lectureId: currentLecture.lectureId,
            lectureTitle: currentLecture.title,
            lastPlayed: new Date().toISOString()
        });

        localStorage.setItem("recentLectures", JSON.stringify(recent));
    }

    // 이해했어요 버튼
    function toggleComplete() {
        if (!currentLecture) return;

        const id = currentLecture.lectureId;

        completed[id] = !completed[id];
        completedStore[courseId] = completed;

        localStorage.setItem("completedLectures", JSON.stringify(completedStore));
        userData.completedLectures = completedStore;

        renderCurriculum();
        updateCompleteBtn();
        updateProgress();
    }

    function updateCompleteBtn() {
        if (!currentLecture) return;

        if (completed[currentLecture.lectureId]) {
            btnComplete.innerText = "완료됨";
            btnComplete.classList.add("done");
        } else {
            btnComplete.innerText = "이해했어요";
            btnComplete.classList.remove("done");
        }
    }

    // 학습률 계산
    function updateProgress() {
        let all = [];

        course.sections.forEach(sec =>
            sec.lectures.forEach(lec => all.push(lec))
        );

        const total = all.length;
        const done = all.filter(lec => completed[lec.lectureId]).length;

        const rate = Math.round((done / total) * 100);

        const el = document.getElementById("progress-text");
        if (el) el.innerText = `학습률: ${rate}%`;
    }

    // 자동 재생 — 가장 처음 미완료 강의
    function autoPlay() {
        let all = [];

        course.sections.forEach(sec =>
            sec.lectures.forEach(lec => all.push(lec))
        );

        const next = all.find(l => !completed[l.lectureId]) || all[0];
        selectLecture(next);
    }

    // 뒤로 가기
    const back = document.getElementById("back-btn");
    if (back) {
        back.onclick = () => {
            if (document.referrer) history.back();
            else location.href = "../Profile/13_NeulIt_ProfileLecture.html";
        };
    }

    btnComplete.onclick = toggleComplete;

    renderCurriculum();
    autoPlay();
});