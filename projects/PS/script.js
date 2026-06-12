const root = document.documentElement;
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');

navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const shiftRange = document.querySelector('#shift-range');
const shiftProgress = document.querySelector('#shift-progress');
const shiftPercent = document.querySelector('#shift-percent');
const shiftState = document.querySelector('#shift-state');
const currentTime = document.querySelector('#current-time');
const workedTime = document.querySelector('#worked-time');
const remainingTime = document.querySelector('#remaining-time');
const earnedValue = document.querySelector('#earned-value');
const liveTimer = document.querySelector('#live-timer');
const totalMinutes = 8 * 60;
const hourlyRate = 14.5;

function duration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hours}h ${String(mins).padStart(2, '0')}m`;
}

function clockTime(minutesAfterNine) {
  const total = 9 * 60 + minutesAfterNine;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

function updateShift() {
  const percent = Number(shiftRange.value);
  const elapsed = Math.round(totalMinutes * percent / 100);
  const remaining = totalMinutes - elapsed;
  const paidMinutes = Math.max(0, elapsed - (elapsed >= 6 * 60 ? 30 : 0));
  const earned = paidMinutes / 60 * hourlyRate;

  shiftProgress.value = percent;
  shiftPercent.textContent = `${percent}%`;
  shiftState.textContent = percent === 0 ? 'Upcoming' : percent === 100 ? 'Complete' : 'In progress';
  currentTime.textContent = clockTime(elapsed);
  workedTime.textContent = duration(paidMinutes);
  remainingTime.textContent = duration(remaining);
  earnedValue.textContent = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(earned);
  liveTimer.textContent = `${String(Math.floor(paidMinutes / 60)).padStart(2, '0')}:${String(paidMinutes % 60).padStart(2, '0')}:00`;
}

shiftRange.addEventListener('input', updateShift);
updateShift();

const calendarGrid = document.querySelector('#calendar-grid');
const dayTypes = [
  'work','work','work','work','work','off','off',
  'work','work','work','work','work','off','off',
  'away','away','work','work','work','off','off',
  'work','work','away','away','work','off','off',
  'work','work'
];

dayTypes.forEach((type, index) => {
  const day = document.createElement('div');
  day.className = `calendar-day ${type}${index === 11 ? ' today' : ''}`;
  day.dataset.type = type;
  day.textContent = String(index + 1);
  day.setAttribute('aria-label', `June ${index + 1}: ${type}`);
  calendarGrid.appendChild(day);
});

document.querySelectorAll('.filter-button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.calendar-day').forEach((day) => {
      day.classList.toggle('muted', filter !== 'all' && day.dataset.type !== filter);
    });
  });
});

const chartData = {
  hours: { values: [8, 7.5, 0, 8, 7, 5, 4], title: 'Hours · last 7 days', total: '39.5h' },
  pay: { values: [116, 109, 0, 116, 102, 72, 58], title: 'Expected pay · last 7 days', total: '€573' }
};
const barChart = document.querySelector('#bar-chart');

function renderChart(mode) {
  const dataset = chartData[mode];
  const max = Math.max(...dataset.values);
  barChart.replaceChildren();
  dataset.values.forEach((value) => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${Math.max(2, value / max * 100)}%`;
    bar.title = mode === 'hours' ? `${value} hours` : `€${value}`;
    barChart.appendChild(bar);
  });
  document.querySelector('#chart-title').textContent = dataset.title;
  document.querySelector('#chart-total').textContent = dataset.total;
  requestAnimationFrame(() => barChart.classList.add('visible'));
}

document.querySelectorAll('[data-chart]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-chart]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderChart(button.dataset.chart);
  });
});
renderChart('hours');

document.querySelectorAll('[data-action]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('#action-feedback').textContent = `${button.dataset.action} selected. In PayScope, App Intents perform this action.`;
  });
});

const accentColors = {
  '#32d868': '50, 216, 104',
  '#6d72f6': '109, 114, 246',
  '#ff8a3d': '255, 138, 61',
  '#ee5b9f': '238, 91, 159'
};

document.querySelectorAll('[data-accent]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-accent]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    root.style.setProperty('--accent', button.dataset.accent);
    root.style.setProperty('--accent-rgb', accentColors[button.dataset.accent]);
  });
});
