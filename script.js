/* ===============================
   GLOBAL STATE
================================ */

const screens = document.querySelectorAll(".screen");
const qBox = document.getElementById("questions");
const resultBox = document.getElementById("result");
const packageBox = document.getElementById("packages");

let answers = {};          // jawaban kuesioner
let scores = {};           // skor per Sacred Rest
let dominantRests = [];    // 1–2 rest dominan
let currentDay = 1;        // progres day 1–5
let journalData = {};      // isi jurnal per hari

/* ===============================
   NAVIGASI SCREEN
================================ */

function goTo(id) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(`screen-${id}`).classList.add("active");
}

/* ===============================
   SCREEN 3 – PILIH PERAN
================================ */

function pick(el) {
  document.querySelectorAll(".option").forEach(o => o.classList.remove("active"));
  el.classList.add("active");
  el.querySelector("input").checked = true;
}

/* ===============================
   RENDER KUESIONER
================================ */

questions.forEach(q => {
  qBox.innerHTML += `
    <div class="question-card">
      <strong>${q.text}</strong>

      <div class="answer-btn" onclick="answer(${q.id}, '${q.dim}', 3)">Ya</div>
      <div class="answer-btn" onclick="answer(${q.id}, '${q.dim}', 2)">Terkadang</div>
      <div class="answer-btn" onclick="answer(${q.id}, '${q.dim}', 1)">Tidak</div>
    </div>
  `;
});

function answer(id, dim, val) {
  answers[id] = { dim, val };

  // Highlight jawaban aktif
  const parent = event.target.parentElement;
  parent.querySelectorAll(".answer-btn").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");
}

/* ===============================
   VALIDASI & HITUNG HASIL
================================ */

