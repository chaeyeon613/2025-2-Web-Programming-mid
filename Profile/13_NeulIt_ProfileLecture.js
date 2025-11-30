document.addEventListener("DOMContentLoaded", () => {
    const lectureList = document.querySelector(".lecture-list");

    lectureList.innerHTML = "";

    // 장바구니에서 결제된 강의 id 배열 (임시 데이터 - 삭제 예정)
    //const purchased = JSON.parse(localStorage.getItem("purchased") || "[]");
    const purchased = ["react-basic", "c-basic", "spring-basic"];

    // 결제한 강의가 없을 경우
    if (purchased.length === 0) {
        lectureList.innerHTML = `<p style="color:#777;">아직 수강 중인 강의가 없습니다.</p>`;
        return;
    }

    // 결제된 강의들 렌더링
    purchased.forEach(id => {
        const c = allCourses[id];
        if (!c) return;

        const card = document.createElement("a");

        card.href = "../Player/13_NeulIt_Player.html?id=" + id;
        card.className = "card-link";

        card.innerHTML = `
            <div class="lecture-card">
                <img src="${c.thumbnail}" alt="강의 썸네일" class="lecture-thumb">
                <div class="lecture-info">
                    <h3 class="lecture-title">${c.title}</h3>
                    <p class="lecture-author">${c.instructor} | 무제한 수강</p>
                    <div class="lecture-progress">
                        <div class="progress-bar" style="width: 0%;"></div>
                    </div>
                    <p class="lecture-status">0% 완료</p>
                </div>
            </div>
        `;

        lectureList.appendChild(card);
    });
});
