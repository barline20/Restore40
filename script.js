const screens = document.querySelectorAll(".screen");
const qBox = document.getElementById("questions");
const resultBox = document.getElementById("result");
const packageBox = document.getElementById("packages");

let answers = {};
let scores = {};
let dominantRests = [];
let currentDay = 1;

function goTo(id) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(`screen-${id}`).classList.add("active");
}

/* ======================
   RENDER QUESTIONS
====================== */
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
}

/* ======================
   HITUNG HASIL
====================== */
function checkAnswers() {
  if (Object.keys(answers).length < questions.length) {
    alert("Anda belum mengisi seluruh pernyataan.");
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

/* ======================
   HASIL REFLEKSI PANJANG
====================== */
function renderResult() {
  const reflectionText = {
    Physical: `
      Tubuh Anda tampaknya telah bekerja lebih lama daripada yang ia mampu.
      Ketika lelah fisik muncul, sering kali itu bukan karena kurang kuat,
      melainkan karena terlalu jarang berhenti dengan sadar.
    `,
    Mental: `
      Pikiran Anda terlihat terus aktif, bahkan saat tubuh ingin beristirahat.
      Ini bukan tanda kelemahan, melainkan tanda tanggung jawab yang terlalu lama dipikul sendirian.
    `,
    Emotional: `
      Ada banyak hal yang Anda simpan di dalam diri.
      Menahan emosi memang membuat kita tetap berjalan,
      tetapi juga perlahan menguras tenaga batin.
    `,
    Sensory: `
      Indra Anda mungkin telah terlalu lama terpapar—suara, layar, tuntutan.
      Kepekaan ini bukan masalah, justru tanda bahwa tubuh Anda meminta jeda.
    `,
    Social: `
      Anda tampaknya sering memberi ruang untuk orang lain,
      tetapi jarang mendapat ruang aman untuk menjadi diri sendiri.
    `,
    Creative: `
      Ketika ide terasa buntu, bukan berarti Anda kehilangan kreativitas.
      Bisa jadi kreativitas Anda hanya belum diberi ruang yang tepat untuk bernapas.
    `,
    Spiritual: `
      Ada bagian terdalam dari diri Anda yang mungkin sedang mencari makna,
      bukan
