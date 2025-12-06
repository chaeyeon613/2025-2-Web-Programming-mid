const JSON_FILE_PATH = '../13_NeulIt_User.json'; 

const loginForm = document.getElementById('loginForm');
const loginBtn = document.querySelector('.login-button');

if (loginBtn) {
    loginBtn.disabled = true;
    loginBtn.textContent = '데이터 로드 중...';
}

async function initializeUsersFromJson() {
    try {
        const response = await fetch(JSON_FILE_PATH);
        
        if (!response.ok) {
            console.error(`JSON 파일 로드 실패: ${response.status} ${response.statusText}`);
            alert('User.json 파일을 로드할 수 없습니다.');
            return; 
        }

        const jsonUserData = await response.json();
        
        const jsonUser = {
            username: jsonUserData.userId, 
            password: String(jsonUserData.pw), 
            name: jsonUserData.name, 
            id: 999 
        };
        
        let localUsers = JSON.parse(localStorage.getItem('users')) || [];
        const isUserExists = localUsers.some(u => u.username === jsonUser.username);

        if (!isUserExists) {
            localUsers.push(jsonUser);
            localStorage.setItem('users', JSON.stringify(localUsers));
            console.log(`User data initialized with ${jsonUser.username} from JSON.`);
        }
        
    } catch (error) {
        alert('User.json 파일 처리 중 오류 발생');
        console.error('User.json 처리 실패:', error);
        return;
    } finally {
        if (loginBtn) {
            loginBtn.disabled = false;
            loginBtn.textContent = '로그인 하기';
        }
    }
}
window.addEventListener('DOMContentLoaded', initializeUsersFromJson);

// 로그인 폼 제출 처리
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const usernameInput = document.getElementById('login_id').value.trim();
        const passwordInput = document.getElementById('login_pw').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];

        const foundUser = users.find(user => 
            user.username === usernameInput && user.password === passwordInput
        );

        if (foundUser) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loginUser', foundUser.username); 
            
            alert(`${foundUser.name}님, 환영합니다!`);
            
            window.location.href = '../Lecture/13_NeulIt_LectureMain.html'; 
        } else {
            alert('아이디 또는 비밀번호가 일치하지 않습니다. (neulit / 1234)');
        }
    });
}