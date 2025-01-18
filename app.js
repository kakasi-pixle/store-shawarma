// بيانات المستخدمين
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

// المنتجات في الاستور
let storeItems = [
  { name: 'ذهب', price: 100 },
  { name: 'ماس', price: 500 },
  { name: 'طين', price: 20 },
  { name: 'عملات', price: 50 }
];

// تحديث المنتجات في الاستور
function updateStore() {
  const storeContainer = document.getElementById('store-items');
  storeContainer.innerHTML = ''; // تنظيف المحتوى الحالي
  storeItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.innerHTML = `${item.name}: ${item.price} عملة <button onclick="buyItem('${item.name}')">شراء</button>`;
    storeContainer.appendChild(itemElement);
  });
}

// شراء عنصر من الاستور
function buyItem(itemName) {
  const item = storeItems.find(i => i.name === itemName);
  if (currentUser.balance >= item.price) {
    currentUser.balance -= item.price;
    alert(`تم شراء ${item.name}`);
    localStorage.setItem('users', JSON.stringify(users)); // حفظ التغييرات
    updateStore();
    updateBalanceDisplay();
  } else {
    alert('ليس لديك رصيد كافٍ');
  }
}

// بدء التنقيب
document.getElementById('start-mining-btn').addEventListener('click', function() {
  const resources = ['ذهب', 'ماس', 'طين', 'عملات'];
  const randomResource = resources[Math.floor(Math.random() * resources.length)];
  const miningResult = document.getElementById('mining-result');
  miningResult.textContent = randomResource;
  
  let resourceValue = 0;
  if (randomResource === 'ذهب') {
    resourceValue = 100;
  } else if (randomResource === 'ماس') {
    resourceValue = 500;
  } else if (randomResource === 'طين') {
    resourceValue = 20;
  } else if (randomResource === 'عملات') {
    resourceValue = 50;
  }

  currentUser.balance += resourceValue;
  localStorage.setItem('users', JSON.stringify(users)); // حفظ التغييرات
  updateBalanceDisplay();
});

// تحديث رصيد المستخدم
function updateBalanceDisplay() {
  const balanceElement = document.getElementById('user-balance');
  balanceElement.textContent = currentUser.balance + ' عملة';
}

// التحقق من الحسابات
function checkLoggedIn() {
  if (!currentUser) {
    window.location.href = '#login'; // إعادة توجيه إذا لم يكن هناك حساب
  }
}

// التحقق من وجود اسم المستخدم عند التسجيل
document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const code = document.getElementById('register-code').value;

  if (users.some(user => user.username === username)) {
    alert("اسم المستخدم موجود بالفعل، يرجى تغييره");
    return;
  }

  const newUser = { username, email, password, isAdmin: false, banned: false, balance: 100, referralCode: code };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  alert('تم إنشاء الحساب بنجاح!');
  window.location.href = '#login'; // الانتقال إلى صفحة تسجيل الدخول
});

// تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const code = document.getElementById('login-code').value;

  currentUser = users.find(user => user.username === username && user.password === password);

  if (currentUser) {
    if (code && users.some(user => user.referralCode === code)) {
      currentUser.balance += 50; // زيادة رصيد الشخص 50 عملة
      alert('تم استخدام كود التسجيل بنجاح!');
    }
    alert('تم تسجيل الدخول بنجاح!');
    window.location.href = '#dashboard'; // الانتقال إلى الصفحة الرئيسية
    updateBalanceDisplay();
    updateStore();
  } else {
    alert('اسم المستخدم أو كلمة المرور غير صحيحة');
  }
});
