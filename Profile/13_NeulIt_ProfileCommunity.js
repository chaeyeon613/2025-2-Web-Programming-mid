let userData = {};
let currentUser = "";

// User.json 로드
async function loadUser() {
    try {
        const res = await fetch("/13_NeulIt_User.json");
        userData = await res.json();

        currentUser =
            localStorage.getItem("loginUser") ||
            userData.userId || "neulit";

    } catch (e) {
        console.error("User.json 로드 실패:", e);
    }
}

// 프로필 상단 정보 반영
function applyProfileHeader() {
    const idEl = document.querySelector(".profile-id");
    const nameEl = document.querySelector(".profile-name");

    if (idEl) idEl.textContent = userData.userId || "사용자";
    if (nameEl) nameEl.textContent = userData.name || "사용자";
}

// JSON / LocalStorage 읽기
async function loadJsonPosts() {
    try {
        const res = await fetch("../Community/13_NeulIt_Community.json");
        const data = await res.json();
        return data.posts || [];
    } catch (e) {
        console.error("Community JSON 로드 실패:", e);
        return [];
    }
}

function loadLocalPosts() {
    try { return JSON.parse(localStorage.getItem("communityPosts")) || []; }
    catch { return []; }
}

function loadLocalComments() {
    try { return JSON.parse(localStorage.getItem("communityComments")) || []; }
    catch { return []; }
}

function loadDeletedPosts() {
    try { return JSON.parse(localStorage.getItem("deletedPosts")) || []; }
    catch { return []; }
}

function loadDeletedJsonComments() {
    try { return JSON.parse(localStorage.getItem("deletedJsonComments")) || []; }
    catch { return []; }
}

// JSON + Local 게시글 병합
function mergePosts(jsonPosts, localPosts) {
    const map = new Map();
    jsonPosts.forEach(p => map.set(String(p.id), p));
    localPosts.forEach(p => map.set(String(p.id), p));
    return [...map.values()];
}

// JSON 댓글 → LocalStorage 구조로 변환
function normalizeJsonComments(post) {
    const deletedKeys = loadDeletedJsonComments();

    return (post.comments || [])
        .map((c, idx) => {
            const key = `${post.id}-json-${idx}`;
            return {
                id: key,
                jsonKey: key,
                postId: Number(post.id),
                author: c.author,
                userId: c.userId || null,
                time: c.time,
                content: c.text
            };
        })
        .filter(c => !deletedKeys.includes(c.jsonKey));
}

// 게시글 카드 UI
function createPostCard(post, commentCount) {
    return `
        <div class="community-item" onclick="openDetail(${post.id})">
            <div class="community-header">
                <span class="community-date">${post.time}</span>
            </div>

            <p class="community-title">${post.title}</p>
            <p class="community-detail">${post.content.substring(0, 60)}...</p>

            <div class="community-footer">
                <span>❤️ ${post.likes ?? 0}</span>
                <span>💬 ${commentCount}</span>
                ${post.tags?.length ? `<span class="community-category">#${post.tags[0]}</span>` : ""}
            </div>
        </div>
    `;
}

window.openDetail = function(id) {
    localStorage.setItem("selectedPostId", id);
    location.href = "../Community/13_NeulIt_CommunityDetail.html";
};

// 내가 쓴 글 목록
async function renderMyPosts() {
    const container = document.querySelector(".community-list");

    const json = await loadJsonPosts();
    const local = loadLocalPosts();
    const localComments = loadLocalComments();
    const deleted = loadDeletedPosts();

    let posts = mergePosts(json, local)
        .filter(p => !deleted.includes(p.id));

    posts = posts.filter(p =>
        p.userId === currentUser ||
        p.author === userData.name
    );

    posts = posts.map(post => {
        const pid = Number(post.id);
        const jsonC = normalizeJsonComments(post);
        const localC = localComments.filter(c => Number(c.postId) === pid);

        return { ...post, totalComments: jsonC.length + localC.length };
    });

    posts.sort((a, b) => new Date(b.time) - new Date(a.time));

    if (posts.length === 0) {
        container.innerHTML = `<p style="padding:40px; color:#777;">작성한 게시글이 없습니다.</p>`;
        return;
    }

    container.innerHTML = posts.map(p => createPostCard(p, p.totalComments)).join("");
}

// 내가 댓글 단 글 목록
async function renderMyAnsweredPosts() {
    const container = document.querySelector(".community-list");

    const json = await loadJsonPosts();
    const local = loadLocalPosts();
    const localComments = loadLocalComments();
    const deleted = loadDeletedPosts();

    let posts = mergePosts(json, local)
        .filter(p => !deleted.includes(p.id));

    posts = posts.filter(post => {
        const pid = Number(post.id);
        const jsonC = normalizeJsonComments(post);
        const localC = localComments.filter(c => Number(c.postId) === pid);

        const commentedJson =
            jsonC.some(c => c.userId === currentUser || c.author === userData.name);

        const commentedLocal =
            localC.some(c => c.userId === currentUser);

        return commentedJson || commentedLocal;
    });

    posts = posts.map(post => {
        const pid = Number(post.id);
        const jsonC = normalizeJsonComments(post);
        const localC = localComments.filter(c => Number(c.postId) === pid);
        return { ...post, totalComments: jsonC.length + localC.length };
    });

    posts.sort((a, b) => new Date(b.time) - new Date(a.time));

    if (posts.length === 0) {
        container.innerHTML = `<p style="padding:40px; color:#777;">답변한 게시글이 없습니다.</p>`;
        return;
    }

    container.innerHTML = posts.map(p => createPostCard(p, p.totalComments)).join("");
}

// 탭 버튼
function setupButtons() {
    const buttons = document.querySelectorAll(".status-btn");

    buttons[0].addEventListener("click", () => {
        buttons[0].classList.add("active");
        buttons[1].classList.remove("active");
        renderMyPosts();
    });

    buttons[1].addEventListener("click", () => {
        buttons[1].classList.add("active");
        buttons[0].classList.remove("active");
        renderMyAnsweredPosts();
    });
}

// 초기 실행
window.addEventListener("load", async () => {
    await loadUser();
    applyProfileHeader();
    setupButtons();
    renderMyPosts();
});
