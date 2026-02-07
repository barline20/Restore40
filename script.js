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
let journalData = {};
let selectedJob = "";
let customJob = "";

/* ======================================================
   NAVIGASI LAYAR
====================================================== */

function goTo(id) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(`screen-${id}`).classList.add("active");
}

/* ======================================================
   SCREEN 3 – PILIH PERAN
====================================================== */

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
  parent.querySelectorAll(".answer-btn").forEach(b => b.classList.remove("active"));
  el.classList.add("active");
}

/* ======================================================
   HITUNG SKOR & TENTUKAN SACRED REST DOMINAN
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
  goTo(5);
}

/* ======================================================
   HASIL REFLEKSI + SOLUSI (SACRED REST)
====================================================== */

function renderResult() {
  const reflection = {
    Fisik: `
      🌿 Tubuh Anda tampaknya telah bekerja lebih lama daripada yang ia mampu.
      Dalam Sacred Rest, ini adalah tanda bahwa tubuh membutuhkan
      <strong>physical rest</strong>—bukan sekadar tidur,
      tetapi ritme hidup yang lebih ramah bagi tubuh.
      <br><br>
      Solusi awal: perlambat tempo, beri jeda sadar, dan dengarkan sinyal tubuh.
    `,
    Mental: `
      🕊️ Pikiran Anda terlihat terus aktif, bahkan saat tubuh ingin berhenti.
      Ini selaras dengan kebutuhan <strong>mental rest</strong>,
      yaitu membebaskan pikiran dari proses berpikir tanpa henti.
      <br><br>
      Solusi awal: menurunkan tuntutan berpikir dan memberi ruang hening.
    `,
    Emosional: `
      💛 Ada emosi yang selama ini Anda tahan sendiri.
      Sacred Rest menyebut ini sebagai kebutuhan <strong>emotional rest</strong>,
      yaitu ruang untuk jujur pada perasaan tanpa harus kuat terus-menerus.
      <br><br>
      Solusi awal: mengakui perasaan tanpa menghakimi diri.
    `,
    Sensori: `
      🌱 Indra Anda mungkin terlalu lama terpapar rangsangan.
      Ini menunjukkan kebutuhan <strong>sensory rest</strong>:
      mengurangi kebisingan, layar, dan stimulasi berlebih.
      <br><br>
      Solusi awal: ciptakan momen sunyi dan lembut bagi indra.
    `,
    Sosial: `
      🤍 Anda banyak memberi ruang untuk orang lain,
      namun jarang memiliki relasi yang benar-benar memulihkan.
      Ini berkaitan dengan <strong>social rest</strong>.
      <br><br>
      Solusi awal: membedakan relasi yang menguras dan yang menguatkan.
    `,
    Kreatif: `
      ✨ Kreativitas Anda tidak hilang.
      Sacred Rest melihat ini sebagai kebutuhan <strong>creative rest</strong>,
      yaitu terhubung kembali dengan keindahan tanpa tuntutan hasil.
      <br><br>
      Solusi awal: izinkan diri menikmati tanpa tujuan produktif.
    `,
    Spiritual: `
      🕯️ Ada kerinduan akan makna dan keterhubungan yang lebih dalam.
      Ini selaras dengan <strong>spiritual rest</strong>—
      merasa terhubung dengan nilai, iman, atau tujuan hidup.
      <br><br>
      Solusi awal: meluangkan waktu untuk refleksi makna.
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
      melainkan undangan untuk merawat diri dengan lebih sadar.
    </p>
  `;

  resultBox.innerHTML = html;
}

/* ======================================================
   DAY 1–5 (ANJURAN SACRED REST TERSTRUKTUR)
====================================================== */

const dayContent = {
  1: {
    title: "Day 1 · Mental Rest 🕊️",
    intro: "Hari ini kita menenangkan pikiran yang terlalu lama bekerja.",
    prompts: [
      "Apa yang paling memenuhi pikiran Anda akhir-akhir ini?",
      "Hal apa yang membuat Anda sulit benar-benar berhenti?",
      "Apa yang ingin pikiran Anda sampaikan jika diberi ruang?"
    ]
  },
  2: {
    title: "Day 2 · Physical Rest 🌿",
    intro: "Hari ini kita belajar mendengarkan tubuh.",
    prompts: [
      "Bagian tubuh mana yang terasa paling lelah?",
      "Kapan terakhir kali Anda beristirahat tanpa rasa bersalah?",
      "Apa satu hal kecil yang bisa Anda lakukan untuk tubuh hari ini?"
    ]
  },
  3: {
    title: "Day 3 · Sensory Rest 🌱",
    intro: "Hari ini kita memberi jeda pada indra.",
    prompts: [
      "Rangsangan apa yang paling menguras Anda?",
      "Bagaimana rasanya berada dalam keheningan?",
      "Apa yang terasa menenangkan bagi indra Anda?"
    ]
  },
  4: {
    title: "Day 4 · Spiritual & Social Rest 🕯️",
    intro: "Hari ini kita menyentuh makna dan relasi.",
    prompts: [
      "Hal apa yang memberi makna bagi hidup Anda?",
      "Relasi mana yang terasa menguatkan?",
      "Apa yang membuat Anda merasa terhubung?"
    ]
  },
  5: {
    title: "Day 5 · Creative Rest ✨",
    intro: "Hari ini kita menghidupkan kembali rasa kagum.",
    prompts: [
      "Kapan terakhir kali Anda menikmati sesuatu tanpa tujuan?",
      "Keindahan apa yang akhir-akhir ini terlewat?",
      "Apa yang membuat Anda merasa hidup?"
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
    alert("🌿 Tidak perlu panjang. Satu kalimat pun cukup.");
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

/* ======================================================
   PAKET – KONSISTEN SACRED REST
====================================================== */

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
      Berdasarkan refleksi Anda,
      paket berikut <strong>mungkin paling relevan</strong> 🌿
    </p>
    ${renderPackage("Tenang", recommended)}
    ${renderPackage("Bertumbuh", recommended)}
    ${renderPackage("Menyeluruh", recommended)}
  `;
}

function renderPackage(name, recommended) {
  const data = {
    Tenang: ["Fokus Mental, Emotional, Sensory Rest", "Rp199.000", "Rp299.000"],
    Bertumbuh: ["Fokus Social & Spiritual Rest", "Rp349.000", "Rp499.000"],
    Menyeluruh: ["Pendampingan seluruh Sacred Rest", "Rp599.000", "Rp799.000"]
  };

  return `
    <div class="package ${name === recommended ? "recommended" : ""}">
      <h3>${name === recommended ? "⭐ " : ""}Paket ${name}</h3>
      <p>${data[name][0]}</p>
      <p><del>${data[name][2]}</del> · <strong>${data[name][1]}</strong></p>
    </div>
  `;
}
