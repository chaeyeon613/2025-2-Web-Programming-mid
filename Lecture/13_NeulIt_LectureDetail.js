function getParam(name) {
    return new URL(location.href).searchParams.get(name);
}

document.addEventListener("DOMContentLoaded", () => {
    const id = getParam("id");
    if (!id) return;

    const cartBtn = document.querySelector(".shopping-button");

    if (cartBtn) {
        cartBtn.addEventListener("click", () => {

            let basket = JSON.parse(localStorage.getItem("basket_neulit") || "[]");

            if (!basket.includes(id)) {
                basket.push(id);
                localStorage.setItem("basket_neulit", JSON.stringify(basket));
            }

            alert("장바구니에 담겼습니다!");
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const id = getParam("id");
    if (!id) return;

    const course = allCourses[id];
    const lectureBtn = document.querySelector(".lecture-button");

    if (lectureBtn) {
        lectureBtn.onclick = () => {
            const result = confirm(`"${course.title}" 강의를 결제하시겠습니까?`);

            if (!result) {
                alert("결제가 취소되었습니다.");
                return;
            }

            let purchased = JSON.parse(localStorage.getItem("purchased_neulit") || "[]");

            if (!purchased.includes(id)) {
                purchased.push(id);
            }

            localStorage.setItem("purchased_neulit", JSON.stringify(purchased));

            alert("결제가 완료되었습니다! 즐거운 학습 되세요 🌿");
        };
    }
});
