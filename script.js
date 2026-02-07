/* ===============================
   GLOBAL STATE
================================ */

const screens = document.querySelectorAll(".screen");
const qBox = document.getElementById("questions");
const resultBox = document.getElementById("result");
const packageBox = document.getElementById("packages");

let answers = {};
let scores = {};
let dominantRests = [];
let currentDay = 1;
let journalData = {};
let selectedJob = "";
let customJob = "";

/* ===============================
   NAVIGASI
================================ */

function goTo(id) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(`screen-${id}`).classList.add("active");
}

function goBack(from, to) {
  document.getElementById(`screen-${from}`).classList.remove("active");
  document.getElementById(`screen-${to}`).classList.add("active");
}

/* ===============================
   SCREEN 3 – PERAN
================================ */

function pick(el) {
  document.querySelectorAll(".option").forEach(o => o.classList.remove("active"));
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

/* ===============================
   RENDER PERTANYAAN
================================ */

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
  parent.querySelectorAll(".answer-btn").forEach(b => b.classList.remove("active"));
  el.classList.add("active");
}

/* ===============================
   HITUNG HASIL
================================ */

function checkAnswers() {
  if (Object.keys(answers).length < questions.length) {
    alert("🌿 Masih ada pernyataan yang belum terjawab.");
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
  goTo(5);
}

/* ===============================
   HASIL REFLEKSI (REKAN SEPERJALANAN)
================================ */

function renderResult() {
  const reflection = {
    Physical: "🌿 Tubuh Anda sudah lama bekerja tanpa cukup jeda. Bukan karena Anda lemah, tetapi karena Anda setia menjalani banyak peran.",
    Mental: "🕊️ Pikiran Anda tampak terus aktif. Ini sering terjadi pada mereka yang terbiasa bertanggung jawab dan jarang memberi ruang berhenti.",
    Emotional: "💛 Ada perasaan yang lama disimpan. Menahan memang membuat kita bertahan, tetapi juga melelahkan hati.",
    Sensory: "🌱 Indra Anda mungkin terlalu lama terpapar. Kepekaan ini bukan masalah, melainkan sinyal untuk beristirahat.",
    Social: "🤍 Anda banyak memberi ruang bagi orang lain, namun jarang memiliki ruang aman untuk diri sendiri.",
    Creative: "✨ Kreativitas Anda tidak hilang. Ia hanya menunggu ruang yang lebih lembut.",
    Spiritual: "🕯️ Ada kerind packaging dengan makna dan keterhubungan yang lebih dalam."
  };

  let html = `
    <p><strong>Refleksi untuk Anda 🌿</strong></p>
    <p>${reflection[dominantRests[0]]}</p>
  `;

  if (dominantRests[1]) {
    html += `<p>${reflection[dominantRests[1]]}</p>`;
  }

  html += `
    <p class="soft">
      Saya di sini bukan untuk menilai Anda,<br>
      tetapi menemani Anda memahami apa yang sedang dibutuhkan.
    </p>
  `;

  resultBox.innerHTML = html;
}

/* ===============================
   DAY 1–5 (JOURNALING TERPANDU)
================================ */

const dayContent = {
  1: {
    title: "Day 1 · Menenangkan Pikiran 🕊️",
    intro: "Hari ini, kita memberi ruang bagi pikiran yang selama ini terus bekerja.",
    prompts: [
      "Apa yang paling memenuhi pikiran Anda akhir-akhir ini?",
      "Hal apa yang membuat Anda sulit benar-benar beristirahat?",
      "Jika pikiran Anda bisa berbicara, apa yang ingin ia sampaikan?"
    ]
  },
  2: {
    title: "Day 2 · Merawat Tubuh 🌿",
    intro: "Tubuh sering berbicara melalui rasa lelah.",
    prompts: [
      "Bagian tubuh mana yang terasa paling lelah?",
      "Kapan terakhir kali Anda benar-benar berhenti?",
      "Apa satu bentuk perhatian kecil untuk tubuh hari ini?"
    ]
  },
  3: {
    title: "Day 3 · Mengistirahatkan Indra 🌱",
    intro: "Indra juga membutuhkan jeda.",
    prompts: [
      "Rangsangan apa yang paling menguras Anda?",
      "Kapan terakhir kali Anda menikmati keheningan?",
      "Apa yang terasa menenangkan bagi indra Anda?"
    ]
  },
  4: {
    title: "Day 4 · Menyentuh Makna 🕯️",
    intro: "Makna sering hadir dalam hal sederhana.",
    prompts: [
      "Hal kecil apa yang memberi makna akhir-akhir ini?",
      "Peran apa yang paling menguras energi batin Anda?",
      "Jika hari ini tidak harus produktif, apa yang ingin Anda lakukan?"
    ]
  },
  5: {
    title: "Day 5 · Menghidupkan Kreativitas ✨",
    intro: "Kreativitas adalah tanda kehidupan.",
    prompts: [
      "Kapan terakhir kali Anda merasa hidup?",
      "Keindahan apa yang akhir-akhir ini terlewat?",
      "Apa yang ingin Anda nikmati tanpa tuntutan?"
    ]
  }
};

function openDay(day) {
  if (day !== currentDay) return;

  const content = dayContent[day];
  document.getElementById("dayTitle").innerText = content.title;
  document.getElementById("dayIntro").innerText = content.intro;

  const ul = document.getElementById("journalPrompts");
  ul.innerHTML = "";
  content.prompts.forEach(p => ul.innerHTML += `<li>${p}</li>`);

  document.getElementById("journalText").value = journalData[day] || "";
  goTo("day");
}

function submitJournal() {
  const text = document.getElementById("journalText").value.trim();

  if (!text) {
    alert("🌿 Tidak perlu panjang. Satu kalimat pun cukup berarti.");
    return;
  }

  journalData[currentDay] = text;

  alert("✨ Terima kasih telah memberi ruang untuk diri Anda hari ini.");

  currentDay++;
  document.querySelectorAll(".day")[currentDay - 1]?.classList.remove("locked");

  if (currentDay > 5) {
    renderPackages();
    goTo("final");
  } else {
    goTo(7);
  }
}

/* ===============================
   PAKET – PERSONALISASI
================================ */

function renderPackages() {
  const map = {
    Mental: "Tenang",
    Emotional: "Tenang",
    Sensory: "Tenang",
    Social: "Bertumbuh",
    Spiritual: "Bertumbuh",
    Physical: "Menyeluruh",
    Creative: "Menyeluruh"
  };

  const recommended = map[dominantRests[0]];

  packageBox.innerHTML = `
    <p class="soft">
      Berdasarkan perjalanan Anda, paket berikut
      <strong>mungkin paling relevan</strong> 🌿
    </p>
    ${renderPackage("Tenang", recommended)}
    ${renderPackage("Bertumbuh", recommended)}
    ${renderPackage("Menyeluruh", recommended)}
  `;
}

function renderPackage(name, recommended) {
  const data = {
    Tenang: ["Ruang menenangkan pikiran & emosi", "Rp199.000", "Rp299.000"],
    Bertumbuh: ["Pendampingan reflektif & peran hidup", "Rp349.000", "Rp499.000"],
    Menyeluruh: ["Pendampingan utuh lintas aspek", "Rp599.000", "Rp799.000"]
  };

  return `
    <div class="package ${name === recommended ? "recommended" : ""}">
      <h3>${name === recommended ? "⭐ " : ""}Paket ${name}</h3>
      <p>${data[name][0]}</p>
      <p><del>${data[name][2]}</del> · <strong>${data[name][1]}</strong></p>
    </div>
  `;
}
