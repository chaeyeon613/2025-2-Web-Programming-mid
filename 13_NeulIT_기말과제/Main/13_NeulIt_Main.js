// 1. 메인 타이틀 내용
const slideText = document.querySelector(".title-slide");
const messages = [
    " 여정을 함께해요",
    " 시작을 응원해요",
    " 지식을 연결해요"
];

let index = 1;

function changeSlideText() {
    slideText.classList.remove("show");

    setTimeout(() => {
        slideText.textContent = messages[index];
        slideText.classList.add("show");

        index = (index + 1) % messages.length;
    },1000);
}

setTimeout(() => {
    slideText.classList.add("show");
}, 300); 

setTimeout(() => {
    setInterval(changeSlideText, 3000);
},3000);


//2. 메인 리뷰 캐러셀
const tracks = document.querySelectorAll('.carousel__content')

tracks.forEach(track => {
    const cards = [...track.children]

    for (const card of cards) {
        track.appendChild(card.cloneNode(true))
    }
})


// 3. 스크롤 애니메이션(box)
const boxes = document.querySelectorAll('.box');

function checkBoxes() {
    const trigger = window.innerHeight * 0.7;

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