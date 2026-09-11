const s = JSON.parse(localStorage.getItem('npp_session'));
if (!s || s.role !== 'lecturer') location.href = 'auth.html?role=lecturer';
document.getElementById('name').textContent = s.name || 'lecturer';

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('npp_session');
  location.href = 'index.html';
});

const key = 'npp_classes_' + s.email;
let classes = JSON.parse(localStorage.getItem(key)) || [
  { name:'anatomy 101', students:32 },
  { name:'pharmacology', students:28 },
  { name:'clinical practice', students:24 },
];
localStorage.setItem(key, JSON.stringify(classes));

function render(){
  const list = document.getElementById('class-list');
  list.innerHTML = '';
  classes.forEach((c, i) => {
    const d
