/* -----------------------------
    페이지 로드
----------------------------- */
document.addEventListener("DOMContentLoaded", function () {
    /* -----------------------------
        📌 페이지 타입 감지 (DOMContentLoaded 내에 있어야 함)
    ----------------------------- */
    const isMainPage = document.querySelector(".clip-list") !== null;
    const isDetailPage = document.querySelector(".content") !== null;

    if (isMainPage) initMainPage();
    if (isDetailPage) initDetailPage();

}); // ← DOMContentLoaded 정확히 종료됨

/* ------------------------------------
    📌 메인 페이지 기능 (읽음 표시, 정렬)
------------------------------------ */
function initMainPage() {
    const clipItems = document.querySelectorAll(".clip-item");
    const clipList = document.querySelector(".clip-list");

    if (!clipList) return;

    const readData = JSON.parse(sessionStorage.getItem("clip_read") || "{}");
    const clipsArray = Array.from(clipItems);
    const sortSelect = document.getElementById("sort");

    clipsArray.forEach((item, idx) => {
        const id = item.dataset.id || idx;

        // 읽음 상태 유지
        if (readData[id]) {
            item.style.opacity = "0.5";
        }

        // 클릭 → 읽음 처리
        item.addEventListener("click", () => {
            item.style.opacity = "0.5";
            readData[id] = true;
            sessionStorage.setItem("clip_read", JSON.stringify(readData));
        });

        // hover 뒤집기 기능 완전 제거됨
    });

    // 정렬 기능
    if (sortSelect) {
        sortSelect.addEventListener("change", () => {
            const shuffled = clipsArray
                .map(c => ({ c, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(obj => obj.c);

            clipList.innerHTML = "";
            shuffled.forEach(item => clipList.appendChild(item));
        });
    }
}

/* ------------------------------------
    📄 상세 페이지 기능: PDF 다운로드
------------------------------------ */
function initDetailPage() {
    const contentArea = document.querySelector(".content");
    if (!contentArea) return;

    const pdfContainer = document.createElement("div");
    pdfContainer.style.display = "flex";
    pdfContainer.style.gap = "10px";
    pdfContainer.style.marginTop = "10px";
    contentArea.appendChild(pdfContainer);

    // 📥 PDF 다운로드 버튼
    const pdfBtn1 = document.createElement("button");
    pdfBtn1.textContent = "📥 PDF 다운로드";
    stylePdfButton(pdfBtn1);
    pdfContainer.appendChild(pdfBtn1);

    pdfBtn1.addEventListener("click", () => {
        const { jsPDF } = window.jspdf;
        html2canvas(document.querySelector(".content")).then(canvas => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");

            const imgWidth = 190;
            const pageHeight = 290;
            const imgHeight = canvas.height * imgWidth / canvas.width;

            let heightLeft = imgHeight;
            let position = 10;

            pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save("content.pdf");
        });
    });

    // 📄 도움되는 자료 버튼
    const pdfBtn2 = document.createElement("button");
    pdfBtn2.textContent = "📄 도움되는 자료";
    stylePdfButton(pdfBtn2);
    pdfContainer.appendChild(pdfBtn2);

    pdfBtn2.addEventListener("click", () => {
        const pdfPath = "PDF/add.pdf";
        fetch(pdfPath)
            .then(resp => resp.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "add.pdf";
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(err => {
                alert("PDF 다운로드 실패 (서버 환경 필요)");
                console.error(err);
            });
    });
}

/* PDF 버튼 스타일 */
function stylePdfButton(btn) {
    btn.style.padding = "8px 12px";
    btn.style.border = "1px solid #aaa";
    btn.style.borderRadius = "8px";
    btn.style.cursor = "pointer";
    btn.style.background = "#f8f8f8";
    btn.style.textDecoration = "none";
    btn.style.color = "#000";
}

// 로그인 여부 (true면 로그인 상태, false면 미로그인)
const isLoggedIn = false; // 실제 로그인 상태에 따라 변경

const commentInput = document.getElementById("commentInput");
const postCommentBtn = document.getElementById("postComment");
const commentList = document.getElementById("commentList");

if(isLoggedIn){
    commentInput.disabled = false;
    commentInput.placeholder = "댓글을 작성하세요.";
    postCommentBtn.disabled = false;
}
postComment.addEventListener("click", () => {
  const commentText = commentInput.value.trim();
  if (commentText) {
    const li = document.createElement("li");
    
    // 작성자 이름과 댓글 내용 분리
    const author = document.createElement("strong");
    author.textContent = "NeulIT";
    
    const content = document.createElement("p");
    content.textContent = commentText;
    
    li.appendChild(author);
    li.appendChild(document.createElement("br")); // 줄바꿈
    li.appendChild(content);
    
    commentList.appendChild(li);
    commentInput.value = "";
  }
});
