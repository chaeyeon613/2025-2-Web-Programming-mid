document.addEventListener("DOMContentLoaded", () => {

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
    }

    else if (purchased.length > 0) {
        targetCourseId = purchased[purchased.length - 1];
        targetLectureTitle = null;
    }

    else {
        titleEl.textContent = "";
        progressEl.textContent = "";
        playBtn.style.display = "none";
        return;
    }

    const course = allCourses[targetCourseId];

    if (!course) {
        titleEl.textContent = "";
        progressEl.textContent = "";
        playBtn.style.display = "none";
        return;
    }

    titleEl.textContent = course.title;


    if (!targetLectureTitle) {
        const firstSection = course.sections[0];
        const firstLecture = firstSection.lectures[0];
        targetLectureTitle = firstLecture.title;
    }

    let completedStore = JSON.parse(localStorage.getItem("completedLectures") || "{}");
    let completedForCourse = completedStore[targetCourseId] || {};

    let allLectures = [];
    course.sections?.forEach(sec => sec.lectures.forEach(lec => allLectures.push(lec)));

    const totalCount = allLectures.length;
    const completedCount = allLectures.filter(lec => completedForCourse[lec.lectureId]).length;

    const rate = Math.round((completedCount / totalCount) * 100);

    progressEl.textContent = `${completedCount} / ${totalCount}강 (${rate}%)`;

    playBtn.addEventListener("click", () => {
        location.href = `../Player/13_NeulIt_Player.html?courseId=${targetCourseId}`;
    });

    titleClickableArea.addEventListener("click", () => {
        location.href = `../Player/13_NeulIt_Player.html?courseId=${targetCourseId}`;
    });

    listBtn.addEventListener("click", () => {
        location.href = "13_NeulIt_ProfileLecture.html";
    });
});
