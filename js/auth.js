// ===== BACK LINK =====
document.querySelector('.back-link')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = 'index.html';
});

const params = new URLSearchParams(location.search);
let role = params.get('role') || 'student';
let signup = false;

const roleBtns = document.querySelectorAll('.role-btn');
const form = document.getElementById('auth-form');
const title = document.getElementById('title');
const sub = document.getElementById('sub');
const submitBtn = document.getElementById('submit-btn');
const nameField = document.getElementById('name-field');
const switchText = document.getElementById('switch-text');
const switchLink = document.getElementById('switch-link');

function setRole(r){
  role = r;
  roleBtns.forEach(b => b.classList.toggle('active', b.dataset.role === r));
}
setRole(role);
roleBtns.forEach(b => b.addEventListener('click', () => setRole(b.dataset.role)));

switchLink.addEventListener('click', e => {
  e.preventDefault();
  signup = !signup;
  title.textContent = signup ? 'create account ✨' : 'welcome back 👋';
  sub.textContent = signup ? 'join the vibe' : 'sign in to keep going';
  submitBtn.textContent = signup ? 'sign up' : 'sign in';
  nameField.style.display = signup ? 'block' : 'none';
  switchText.textContent = signup ? 'already have one?' : 'no account?';
  switchLink.textContent = signup ? 'sign in' : 'sign up';
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value.trim();

  if (signup && !name) return alert('enter your name');

  const users = JSON.parse(localStorage.getItem('npp_users') || '[]');

  if (signup){
    if (users.find(u => u.email === email)) return alert('email already exists');
    users.push({ name, email, password, role });
    localStorage.setItem('npp_users', JSON.stringify(users));
    return go(role);
  }

  const u = users.find(u => u.email === email && u.password === password && u.role === role);
  if (!u) return alert('invalid credentials');
  go(u.role);
});

function go(r){
  window.location.href = r === 'student' ? 'student.html' : 'lecturer.html';
}
