// ===== HOME LINK =====
document.querySelector('.back-link')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = 'index.html';
});

// ===== AUTH GUARD =====
const s = JSON.parse(localStorage.getItem('npp_session'));
if (!s || s.role !== 'lecturer') {
  window.location.href = 'auth.html?role=lecturer';
}

// ===== LOGOUT =====
const logoutBtn = document.getElementById('logout');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('npp_session');
    window.location.href = 'index.html';
  });
}

document.getElementById('name').textContent = s.name || 'lecturer';
