/* ---------------------------
1. 스크롤 텍스트 애니메이션
--------------------------- */
const scrollTexts = document.querySelectorAll(".scroll-text");

window.addEventListener("scroll", () => {
    const triggerPoint = window.innerHeight * 0.85;

    scrollTexts.forEach(text => {
        const top = text.getBoundingClientRect().top;

        if (top < triggerPoint) {
            text.classList.add("show");
        }
    });
});


/* ---------------------------
2. 페이드 인 요소 처리
--------------------------- */
const fadeTargets = document.querySelectorAll(".fade-target");

window.addEventListener("scroll", () => {
    const triggerPoint = window.innerHeight * 0.8;

    fadeTargets.forEach(target => {
        const top = target.getBoundingClientRect().top;

        if (top < triggerPoint) {
            target.classList.add("show");
        }
    });
});


/* ---------------------------
3. 스크롤 애니메이션(box)
--------------------------- */
const boxes = document.querySelectorAll('.box');

function checkBoxes() {
    const trigger = window.innerHeight * 0.9;

    boxes.forEach(box => {
        const top = box.getBoundingClientRect().top;
        if (top < trigger) {
            box.classList.add("show");
        } else {
            box.classList.remove("show");
        }
    });
}

window.addEventListener("scroll", checkBoxes);
checkBoxes();
