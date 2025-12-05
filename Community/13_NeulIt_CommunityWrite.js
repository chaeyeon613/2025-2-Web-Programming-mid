document.getElementById('writeForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    let loginUserId = localStorage.getItem("loginUser") || "neulit";
    let userName = "사용자";

    try {
        const res = await fetch("/User.json");
        const data = await res.json();
        userName = data.name || "사용자";
    } catch (e) {
        console.error("User.json 로드 실패:", e);
    }

    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    const tagsInput = document.getElementById('tags').value.trim();
    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : [];

    let localPosts = JSON.parse(localStorage.getItem("communityPosts") || "[]");

    const newId = localPosts.length > 0 ? localPosts[0].id + 1 : 1000;

    const newPost = {
        id: newId,
        title,
        content,
        author: userName,
        userId: loginUserId,
        time: new Date().toLocaleString("ko-KR", { dateStyle: 'short', timeStyle: 'short' }),
        views: 0,
        likes: 0,
        comments: [],
        status: "미해결",
        tags
    };

    localPosts.unshift(newPost);
    localStorage.setItem("communityPosts", JSON.stringify(localPosts));

    let myPosts = JSON.parse(localStorage.getItem("myPosts") || "[]");
    myPosts.unshift(newPost.id);
    localStorage.setItem("myPosts", JSON.stringify(myPosts));

    alert("글이 등록되었습니다!");
    location.href = "13_NeulIt_CommunityMain.html";
});