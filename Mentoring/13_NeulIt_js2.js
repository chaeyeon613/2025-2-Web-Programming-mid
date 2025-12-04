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

        const mentorName = '이가은 멘토';
        const field = document.querySelector(".field").textContent.trim();

        const selectedOption = dateSelect.options[dateSelect.selectedIndex];
        const dateLabel = selectedOption ? selectedOption.textContent : dateSelect.value;

        const timeVal = timeSelect.value;
        const priceText = modalPriceBox ? modalPriceBox.textContent.trim() : '';

        alert(
            `결제가 완료되었습니다!\n\n` + `멘토: ${mentorName}\n` + `일시: ${dateLabel} ${timeVal}\n` + `비용: ${priceText}`
        );

        // ========== 수빈: 저장 기능 ========== //
        const savedList = JSON.parse(localStorage.getItem("mentoringReservations") || "[]");

        savedList.push({
            mentor: mentorName,
            field: field,
            date: dateLabel,
            time: timeVal,
            price: priceText
        });

        localStorage.setItem("mentoringReservations", JSON.stringify(savedList));
        // ========== 수빈: 저장 기능 ========== //

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
});