let userData = {};

// 임시
let currentUser = localStorage.getItem("loginUser") || "devUser";

// 임시
async function loadUserData() {
    const res = await fetch("/User.json");
    const json = await res.json();
    userData = json;

    if (localStorage.getItem("basket") === null) {
        localStorage.setItem("basket", JSON.stringify(userData.basket || []));
    }

    if (localStorage.getItem("purchased") === null) {
        localStorage.setItem("purchased", JSON.stringify(userData.purchased || []));
    }
}


// 가격 포맷
function formatPrice(num) {
    return "₩" + num.toLocaleString("ko-KR");
}


// 장바구니 로드 + UI 렌더링
let basket = [];

function loadBasketUI() {
    const container = document.getElementById("cart-list");

    const elProduct  = document.querySelector(".sum-product");
    const elDiscount = document.querySelector(".sum-discount");
    const elCount    = document.querySelector(".sum-count");
    const elTotal    = document.querySelector(".sum-total");
    const elCoupon   = document.querySelector(".coupon-select");
    const payBtn     = document.querySelector(".pay-btn");
    const selectText = document.querySelector(".select-left .highlight");
    const selectAll  = document.getElementById("selectAll");

    basket = JSON.parse(localStorage.getItem("basket") || "[]");

    container.innerHTML = "";

    basket.forEach((courseId, index) => {
        const c = allCourses[courseId];
        if (!c) return;

        const item = document.createElement("article");
        item.className = "cart-box";
        item.innerHTML = `
          <input type="checkbox" class="item-check" data-index="${index}">
          <img src="${c.thumbnail}" class="thumb">
          <div class="info">
            <p class="name">${c.title}</p>
            <p class="detail">${c.instructor} | <span class="highlight">${c.badge}</span></p>
          </div>
          <button class="remove" data-index="${index}">×</button>
          <p class="price">${formatPrice(c.price)}</p>
        `;

        container.appendChild(item);
    });

    if (selectAll) selectAll.checked = false;

    updateSummary();
    selectText.textContent = `0 / ${basket.length}`;

    bindCheckbox();
    bindDeleteButtons();
    bindSelectAll();
    bindDeleteSelected();
    elCoupon.onchange = updateSummary;
    bindPayment();
}


// 체크된 가격 합산
function getSelectedPrice() {
    const checks = document.querySelectorAll(".item-check");
    let sum = 0;

    checks.forEach((chk, index) => {
        if (chk.checked) {
            const id = basket[index];
            const c = allCourses[id];
            sum += c.price;
        }
    });

    return sum;
}


// 최종 가격 계산
function getFinalPrice() {
    const elCoupon = document.querySelector(".coupon-select");
    let selectedPrice = getSelectedPrice();
    let couponValue   = Number(elCoupon.value);
    let finalPrice    = selectedPrice - couponValue;
    return finalPrice < 0 ? 0 : finalPrice;
}


// 금액 요약
function updateSummary() {
    const elProduct  = document.querySelector(".sum-product");
    const elCount    = document.querySelector(".sum-count");
    const elTotal    = document.querySelector(".sum-total");
    const elCoupon   = document.querySelector(".coupon-select");
    const payBtn     = document.querySelector(".pay-btn");

    let selectedPrice = getSelectedPrice();
    let selectedCount = document.querySelectorAll(".item-check:checked").length;
    let couponValue   = Number(elCoupon.value);

    let finalPrice = selectedPrice - couponValue;
    if (finalPrice < 0) finalPrice = 0;

    elProduct.textContent = formatPrice(selectedPrice);
    elCount.textContent   = `총 ${selectedCount}개 주문금액`;
    elTotal.textContent   = formatPrice(finalPrice);
    payBtn.textContent    = `${formatPrice(finalPrice)} 결제하기`;
}


// 개별 체크박스 이벤트
function bindCheckbox() {
    const checks     = document.querySelectorAll(".item-check");
    const selectText = document.querySelector(".select-left .highlight");
    const selectAll  = document.getElementById("selectAll");

    checks.forEach(chk => {
        chk.addEventListener("change", () => {
            const selected = document.querySelectorAll(".item-check:checked").length;
            const total    = checks.length;
            selectText.textContent = `${selected} / ${total}`;
            if (selectAll) selectAll.checked = selected === total;

            updateSummary();
        });
    });
}


// 전체 선택
function bindSelectAll() {
    const selectAll  = document.getElementById("selectAll");
    const selectText = document.querySelector(".select-left .highlight");

    if (!selectAll) return;

    selectAll.addEventListener("change", () => {
        const checks = document.querySelectorAll(".item-check");
        checks.forEach(c => (c.checked = selectAll.checked));

        selectText.textContent = `${selectAll.checked ? checks.length : 0} / ${checks.length}`;
        updateSummary();
    });
}


// 개별 삭제
function bindDeleteButtons() {
    const deleteBtns = document.querySelectorAll(".remove");

    deleteBtns.forEach(btn => {
        btn.addEventListener("click", () => {

            let index = Number(btn.dataset.index);

            basket.splice(index, 1);

            localStorage.setItem("basket", JSON.stringify(basket));

            loadBasketUI();
        });
    });
}


// 선택 삭제
function bindDeleteSelected() {
    const btn       = document.querySelector(".delete-selected");
    const selectAll = document.getElementById("selectAll");

    if (!btn) return;

    btn.onclick = () => {
        const checks = document.querySelectorAll(".item-check");

        const remain = [];

        checks.forEach((chk, idx) => {
            const id = basket[idx];
            if (!chk.checked) remain.push(id);
        });

        if (remain.length === basket.length) {
            alert("선택된 강의가 없습니다.");
            return;
        }

        basket = remain;

        localStorage.setItem("basket", JSON.stringify(basket));

        if (selectAll) selectAll.checked = false;

        loadBasketUI();
    };
}


// 결제
function bindPayment() {
    const payBtn = document.querySelector(".pay-btn");

    payBtn.onclick = () => {
        const finalPrice = getFinalPrice();

        if (finalPrice === 0) {
            alert("선택된 강의가 없습니다.");
            return;
        }

        if (!confirm(`${formatPrice(finalPrice)}을 결제하시겠습니까?`)) return;

        let purchased = JSON.parse(localStorage.getItem("purchased") || "[]");

        const checks = document.querySelectorAll(".item-check");
        const toDelete = [];

        checks.forEach((chk, index) => {
            if (chk.checked) {
                const id = basket[index];
                if (!purchased.includes(id)) purchased.push(id);
                toDelete.push(id);
            }
        });

        basket = basket.filter(id => !toDelete.includes(id));

        localStorage.setItem("purchased", JSON.stringify(purchased));
        localStorage.setItem("basket", JSON.stringify(basket));

        alert("결제가 완료되었습니다!");
        loadBasketUI();
    };
}


// 초기 실행
document.addEventListener("DOMContentLoaded", async () => {
    await loadUserData();
    loadBasketUI();
});
