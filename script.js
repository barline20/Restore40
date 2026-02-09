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

let selectedJob = "";
let customJob = "";

let activeDayContent = null;

/* ======================================================
NAVIGASI LAYAR
====================================================== */
function goTo(id) {
  s.forEach(s => s.classList.remove("active"));

  const target = document.getElementById(`screen-${id}`);
  if (!target) {
    console.error("Screen tidak ditemukan:", id);
    return;
  }

  target.classList.add("active");
  window.scrollTo(0, 0); // optional, tapi enak
}


/* ======================================================
SCREEN 3 – PILIH PERAN
====================================================== */
function pick(el) {
  document.querySelectorAll(".option").forEach(o =>
    o.classList.remove("active")
  );

  el.classList.add("active");
  selectedJob = el.innerText.trim();

  const customInput = document.getElementById("customJob");
  if (selectedJob === "Lainnya") {
    customInput.style.display = "block";
  } else {
    customInput.style.display = "none";
    customJob = "";
  }
}

function saveCustomJob(val) {
  customJob = val;
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
  const key = String(id); // 🔑 NORMALISASI

  answers[key] = { dim, val };

  const parent = el.parentElement;
  parent.querySelectorAll(".answer-btn").forEach(b =>
    b.classList.remove("active")
  );
  el.classList.add("active");
}

/* ======================================================
HITUNG SKOR & TENTUKAN SACRED REST
====================================================== */
function checkAnswers() {
  if (Object.keys(answers).length < questions.length) {
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

  renderResult();
  setActiveDayContent(dominantRests[0]);
  goTo(5);

}

/* ======================================================
SET PROGRAM HARI BERDASARKAN SACRED REST
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
    case "Kreatif":
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
      🌿 Tubuh Anda telah bekerja cukup lama tanpa jeda.
      <br><br>
      <strong>Yuk mulai pelan-pelan:</strong> dengarkan tubuh tanpa memaksanya terus kuat.
    `,
    Mental: `
      🧠 Pikiran Anda terus aktif bahkan saat tubuh ingin berhenti.
      <br><br>
      <strong>Hari ini:</strong> tidak semua hal harus dipikirkan.
    `,
    Emosional: `
      💛 Ada perasaan yang lama disimpan sendiri.
      <br><br>
      <strong>Cukup akui dulu</strong>, tanpa harus menjelaskannya.
    `,
    Sensorik: `
      🌱 Indra Anda terlalu lama sibuk.
      <br><br>
      <strong>Berikan jeda</strong> pada layar dan suara.
    `,
    Relasi: `
      🤍 Anda banyak hadir untuk orang lain.
      <br><br>
      <strong>Hari ini</strong>, izinkan diri sendiri hadir.
    `,
    Kreatif: `
      ✨ Bagian diri yang menikmati hal sederhana masih ada.
      <br><br>
      <strong>Lakukan satu hal kecil</strong> tanpa target.
    `,
    Spiritual: `
      🕊️ Anda mungkin rindu berhenti sejenak.
      <br><br>
      <strong>Diam sejenak</strong> juga sudah cukup.
    `
  };

  let html = `<p><strong>Refleksi untuk Anda 🌿</strong></p>`;
  html += `<p>${reflection[dominantRests[0]]}</p>`;

  if (dominantRests[1]) {
    html += `<p>${reflection[dominantRests[1]]}</p>`;
  }

  html += `
    <p class="soft">
      Refleksi ini bukan penilaian,
      melainkan undangan untuk merawat diri.
    </p>
  `;

  resultBox.innerHTML = html;
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
  currentDay++;

  const days = document.querySelectorAll(".day");
  if (days[currentDay - 1]) {
    days[currentDay - 1].classList.remove("locked");
  }

  if (currentDay > 5) {
    renderPackages();
    goTo("final");
  } else {
    openDay(currentDay);
  }
}

/* ======================================================
PAKET
====================================================== */
function renderPackages() {
  const map = {
    Mental: "Tenang",
    Emosional: "Tenang",
    Sensorik: "Tenang",
    Relasi: "Bertumbuh",
    Spiritual: "Bertumbuh",
    Fisik: "Menyeluruh",
    Kreatif: "Menyeluruh"
  };

  const recommended = map[dominantRests[0]];

  packageBox.innerHTML = `
    <p class="soft">
      Berdasarkan refleksi Anda,
      paket ini mungkin paling relevan 🌿
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
