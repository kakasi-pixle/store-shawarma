let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

document.getElementById('show-login').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('register').style.display = 'none';
  document.getElementById('login').style.display = 'block';
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  currentUser = users.find(user => user.username === username && user.password === password);

  if (currentUser) {
    alert('تم تسجيل الدخول بنجاح!');
    document.getElementById('login').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('user-name').textContent = currentUser.username;
    document.getElementById('user-balance').textContent = currentUser.balance + ' عملة';
  } else {
    alert('اسم المستخدم أو كلمة المرور غير صحيحة');
  }
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  if (users.some(user => user.username === username)) {
    alert("اسم المستخدم موجود بالفعل, يرجى تغييره");
    return;
  }

  const newUser = { username, email, password, balance: 100 };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  alert('تم إنشاء الحساب بنجاح!');
  document.getElementById('register').style.display = 'none';
  document.getElementById('login').style.display = 'block';
});

document.getElementById('sidebar-toggle').addEventListener('click', function() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar.style.left === '-250px') {
    sidebar.style.left = '0';
  } else {
    sidebar.style.left = '-250px';
  }
});
