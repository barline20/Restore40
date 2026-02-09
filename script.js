/* ======================================================
GLOBAL STATE
====================================================== */
const screens = document.querySelectorAll(".screen");
const qBox = document.getElementById("questions");
const resultBox = document.getElementById("result");
const packageBox = document.getElementById("packages");

let answers = {};
let scores = {};
let dominantRests = [];

let currentDay = 1;
let activeDayContent = null;

/* ======================================================
NAVIGASI LAYAR
====================================================== */
function goTo(id) {
  screens.forEach(s => s.classList.remove("active"));
  const target = document.getElementById(`screen-${id}`);
  if (target) target.classList.add("active");
  window.scrollTo(0, 0);
}

/* ======================================================
SCREEN 3 – PILIH PERAN
====================================================== */
function pick(el) {
  document.querySelectorAll(".option").forEach(o =>
    o.classList.remove("active")
  );

  el.classList.add("active");
}

/* ======================================================
RENDER PERTANYAAN
====================================================== */
questions.forEach(q => {
  qBox.innerHTML += `
    <div class="question-card">
      <p><strong>${q.text}</strong></p>
      <div class="answer-btn" onclick="answer(${q.id}, '${q.dim}', 3, this)">Ya</div>
      <div class="answer-btn" onclick="answer(${q.id}, '${q.dim}', 2, this)">Terkadang</div>
      <div class="answer-btn" onclick="answer(${q.id}, '${q.dim}', 1, this)">Tidak</div>
    </div>
  `;
});

function answer(id, dim, val, el) {
  answers[id] = { dim, val };

  const parent = el.parentElement;
  parent.querySelectorAll(".answer-btn").forEach(b =>
    b.classList.remove("active")
  );
  el.classList.add("active");
}

/* ======================================================
HITUNG SKOR & TENTUKAN ISTIRAHAT DOMINAN
====================================================== */
function checkAnswers() {
  const unanswered = questions.filter(q => !answers[q.id]);
  if (unanswered.length > 0) {
    alert("🌿 Masih ada pernyataan yang belum dijawab.");
    return;
  }

  scores = {};
  Object.values(answers).forEach(a => {
    scores[a.dim] = (scores[a.dim] || 0) + a.val;
  });

  dominantRests = Object.keys(scores)
    .sort((a, b) => scores[b] - scores[a])
    .slice(0, 2);

  setActiveDayContent();
  renderResult();
  renderDayList();
  goTo(5);
}

/* ======================================================
SET PROGRAM 5 HARI BERDASARKAN HASIL
====================================================== */
function setActiveDayContent() {
  const main = dominantRests[0];

  switch (main) {
    case "Mental":
      activeDayContent = dayContentMental;
      break;
    case "Sensorik":
      activeDayContent = dayContentSensory;
      break;
    case "Spiritual":
      activeDayContent = dayContentSpiritual;
      break;
    case "Relasi":
      activeDayContent = dayContentRelational;
      break;
    case "Ekspresif":
      activeDayContent = dayContentExpressive;
      break;
    default:
      activeDayContent = dayContentFisik;
  }
}

/* ======================================================
HASIL REFLEKSI
====================================================== */
function renderResult() {
  const reflection = {
    Fisik: `
      🌿 Tubuh Anda tampaknya telah bekerja cukup lama tanpa banyak jeda.
      <br><br>
      <strong>Nggak apa-apa, yuk mulai dari sini:</strong>
      Kita pelankan ritme dan dengarkan tubuh dengan lembut.
    `,
    Mental: `
      🕊️ Pikiran Anda terus aktif bahkan saat ingin berhenti.
      <br><br>
      <strong>Nggak apa-apa, yuk mulai dari sini:</strong>
      Tidak semua hal harus dipikirkan hari ini.
    `,
    Sensorik: `
      🌱 Indra Anda terlalu lama sibuk.
      <br><br>
      <strong>Nggak apa-apa, yuk mulai dari sini:</strong>
      Beri mata dan telinga jeda sebentar.
    `,
    Relasi: `
      🤍 Anda banyak hadir untuk orang lain.
      <br><br>
      <strong>Nggak apa-apa, yuk mulai dari sini:</strong>
      Dekatlah dengan relasi yang terasa aman.
    `,
    Ekspresif: `
      ✨ Bagian diri yang menikmati hal sederhana masih ada.
      <br><br>
      <strong>Nggak apa-apa, yuk mulai dari sini:</strong>
      Lakukan satu hal kecil yang Anda suka.
    `,
    Spiritual: `
      🕯️ Ada kerinduan untuk berhenti sejenak.
      <br><br>
      <strong>Nggak apa-apa, yuk mulai dari sini:</strong>
      Diam atau doa sederhana sudah cukup.
    `
  };

  let html = `<p><strong>Refleksi untuk Anda 🌿</strong></p>`;
  html += `<p>${reflection[dominantRests[0]]}</p>`;

  resultBox.innerHTML = html;
}

/* ======================================================
RENDER LIST DAY (AUTO LOCK)
====================================================== */
function renderDayList() {
  const list = document.getElementById("dayList");
  list.innerHTML = "";

  currentDay = 1;

  for (let i = 1; i <= 5; i++) {
    list.innerHTML += `
      <div class="day ${i === 1 ? "active" : "locked"}"
           onclick="openDay(${i})">
        Day ${i}
      </div>
    `;
  }
}

/* ======================================================
DAY DETAIL
====================================================== */
function openDay(day) {
  if (day !== currentDay) return;
  if (!activeDayContent) return;

  const content = activeDayContent[day];

  document.getElementById("dayTitle").innerText = content.title;
  document.getElementById("dayIntro").innerText = content.intro;

  const ul = document.getElementById("dayGuidance");
  ul.innerHTML = "";
  content.guidance.forEach(g => {
    ul.innerHTML += `<li>${g}</li>`;
  });

  goTo("day");
}

function nextDay() {
  const days = document.querySelectorAll(".day");

  days[currentDay - 1]?.classList.remove("active");
  currentDay++;

  if (currentDay > 5) {
    renderPackages();
    goTo("final");
    return;
  }

  days[currentDay - 1]?.classList.remove("locked");
  days[currentDay - 1]?.classList.add("active");

  openDay(currentDay);
}

/* ======================================================
PAKET
====================================================== */
function renderPackages() {
  const map = {
    Mental: "Tenang",
    Sensorik: "Tenang",
    Relasi: "Bertumbuh",
    Spiritual: "Bertumbuh",
    Fisik: "Menyeluruh",
    Ekspresif: "Menyeluruh"
  };

  const recommended = map[dominantRests[0]];

  packageBox.innerHTML = `
    <p class="soft">
      Berdasarkan refleksi Anda,
      paket berikut mungkin paling relevan 🌿
    </p>
    ${renderPackage("Tenang", recommended)}
    ${renderPackage("Bertumbuh", recommended)}
    ${renderPackage("Menyeluruh", recommended)}
  `;
}

function renderPackage(name, recommended) {
  const data = {
    Tenang: ["Fokus Mental & Sensorik", "Rp199.000", "Rp299.000"],
    Bertumbuh: ["Fokus Relasi & Spiritual", "Rp349.000", "Rp499.000"],
    Menyeluruh: ["Pendampingan Utuh", "Rp599.000", "Rp799.000"]
  };

  return `
    <div class="package ${name === recommended ? "recommended" : ""}">
      <h3>${name === recommended ? "⭐ " : ""}Paket ${name}</h3>
      <p>${data[name][0]}</p>
      <p><del>${data[name][2]}</del> · <strong>${data[name][1]}</strong></p>
    </div>
  `;
}
