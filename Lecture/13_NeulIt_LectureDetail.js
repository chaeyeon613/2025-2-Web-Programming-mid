function getParam(name) {
    return new URL(location.href).searchParams.get(name);
}

document.addEventListener("DOMContentLoaded", () => {
    const id = getParam("id");
    if (!id) {
        console.warn("URL에 id가 없습니다.");
        return;
    }

    const cartBtn = document.querySelector(".shopping-button");

    if (cartBtn) {
        cartBtn.addEventListener("click", () => {
            let basket = JSON.parse(localStorage.getItem("basket") || "[]");

            if (!basket.includes(id)) {
                basket.push(id);
                localStorage.setItem("basket", JSON.stringify(basket));
            }

            alert("장바구니에 담겼습니다!");
        });
    }
});
