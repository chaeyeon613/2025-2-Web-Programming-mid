        const authLink = document.querySelector('a[href="../Login/13_NeulIt_Login.html"]');
        const authModal = document.getElementById('authModal');
        const contentWrapper = document.getElementById('modal-content-wrapper');
        const loginFormUrl = '../Login/13_NeulIt_Login.html'; 
        const myPageUrl = '../Profile/13_NeulIt_ProfileDash.html'; 

        function updateAuthHeader() {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            
            if (isLoggedIn) {
                const username = localStorage.getItem('loggedInUser');
                
                authLink.innerHTML = `<img src="../Images/profile.svg" alt="${username}님 마이페이지" class="icon">`;
                authLink.href = myPageUrl;
                authLink.onclick = null; 

                if (document.getElementById('logout-btn')) { 
                    document.getElementById('logout-btn').onclick = logoutUser;
                }

            } else {
                authLink.innerHTML = `<img src="../Images/profile.svg" alt="마이페이지" class="icon">`;
                authLink.href = loginFormUrl; 
                authLink.onclick = handleAuthModal;
            }
        }
        updateAuthHeader();

        function logoutUser(event) {
            if(event) event.preventDefault();
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('isLoggedIn');
            alert('로그아웃되었습니다.');
            window.location.reload(); 
        }

        function handleAuthModal(event) {
            event.preventDefault(); 
            authModal.style.display = 'block';

            fetch(loginFormUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`파일 경로 오류: ${response.status}`);
                    }
                    return response.text();
                })
                .then(html => {
                    contentWrapper.innerHTML = html;
                    attachModalEvents();
                })
                .catch(error => {
                    console.error('폼 로드 실패. 경로를 확인하세요:', error);
                    contentWrapper.innerHTML = '<p style="color: red;">로그인 폼을 불러오지 못했습니다. 경로(loginFormUrl)를 확인해 주세요.</p>';
                });
        };
        
        function attachModalEvents() {
            document.querySelectorAll('.close-button').forEach(btn => {
                btn.onclick = () => authModal.style.display = 'none';
            });
            
            document.getElementById('toSignup').onclick = function(e) {
                e.preventDefault();
                document.getElementById('login-form-content').style.display = 'none';
                document.getElementById('signup-form-content').style.display = 'block';
            };
            document.getElementById('toLogin').onclick = function(e) {
                e.preventDefault();
                document.getElementById('signup-form-content').style.display = 'none';
                document.getElementById('login-form-content').style.display = 'block';
            };

            const signupButton = document.getElementById('signupButton');
            if (signupButton) {
                signupButton.onclick = function() {
                    const username = document.getElementById('signup_id').value.trim();
                    const password = document.getElementById('signup_pw').value;
                    const name = document.getElementById('signup_name').value.trim();
                    const gender = document.getElementById('signup_gender').value;

                    if (!username || !password || !name || !gender) {
                        alert('모든 양식을 채워주세요!');
                        return;
                    }
                    if (document.getElementById('signup_pw').value !== document.getElementById('signup_pw_confirm').value) {
                        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
                        return;
                    }
                    
                    const users = JSON.parse(localStorage.getItem('users')) || [];
                    if (users.find(u => u.username === username)) {
                        alert('이미 존재하는 아이디입니다.');
                        return;
                    }
                    
                    const newUser = {
                        id: users.length + 1,
                        username: username,
                        password: password, 
                        name: name,
                        gender: gender,
                    };
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));

                    alert(`회원가입이 완료되었습니다!`);
                    document.getElementById('signupForm').reset();
                    document.getElementById('signup-form-content').style.display = 'none';
                    document.getElementById('login-form-content').style.display = 'block';
                }
            }
            
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const usernameInput = document.getElementById('login_id').value.trim();
                    const passwordInput = document.getElementById('login_pw').value;
                    
                    const users = JSON.parse(localStorage.getItem('users')) || [];
                    const foundUser = users.find(user => 
                        user.username === usernameInput && user.password === passwordInput
                    );

                    if (foundUser) {
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('loggedInUser', foundUser.username); 
                        alert(`${foundUser.username}님 환영합니다!`);
                        
                        authModal.style.display = 'none';
                        window.location.href = myPageUrl; 
                    } else {
                        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
                    }
                });
            }
        }

        window.onclick = function(event) {
            if (event.target == authModal) {
                authModal.style.display = 'none';
            }
        };

    function initializePosts() {
    if (!localStorage.getItem('communityPosts')) {
        const initialPosts = [
            {
                id: 4, 
                title: "리액트 설치에 대해 궁금한 점이 있습니다.",
                content: "현재 리액트부분을 시작했는데 리액트를 설치할때 <br>yarn add next@12.1.0 react@17.0.2 react-dom@17.0.2 --exact <br>이러한 명령어를 사용하는데 이렇게 설치하고 나니 제가 알고있는 폴더들이나 내용이 좀 다르더라구요. <br>제가 알고있는 건 npx create-react-app ./ 이러한 명령어로 리액트를 설치했는데 이거와 전혀 다른 명령어 인가요?",
                author: "김수빈",
                time: "25.12.1. 오후 7:46",
                views: 12,
                likes: 2,
                comments: 1,
                status: '해결됨',
                tags: ['react', 'node.js', 'seo'],
                lecture: "한 입 크기로 잘라먹는 리액트(React.js)"
            },
            {
                id: 3, 
                title: "지라에 연결한 컨플루언스 페이지를 삭제하고 싶습니다.",
                content: "지라에 연결한 컨플루언스 페이지를 삭제하는 방법을 알려주세요.",
                author: "김영채",
                time: "25.11.22. 오전 11:20",
                views: 10,
                likes: 0,
                comments: 0,
                status: '미해결',
                tags: ['jira', 'confluence'],
                lecture: ""
            },
            {
                id: 2, 
                title: "빅분기 11회도 10회차랑 동일하게 준비하면 될까요??",
                content: "10회 때랑 강의목록은 달라지지 않은 것 같은데 똑같이 준비하면 될까요??",
                author: "여수민",
                time: "25.11.12. 오전 9:11",
                views: 42,
                likes: 1,
                comments: 0,
                status: '미해결',
                tags: ['python', '머신러닝', '빅데이터'],
                lecture: ""
            },
            {
                id: 1, 
                title: "concurrency 동작 안됨",
                content: "하나의 consumer 에서 concurrency 옵션을 통해 멀티 쓰레드로 동작이 되는지 테스트를 해봤는데 강좌화면에서처럼 consumer 가 멀티스레드로 동작하지 않는것 같습니다.",
                author: "김하영",
                time: "25.11.10. 오전 8:20",
                views: 22,
                likes: 2,
                comments: 1,
                status: '해결됨',
                tags: ['java', 'concurrency'],
                lecture: ""
            }
        ];
        localStorage.setItem('communityPosts', JSON.stringify(initialPosts));
    }
}

    function createPostElement(post) {
    const statusClass = post.status === '해결됨' ? 'resolved' : 'unresolved';
    const statusText = post.status;
    const tagsHtml = post.tags.map(tag => `<span class="tag-item">${tag}</span>`).join('');

    return `
        <article class="post-item" data-id="${post.id}"> 
            <a href="#" class="post-link" onclick="savePostId(${post.id})">
                <div class="post-meta">
                    <span class="status ${statusClass}">${statusText}</span>
                    <h4>${post.title}</h4>
                </div>
                <p class="post-description">${post.content.substring(0, 100)}...</p>
                <div class="post-tags">
                    ${tagsHtml}
                </div>
                <div class="post-info">
                    <span class="author">${post.author}</span>
                    <span class="time">${post.time}</span>
                    <span class="likes">👍 ${post.likes}</span>
                    <span class="views">👁️ ${post.views}</span>
                    <span class="comments">💬 ${post.comments}</span>
                </div>
            </a>
            
            </article>
    `;
    }

    function renderPosts() {
        initializePosts(); 
        const postListContainer = document.getElementById('post-list');
        const posts = JSON.parse(localStorage.getItem('communityPosts')) || [];
        
        if (posts.length === 0) {
            postListContainer.innerHTML = '<p style="text-align: center; padding: 50px; color: #777;">아직 등록된 게시글이 없습니다. 첫 질문을 작성해보세요!</p>';
            return;
        }

        let postsHtml = '';
        posts.forEach(post => {
            postsHtml += createPostElement(post);
        });

        postListContainer.innerHTML = postsHtml;
    }
    window.addEventListener('load', renderPosts);

    const writeButton = document.querySelector('.write-button');
    if (writeButton) {
        writeButton.style.display = 'block';
        writeButton.style.width = 'fit-content';
    }

    function savePostId(id) {
    localStorage.setItem('selectedPostId', Number(id));
    window.location.href = '13_NeulIt_CommunityDetail.html';
    }
    window.savePostId = savePostId;