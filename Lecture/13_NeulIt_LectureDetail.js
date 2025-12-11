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
        userData.purchased.forEach(cid => {
            if (!saved.includes(cid)) saved.push(cid);
        });
        localStorage.setItem("purchased_neulit", JSON.stringify(saved));
    }

    function addToBasket() {
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
    }

    const course = allCourses[id] || null;

    function purchaseCourse() {
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
    }

    const detailCartBtn = document.querySelector(".shopping-button");
    const detailLectureBtn = document.querySelector(".lecture-button");

    if (detailCartBtn) detailCartBtn.onclick = addToBasket;
    if (detailLectureBtn && course) detailLectureBtn.onclick = purchaseCourse;

    const modalCartBtn = document.querySelector(".cart-btn");  
    const modalApplyBtn = document.querySelector(".apply-btn"); 

    if (modalCartBtn) modalCartBtn.onclick = addToBasket;     
    if (modalApplyBtn && course) modalApplyBtn.onclick = purchaseCourse;

    const favKey = "favorite_courses_neulit";
    const favImg = document.querySelector(".favorite-button img");

    const mainHeart = localStorage.getItem(`heart_${id}`);
    if (mainHeart === "1") {
        if (favImg) {
            favImg.src = "../Images/favorite-fill.svg";
            favImg.dataset.like = "true";
        }
    }

    if (favImg) {
        let favList = JSON.parse(localStorage.getItem(favKey) || "[]");

        if (favList.includes(id)) {
            favImg.src = "../Images/favorite-fill.svg";
            favImg.dataset.like = "true";
        } else {
            favImg.src = "../Images/favorite.svg";
            favImg.dataset.like = "false";
        }

        favImg.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            let liked = favImg.dataset.like === "true";
            let favList = JSON.parse(localStorage.getItem(favKey) || "[]");

            if (liked) {
                favImg.src = "../Images/favorite.svg";
                favImg.dataset.like = "false";
                favList = favList.filter(cid => cid !== id);
            } else {
                favImg.src = "../Images/favorite-fill.svg";
                favImg.dataset.like = "true";
                if (!favList.includes(id)) favList.push(id);
            }

            localStorage.setItem(favKey, JSON.stringify(favList));
            localStorage.setItem(`heart_${id}`, favImg.dataset.like === "true" ? "1" : "0");
        });
    }
});


const previewModal = document.getElementById("previewModal");
const previewClose = document.querySelector(".preview-close");
const previewVideo = document.getElementById("previewVideo");

const previewButtons = document.querySelectorAll(".preview-btn");
const previewItems = document.querySelectorAll(".preview-item");

previewButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        const index = btn.dataset.preview * 1;

        previewItems.forEach(i => i.classList.remove("active"));

        const targetItem = previewItems[index];
        targetItem.classList.add("active");

        const newSrc = targetItem.dataset.src;
        previewVideo.pause();
        previewVideo.src = newSrc;
        previewVideo.currentTime = 0;
        previewVideo.play();

        previewModal.classList.add("active");
    });
});

previewItems.forEach((item, i) => {
    item.addEventListener("click", () => {

        previewItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        previewVideo.pause();
        previewVideo.src = item.dataset.src;
        previewVideo.currentTime = 0;
        previewVideo.play();
    });
});

previewClose.addEventListener("click", closePreview);

previewModal.addEventListener("click", e => {
    if (e.target === previewModal) closePreview();
});

function closePreview() {
    previewModal.classList.remove("active");
    previewVideo.pause();
}
