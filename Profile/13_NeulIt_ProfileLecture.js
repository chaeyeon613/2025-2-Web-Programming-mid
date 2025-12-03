document.addEventListener("DOMContentLoaded", () => {
    const btnStudying = document.querySelector(".status-btn:nth-child(1)");
    const btnCompleted = document.querySelector(".status-btn:nth-child(2)");
    const sortSelect = document.getElementById("sortSelect");
    const sortContainer = document.querySelector(".lecture-dropdown");

    const purchased = JSON.parse(localStorage.getItem("purchased") || "[]");

    const tabBtns = document.querySelectorAll(".tab-btn");
    const lectureList = document.querySelector(".lecture-list");
    const certificateList = document.querySelector(".certificate-list");

    tabBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
    
            const statusArea = document.querySelector(".profile-status");
            const sortArea = document.querySelector(".lecture-dropdown");

            if (index === 0) {
                // 강의 탭
                lectureList.style.display = "block";
                certificateList.style.display = "none";

                statusArea.style.display = "flex";
                sortArea.style.display = "block";

                btnStudying.classList.add("active");
                btnCompleted.classList.remove("active");
                renderLectures("studying");

                const url = new URL(location.href);
                url.searchParams.delete("tab");
                history.replaceState(null, "", url.toString());

            } else {
                // 수료증 탭
                lectureList.style.display = "none";
                certificateList.style.display = "block";

                statusArea.style.display = "none";
                sortArea.style.display = "none";

                renderCertificates();

                const url = new URL(location.href);
                url.searchParams.set("tab", "certificate");
                history.replaceState(null, "", url.toString());
            }
        });
    });
    

    const params = new URLSearchParams(location.search);
    if (params.get("tab") === "certificate") {
        tabBtns[1].click();
    } else {
        tabBtns[0].click();
        renderLectures("studying");
    }

    // == 강의 == //
    // 진행률 계산 함수
    function getRate(id) {
        const c = allCourses[id];
        if (!c) return 0;

        const completedStore = JSON.parse(localStorage.getItem("completedLectures") || "{}");

        const all = [];
        c.sections?.forEach(sec => sec.lectures.forEach(lec => all.push(lec)));

        const total = all.length;
        const done = all.filter(lec => (completedStore[id] || {})[lec.lectureId]).length;

        return total === 0 ? 0 : Math.floor((done / total) * 100);
    }

    // 정렬 함수
    function sortCourses(list, sortType, progress) {
        if (sortType === "latest") {
            return list.sort((a, b) => {
                const A = progress.find(p => p.id === a)?.lastPlayed;
                const B = progress.find(p => p.id === b)?.lastPlayed;
    
                if (!A) return 1;
                if (!B) return -1;
    
                return new Date(B) - new Date(A);
            });
        }
    
        if (sortType === "rate") {
            return list.sort((a, b) => getRate(b) - getRate(a));
        }
    
        return list;
    }
    
    // 강의 렌더링
    function renderLectures(status) {
        lectureList.innerHTML = "";

        let list = purchased.slice();

        let progress = JSON.parse(localStorage.getItem("lectureProgress") || "[]");

        if (status === "studying") {
            sortContainer.style.display = "block";
            list = sortCourses(list, sortSelect.value, progress);
        } else {
            sortContainer.style.display = "none";
        }

        list.forEach(id => {
            const c = allCourses[id];
            if (!c) return;

            const rate = getRate(id);

            if (status === "studying" && rate === 100) return;
            if (status === "completed" && rate < 100) return;

            const card = document.createElement("a");
            card.href = `../Player/13_NeulIt_Player.html?courseId=${id}`;
            card.className = "card-link";

            card.innerHTML = `
                <div class="lecture-card">
                    <img src="${c.thumbnail}" class="lecture-thumb">
                    <div class="lecture-info">
                        <h3 class="lecture-title">${c.title}</h3>
                        <p class="lecture-author">${c.instructor} | 무제한 수강</p>

                        <div class="lecture-progress">
                            <div class="progress-bar" style="width: ${rate}%;"></div>
                        </div>
                        <p class="lecture-status">${rate}% 완료</p>
                    </div>
                </div>
            `;
            lectureList.appendChild(card);
        });
    }

    // 탭 전환 이벤트
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

    // 정렬 선택 이벤트
    sortSelect.addEventListener("change", () => {
        renderLectures("studying");
    });


    // == 수료증 == //
    function renderCertificates() {
        const certListEl = document.getElementById("certificateList");
    
        let purchased = JSON.parse(localStorage.getItem("purchased") || "[]");
        let completed = JSON.parse(localStorage.getItem("completedLectures") || "{}");
    
        let completedCourses = purchased.filter(courseId => {
            const c = allCourses[courseId];
            if (!c) return false;
    
            const doneList = completed[courseId] || {};
            const total = c.sections.reduce((sum, s) => sum + s.lectures.length, 0);
            const done = Object.values(doneList).filter(v => v === true).length;
    
            return done === total;
        });
    
        if (completedCourses.length === 0) {
            certListEl.innerHTML = `<p style="color:#777;">아직 수료한 강의가 없습니다.</p>`;
            return;
        }
    
        certListEl.innerHTML = "";
    
        completedCourses.forEach(courseId => {
            const c = allCourses[courseId];
    
            certListEl.innerHTML += `
                <div class="cert-card">
                    <img src="${c.thumbnail}">
                    <div class="cert-info">
                        <p class="cert-title">${c.title}</p>
                        <p class="cert-instructor">${c.instructor}</p>
                    </div>
                    <button class="cert-btn" data-id="${courseId}">수료증 발급</button>
                </div>
            `;
        });
    }

    document.addEventListener("click", async (e) => {
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

                <h1 style="text-align:center; font-size:40px; font-weight:800; margin: 0 0 20px 0;; ">
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
