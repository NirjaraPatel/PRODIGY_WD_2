let startTime = 0,
  elapsed = 0,
  timer = null,
  lapCount = 0;

const $ = (id) => document.getElementById(id);
const display = $("display"),
  laps = $("laps");
const startBtn = $("startBtn"),
  pauseBtn = $("pauseBtn"),
  lapBtn = $("lapBtn"),
  resetBtn = $("resetBtn");

function fmt(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const msr = ms % 1000;
  const pad = (n, z = 2) => String(n).padStart(z, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(msr, 3)}`;
}

function tick() {
  display.textContent = fmt(Date.now() - startTime + elapsed);
}

startBtn.onclick = () => {
  startTime = Date.now();
  timer = setInterval(tick, 10);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  lapBtn.disabled = false;
  resetBtn.disabled = false;
};

pauseBtn.onclick = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
    elapsed += Date.now() - startTime;
    pauseBtn.textContent = "Resume";
    startBtn.disabled = true;
  } else {
    startTime = Date.now();
    timer = setInterval(tick, 10);
    pauseBtn.textContent = "Pause";
  }
};

lapBtn.onclick = () => {
  lapCount++;
  const li = document.createElement("li");
  li.innerHTML = `<span class="idx">Lap ${lapCount}</span><span>${display.textContent}</span>`;
  laps.prepend(li);
};

resetBtn.onclick = () => {
  clearInterval(timer);
  timer = null;
  startTime = 0;
  elapsed = 0;
  lapCount = 0;
  display.textContent = "00:00:00.000";
  laps.innerHTML = "";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  pauseBtn.textContent = "Pause";
  lapBtn.disabled = true;
  resetBtn.disabled = true;
};