document.addEventListener("DOMContentLoaded", () => {

    // 강의 ID 가져오기
    const urlParams = new URLSearchParams(location.search);
    const selectedCourseId = urlParams.get("courseId");
    const courseData = allCourses[selectedCourseId];

    if (!courseData) {
        alert("강의 정보를 불러올 수 없습니다.");
        return;
    }

    // 필요한 요소들
    const curriculumContainer = document.getElementById("curriculum-container");
    const video = document.getElementById("video-player");
    const videoSource = document.getElementById("video-source");
    const titleCourse = document.getElementById("course-title");
    const titleLecture = document.getElementById("current-title");
    const btnComplete = document.getElementById("complete-btn");

    // completed DB 로드
    let completedStore = JSON.parse(localStorage.getItem("completedLectures") || "{}");

    if (!completedStore[selectedCourseId]) {
        completedStore[selectedCourseId] = {};
    }

    let completed = completedStore[selectedCourseId];
    let currentLecture = null;

    // 커리큘럼 렌더링
    function renderCurriculum() {
        curriculumContainer.innerHTML = "";

        const progressEl = document.createElement("div");
        progressEl.id = "progress-text";
        progressEl.classList.add("progress-text");
        progressEl.innerText = "학습률: 0%";
        curriculumContainer.appendChild(progressEl);

        titleCourse.innerText = courseData.title;

        courseData.sections?.forEach(section => {
            const header = document.createElement("div");
            header.classList.add("section-header");
            header.onclick = () => toggleSection(header);

            header.innerHTML = `
                <div class="section-left">
                    <span class="section-title">${section.title}</span>
                    <span class="section-info">${section.info}</span>
                </div>
                <span class="arrow">▼</span>
            `;
            curriculumContainer.appendChild(header);

            const content = document.createElement("div");
            content.classList.add("section-content");
            content.id = `section-${section.sectionId}`;
            content.style.display = "none";
            curriculumContainer.appendChild(content);

            section.lectures.forEach((lec) => {
                const item = document.createElement("div");
                item.classList.add("curri-item");

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

        updateProgressRate();
    }

    // 강의 선택
    function selectLecture(lecture) {
        currentLecture = lecture;
        titleLecture.innerText = lecture.title;
        videoSource.src = lecture.video;
        video.load();
        video.play();
        updateCompleteButton();
    }

    // 🔥🔥🔥 최근 학습 저장 기능 추가
    function saveRecentLecture() {
        if (!currentLecture) return;

        const record = {
            courseId: selectedCourseId,
            lectureId: currentLecture.lectureId,
            lectureTitle: currentLecture.title,
            lastPlayed: new Date().toISOString()
        };

        let recent = JSON.parse(localStorage.getItem("recentLectures") || "[]");

        // 같은 courseId는 삭제 → 하나만 유지
        recent = recent.filter(r => r.courseId !== selectedCourseId);

        // 새 기록 추가
        recent.push(record);

        localStorage.setItem("recentLectures", JSON.stringify(recent));
    }

    // 완료 처리
    function toggleComplete() {
        if (!currentLecture) return;
    
        const id = currentLecture.lectureId;
    
        const openSections = [];
        document.querySelectorAll(".section-content").forEach(sec => {
            if (sec.style.display === "block") openSections.push(sec.id);
        });
    
        completed[id] = !completed[id];
        completedStore[selectedCourseId] = completed;
        localStorage.setItem("completedLectures", JSON.stringify(completedStore));

        saveRecentLecture();
 
        renderCurriculum();
    
        openSections.forEach(secId => {
            const sec = document.getElementById(secId);
            if (sec) {
                sec.style.display = "block";
                sec.previousElementSibling.querySelector(".arrow").style.transform = "rotate(180deg)";
            }
        });
    
        updateCompleteButton();
        updateProgressRate();
    }
    

    // 완료 버튼 표시
    function updateCompleteButton() {
        if (!currentLecture) {
            btnComplete.innerText = "이해했어요";
            btnComplete.classList.remove("done");
            return;
        }

        if (completed[currentLecture.lectureId]) {
            btnComplete.innerText = "완료됨";
            btnComplete.classList.add("done");
        } else {
            btnComplete.innerText = "이해했어요";
            btnComplete.classList.remove("done");
        }
    }

    // 섹션 토글
    function toggleSection(header) {
        const content = header.nextElementSibling;
        const arrow = header.querySelector(".arrow");

        if (content.style.display === "block") {
            content.style.display = "none";
            arrow.style.transform = "rotate(0deg)";
        } else {
            content.style.display = "block";
            arrow.style.transform = "rotate(180deg)";
        }
    }

    // 학습률 계산
    function updateProgressRate() {
        const all = [];
        courseData.sections?.forEach(sec => sec.lectures.forEach(lec => all.push(lec)));

        const completedCount = all.filter(lec => completed[lec.lectureId]).length;
        const totalCount = all.length;

        const rate = Math.round((completedCount / totalCount * 100) * 10) / 10;

        const progressEl = document.getElementById("progress-text");
        if (progressEl) progressEl.innerText = `학습률: ${rate}%`;
    }

    // 자동 재생
    function autoPlayFirstLecture() {
        const all = [];
        courseData.sections?.forEach(sec => sec.lectures.forEach(lec => all.push(lec)));

        const next = all.find(lec => !completed[lec.lectureId]);
        selectLecture(next || all[0]);
    }

    // 뒤로 가기
    const backBtn = document.getElementById("back-btn");
    if (backBtn) {
        backBtn.onclick = () => {
            if (document.referrer && document.referrer !== "") {
                history.back();
            } else {
                location.href = "../Profile/13_NeulIt_ProfileLecture.html";
            }
        };
    }

    btnComplete.addEventListener("click", toggleComplete);

    renderCurriculum();
    autoPlayFirstLecture();
});
