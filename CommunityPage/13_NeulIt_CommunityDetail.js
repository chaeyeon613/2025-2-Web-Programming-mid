
    function getPosts() {
        return JSON.parse(localStorage.getItem('communityPosts')) || [];
    }

    function getComments() {
        return JSON.parse(localStorage.getItem('communityComments')) || [];
    }

    function initializeComments() {
        if (!localStorage.getItem('communityComments')) {
            localStorage.setItem('communityComments', JSON.stringify([])); 
        }
    }

    function renderPostDetail() {
        initializeComments(); 

        const postId = parseInt(localStorage.getItem('selectedPostId'));
        const posts = getPosts();
        
        const post = posts.find(p => p.id === postId);
        const container = document.getElementById('detail-container');

        if (!post) {
            container.innerHTML = '<p style="text-align: center; padding: 100px;">게시글을 찾을 수 없습니다.</p>';
            return;
        }

        const statusClass = post.status === '해결됨' ? 'resolved' : 'unresolved';
        const tagsHtml = post.tags.map(tag => `<span class="tag-item">${tag}</span>`).join('');
        const authorName = post.author; 
        
        container.innerHTML = `
            <aside class="profile-sidebar">
                <div class="questioner-info">
                    <img src="../Images/me.png" alt="프로필 이미지" class="profile-img">
                    <h3>${authorName}</h3>
                    <p>작성자</p>
                </div>
            </aside>

            <article>
                <section class="question-header">
                    ${post.lecture ? `
                        <a href="../Lecture/13_NeulIt_LectureDetail.html">
                            <div class="lecture-info">
                                <img src="../Images/react.png" alt="강의 이미지" class="lecture-img">
                                <p>${post.lecture}</p>
                            </div>
                        </a>
                    ` : ''}

                    <h1>${post.title}</h1>
                    <div class="question-meta">
                        <span class="status ${statusClass}">${post.status}</span>
                        <span>${post.time} 작성</span>
                        <span class="views">👁️ ${post.views}</span>
                    </div>

                    <div class="question-text">
                        <p>${post.content.replace(/\n/g, '<br>')}</p>
                    </div>

                    <div class="tags-actions">
                        <div class="tags">
                            ${tagsHtml}
                        </div>

                        ${(localStorage.getItem('loggedInUser') === post.author) ? `<button id="delete-detail-btn" class="delete-post-btn">삭제</button>` : ''}
                    </div>
                </section>

                <section class="answers-container">
                    <h3 id="comment-count-title">댓글</h3>
                    <div id="comment-list"></div>
                    
                    <form id="comment-form" class="answer-form">
                        <textarea id="comment-content" placeholder="답변을 입력해주세요." required></textarea>
                        <button type="submit" class="submit-button">등록</button>
                    </form>
                </section>
            </article>
        `;
    
        renderComments(postId);
        
        const commentForm = document.getElementById('comment-form');
        if (commentForm) {
            commentForm.addEventListener('submit', handleCommentSubmit);
        }

        const deleteBtn = document.getElementById('delete-detail-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                deletePostFromDetail(postId);
            });
        }
    }

    window.addEventListener('load', renderPostDetail);

    function createCommentElement(comment) {
    const loggedInUser = localStorage.getItem('loggedInUser') || 'Guest';
    const deleteBtnHtml = (loggedInUser === comment.author) ? 
        `<button class="delete-comment-btn" onclick="deleteComment(event, ${comment.id})">삭제</button>` : 
        '';

    return `
        <div class="answer" id="comment-${comment.id}">
            <div class="answerer">
                <img src="../Images/me.png" alt="프로필 이미지" class="answerer-profile">
                <div class="answerer-info">
                    <p>${comment.author}</p>
                    <span>${comment.time}</span>
                </div>
            </div>
            
            <div class="comment-content-wrap">
                <p>${comment.content.replace(/\n/g, '<br>')}</p>
                ${deleteBtnHtml}
            </div>
        </div>
    `;
}

    function renderComments(postId) {
        const allComments = getComments();
        const postComments = allComments.filter(c => c.postId === postId);
        const countTitle = document.getElementById('comment-count-title');
        const commentListContainer = document.getElementById('comment-list');
        
        countTitle.textContent = `댓글 ${postComments.length}`;

        let commentsHtml = '';
        postComments.forEach(comment => {
            commentsHtml += createCommentElement(comment);
        });

        commentListContainer.innerHTML = commentsHtml;
    }


    // 폼 제출 처리 및 저장
    function handleCommentSubmit(e) {
        e.preventDefault();
        
        const commentContent = document.getElementById('comment-content').value.trim();
        if (!commentContent) return;
        
        const postId = parseInt(localStorage.getItem('selectedPostId'));
        
        let allComments = getComments();
        const lastId = allComments.length > 0 ? allComments[allComments.length - 1].id : 0;
        const newId = lastId + 1;
        
        const newComment = {
            id: newId,
            postId: postId,
            author: localStorage.getItem('loggedInUser') || 'Guest',
            time: new Date().toLocaleString('ko-KR', { dateStyle: 'short', timeStyle: 'short' }),
            content: commentContent
        };

        allComments.push(newComment);
        localStorage.setItem('communityComments', JSON.stringify(allComments));
        document.getElementById('comment-content').value = ''; 
        
        renderComments(postId); 
        alert('댓글이 등록되었습니다.');
    }
    
    function deletePostFromDetail(id) {
        if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
            return;
        }
        let posts = getPosts();
        const updatedPosts = posts.filter(post => post.id !== id);
        localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
        alert('게시글이 삭제되었습니다. 목록 페이지로 이동합니다.');
        
        window.location.href = '13_NeulIt_CommunityMain.html'; 
    }

function deleteComment(event, id) {
    event.stopPropagation();

    if (!confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
        return;
    }
    let allComments = getComments();
    const updatedComments = allComments.filter(comment => comment.id !== id);
    localStorage.setItem('communityComments', JSON.stringify(updatedComments));
    const currentPostId = parseInt(localStorage.getItem('selectedPostId'));
    renderComments(currentPostId);

    alert('댓글이 삭제되었습니다.');
}
window.deleteComment = deleteComment;