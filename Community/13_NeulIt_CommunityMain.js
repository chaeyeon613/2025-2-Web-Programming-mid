const FIXED_USER = {
    username: "neulit",
    name: "늘잇"
};

function loadCurrentUser() {
    return FIXED_USER;
}

// JSON 파일 로드
async function loadJsonPosts() {
    try {
        const res = await fetch("./13_NeulIt_Community.json"); 
        const data = await res.json();
        return data.posts || [];
    } catch (e) {
        console.error("13_NeulIt_Community.json 로드 실패:", e);
        return [];
    }
}

// localStorage 게시글 로드
function loadLocalPosts() {
    try { 
        return JSON.parse(localStorage.getItem("communityPosts")) || []; 
    } catch {
        return [];
    }
}

// 삭제된 글 로드
function loadDeletedPosts() {
    try { 
        return JSON.parse(localStorage.getItem("deletedPosts")) || []; 
    } catch {
        return [];
    }
}

// JSON + LocalStorage 병합
function mergePosts(jsonPosts, localPosts) {
    const map = new Map();

    jsonPosts.forEach(p => map.set(p.id, p));

    localPosts.forEach(p => map.set(p.id, p));

    return Array.from(map.values());
}

// 게시글 HTML 생성
function createPostElement(post) {
    const statusClass = post.status === "해결됨" ? "resolved" : "unresolved";
    const tagsHtml = (post.tags || [])
        .map(t => `<span class="tag-item">${t}</span>`)
        .join("");

    return `
        <article class="post-item" data-id="${post.id}">
            <a href="#" class="post-link" onclick="savePostId(${post.id})">

                <div class="post-meta">
                    <span class="status ${statusClass}">${post.status}</span>
                    <h4>${post.title}</h4>
                </div>

                <p class="post-description">
                    ${post.content.substring(0, 100)}...
                </p>

                <div class="post-tags">
                    ${tagsHtml}
                </div>

                <div class="post-info">
                    <span class="author">${post.author}</span>
                    <span class="time">${post.time}</span>
                    <span class="likes">👍 ${post.likes}</span>
                    <span class="views">👁️ ${post.views}</span>
                    <span class="comments">💬 ${(post.comments?.length || 0)}</span>
                </div>

            </a>
        </article>
    `;
}

// 렌더링
async function renderPosts() {
    const container = document.getElementById("post-list");

    const user = loadCurrentUser();  
    
    const jsonPosts = await loadJsonPosts();
    const localPosts = loadLocalPosts();
    const deleted = loadDeletedPosts();

    let posts = mergePosts(jsonPosts, localPosts);

    posts = posts.filter(p => !deleted.includes(p.id));

    posts.sort((a, b) => b.id - a.id);

    container.innerHTML = posts.map(p => createPostElement(p)).join("");
}

// 클릭한 게시글 저장 → 상세 페이지 이동
function savePostId(id) {
    localStorage.setItem("selectedPostId", id);
    window.location.href = "13_NeulIt_CommunityDetail.html";
}
window.savePostId = savePostId;

window.addEventListener("load", renderPosts);
