document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".lecture");

    cards.forEach(card => {
        const img = card.querySelector(".lecture-thumbnail img");
        const link = card.querySelector(".lecture-link");

        if (!img || !link) return;

        const src = img.getAttribute("src");
        const filename = src.split("/").pop();
        let matchedId = null;

        for (const id in allCourses) {
            const thumb = allCourses[id].thumbnail;
            if (thumb.split("/").pop() === filename) {
                matchedId = id;
                break;
            }
        }

        if (!matchedId) return;

        link.removeAttribute("href");

        link.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = `../Lecture/13_NeulIt_LectureDetail.html?id=${matchedId}`;
        });
    });
});
