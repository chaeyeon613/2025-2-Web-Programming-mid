document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".lecture");

    cards.forEach(card => {
        const id = card.dataset.id;
        const link = card.querySelector(".lecture-link");

        if (!id || !link) return;

        link.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = `../Lecture/13_NeulIt_LectureDetail.html?id=${id}`;
        });
    });
});
