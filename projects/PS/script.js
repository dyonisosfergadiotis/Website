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

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const shiftRange = document.querySelector('#shift-range');
const shiftProgress = document.querySelector('#shift-progress');
const shiftPercent = document.querySelector('#shift-percent');
const shiftState = document.querySelector('#shift-state');
const currentTime = document.querySelector('#current-time');
const workedTime = document.querySelector('#worked-time');
const remainingTime = document.querySelector('#remaining-time');
const earnedValue = document.querySelector('#earned-value');
const breakLabel = document.querySelector('#break-label');
const breakValue = document.querySelector('#break-value');
const totalMinutes = 8 * 60;
const hourlyRate = 14.5;
let shiftAnimationFrame;
let shiftAnimationStartedAt;
let shiftDemoTouched = false;

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
  earnedValue.textContent = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(earned);
  breakLabel.textContent = elapsed >= 6 * 60 ? 'Break deducted' : 'Break scheduled';
  breakValue.textContent = elapsed >= 6 * 60 ? '30 min' : 'Not yet';
}

function animateShift(timestamp) {
  if (shiftDemoTouched || reducedMotion) return;
  shiftAnimationStartedAt ??= timestamp;
  const cycle = ((timestamp - shiftAnimationStartedAt) % 12000) / 12000;
  const eased = 0.5 - Math.cos(cycle * Math.PI * 2) / 2;
  shiftRange.value = String(Math.round(28 + eased * 64));
  updateShift();
  shiftAnimationFrame = requestAnimationFrame(animateShift);
}

shiftRange?.addEventListener('input', () => {
  shiftDemoTouched = true;
  cancelAnimationFrame(shiftAnimationFrame);
  updateShift();
});
shiftRange?.addEventListener('pointerdown', () => {
  shiftDemoTouched = true;
  cancelAnimationFrame(shiftAnimationFrame);
});
updateShift();

const shiftDemo = document.querySelector('#shift-demo');
if (shiftDemo && !reducedMotion) {
  const shiftDemoObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !shiftAnimationFrame && !shiftDemoTouched) {
      shiftAnimationFrame = requestAnimationFrame(animateShift);
    } else if (!entry.isIntersecting && shiftAnimationFrame) {
      cancelAnimationFrame(shiftAnimationFrame);
      shiftAnimationFrame = undefined;
      shiftAnimationStartedAt = undefined;
    }
  }, { threshold: 0.3 });
  shiftDemoObserver.observe(shiftDemo);
}

const chartData = {
  hours: { values: [8, 7.5, 0, 8, 7, 5, 4], title: 'Hours · last 7 days', total: '39.5h' },
  pay: { values: [116, 109, 0, 116, 102, 72, 58], title: 'Expected pay · last 7 days', total: '€573' }
};
const barChart = document.querySelector('#bar-chart');

function renderChart(mode) {
  const dataset = chartData[mode];
  const max = Math.max(...dataset.values);
  barChart.replaceChildren();
  barChart.classList.remove('visible');

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
