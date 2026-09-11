// ===== SCHEDULE DATA =====
const KEY = 'npp_schedule';

let schedule = JSON.parse(localStorage.getItem(KEY)) || [
  { time: '07:30', activity: '📚 personal study' },
  { time: '09:00', activity: '🍳 breakfast' },
  { time: '10:00', activity: '📝 assignments' },
  { time: '13:00', activity: '🧬 biology' },
  { time: '17:00', activity: '🎓 classes' }
];

// Save default on first load
localStorage.setItem(KEY, JSON.stringify(schedule));

// ===== RENDER SCHEDULE =====
function render() {
  const list = document.getElementById('schedule');
  if (!list) return;
  list.innerHTML = '';

  schedule.sort((a, b) => a.time.localeCompare(b.time));

  schedule.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <span class="time">${item.time}</span>
      <span>${item.activity}</span>
      <button class="del" data-index="${i}">✕</button>
    `;
    list.appendChild(div);
  });

  // Attach delete handlers
  list.querySelectorAll('.del').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.index);
      schedule.splice(i, 1);
      localStorage.setItem(KEY, JSON.stringify(schedule));
      render();
    });
  });
}

// ===== ADD ITEM =====
const form = document.getElementById('add-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const time = document.getElementById('time').value;
    const activity = document.getElementById('activity').value.trim();
    if (!time || !activity) return;

    schedule.push({ time, activity });
    localStorage.setItem(KEY, JSON.stringify(schedule));
    form.reset();
    render();
  });
}

// ===== INIT =====
render();
