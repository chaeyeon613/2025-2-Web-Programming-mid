document.addEventListener("DOMContentLoaded", () => {
    
    const lectureList = document.querySelector(".lecture-list");
    const cards = lectureList ? Array.from(lectureList.querySelectorAll(".lecture")) : [];

    cards.forEach(card => {
        const id = card.dataset.id;
        if (!id) return;

        card.addEventListener("click", function(e) {
            if (e.target.closest(".wishlist-heart") || e.target.closest(".cart")) {
                return;
            }
            window.location.href = `../Lecture/13_NeulIt_LectureDetail.html?id=${id}`;
        });
    });
    
    // 강의 검색
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.querySelector(".lecture-search input[type='image']");
    
    function applySearchFilter(searchText) {
        const search = searchText.toLowerCase().trim();

        cards.forEach(card => {
            const titleElement = card.querySelector(".lecture-title");
            
            if (titleElement) {
                const title = titleElement.textContent.toLowerCase();

                if (!search || title.includes(search)) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            }
        });

        // 강의 개수 업데이트
        const visibleCards = cards.filter(card => !card.classList.contains("hidden")).length;
        const countElement = document.querySelector(".lecture-count h4");
        if (countElement) {
            countElement.textContent = `${visibleCards} 강의`;
        }
    }

    // 검색 함수
    const performSearch = () => {
        const searchText = searchInput.value;
        applySearchFilter(searchText);
    };

    if (searchButton) {
        searchButton.addEventListener("click", (e) => {
            e.preventDefault();
            performSearch();
        });
    }

    if (searchInput) {
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault(); 
                performSearch();
            }
        });
    }
    
    applySearchFilter(""); 
});

// 카테고리 클릭 시 랜덤 정렬 기능
document.querySelectorAll(".category-bar input[type='radio']").forEach(radio => {
    radio.addEventListener("change", () => {

        const lectureList = document.querySelector(".lecture-list");
        const cards = Array.from(lectureList.querySelectorAll(".lecture"));

        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }

        cards.forEach(card => lectureList.appendChild(card));
    });
});