function checkAnswers() {
  if (Object.keys(answers).length < questions.length) {
    alert("Anda belum mengisi seluruh pernyataan. Silakan lengkapi terlebih dahulu.");
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
   HASIL REFLEKSI (PANJANG & EMPATIK)
================================ */

function renderResult() {
  const reflection = {
    Physical: `
      Tubuh Anda tampaknya telah bekerja lebih lama daripada yang ia mampu.
      Ketika kelelahan fisik muncul, sering kali itu bukan karena kurang kuat,
      melainkan karena terlalu jarang berhenti dengan sadar.
    `,
    Mental: `
      Pikiran Anda terlihat terus aktif, bahkan saat tubuh ingin beristirahat.
      Ini bukan tanda kelemahan, melainkan tanda tanggung jawab yang terlalu lama
      dipikul tanpa ruang jeda.
    `,
    Emotional: `
      Ada banyak perasaan yang selama ini Anda simpan sendiri.
      Menahan emosi memang membantu kita tetap berjalan,
      tetapi perlahan menguras tenaga batin.
    `,
    Sensory: `
      Indra Anda mungkin telah terlalu lama terpapar rangsangan:
      suara, layar, dan tuntutan yang terus hadir.
      Kepekaan ini bukan masalah, melainkan sinyal untuk beristirahat.
    `,
    Social: `
      Anda tampaknya sering memberi ruang bagi orang lain,
      namun jarang memiliki ruang aman untuk benar-benar menjadi diri sendiri.
    `,
    Creative: `
      Ketika ide terasa buntu, bukan berarti Anda kehilangan kreativitas.
      Bisa jadi kreativitas Anda hanya belum diberi ruang yang tepat untuk bernapas.
    `,
    Spiritual: `
      Ada bagian terdalam dari diri Anda yang mungkin sedang mencari makna.
      Bukan jawaban besar, melainkan rasa terhubung kembali dengan hidup.
    `
  };

  let html = `
    <p>✨ <strong>Refleksi untuk Anda</strong></p>
    <p>${reflection[dominantRests[0]]}</p>
  `;

  if (dominantRests[1]) {
    html += `<p>${reflection[dominantRests[1]]}</p>`;
  }

  html += `
    <p class="soft">
      Perjalanan ini bukan tentang memperbaiki diri,
      melainkan tentang memberi ruang agar Anda dapat pulih
      dengan ritme yang lebih manusiawi.
    </p>
  `;

  resultBox.innerHTML = html;
}

/* ===============================
   DAY 1–5 CONTENT (SACRED REST)
================================ */

const dayContent = {
  1: {
    title: "Day 1 · Menenangkan Pikiran",
    intro: "Hari ini, kita memberi ruang bagi pikiran yang selama ini terus bekerja.",
    prompts: [
      "Apa hal yang paling sering memenuhi pikiran Anda akhir-akhir ini?",
      "Apa yang membuat pikiran Anda sulit beristirahat?",
      "Jika pikiran Anda bisa berbicara, apa yang ingin ia sampaikan?"
    ]
  },
  2: {
    title: "Day 2 · Merawat Tubuh",
    intro: "Tubuh sering kali lelah lebih dulu sebelum kita menyadarinya.",
    prompts: [
      "Bagian tubuh mana yang terasa paling lelah?",
      "Kapan terakhir kali Anda benar-benar berhenti tanpa tujuan?",
      "Apa satu bentuk perhatian kecil yang bisa Anda berikan pada tubuh hari ini?"
    ]
  },
  3: {
    title: "Day 3 · Mengistirahatkan Indra",
    intro: "Indra yang terlalu lama bekerja juga membutuhkan jeda.",
    prompts: [
      "Rangsangan apa yang paling menguras Anda (suara, layar, keramaian)?",
      "Kapan terakhir kali Anda berada dalam keheningan?",
      "Apa yang terasa menenangkan bagi indra Anda?"
    ]
  },
  4: {
    title: "Day 4 · Menyentuh Makna",
    intro: "Makna sering hadir dalam hal-hal kecil yang kerap terlewat.",
    prompts: [
      "Hal apa yang membuat hidup Anda terasa berarti?",
      "Peran apa yang paling menguras energi batin Anda?",
      "Jika hari ini tidak harus produktif, apa yang ingin Anda lakukan?"
    ]
  },
  5: {
    title: "Day 5 · Menghidupkan Kreativitas",
    intro: "Kreativitas bukan tentang hasil, tetapi tentang rasa hidup.",
    prompts: [
      "Kapan terakhir kali Anda merasa hidup dan terhubung?",
      "Hal indah apa yang akhir-akhir ini jarang Anda perhatikan?",
      "Jika tidak ada tuntutan, apa yang ingin Anda nikmati hari ini?"
    ]
  }
};

/* ===============================
   BUKA DAY
================================ */

function openDay(day) {
  if (day !== currentDay) return;

  const content = dayContent[day];
  document.getElementById("dayTitle").innerText = content.title;
  document.getElementById("dayIntro").innerText = content.intro;

  const ul = document.getElementById("journalPrompts");
  ul.innerHTML = "";
  content.prompts.forEach(p => {
    ul.innerHTML += `<li>${p}</li>`;
  });

  document.getElementById("journalText").value = journalData[day] || "";
  goTo("day");
}

/* ===============================
   SUBMIT JURNAL HARIAN
================================ */

function submitJournal() {
  const text = document.getElementById("journalText").value.trim();

  if (!text) {
    alert("Tidak apa-apa jika singkat. Satu kalimat pun sudah cukup berarti.");
    return;
  }

  journalData[currentDay] = text;

  alert(
    "Terima kasih telah meluangkan waktu untuk diri Anda hari ini.\n" +
    "Langkah kecil ini sangat berarti."
  );

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
   PAKET – PERSONALISASI HASIL
================================ */

function renderPackages() {
  const packageMap = {
    Mental: "Tenang",
    Emotional: "Tenang",
    Sensory: "Tenang",
    Social: "Bertumbuh",
    Spiritual: "Bertumbuh",
    Physical: "Menyeluruh",
    Creative: "Menyeluruh"
  };

  const recommended = packageMap[dominantRests[0]];

  packageBox.innerHTML = `
    <p class="soft">
      Berdasarkan perjalanan dan refleksi Anda,
      paket berikut <strong>mungkin paling relevan</strong> untuk Anda saat ini:
    </p>

    ${renderPackageCard("Tenang", recommended)}
    ${renderPackageCard("Bertumbuh", recommended)}
    ${renderPackageCard("Menyeluruh", recommended)}
  `;
}

function renderPackageCard(name, recommended) {
  const details = {
    Tenang: {
      desc: "Ruang pemulihan untuk menenangkan pikiran dan emosi.",
      price: "Rp199.000",
      strike: "Rp299.000"
    },
    Bertumbuh: {
      desc: "Pendampingan reflektif untuk memahami diri dan peran hidup.",
      price: "Rp349.000",
      strike: "Rp499.000"
    },
    Menyeluruh: {
      desc: "Pendampingan utuh lintas tubuh, pikiran, dan makna.",
      price: "Rp599.000",
      strike: "Rp799.000"
    }
  };

  return `
    <div class="package ${name === recommended ? "recommended" : ""}">
      <h3>${name === recommended ? "⭐ " : ""}Paket ${name}</h3>
      <p>${details[name].desc}</p>
      <p><del>${details[name].strike}</del> · <strong>${details[name].price}</strong></p>
    </div>
  `;
}
