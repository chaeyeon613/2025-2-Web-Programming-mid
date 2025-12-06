document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.querySelector('.calendar_card');

    calendar.addEventListener('click', function (e) {
        const cell = e.target.closest('td.opened');
        if (!cell) return;

        const day = cell.textContent.trim();
        const monthText = calendar.querySelector('.month').textContent.trim();
        const dateLabel = monthText + ' ' + day + '일';
        const ok = confirm(dateLabel + '로 멘토링을 예약하시겠습니까?');

        if (!ok) {
            alert('예약이 취소되었습니다.');
            return;
        }

        alert('멘토링 예약이 완료되었습니다!');

        cell.classList.remove('opened');
        cell.classList.add('reserved');
    });


    const applyButton = document.querySelector('.lecture-button');
    const modalOverlay = document.getElementById('mentoring-modal');
    const modalForm = document.getElementById('mentoring-form');
    const modalPriceBox = document.getElementById('modal-price');
    const dateSelect = document.getElementById('modal-date');
    const timeSelect = document.getElementById('modal-time');
    const cancelButton = document.getElementById('modal-cancel');
    const priceHeading = document.querySelector('.buy-price h1');


    // ========== 수빈: URL에서 mentorId 가져오기 ========== //
    const urlParams = new URLSearchParams(location.search);
    const mentorId = urlParams.get("id");

    let currentMentor = null;
    if (typeof allMentors !== "undefined" && mentorId) {
        currentMentor = allMentors[mentorId];
    }
    // ===================================================== //


    function getAvailableDates() {
        const result = [];

        const openedCells = calendar.querySelectorAll('td.opened');
        const weekdayNames = ['일', '월', '화', '수', '목', '금', '토'];

        openedCells.forEach(cell => {
            const dayText = cell.textContent.trim();
            const day = parseInt(dayText, 10);
            const colIndex = cell.cellIndex;
            const weekdayLabel = weekdayNames[colIndex];
            const value = day;
            const label = `12월 ${day}일 (${weekdayLabel})`;

            result.push({ value, label });
        });

        return result;
    }


    function fillDateOptions() {
        if (!dateSelect) return;

        dateSelect.innerHTML = '<option value="">날짜를 선택하세요</option>';

        const dates = getAvailableDates();

        dates.forEach(d => {
            const opt = document.createElement('option');
            opt.value = d.value;
            opt.textContent = d.label;
            dateSelect.appendChild(opt);
        });
    }

    function openModal() {
        if (!modalOverlay) return;

        fillDateOptions();

        if (modalPriceBox && priceHeading) {
            modalPriceBox.textContent = priceHeading.textContent.trim();
        }

        if (timeSelect) {
            timeSelect.value = '';
        }

        // ========== 수빈: 모달 멘토 이름 업데이트 ========== //
        const mentorInput = document.getElementById("modal-mentor-name"); 
        if (mentorInput && currentMentor) {
            mentorInput.value = currentMentor.name + " 멘토";
        }
        // =====================================================

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        if (modalForm) {
            modalForm.reset();
        }
    }

    if (applyButton) {
        applyButton.addEventListener('click', openModal);
    }

    if (cancelButton) {
        cancelButton.addEventListener('click', closeModal);
    }

    modalForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!dateSelect.value || !timeSelect.value) {
            alert('날짜와 시간을 모두 선택해 주세요.');
            return;
        }

        const mentorName = currentMentor ? currentMentor.name : "멘토 정보 없음";
        const field = currentMentor ? currentMentor.job : "";

        const selectedOption = dateSelect.options[dateSelect.selectedIndex];
        const dateLabel = selectedOption ? selectedOption.textContent : dateSelect.value;

        const timeVal = timeSelect.value;
        const priceText = modalPriceBox ? modalPriceBox.textContent.trim() : '';

        alert(
            `결제가 완료되었습니다!\n\n` +
            `멘토: ${mentorName}\n` +
            `일시: ${dateLabel} ${timeVal}\n` +
            `비용: ${priceText}`
        );

        // ========== 수빈: 예약 정보 저장 ========== //
        const savedList = JSON.parse(localStorage.getItem("mentoringReservations") || "[]");

        savedList.push({
            id: mentorId,
            mentor: mentorName,
            field: field,
            img: currentMentor ? currentMentor.img : "",
            date: dateLabel,
            time: timeVal,
            price: priceText
        });

        localStorage.setItem("mentoringReservations", JSON.stringify(savedList));
        // =====================================================


        if (calendar && dateSelect.value) {
            const dayStr = String(parseInt(dateSelect.value, 10));

            const openedCells = calendar.querySelectorAll('td.opened');
            openedCells.forEach(cell => {
                if (cell.textContent.trim() === dayStr) {
                    cell.classList.remove('opened');
                    cell.classList.add('reserved');
                }
            });
        }
        closeModal();
    });


    // ==========수빈: 전체 UI 자동 업데이트 ==========//
    if (currentMentor) {

        const photoEl = document.querySelector(".photo img");
        if (photoEl) photoEl.src = currentMentor.img;

        const nameEl = document.querySelector(".profile-body .name");
        if (nameEl) nameEl.textContent = currentMentor.name + " 멘토";

        const fieldEl = document.querySelector(".profile-body .field");
        if (fieldEl) fieldEl.textContent = currentMentor.job;

        const priceEl = document.querySelector(".buy-price h1");
        if (priceEl) {
            priceEl.innerHTML =
                `₩${currentMentor.price.toLocaleString()}<span class="pertime">(시간 당)</span>`;
        }

        const infoTable = document.querySelector(".buy-informain table");
        if (infoTable) {
            const rows = infoTable.querySelectorAll("tr");

            rows[0].children[1].textContent = currentMentor.name;
            rows[1].children[1].textContent = currentMentor.job;
            rows[2].children[1].textContent = currentMentor.career;
            rows[3].children[1].textContent = currentMentor.company;
            rows[4].children[1].textContent = `⭐ ${currentMentor.rating}`;
        }

        const modalPrice = document.getElementById("modal-price");
        if (modalPrice) {
            modalPrice.textContent =
                `₩${currentMentor.price.toLocaleString()} / 시간`;
        }
    }
    // ============================================================ //

});

// ========== 수빈: 찜하기 기능 ==========//
document.addEventListener("DOMContentLoaded", () => {
    const favBtn = document.querySelector(".favorite-button img");

    if (!favBtn) return;

    favBtn.src = "../Images/favorite.svg";
    favBtn.dataset.like = "false";

    favBtn.addEventListener("click", () => {
        const liked = favBtn.dataset.like === "true";

        if (liked) {
            favBtn.src = "../Images/favorite.svg";
            favBtn.dataset.like = "false";
        } else {
            favBtn.src = "../Images/favorite-fill.svg";
            favBtn.dataset.like = "true";
        }
    });
});
// ===================================//