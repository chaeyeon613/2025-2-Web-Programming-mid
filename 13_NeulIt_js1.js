document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const mentorCards = document.querySelectorAll('.card2');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {

            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            mentorCards.forEach(card => {
                const categories = card.dataset.category.split(',').map(c => c.trim());

                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// 각 페이지에서 검색하면 떠야하는 키워드들 적어주세요! 기존 키워드들은 지우시면 됩니다!
const searchData = [
    "김은지",
    "이지현",
    "류보람",
    "이가은",
    "한서윤",
    "장유진",
    "박지현",
    "오다현",
    "최지민",
    "프론트엔드",
    "백엔드",
    "데이터 엔지니어",
    "모바일",
    "임베디드",
    "DevOps"
];

document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("searchInput");
    const list = document.getElementById("autocomplete-list");
    if (!input || !list) return;

    input.addEventListener("input", function () {
        const value = this.value.toLowerCase().trim();
        list.innerHTML = "";

        if (!value) {
            list.style.display = "none";
            return;
        }

        const filtered = searchData.filter(item =>
            item.toLowerCase().includes(value)
        );

        filtered.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;

            li.addEventListener("click", function () {
                input.value = item;
                list.style.display = "none";
            });

            list.appendChild(li);
        });

        list.style.display = filtered.length ? "block" : "none";
    });

    document.addEventListener("click", function (e) {
        if (!e.target.closest(".lecture-search")) {
            list.style.display = "none";
        }
    });
});



// =========== 수빈: 멘토 카드에 id 자동 부여 ========== //
document.addEventListener("DOMContentLoaded", function () {

    if (typeof allMentors === "undefined") return;

    const mentorCards = document.querySelectorAll(".card2");

    mentorCards.forEach(card => {
        const nameEl = card.querySelector(".name2");
        if (!nameEl) return;

        const mentorName = nameEl.textContent.trim();

        let mentorId = null;
        for (const key in allMentors) {
            if (allMentors[key].name === mentorName) {
                mentorId = allMentors[key].id;
                break;
            }
        }

        if (!mentorId) return;

        const originalHref = card.getAttribute("href") || "";

        if (!originalHref.includes("?id=")) {
            card.setAttribute("href", `${originalHref}?id=${mentorId}`);
        }
    });

});
// ==================== //