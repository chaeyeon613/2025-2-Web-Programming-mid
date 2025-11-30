/*************************************************
 *  0. URL에서 courseId 가져오기 (앞으로 확장용)
 *************************************************/
const urlParams = new URLSearchParams(location.search);
const selectedCourseId = urlParams.get("courseId") || courseData.courseId;


/*************************************************
 *  1. DOM 요소
 *************************************************/
const curriculumContainer = document.getElementById("curriculum-container");

const video = document.getElementById("video-player");
const videoSource = document.getElementById("video-source");

const titleCourse = document.getElementById("course-title");
const titleLecture = document.getElementById("current-title");
const btnComplete = document.getElementById("complete-btn");


/*************************************************
 *  2. 현재 강의 상태 저장 변수
 *************************************************/
let currentLecture = null;
let completed = JSON.parse(localStorage.getItem("completedLectures") || "{}");


/*************************************************
 *  3. 커리큘럼 렌더링
 *************************************************/
function renderCurriculum() {
    curriculumContainer.innerHTML = ""; // 초기화

    // 상단 큰 제목
    titleCourse.innerText = courseData.title;

    courseData.sections.forEach(section => {

        /******** 섹션 헤더 ********/
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


        /******** 섹션 콘텐츠 ********/
        const content = document.createElement("div");
        content.classList.add("section-content");
        content.id = `section-${section.sectionId}`;
        curriculumContainer.appendChild(content);


        /******** 강의 목록 ********/
        section.lectures.forEach(lec => {
            const item = document.createElement("div");
            item.classList.add("curri-item");

            if (completed[lec.lectureId]) item.classList.add("done");

            item.innerHTML = `
                <div class="curri-left">
                    <span class="icon-status">
                        ${completed[lec.lectureId] ? "✔" : "▶"}
                    </span>
                    <span class="item-title">${lec.title}</span>
                </div>
                <span class="item-time">${lec.time}</span>
            `;

            item.onclick = () => selectLecture(lec);

            content.appendChild(item);
        });
    });
}


/*************************************************
 *  4. 강의 선택 (비디오 + 제목 변경)
 *************************************************/
function selectLecture(lecture) {
    currentLecture = lecture;

    titleLecture.innerText = lecture.title;

    videoSource.src = lecture.video;
    video.load();
    video.play();

    updateCompleteButton();
}


/*************************************************
 *  5. "이해했어요" 기능
 *************************************************/
function toggleComplete() {
    if (!currentLecture) return;

    const id = currentLecture.lectureId;
    completed[id] = !completed[id];

    localStorage.setItem("completedLectures", JSON.stringify(completed));

    updateCompleteButton();
    renderCurriculum();
}

function updateCompleteButton() {
    if (!currentLecture) {
        btnComplete.innerText = "이해했어요";
        btnComplete.classList.remove("done");
        return;
    }

    if (completed[currentLecture.lectureId]) {
        btnComplete.innerText = "완료됨 ✓";
        btnComplete.classList.add("done");
    } else {
        btnComplete.innerText = "이해했어요";
        btnComplete.classList.remove("done");
    }
}


/*************************************************
 *  6. 섹션 토글
 *************************************************/
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


/*************************************************
 *  7. 초기 렌더링
 *************************************************/
renderCurriculum();
