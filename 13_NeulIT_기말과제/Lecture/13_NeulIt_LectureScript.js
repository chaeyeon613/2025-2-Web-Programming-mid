document.addEventListener("DOMContentLoaded", () => {

    /* ------------------  
        강의 카드 뒤집기  
    ------------------ */
    const lectureCards = document.querySelectorAll(".lecture-card");
    lectureCards.forEach(card => {
        card.addEventListener("mouseenter", () => card.classList.add("flip"));
        card.addEventListener("mouseleave", () => card.classList.remove("flip"));
    });

    /* ------------------  
        하트 토글  
    ------------------ */
    const hearts = document.querySelectorAll(".wishlist-heart");
    hearts.forEach(heart => {
        heart.addEventListener("click", function () {
            this.classList.toggle("liked");
            this.textContent = this.classList.contains("liked") ? "♥" : "♡";
        });
    });

    /* ------------------  
        장바구니 버튼 (toggle 기능)
    ------------------ */
    const cartButtons = document.querySelectorAll(".cart");

    function updateCartButtons() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartButtons.forEach(btn => {
            const lectureId = btn.dataset.id;
            if (!lectureId) return;
            if (cart.includes(lectureId)) {
                btn.textContent = "이미 담김";
                btn.classList.add("in-cart");
            } else {
                btn.textContent = "장바구니에 담기";
                btn.classList.remove("in-cart");
            }
        });
    }

    cartButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const lectureId = btn.dataset.id;
            if (!lectureId) return;

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            if (!cart.includes(lectureId)) {
                cart.push(lectureId);
                localStorage.setItem("cart", JSON.stringify(cart));
                alert("장바구니에 담겼습니다!");
            } else {
                cart = cart.filter(id => id !== lectureId);
                localStorage.setItem("cart", JSON.stringify(cart));
                alert("장바구니에서 제거되었습니다!");
            }

            updateCartButtons();

            btn.classList.add("clicked");
            setTimeout(() => btn.classList.remove("clicked"), 300);
        });
    });

    updateCartButtons(); // 페이지 로드 시 버튼 상태 초기화

    /* ------------------  
        장바구니 페이지 렌더링
    ------------------ */
    const cartList = document.querySelector(".cart-list");
    if (cartList) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartList.innerHTML = "";

        if (cart.length === 0) {
            cartList.innerHTML = "<p>장바구니가 비어있습니다.</p>";
        }

        const lectures = [
            {id: "python-basic", title: "Python 기초", thumb: "../Images/python.png"},
            {id: "python-adv", title: "Python 심화", thumb: "../Images/python.png"},
            {id: "c-basic", title: "C언어 기초", thumb: "../Images/c.png"},
            {id: "c-adv", title: "C언어 심화", thumb: "../Images/c.png"},
            {id: "js-basic", title: "자바스크립트 기초", thumb: "../Images/js.png"},
            {id: "js-adv", title: "자바스크립트 심화", thumb: "../Images/js.png"},
            {id: "html-css", title: "HTML/CSS", thumb: "../Images/html+css.png"},
            {id: "react-basic", title: "React 기초", thumb: "../Images/react.png"},
            {id: "react-adv", title: "React 심화", thumb: "../Images/react.png"},
            {id: "vue-basic", title: "Vue.js 기초", thumb: "../Images/vue.png"},
            {id: "node-basic", title: "Node.js 기초", thumb: "../Images/node.png"},
            {id: "node-adv", title: "Node.js 심화", thumb: "../Images/node.png"}
        ];

        cart.forEach(id => {
            const lecture = lectures.find(l => l.id === id);
            if (!lecture) return;

            const item = document.createElement("div");
            item.className = "cart-item";
            item.innerHTML = `
                <img src="${lecture.thumb}" alt="${lecture.title}">
                <div class="cart-info">
                    <h4>${lecture.title}</h4>
                    <button class="remove-btn" data-id="${lecture.id}">삭제</button>
                </div>
            `;
            cartList.appendChild(item);
        });

        const removeButtons = document.querySelectorAll(".remove-btn");
        removeButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                cart = cart.filter(item => item !== id);
                localStorage.setItem("cart", JSON.stringify(cart));
                btn.closest(".cart-item").remove();
                updateCartButtons();
            });
        });
    }

    /* ------------------  
        추천순 / 인기순 정렬(랜덤)  
    ------------------ */
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

    /* ------------------  
        검색 placeholder 애니메이션  
    ------------------ */
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

    /* ------------------  
        검색 자동완성  
    ------------------ */
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

        filtered.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;

            li.addEventListener("click", function () {
                searchInput.value = item;
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