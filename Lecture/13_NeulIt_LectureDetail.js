let userData = null;

function getParam(name) {
    return new URL(location.href).searchParams.get(name);
}

async function ensureUserDataLoaded() {
    if (userData && userData.purchased) return;

    const paths = [
        "../13_NeulIt_User.json",
        "/13_NeulIt_User.json",
        "../User.json",
        "/User.json"
    ];

    for (const path of paths) {
        try {
            const res = await fetch(path);
            if (res.ok) {
                userData = await res.json();
                return;
            }
        } catch(e) {}
    }

    console.error("userData 로드 실패: JSON파일을 찾을 수 없음");
}

document.addEventListener("DOMContentLoaded", async () => {
    const id = getParam("id");
    if (!id) return;

    await ensureUserDataLoaded(); 

    if (Array.isArray(userData.purchased)) {
        let saved = JSON.parse(localStorage.getItem("purchased_neulit") || "[]");

        userData.purchased.forEach(courseId => {
            if (!saved.includes(courseId)) {
                saved.push(courseId);
            }
        });

        localStorage.setItem("purchased_neulit", JSON.stringify(saved));
    }

    const cartBtn = document.querySelector(".shopping-button");
    if (cartBtn) {
        cartBtn.addEventListener("click", () => {
            let purchased = JSON.parse(localStorage.getItem("purchased_neulit") || "[]");

            if (purchased.includes(id)) {
                alert("이미 구매한 강의입니다!");
                return;
            }

            let basket = JSON.parse(localStorage.getItem("basket_neulit") || "[]");

            if (!basket.includes(id)) {
                basket.push(id);
                localStorage.setItem("basket_neulit", JSON.stringify(basket));
            }

            alert("장바구니에 담겼습니다!");
        });
    }

    const course = allCourses[id];
    const lectureBtn = document.querySelector(".lecture-button");

    if (lectureBtn) {
        lectureBtn.onclick = () => {
            let purchased = JSON.parse(localStorage.getItem("purchased_neulit") || "[]");

            if (purchased.includes(id)) {
                alert("이미 구매한 강의입니다!");
                return;
            }

            const result = confirm(`"${course.title}" 강의를 결제하시겠습니까?`);
            if (!result) {
                alert("결제가 취소되었습니다.");
                return;
            }

            purchased.push(id);
            localStorage.setItem("purchased_neulit", JSON.stringify(purchased));

            alert("결제가 완료되었습니다! 즐거운 학습 되세요 🌿");
        };
    }

    const favBtn = document.querySelector(".favorite-button img");
    if (favBtn) {
        favBtn.src = "../Images/favorite.svg";
        favBtn.dataset.like = "false";

        favBtn.addEventListener("click", () => {
            const liked = favBtn.dataset.like == "true";

            favBtn.src = liked ? "../Images/favorite.svg" : "../Images/favorite-fill.svg";
            favBtn.dataset.like = liked ? "false" : "true";
        });
    }
});
