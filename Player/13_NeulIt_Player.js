// URL에서 courseId 가져오기
const urlParams = new URLSearchParams(location.search);
const selectedCourseId = urlParams.get("courseId");

const courseData = allCourseData[selectedCourseId];

if (!courseData) {
    alert("강의 정보를 불러올 수 없습니다.");
}

const curriculumContainer = document.getElementById("curriculum-container");

const video = document.getElementById("video-player");
const videoSource = document.getElementById("video-source");

const titleCourse = document.getElementById("course-title");
const titleLecture = document.getElementById("current-title");
const btnComplete = document.getElementById("complete-btn");



// 현재 강의 상태 저장 변수
let currentLecture = null;
let completed = JSON.parse(localStorage.getItem("completedLectures") || "{}");


// 커리큘럼 렌더링
function renderCurriculum() {
    curriculumContainer.innerHTML = "";

    // 상단 큰 제목
    titleCourse.innerText = courseData.title;

    courseData.sections.forEach(section => {

        // 섹션 헤더
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


        // 섹션 콘텐츠
        const content = document.createElement("div");
        content.classList.add("section-content");
        content.id = `section-${section.sectionId}`;
        curriculumContainer.appendChild(content);


        // 강의 목록
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




// 강의 선택
function selectLecture(lecture) {
    currentLecture = lecture;

    titleLecture.innerText = lecture.title;

    videoSource.src = lecture.video;
    video.load();
    video.play();

    updateCompleteButton();
}


// 버튼
function toggleComplete() {
    if (!currentLecture) return;

    const id = currentLecture.lectureId;

    completed[id] = !completed[id];
    localStorage.setItem("completedLectures", JSON.stringify(completed));

    const openSections = [];
    document.querySelectorAll(".section-content").forEach(sec => {
        if (sec.style.display === "block") openSections.push(sec.id);
    });

    renderCurriculum();

    openSections.forEach(id => {
        const sec = document.getElementById(id);
        if (sec) {
            sec.style.display = "block";
            sec.previousElementSibling.querySelector(".arrow").style.transform = "rotate(180deg)";
        }
    });

    updateCompleteButton();
    
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



// 토글
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


// < 뒤로 가기
document.getElementById("back-btn").onclick = () => {
    if (document.referrer) {
        history.back();
    } 
    else {
        location.href = "../Profile/13_NeulIt_ProfileLecture.html";
    }
};



// 강의 자동 재생
function autoPlayFirstLecture() {
    // 모든 강의 배열로 모으기
    const allLectures = [];
    courseData.sections.forEach(section => {
        section.lectures.forEach(lec => allLectures.push(lec));
    });

    // 완료된 강의 ID 목록
    const completedIds = Object.keys(completed);

    // 아직 완료 안 된 강의 찾기
    const nextLecture = allLectures.find(lec => !completedIds.includes(lec.lectureId));

    // 완료 안 된 강의가 있으면 그거 재생
    if (nextLecture) {
        selectLecture(nextLecture);
        return;
    }

    // 다 들었으면 첫 강의 재생
    selectLecture(allLectures[0]);
}



renderCurriculum();
autoPlayFirstLecture();