const screens = document.querySelectorAll(".screen");
const qBox = document.getElementById("questions");
const resultBox = document.getElementById("result");

let answers = {};
let currentDay = 1;

function goTo(n) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(`screen-${n}`).classList.add("active");
}

function pick(el){
  document.querySelectorAll(".option").forEach(o=>o.classList.remove("active"));
  el.classList.add("active");
}

questions.forEach(q=>{
  qBox.innerHTML += `
    <div class="question">
      <strong>${q.text}</strong>
      <div onclick="answer(${q.id}, '${q.dim}', 3)">Ya</div>
      <div onclick="answer(${q.id}, '${q.dim}', 2)">Terkadang</div>
      <div onclick="answer(${q.id}, '${q.dim}', 1)">Tidak</div>
    </div>
  `;
});

function answer(id, dim, val){
  answers[id] = {dim, val};
}

function checkAnswers(){
  if(Object.keys(answers).length < questions.length){
    alert("Anda belum menjawab semua pertanyaan.");
    return;
  }

  let score = {};
  Object.values(answers).forEach(a=>{
    score[a.dim] = (score[a.dim] || 0) + a.val;
  });

  let dominant = Object.keys(score).sort((a,b)=>score[b]-score[a])[0];

  const reflections = {
    Physical: "Tubuh Anda tampaknya sudah lama menahan lelah...",
    Mental: "Pikiran Anda mungkin belum benar-benar mendapat ruang istirahat...",
    Emotional: "Ada banyak perasaan yang selama ini Anda simpan sendiri...",
    Sensory: "Indra Anda mungkin telah terlalu lama bekerja tanpa jeda...",
    Social: "Hubungan sosial Anda mungkin lebih banyak menguras daripada menguatkan...",
    Creative: "Ketika ide terasa macet, bukan berarti Anda kehilangan kreativitas...",
    Spiritual: "Ada bagian terdalam dari diri Anda yang mungkin rindu disentuh kembali..."
  };

  resultBox.innerHTML = `<p>${reflections[dominant]}</p>`;
  goTo(5);
}

function openDay(day){
  if(day !== currentDay) return;
  document.getElementById("dayTitle").innerText = `Day ${day}`;
  document.getElementById("dayGuide").innerText =
    day === 1 ? "Luangkan 10 menit untuk menuliskan apa yang paling memenuhi pikiran Anda hari ini." :
    day === 2 ? "Perhatikan tubuh Anda hari ini..." :
    day === 3 ? "Kurangi rangsangan indra..." :
    day === 4 ? "Renungkan hal yang memberi makna..." :
    "Nikmati keindahan tanpa tujuan.";
  goTo("day");
}

function finishDay(){
  currentDay++;
  document.querySelectorAll(".day")[currentDay-1]?.classList.remove("locked");
  goTo(7);
}
