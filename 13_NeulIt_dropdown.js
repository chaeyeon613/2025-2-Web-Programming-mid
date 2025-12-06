async function loadUserDataForHeader() {
    try {
        const response = await fetch("/User.json"); 
        return response.ok ? await response.json() : {};
    } catch (e) {
        console.warn("User.json 로드 실패:", e);
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const loggedInUsername = localStorage.getItem('loginUser');
        const user = users.find(u => u.username === loggedInUsername);
        return user || {};
    }
}

function updateAuthUI(isLoggedIn, userName) {
    const icon = document.getElementById('profileIcon');
    const menu = document.getElementById('profileMenu');
    const nameEl = document.getElementById('dropdownUserName');
    
    if (!icon || !menu) return;

    if (isLoggedIn) {
        icon.onclick = (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
            if (nameEl) nameEl.textContent = userName || "사용자";
        };
    } else {
        icon.onclick = () => {
            window.location.href = '../Login/13_NeulIt_Login.html';
        };
        if (menu) menu.style.display = 'none';
    }

    // 외부 클릭 시 메뉴 닫기
    document.addEventListener('click', (e) => {
        if (menu && !icon.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('active');
        }
    });
}

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginUser');
    alert("로그아웃 되었습니다.");
    window.location.href = '../Main/13_NeulIt_Main.html';
}


document.addEventListener('DOMContentLoaded', async () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loggedInUser = localStorage.getItem('loginUser'); 
    
    const logoutBtn = document.getElementById('logoutButton');
    if (logoutBtn) {
        logoutBtn.onclick = handleLogout;
    }
    
    let userName = loggedInUser || 'guest';

    if (isLoggedIn) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(u => u.username === loggedInUser);
        
        if (!foundUser) {
            const jsonUser = await loadUserDataForHeader();
            if (jsonUser && jsonUser.userId === loggedInUser) {
                userName = jsonUser.name;
            }
        } else {
            userName = foundUser.name;
        }
    }
    
    updateAuthUI(isLoggedIn, userName);
});