function formatPrice(num) {
    return "₩" + num.toLocaleString("ko-KR");
}

let basket = [];

// 체크박스 가격 합산
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

// ui 렌더링
function loadBasket() {
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

    // 전체 선택 체크박스 초기화
    if (selectAll) {
        selectAll.checked = false;
    }

    updateSummary();
    selectText.textContent = `0 / ${basket.length}`;

    bindCheckbox();
    bindDeleteButtons();
    bindSelectAll();
    bindDeleteSelected();

    elCoupon.onchange = updateSummary;

    bindPayment();
}

// 최종 결제금액 계산용
function getFinalPrice() {
    const elCoupon = document.querySelector(".coupon-select");
    let selectedPrice = getSelectedPrice();
    let couponValue   = Number(elCoupon.value);
    let finalPrice    = selectedPrice - couponValue;
    if (finalPrice < 0) finalPrice = 0;
    return finalPrice;
}

// 금액 요약 업데이트
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

// 개별 체크박스
function bindCheckbox() {
    const checks     = document.querySelectorAll(".item-check");
    const selectText = document.querySelector(".select-left .highlight");
    const selectAll  = document.getElementById("selectAll");

    checks.forEach(chk => {
        chk.addEventListener("change", () => {
            const selected = document.querySelectorAll(".item-check:checked").length;
            const total    = checks.length;
            selectText.textContent = `${selected} / ${total}`;

            if (selectAll) {
                selectAll.checked = (selected === total && total > 0);
            }

            updateSummary();
        });
    });
}

// 전체선택 기능
function bindSelectAll() {
    const selectAll  = document.getElementById("selectAll");
    const selectText = document.querySelector(".select-left .highlight");

    if (!selectAll) return;

    selectAll.addEventListener("change", () => {
        const checks = document.querySelectorAll(".item-check");
        checks.forEach(c => (c.checked = selectAll.checked));
        const selected = selectAll.checked ? checks.length : 0;
        selectText.textContent = `${selected} / ${checks.length}`;
        updateSummary();
    });
}

// x 버튼 개별 삭제 기능
function bindDeleteButtons() {
    const deleteBtns = document.querySelectorAll(".remove");

    deleteBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            let index  = Number(btn.dataset.index);
            let basket = JSON.parse(localStorage.getItem("basket") || "[]");

            basket.splice(index, 1);
            localStorage.setItem("basket", JSON.stringify(basket));
            loadBasket();
        });
    });
}

// 선택삭제 버튼 기능
function bindDeleteSelected() {
    const btn        = document.querySelector(".delete-selected");
    const selectAll  = document.getElementById("selectAll");

    if (!btn) return;

    btn.onclick = () => {
        let basket = JSON.parse(localStorage.getItem("basket") || "[]");
        const checks = document.querySelectorAll(".item-check");

        if (!checks.length) return;

        const remain = [];

        checks.forEach((chk, idx) => {
            const id = basket[idx];
            if (!chk.checked) {
                remain.push(id);
            }
        });

        if (remain.length === basket.length) {
            alert("선택된 강의가 없습니다.");
            return;
        }

        localStorage.setItem("basket", JSON.stringify(remain));

        if (selectAll) {
            selectAll.checked = false;
        }

        loadBasket();
    };
}

// 결제 기능
function bindPayment() {
    const payBtn = document.querySelector(".pay-btn");

    payBtn.onclick = () => {
        const finalPrice = getFinalPrice();

        if (finalPrice === 0) {
            alert("선택된 강의가 없습니다.");
            return;
        }

        const ok = confirm(`${formatPrice(finalPrice)}을 결제하시겠습니까?`);
        if (!ok) return;

        let basket    = JSON.parse(localStorage.getItem("basket") || "[]");
        let purchased = JSON.parse(localStorage.getItem("purchased") || "[]");

        const checks = document.querySelectorAll(".item-check");
        const toDelete = [];

        checks.forEach((chk, index) => {
            if (chk.checked) {
                const id = basket[index];

                if (!purchased.includes(id)) {
                    purchased.push(id);
                }

                toDelete.push(id);
            }
        });

        basket = basket.filter(id => !toDelete.includes(id));

        localStorage.setItem("basket", JSON.stringify(basket));
        localStorage.setItem("purchased", JSON.stringify(purchased));

        alert("결제가 완료되었습니다!");

        loadBasket();
    };
}

document.addEventListener("DOMContentLoaded", loadBasket);
