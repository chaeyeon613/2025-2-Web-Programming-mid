document.addEventListener("DOMContentLoaded", async () => {

    // 🔸 user.json에서 읽어온 구매 목록을 메모리에 저장용
    let purchasedFromUser = [];

    // user.json 로드
    async function loadPurchasedFromUser() {
        try {
            // 경로는 프로젝트 구조에 맞춰서 사용
            const res = await fetch("/13_NeulIt_User.json");
            const data = await res.json();

            purchasedFromUser = data.purchased || [];

            // (선택) localStorage와 합치기 - 기존 값이 있다면 병합
            const localPurchased = JSON.parse(localStorage.getItem("purchased_neulit") || "[]");
            const merged = Array.from(new Set([...localPurchased, ...purchasedFromUser]));
            localStorage.setItem("purchased_neulit", JSON.stringify(merged));

        } catch (e) {
            console.error("user.json 로드 실패", e);
            purchasedFromUser = [];
        }
    }

    // 먼저 user.json 로드 끝나고 나머지 실행
    await loadPurchasedFromUser();



    /* -----------------------------------------
       1) 강의 카드 뒤집기
    ----------------------------------------- */
    const lectureCards = document.querySelectorAll(".lecture-card");
    lectureCards.forEach(card => {
        card.addEventListener("mouseenter", () => card.classList.add("flip"));
        card.addEventListener("mouseleave", () => card.classList.remove("flip"));
    });



    /* -----------------------------------------
       2) 하트(찜) 토글
    ----------------------------------------- */
    const hearts = document.querySelectorAll(".wishlist-heart");
    const favKey = "favorite_courses_neulit";
    const filledHeartSrc = "../Images/favorite-fill.svg"; 
    const emptyHeartSrc = "../Images/favorite.svg";

    hearts.forEach(button => {
        const id = button.dataset.id;
        const img = button.querySelector("img");

        let favList = JSON.parse(localStorage.getItem(favKey) || "[]");

        if (favList.includes(id)) {
            img.src = filledHeartSrc;
            img.dataset.like = "true";
        } else {
            img.src = emptyHeartSrc;
            img.dataset.like = "false";
        }

        button.addEventListener("click", function (e) {
            e.stopPropagation();
            e.preventDefault();

            let liked = img.dataset.like === "true";
            let favList = JSON.parse(localStorage.getItem(favKey) || "[]");
            const lectureId = this.dataset.id;

            if (liked) {
                img.src = emptyHeartSrc;
                img.dataset.like = "false";
                favList = favList.filter(cid => cid !== lectureId);
            } else {
                img.src = filledHeartSrc;
                img.dataset.like = "true";
                if (!favList.includes(lectureId)) favList.push(lectureId);
            }

            localStorage.setItem(favKey, JSON.stringify(favList));
            localStorage.setItem(`heart_${lectureId}`, img.dataset.like === "true" ? "1" : "0");
        });
    });



    /* -----------------------------------------
       3) 장바구니 / 구매완료 버튼
    ----------------------------------------- */
    const basketKey = "basket_neulit";
    const purchasedKey = "purchased_neulit";
    const cartButtons = document.querySelectorAll(".cart");

    // 🔸 항상 "user.json + localStorage"를 합친 구매 목록을 사용
    function getPurchasedAll() {
        const localPurchased = JSON.parse(localStorage.getItem(purchasedKey) || "[]");
        return Array.from(new Set([...localPurchased, ...purchasedFromUser]));
    }

    function updateCartButtons() {
        let basket = JSON.parse(localStorage.getItem(basketKey) || "[]");
        let purchased = getPurchasedAll();

        cartButtons.forEach(btn => {
            const lectureId = btn.dataset.id;
            if (!lectureId) return;

            // 이미 구매한 강의
            if (purchased.includes(lectureId)) {
                btn.textContent = "구매완료";
                btn.classList.add("disabled");
                btn.style.background = "#ddd";
                btn.style.color = "#666";
                btn.style.cursor = "not-allowed";
                btn.disabled = true;
                return;
            }

            // 장바구니 상태
            if (basket.includes(lectureId)) {
                btn.textContent = "이미 담김";
                btn.classList.add("in-cart");
            } else {
                btn.textContent = "장바구니 담기";
                btn.classList.remove("in-cart");
            }
        });
    }


    cartButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            e.preventDefault();

            const lectureId = btn.dataset.id;
            if (!lectureId) return;

            let basket = JSON.parse(localStorage.getItem(basketKey) || "[]");
            let purchased = getPurchasedAll();

            // 🔒 user.json 기준으로도 이미 구매한 강의면 막기
            if (purchased.includes(lectureId)) {
                alert("이미 구매한 강의입니다!");
                return;
            }

            if (!basket.includes(lectureId)) {
                basket.push(lectureId);
                localStorage.setItem(basketKey, JSON.stringify(basket));
                alert("장바구니에 담겼습니다!");
            } else {
                basket = basket.filter(id => id !== lectureId);
                localStorage.setItem(basketKey, JSON.stringify(basket));
                alert("장바구니에서 제거되었습니다!");
            }

            updateCartButtons();
        });
    });

    updateCartButtons();



    /* -----------------------------------------
       4) 추천순 정렬 (셔플)
    ----------------------------------------- */
    const lectureList = document.querySelector(".lecture-list");
    const dropdown = document.querySelector(".lecture-dropdown select");
    let cards = lectureList ? Array.from(lectureList.children) : [];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    if (dropdown) {
        dropdown.addEventListener("change", () => {
            const shuffled = shuffle([...cards]);
            lectureList.innerHTML = "";
            shuffled.forEach(card => lectureList.appendChild(card));
        });
    }



    /* -----------------------------------------
       5) 검색 placeholder 애니메이션
    ----------------------------------------- */
    const searchInput = document.getElementById("searchInput");
    const placeholders = [
        "📘 알고리즘 완전 정복!",
        "🔥 새로운 기술을 배워볼까요?",
        "💡 실력이 느는 순간을 경험하세요!"
    ];

    let phIndex = 0;
    let phTimer;

    function startPlaceholderAnimation() {
        phTimer = setInterval(() => {
            searchInput.classList.remove("show");
            setTimeout(() => {
                searchInput.placeholder = placeholders[phIndex];
                phIndex = (phIndex + 1) % placeholders.length;
                searchInput.classList.add("show");
            }, 300);
        }, 2000);
    }

    function stopPlaceholderAnimation() {
        clearInterval(phTimer);
        searchInput.classList.add("show");
    }

    searchInput.classList.add("show");
    startPlaceholderAnimation();

    searchInput.addEventListener("input", () => stopPlaceholderAnimation());
    searchInput.addEventListener("focus", () => stopPlaceholderAnimation());
    searchInput.addEventListener("blur", () => {
        if (!searchInput.value.trim()) startPlaceholderAnimation();
    });



    /* -----------------------------------------
       6) 검색 자동완성
    ----------------------------------------- */
    const searchData = [
        "Python 기초","Python 심화","C언어 기초","C언어 심화","Java 기초","Java 심화",
        "자바스크립트 기초","자바스크립트 심화","HTML/CSS","React 기초","React 심화",
        "Vue.js 기초","Node.js 기초","Node.js 심화","Spring Boot 기초","Spring Boot 심화",
        "Django 기초","Django 심화","Flask 기초","Flask 심화","데이터 분석 Python",
        "데이터 엔지니어링","머신러닝 기초","머신러닝 심화","딥러닝 기초","딥러닝 심화",
        "DevOps 입문","모바일 앱 개발","임베디드 시스템 기초","Git & GitHub","알고리즘 기초",
        "알고리즘 문제풀이","자료구조 기초","자료구조 심화","SQL 기초","SQL 심화",
        "NoSQL 기초","REST API 개발","GraphQL 기초","클라우드 컴퓨팅","Docker & Kubernetes",
        "테스트 자동화","웹 보안 기초","프론트엔드 종합 프로젝트","백엔드 종합 프로젝트"
    ];

    const list = document.getElementById("autocomplete-list");

    searchInput.addEventListener("input", function () {
        const value = this.value.toLowerCase().replace(/\s+/g,'');
        list.innerHTML = "";

        if (!value) {
            list.style.display = "none";
            return;
        }

        const filtered = searchData.filter(item =>
            item.toLowerCase().replace(/\s+/g,'').includes(value)
        );

        if (filtered.length === 0) {
            list.style.display = "none";
            return;
        }

        filtered.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;

            li.addEventListener("click", function () {
                searchInput.value = item;
                list.style.display = "none";
            });

            list.appendChild(li);
        });

        list.style.display = "block";
    });

    document.addEventListener("click", function (e) {
        if (!e.target.closest(".lecture-search")) {
            list.style.display = "none";
        }
    });

});
