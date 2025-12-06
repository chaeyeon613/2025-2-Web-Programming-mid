document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('signup_id').value.trim();
    const name = document.getElementById('signup_name').value.trim();
    const password = document.getElementById('signup_pw').value;
    const passwordConfirm = document.getElementById('signup_pw_confirm').value;

    if (password !== passwordConfirm) {
        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
    }

    if (!username || !name || !password) {
        alert('모든 필수 정보를 입력해 주세요.');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(u => u.username === username)) {
        alert('이미 존재하는 아이디(이메일)입니다.');
        return;
    }

    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1, 
        username: username,
        password: password, 
        name: name,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert(`${name}님, 회원가입이 완료되었습니다! 이제 로그인해 주세요.`);
    
    window.location.href = '13_NeulIt_Login.html';
});