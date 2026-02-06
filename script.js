const screens = document.querySelectorAll(".screen");
const questionContainer = document.getElementById("question-container");
const resultBox = document.getElementById("result");

function goToScreen(n) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(`screen-${n}`).classList.add("active");
}

function exitMessage() {
  alert("Tidak apa-apa. Terima kasih sudah mampir 🌿");
}

function validateAge() {
  const age = document.getElementById("age").value;
  if (age >= 40 && age <= 65) {
    goToScreen(3);
  } else {
    alert("Alat ini dirancang khusus untuk usia 40–65 tahun 🌱");
  }
}

// Render questions
questions.forEach(q => {
  const div = document.createElement("div");
  div.className = "question";
  div.innerHTML = `
    <p>${q.text}</p>
    <div class="scale">
      <label><input type="radio" name="q${q.id}" value="1"> Tidak</label>
      <label><input type="radio" name="q${q.id}" value="2"> Terkadang</label>
      <label><input type="radio" name="q${q.id}" value="3"> Ya</label>
    </div>
  `;
  questionContainer.appendChild(div);
});

function calculateResult() {
  let score = {};
  questions.forEach(q => {
    const val = document.querySelector(`input[name="q${q.id}"]:checked`);
    if (val) {
      score[q.dim] = (score[q.dim] || 0) + parseInt(val.value);
    }
  });

  let dominant = Object.keys(score).sort((a,b)=>score[b]-score[a])[0];

  resultBox.innerHTML = `
    <p>
      Sepertinya bagian <strong>${dominant}</strong> dalam hidupmu sedang membutuhkan perhatian lebih.
    </p>
    <p class="soft">
      Kamu sudah berusaha keras menjalani semua peran ini.  
      Mungkin sekarang waktunya memulihkan diri, pelan-pelan.
    </p>
    <p>
      Saranku: mulai dengan satu langkah kecil hari ini —  
      matikan HP 1 jam sebelum tidur, atau duduk diam 5 menit tanpa tuntutan apa pun.
    </p>
  `;

  goToScreen(5);
}
