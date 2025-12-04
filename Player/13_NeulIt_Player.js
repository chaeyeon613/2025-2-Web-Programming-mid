let userData = {};
let currentUser = "";


// User.json 로드
async function loadUser() {
    try {
        const res = await fetch("/User.json");
        userData = await res.json();
        currentUser = userData.userId;
    } catch (e) {
        console.error("User.json 로드 실패:", e);
    }
}


// 프로필 상단 이름 적용
function applyProfileHeader() {
    const idEl = document.querySelector(".profile-id");
    if (idEl) idEl.textContent = userData.userId || "사용자";
    const nameEl = document.querySelector(".profile-name");
    if (nameEl) nameEl.textContent = userData.name || "사용자";
}


// 최근 학습 기록 저장
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


// 메인
document.addEventListener("DOMContentLoaded", async () => {

    await loadUser();
    applyProfileHeader();

    // localStorage
    let purchased_local = JSON.parse(localStorage.getItem("purchased") || "[]");
    let completed_local = JSON.parse(localStorage.getItem("completedLectures") || "{}");
    let recent_local = JSON.parse(localStorage.getItem("recentLectures") || "[]");

    // user.json + localStorage 병합
    const purchased = Array.from(new Set([
        ...(userData.purchased || []),
        ...purchased_local
    ]));

    const completedStore = {
        ...(userData.completedLectures || {}),
        ...(completed_local || {})
    };

    const recent = [...recent_local];


    // UI 요소
    const lectureList = document.querySelector(".lecture-list");
    const certificateList = document.querySelector(".certificate-list");

    const statusContainer = document.querySelector(".profile-status");
    const sortContainer = document.querySelector(".lecture-dropdown");

    const btnStudying = document.querySelector(".status-btn:nth-child(1)");
    const btnCompleted = document.querySelector(".status-btn:nth-child(2)");

    const sortSelect = document.getElementById("sortSelect");

    const tabBtns = document.querySelectorAll(".profile-tabs .tab-btn");


    // URL 파라미터 기반 탭 유지
    const urlParams = new URLSearchParams(window.location.search);
    const defaultTab = urlParams.get("tab");

    const isReload = performance.navigation.type === 1;

    if (defaultTab === "certificate") {
        tabBtns[1].classList.add("active");
        tabBtns[0].classList.remove("active");
        renderCertificates(); 
    } else {
        tabBtns[0].classList.add("active");
        tabBtns[1].classList.remove("active");
        renderLectures("studying");
    }



    // 진행률 계산
    function getRate(courseId) {
        const c = allCourses[courseId];
        if (!c) return 0;

        const doneMap = completedStore[courseId] || {};

        let all = [];
        c.sections.forEach(sec =>
            sec.lectures.forEach(lec => all.push(lec))
        );

        const total = all.length;
        const done = all.filter(lec => doneMap[lec.lectureId] === true).length;

        return total === 0 ? 0 : Math.floor((done / total) * 100);
    }


    // 최신순 정렬
    function sortCourses(list, type) {
        if (type === "latest") {

            return list.sort((a, b) => {
                const indexA = recent.findIndex(r => r.courseId === a);
                const indexB = recent.findIndex(r => r.courseId === b);

                if (indexA === -1 && indexB === -1) return 0;
                if (indexA === -1) return 1;
                if (indexB === -1) return -1;

                return indexA - indexB;
            });
        }

        if (type === "rate") {
            return list.sort((a, b) => getRate(b) - getRate(a));
        }

        return list;
    }


    // 정렬 변경 이벤트
    if (sortSelect) {
        sortSelect.addEventListener("change", () => {
            btnStudying.classList.add("active");
            btnCompleted.classList.remove("active");
            renderLectures("studying");
        });
    }



    // 강의 렌더링
    function renderLectures(status) {
        lectureList.style.display = "block";
        certificateList.style.display = "none";

        statusContainer.style.display = "flex";

        if (status === "completed") sortContainer.style.display = "none";
        else sortContainer.style.display = "block";

        lectureList.innerHTML = "";

        if (purchased.length === 0) {
            lectureList.innerHTML = `<p style="color:#777;">구매한 강의가 없습니다.</p>`;
            return;
        }

        let list = [...purchased];

        if (status === "studying") {
            list = sortCourses(list, sortSelect.value);
        }

        let rendered = 0;

        list.forEach(id => {
            const c = allCourses[id];
            if (!c) return;

            const rate = getRate(id);

            if (status === "studying" && rate === 100) return;
            if (status === "completed" && rate < 100) return;

            rendered++;

            const card = document.createElement("a");
            card.href = `../Player/13_NeulIt_Player.html?courseId=${id}`;
            card.className = "card-link";

            card.addEventListener("click", () => {
                const lec = c.sections[0].lectures[0];
                saveRecentLecture(id, lec.lectureId, lec.title);
            });

            card.innerHTML = `
                <div class="lecture-card">
                    <img src="${c.thumbnail}" class="lecture-thumb">
                    <div class="lecture-info">
                        <h3 class="lecture-title">${c.title}</h3>
                        <p class="lecture-author">${c.instructor} | 무제한 수강</p>
                        <div class="lecture-progress">
                            <div class="progress-bar" style="width:${rate}%;"></div>
                        </div>
                        <p class="lecture-status">${rate}% 완료</p>
                    </div>
                </div>
            `;

            lectureList.appendChild(card);
        });

        if (rendered === 0) {
            lectureList.innerHTML = `
                <p style="color:#777;">
                    ${status === "studying" ? "학습 중인 강의가 없습니다." : "수료한 강의가 없습니다."}
                </p>`;
        }
    }



    // 수료증 렌더링
    function renderCertificates() {
        lectureList.style.display = "none";
        certificateList.style.display = "block";

        statusContainer.style.display = "none";
        sortContainer.style.display = "none";

        const listEl = document.querySelector(".certificate-list");

        const completedCourses = purchased.filter(id => {
            const c = allCourses[id];
            if (!c) return false;

            const doneMap = completedStore[id] || {};
            const total = c.sections.reduce((s, sec) => s + sec.lectures.length, 0);
            const done = Object.values(doneMap).filter(v => v === true).length;

            return total === done;
        });

        if (completedCourses.length === 0) {
            listEl.innerHTML = `<p style="color:#777;">아직 수료한 강의가 없습니다.</p>`;
            return;
        }

        listEl.innerHTML = "";

        completedCourses.forEach(id => {
            const c = allCourses[id];
            listEl.innerHTML += `
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



    // 학습중 / 완강 버튼
    btnStudying.addEventListener("click", () => {
        btnStudying.classList.add("active");
        btnCompleted.classList.remove("active");
        renderLectures("studying");
    });

    btnCompleted.addEventListener("click", () => {
        btnCompleted.classList.add("active");
        btnStudying.classList.remove("active");
        renderLectures("completed");
    });


    // 강의 / 수료증 탭
    tabBtns[0].addEventListener("click", () => {
        tabBtns[0].classList.add("active");
        tabBtns[1].classList.remove("active");
        renderLectures("studying");
    });

    tabBtns[1].addEventListener("click", () => {
        tabBtns[1].classList.add("active");
        tabBtns[0].classList.remove("active");
        renderCertificates();
    });


    // PDF 발급
    document.addEventListener("click", (e) => {
        if (!e.target.classList.contains("cert-btn")) return;

        const courseId = e.target.dataset.id;
        const c = allCourses[courseId];

        const html = `
            <div id="certificatePDF" style="
                width: 794px;
                height: 1123px; 
                padding: 80px 70px;
                box-sizing: border-box;
                font-family: 'Pretendard', sans-serif;
                color: #222;
                background: #ffffff;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
            ">
                <div style="
                    width:100%;
                    height: 70px;
                    background: linear-gradient(90deg, #EC8201, #FF9F43);
                    border-radius: 10px;
                    margin-bottom: 50px;
                    display: flex;
                    align-items: center;
                    padding-left: 30px;
                    color: white;
                    font-size: 26px;
                    font-weight: 700;
                ">
                    NeulIt Certificate
                </div>

                <div style="height: 40px; justify-content: center;"></div>
                <br><br><br><br><br>

                <h1 style="text-align:center; font-size:40px; font-weight:800; margin: 0 0 20px 0;">
                    수료증
                </h1>

                <br><br>
    
                <p style="text-align:center; font-size:18px; color:#555; margin-bottom: 45px;">
                    본 학습자는 아래 교육 과정을 성공적으로 수료하였음을 인증합니다.
                </p>

                <br><br><br>
    
                <h2 style="text-align:center; font-size:30px; font-weight:700; color:#222; margin-bottom: 30px;">
                    ${c.title}
                </h2>
    
                <p style="text-align:center; font-size:22px; font-weight:600; color:#EC8201; margin-bottom: 250px;">
                    강사: ${c.instructor}
                </p>
    
                <div style="width:100%; display:flex; justify-content:center; margin-bottom:40px;">
                    <div style="border-top:2px solid #EC8201; width:280px; padding-top:10px; text-align:center; font-size:18px; color:#222; font-weight:600;">
                        NeulIt
                    </div>
                </div>
    
                <p style="text-align:center; font-size:14px; color:#AAA; margin-top:auto;">
                    © NeulIt. All rights reserved.
                </p>
            </div>
        `;

        const temp = document.createElement("div");
        temp.innerHTML = html;
        document.body.appendChild(temp);

        const element = temp.querySelector("#certificatePDF");

        html2canvas(element, { scale: 2 }).then(canvas => {
            const img = canvas.toDataURL("image/png");
            const pdf = new jspdf.jsPDF("p", "mm", "a4");

            const width = 210;
            const height = canvas.height * (210 / canvas.width);

            pdf.addImage(img, "PNG", 0, 0, width, height);
            pdf.save(`${c.title}_수료증.pdf`);

            temp.remove();
        });
    });

});