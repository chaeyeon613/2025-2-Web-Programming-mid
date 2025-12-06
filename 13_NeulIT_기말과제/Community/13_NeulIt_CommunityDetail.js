let userData = {};

const FIXED_USER_ID = "neulit";
const FIXED_USER_NAME = "늘잇";

let currentUser = FIXED_USER_ID;

function loadCurrentUser() {
    return {
        username: FIXED_USER_ID,
        name: FIXED_USER_NAME
    };
}

async function loadUser() {
    userData = {
        userId: FIXED_USER_ID,
        name: FIXED_USER_NAME
    };
}

async function loadJsonPosts() {
    try {
        const res = await fetch("./13_NeulIt_Community.json");
        const data = await res.json();
        return data.posts || [];
    } catch (e) {
        console.error("Community JSON 로드 실패:", e);
        return [];
    }
}

function getLocalPosts() {
    return JSON.parse(localStorage.getItem("communityPosts")) || [];
}

function getLocalComments() {
    return JSON.parse(localStorage.getItem("communityComments")) || [];
}

function saveLocalComments(arr) {
    localStorage.setItem("communityComments", JSON.stringify(arr));
}

function getDeletedPosts() {
    return JSON.parse(localStorage.getItem("deletedPosts")) || [];
}

function markPostDeleted(id) {
    let list = getDeletedPosts();
    if (!list.includes(id)) {
        list.push(id);
        localStorage.setItem("deletedPosts", JSON.stringify(list));
    }
}

function getDeletedJsonComments() {
    return JSON.parse(localStorage.getItem("deletedJsonComments")) || [];
}

function markJsonCommentDeleted(key) {
    let deleted = getDeletedJsonComments();
    if (!deleted.includes(key)) {
        deleted.push(key);
        localStorage.setItem("deletedJsonComments", JSON.stringify(deleted));
    }
}

function mergePosts(json, local) {
    const map = new Map();
    json.forEach(p => map.set(p.id, p));
    local.forEach(p => map.set(p.id, p));
    return [...map.values()];
}

function createCommentElement(c) {

    const isMine = true;

    return `
        <div class="answer" id="comment-${c.id}">
            <div class="answerer">
                <img src="../Images/me.png" class="answerer-profile">
                <div class="answerer-info">
                    <p>${c.author}</p>
                    <span>${c.time}</span>
                </div>
            </div>

            <div class="comment-content-wrap">
                <p>${c.content.replace(/\n/g, "<br>")}</p>
                ${isMine ? `
                    <button class="delete-comment-btn"
                        onclick="deleteComment(event, '${c.id}', '${c.jsonKey || ""}')">
                        삭제
                    </button>
                ` : ""}
            </div>
        </div>
    `;
}

async function renderPostDetail() {
    await loadUser();

    const loginUser = loadCurrentUser();
    const loginId = loginUser?.username;
    const loginName = loginUser?.name;

    const container = document.getElementById("detail-container");
    const postId = Number(localStorage.getItem("selectedPostId"));

    const jsonPosts = await loadJsonPosts();
    const localPosts = getLocalPosts();

    let posts = mergePosts(jsonPosts, localPosts);

    const deleted = getDeletedPosts();
    posts = posts.filter(p => !deleted.includes(p.id));

    const post = posts.find(p => p.id === postId);

    if (!post) {
        container.innerHTML = `<p style="padding:80px;">게시글을 찾을 수 없습니다.</p>`;
        return;
    }

    const isMyPost = true;

    const statusClass = post.status === "해결됨" ? "resolved" : "unresolved";
    const tagsHtml = post.tags.map(t => `<span class="tag-item">${t}</span>`).join("");

    container.innerHTML = `
        <aside class="profile-sidebar">
            <div class="questioner-info">
                <img src="../Images/me.png" class="profile-img">
                <h3 class="detail-author">${post.author}</h3>
                <p>작성자</p>
            </div>
        </aside>

        <article>
            <section class="question-header">
                <h1 class="detail-title">${post.title}</h1>

                <div class="question-meta">
                    <span class="status ${statusClass}">${post.status}</span>
                    <span>${post.time}</span>
                    <span>👁 ${post.views}</span>
                </div>

                <div class="question-text">
                    <p>${post.content.replace(/\n/g, "<br>")}</p>
                </div>

                <div class="tags-actions">
                    <div class="tags">${tagsHtml}</div>

                    ${isMyPost ? `
                        <button id="delete-detail-btn" class="delete-post-btn">삭제</button>
                    ` : ""}
                </div>
            </section>

            <section class="answers-container">
                <h3 id="comment-count-title">댓글</h3>
                <div id="comment-list"></div>

                <form id="comment-form" class="answer-form">
                    <textarea id="comment-content" placeholder="댓글을 입력하세요"></textarea>
                    <button type="submit" class="submit-button">등록</button>
                </form>
            </section>
        </article>
    `;

    renderComments(post);

    const commentForm = document.getElementById("comment-form");
    commentForm.addEventListener("submit", e => handleCommentSubmit(e, post));

    const delBtn = document.getElementById("delete-detail-btn");
    if (delBtn) delBtn.addEventListener("click", () => deletePost(post.id));
}

function renderComments(post) {

    const local = getLocalComments().filter(c => c.postId === post.id);
    const deletedJson = getDeletedJsonComments();

    const json = (post.comments || [])
        .map((c, idx) => ({
            id: `json-${idx}`,
            jsonKey: `${post.id}-json-${idx}`,
            postId: post.id,
            author: c.author,
            userId: c.userId || null,
            time: c.time,
            content: c.text,
        }))
        .filter(c => !deletedJson.includes(c.jsonKey));

    // JSON + LOCAL 병합
    const all = [...json, ...local];

    document.getElementById("comment-count-title").textContent = `댓글 ${all.length}`;
    document.getElementById("comment-list").innerHTML =
        all.map(c => createCommentElement(c)).join("");
}


function handleCommentSubmit(e, post) {
    e.preventDefault();

    const loginUser = loadCurrentUser();
    const loginId = loginUser?.username;
    const loginName = loginUser?.name;

    const text = document.getElementById("comment-content").value.trim();
    if (!text) return;

    const arr = getLocalComments();
    const newId = arr.length ? arr[arr.length - 1].id + 1 : 1;

    arr.push({
        id: newId,
        postId: Number(post.id),
        userId: loginId || currentUser,
        author: loginName || userData.name,
        time: new Date().toLocaleString("ko-KR"),
        content: text
    });

    saveLocalComments(arr);
    document.getElementById("comment-content").value = "";
    renderComments(post);
}

function deleteComment(e, id, jsonKey) {
    e.stopPropagation();
    if (!confirm("댓글을 삭제할까요?")) return;

    if (jsonKey) {
        markJsonCommentDeleted(jsonKey);
    } else {
        let arr = getLocalComments().filter(c => String(c.id) !== String(id));
        saveLocalComments(arr);
    }

    renderPostDetail();
}

function deletePost(id) {
    if (!confirm("게시글을 삭제할까요?")) return;

    markPostDeleted(id);
    alert("삭제되었습니다.");
    location.href = "13_NeulIt_CommunityMain.html";
}

window.addEventListener("load", renderPostDetail);