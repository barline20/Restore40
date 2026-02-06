const screens = document.querySelectorAll(".screen");
const questionContainer = document.getElementById("question-container");
const resultBox = document.getElementById("result");

let answers = {};

function goToScreen(id) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(`screen-${id}`)?.classList.add("active") ||
  document.getElementById(id).classList.add("active");
}

function validateAge() {
  const age = document.getElementById("age").value;
  if (age >= 40 && age <= 65) {
    goToScreen(3);
  } else {
    alert("Alat ini dirancang untuk usia 40–65 tahun 🌿");
  }
}

function selectJob(el) {
  document.querySelectorAll(".option-card").forEach(c => c.classList.remove("active"));
  el.classList.add("active");
  el.querySelector("input").checked = true;
}

questions.forEach(q => {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="question-card">
      <strong>${q.text}</strong>
      <div class="answer-btn" onclick="selectAnswer(this, ${q.id}, '${q.dim}', 1)">Tidak</div>
      <div class="answer-btn" onclick="selectAnswer(this, ${q.id}, '${q.dim}', 2)">Terkadang</div>
      <div class="answer-btn" onclick="selectAnswer(this, ${q.id}, '${q.dim}', 3)">Ya</div>
    </div>
  `;
  questionContainer.appendChild(div);
});

function selectAnswer(el, id, dim, val) {
  el.parentElement.querySelectorAll(".answer-btn").forEach(b => b.classList.remove("active"));
  el.classList.add("active");
  answers[id] = { dim, val };
}

function calculateResult() {
  let score = {};

  Object.values(answers).forEach(a => {
    score[a.dim] = (score[a.dim] || 0) + a.val;
  });

  const dominant = Object.keys(score).sort((a,b)=>score[b]-score[a])[0];

  const advice = {
    Fisik: "Tubuhmu mungkin lelah bukan karena kurang kuat, tapi karena terlalu jarang benar-benar berhenti. Physical rest bisa dimulai dari tidur tanpa distraksi atau berbaring tanpa tujuan.",
    Mental: "Pikiranmu tampak terus bekerja. Mental rest hadir saat kamu berhenti memproses—tanpa berita, tanpa tuntutan berpikir.",
    Sensori: "Indramu mungkin kewalahan. Redupkan cahaya, kurangi suara, dan beri ruang hening meski hanya beberapa menit.",
    Emosional: "Ada emosi yang lama tertahan. Emotional rest dimulai saat kamu boleh jujur tanpa harus terlihat kuat.",
    Sosial: "Social rest bukan tentang menyendiri, tapi memilih relasi yang tidak menguras.",
    Kreatif: "Kelelahan kreatif muncul saat hidup terlalu fungsional. Nikmati keindahan tanpa tujuan.",
    Spiritual: "Spiritual rest hadir saat hidup kembali terasa bermakna—melalui refleksi, doa, atau diam."
  };

  resultBox.innerHTML = `
    <p>
      Sepertinya bagian <strong>${dominant}</strong> dalam hidupmu sedang membutuhkan perhatian lebih.
    </p>
    <p class="soft">${advice[dominant]}</p>
  `;

  goToScreen(5);
}
