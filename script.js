/* ======================================================
GLOBAL STATE
====================================================== */
let currentScreen = 1;
let selectedRole = "";
let answers = {}; // {questionId: {value, category}}
let dominantCategory = "";
let currentDayUnlocked = 1;

/* ======================================================
SCREEN NAVIGATION
====================================================== */
function goTo(screenNumber) {
  document
    .getElementById(`screen-${currentScreen}`)
    ?.classList.remove("active");

  currentScreen = screenNumber;

  document
    .getElementById(`screen-${currentScreen}`)
    ?.classList.add("active");
   if (currentScreen === 4) {
    renderQuestions();
  }
}

function showLaterMessage() {
  document.getElementById("laterMessage").classList.remove("hidden");
}

/* ======================================================
SCREEN 2 – PROFILE VALIDATION
====================================================== */
function validateProfile() {
  const name = document.getElementById("userName").value.trim();
  const age = document.getElementById("userAge").value;

  if (!name || !age) {
    alert("🌿 Nama dan usia perlu diisi terlebih dahulu.");
    return;
  }

  goTo(3);
}

/* ======================================================
SCREEN 3 – ROLE
====================================================== */
function selectRole(el) {
  document
    .querySelectorAll("#screen-3 .option")
    .forEach(o => o.classList.remove("active"));

  el.classList.add("active");
  selectedRole = el.innerText;

  const custom = document.getElementById("customRole");
  if (selectedRole === "Lainnya") {
    custom.classList.remove("hidden");
  } else {
    custom.classList.add("hidden");
    custom.value = "";
  }
}

function validateRole() {
  if (!selectedRole) {
    alert("🌿 Silakan pilih salah satu peran terlebih dahulu.");
    return;
  }

  goTo(4);
  renderQuestions();
}

/* ======================================================
SCREEN 4 – RENDER QUESTIONS
====================================================== */
function renderQuestions() {
  const box = document.getElementById("questions");
  box.innerHTML = "";

  questions.forEach((q, index) => {
    const qEl = document.createElement("div");
    qEl.className = "question";

    qEl.innerHTML = `
      <p><strong>${index + 1}.</strong> ${q.text}</p>

      <div class="option" onclick="selectAnswer(${index}, 3, this)">Ya</div>
      <div class="option" onclick="selectAnswer(${index}, 2, this)">Terkadang</div>
      <div class="option" onclick="selectAnswer(${index}, 1, this)">Tidak</div>
    `;

    box.appendChild(qEl);
  });
}
let answers = {};
function selectAnswer(id, category, value, el) {
  answers[id] = { value, category };

  const siblings = el.parentElement.querySelectorAll(".option");
  siblings.forEach(s => s.classList.remove("active"));
  el.classList.add("active");
   // 🔑 cek apakah semua sudah dijawab
  if (Object.keys(answers).length === questions.length) {
    document.getElementById("submitBtn").disabled = false;
  }
}

/* ======================================================
VALIDATE & SUBMIT ANSWERS
====================================================== */
function submitAnswers() {
  if (Object.keys(answers).length < questions.length) {
    alert("🌿 Masih ada pernyataan yang belum dijawab.");
    return;
  }

  calculateResult();
  goTo(5);
}

/* ======================================================
CALCULATE DOMINANT CATEGORY
====================================================== */
function calculateResult() {
  const scores = {};

  questions.forEach(q => {
    if (!scores[q.category]) scores[q.category] = 0;
    scores[q.category] += answers[q.id].value;
  });

  dominantCategory = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  renderReflection();
}

/* ======================================================
SCREEN 5 – REFLECTION TEXT (SESUI PDF)
====================================================== */
function renderReflection() {
  const box = document.getElementById("reflectionResult");

  const reflections = {
    Fisik: `
      <p>🌿 <strong>Tubuh Anda terlihat sudah bekerja cukup lama tanpa banyak jeda.</strong></p>
      <p>
        Mungkin bukan karena aktivitas berat, tapi karena terus berjalan tanpa benar-benar berhenti.
        Wajar kalau tubuh kini terasa meminta perhatian.
      </p>
      <p><em>Nggak apa-apa, yuk mulai dari sini:</em><br>
        Kita pelankan ritme sedikit saja. Ambil jeda singkat dan dengarkan tubuh.
      </p>
    `,
    Mental: `
      <p>🧠 <strong>Pikiran Anda tampaknya jarang benar-benar berhenti.</strong></p>
      <p>
        Bahkan saat diam, kepala masih penuh dengan banyak hal.
        Ini bukan tanda lemah — ini tanda lelah.
      </p>
      <p><em>Nggak apa-apa, yuk mulai dari sini:</em><br>
        Hari ini, tidak semua hal harus dipikirkan.
      </p>
    `,
    Emosional: `
      <p>💛 <strong>Ada perasaan yang mungkin selama ini Anda simpan sendiri.</strong></p>
      <p>
        Bukan karena tidak mau berbagi, tapi karena sudah terbiasa menahan.
        Hati juga bisa capek.
      </p>
      <p><em>Nggak apa-apa, yuk mulai dari sini:</em><br>
        Perhatikan dulu apa yang sedang Anda rasakan.
      </p>
    `,
    Sensorik: `
      <p>🌱 <strong>Indra Anda mungkin sudah terlalu lama sibuk.</strong></p>
      <p>
        Layar, suara, dan aktivitas terus-menerus bisa membuat tubuh sulit benar-benar tenang.
      </p>
      <p><em>Nggak apa-apa, yuk mulai dari sini:</em><br>
        Kita beri mata dan telinga sedikit jeda.
      </p>
    `,
    Relasi: `
      <p>🤍 <strong>Anda banyak hadir untuk orang lain.</strong></p>
      <p>
        Kadang tanpa sadar, diri sendiri jadi belakangan.
      </p>
      <p><em>Nggak apa-apa, yuk mulai dari sini:</em><br>
        Dekatlah dengan orang yang membuat Anda merasa aman.
      </p>
    `,
    Ekspresif: `
      <p>✨ <strong>Bagian diri Anda yang menikmati hal-hal sederhana masih ada.</strong></p>
      <p>
        Mungkin tertutup oleh kesibukan, bukan hilang.
      </p>
      <p><em>Nggak apa-apa, yuk mulai dari sini:</em><br>
        Lakukan satu hal kecil yang Anda suka hari ini.
      </p>
    `,
    Spiritual: `
      <p>🙏 <strong>Ada keinginan untuk berhenti sejenak dan menata arah.</strong></p>
      <p>
        Itu wajar setelah perjalanan yang panjang.
      </p>
      <p><em>Nggak apa-apa, yuk mulai dari sini:</em><br>
        Luangkan waktu hening yang singkat.
      </p>
    `
  };

  box.innerHTML = reflections[dominantCategory];
}

/* ======================================================
SCREEN 7 – PROGRAM 5 DAYS
====================================================== */
function renderProgram() {
  const daysBox = document.getElementById("days");
  daysBox.innerHTML = "";

  const program = programs[dominantCategory];

  program.forEach((day, i) => {
    const d = document.createElement("div");
    d.className = `day ${i === 0 ? "unlocked" : "locked"}`;
    d.id = `day-${i + 1}`;

    d.innerHTML = `
      <h3>${day.title}</h3>
      <p>${day.content}</p>
      ${
        i === 0
          ? `<button onclick="completeDay(${i + 1})">Selesai Hari ${i + 1}</button>`
          : ""
      }
    `;

    daysBox.appendChild(d);
  });
}

function completeDay(dayNumber) {
  const current = document.getElementById(`day-${dayNumber}`);
  current.classList.add("done");

  const next = document.getElementById(`day-${dayNumber + 1}`);

  if (next) {
    next.classList.remove("locked");
    next.innerHTML += `
      <button onclick="completeDay(${dayNumber + 1})">
        Selesai Hari ${dayNumber + 1}
      </button>
    `;
  } else {
    showClosingAndPackages();
  }
}
function showClosingAndPackages() {
  const daysBox = document.getElementById("days");

  daysBox.innerHTML += `
    <div class="closing">
      <h2>🌱 Terima kasih telah berjalan sejauh ini</h2>
      <p class="soft">
        Anda telah menyelesaikan perjalanan 5 hari<br>
        dengan ritme Anda sendiri.
      </p>

      <p class="soft">
        Gimana perjalanan 5 hari pemulihanmu bersama kami?<br>
        Maukah kamu lanjut dengan paket-paket ini?
      </p>

      <div id="packageBox"></div>
    </div>
  `;

  renderPackages();
}


/* ======================================================
CALL PROGRAM RENDER WHEN ENTER SCREEN 7
====================================================== */
document
  .querySelector("button[onclick='goTo(7)']")
  ?.addEventListener("click", renderProgram);

/* ======================================================
PROGRAM DATA (RINGKAS – DETAIL ADA DI PDF)
====================================================== */
const programs = {
  Mental: [
    {
      title: "Hari 1 — Mengosongkan Kepala",
      activity: "Menulis bebas",
      guide: `
        Luangkan sekitar 10 menit untuk menulis apa pun yang ingin keluar dari kepala Anda.<br>
        Tidak perlu rapi, tidak perlu masuk akal, dan tidak perlu disimpan.<br>
        Jika di tengah jalan Anda ingin berhenti, itu juga tidak apa-apa.<br>
        Hari ini, menulis hanyalah cara untuk memberi ruang bernapas bagi pikiran.
      `
    },
    {
      title: "Hari 2 — Diam yang Aman",
      activity: "Duduk diam",
      guide: `
        Carilah posisi duduk yang paling nyaman bagi tubuh Anda.<br>
        Luangkan 5–10 menit untuk hanya hadir, sambil menarik dan menghembuskan napas secara perlahan.<br>
        Bila pikiran datang dan pergi, biarkan saja—tidak perlu dilawan atau diikuti.<br>
        Diam hari ini adalah tempat aman untuk beristirahat sejenak.
      `
    },
    {
      title: "Hari 3 — Membaca Ringan",
      activity: "Membaca reflektif",
      guide: `
        Pilih bacaan pendek yang terasa menenangkan bagi hati.<br>
        Baca dengan pelan, tanpa target untuk selesai atau memahami semuanya.<br>
        Boleh berhenti kapan saja saat tubuh atau pikiran merasa cukup.<br>
        Hari ini, membaca bukan untuk menambah beban, tetapi menemani keheningan.
      `
    },
    {
      title: "Hari 4 — Melepaskan Beban",
      activity: "Menuliskan yang mengganggu pikiran",
      guide: `
        Tuliskan apa saja yang memenuhi kepala atau terasa memberatkan akhir-akhir ini.<br>
        Tidak perlu mencari solusi atau jawaban.<br>
        Cukup biarkan semuanya keluar dari pikiran ke atas kertas.<br>
        Hari ini, Anda tidak diminta menyelesaikan apa pun—hanya meletakkannya sebentar.
      `
    },
    {
      title: "Hari 5 — Menyederhanakan",
      activity: "Menentukan satu fokus",
      guide: `
        Pilih satu hal yang paling penting atau paling mungkin Anda lakukan hari ini.<br>
        Tidak harus besar, cukup satu langkah kecil yang terasa realistis.<br>
        Izinkan hal-hal lain untuk menunggu tanpa rasa bersalah.<br>
        Hari ini, kesederhanaan adalah bentuk kebaikan bagi diri sendiri.
      `
    }
  ],

  Fisik: [
    {
      title: "Hari 1 — Tidur Lebih Sadar",
      activity: "Menyiapkan tidur",
      guide: `
        Menjelang tidur, cobalah mematikan layar sekitar 30 menit lebih awal.<br>
        Berbaringlah dengan nyaman, lalu tarik napas perlahan sebanyak lima kali.<br>
        Tidak perlu memaksa cepat tidur—cukup izinkan tubuh mengetahui bahwa waktunya beristirahat.
      `
    },
    {
      title: "Hari 2 — Peregangan Lembut",
      activity: "Stretching ringan",
      guide: `
        Lakukan gerakan sederhana dengan ritme pelan, mengikuti kemampuan tubuh hari ini.<br>
        Tidak perlu jauh atau sempurna.<br>
        Jika ada bagian yang terasa tidak nyaman, berhentilah dan beri tubuh waktu.
      `
    },
    {
      title: "Hari 3 — Jalan Santai",
      activity: "Jalan tanpa target",
      guide: `
        Berjalanlah selama 10–20 menit dengan langkah yang paling nyaman bagi Anda.<br>
        Tidak ada tujuan khusus—cukup rasakan langkah kaki dan irama napas.<br>
        Hari ini, berjalan adalah cara tubuh diajak bernapas kembali.
      `
    },
    {
      title: "Hari 4 — Mendengarkan Tubuh",
      activity: "Istirahat aktif",
      guide: `
        Ambil waktu untuk duduk atau berbaring dengan sadar.<br>
        Perhatikan bagian tubuh yang terasa lelah atau tegang.<br>
        Tidak perlu diubah atau diperbaiki—cukup disadari dengan lembut.
      `
    },
    {
      title: "Hari 5 — Merawat Tubuh",
      activity: "Self-care sederhana",
      guide: `
        Pilih satu hal sederhana yang menenangkan tubuh, seperti minum air hangat, mandi hangat, atau pijat ringan.<br>
        Lakukan perlahan, dengan perhatian penuh pada sensasi yang muncul.<br>
        Hari ini, merawat tubuh adalah bentuk penghargaan atas semua yang telah dijalaninya.
      `
    }
  ],

  Sensorik: [
    {
      title: "Hari 1 — Puasa Layar Singkat",
      activity: "Bebas layar",
      guide: `
        Luangkan waktu 30–60 menit tanpa gadget apa pun.<br>
        Tidak perlu melakukan hal yang produktif atau berguna.<br>
        Cukup beri mata dan pikiran kesempatan untuk beristirahat sejenak.
      `
    },
    {
      title: "Hari 2 — Keheningan",
      activity: "Duduk dalam sunyi",
      guide: `
        Ambil posisi duduk yang paling nyaman.<br>
        Tidak perlu musik atau suara tambahan.<br>
        Dengarkan saja suara-suara kecil di sekitar Anda, apa adanya.
      `
    },
    {
      title: "Hari 3 — Cahaya & Ruang",
      activity: "Menata pencahayaan",
      guide: `
        Redupkan lampu di ruang tempat Anda beristirahat.<br>
        Jika memungkinkan, bukalah jendela untuk memberi ruang bagi udara dan cahaya alami.<br>
        Biarkan suasana yang lebih tenang membantu tubuh melepas ketegangan.
      `
    },
    {
      title: "Hari 4 — Suara yang Menenangkan",
      activity: "Mendengar suara alam / instrumental",
      guide: `
        Pilih suara yang lembut dan atur volumenya pelan.<br>
        Nikmati tanpa sambil mengerjakan hal lain.<br>
        Izinkan suara tersebut menemani Anda kembali ke ritme yang lebih tenang.
      `
    },
    {
      title: "Hari 5 — Ruang Aman",
      activity: "Merapikan sudut kecil",
      guide: `
        Pilih satu sudut kecil yang sering Anda gunakan.<br>
        Rapikan secukupnya hingga terasa lebih nyaman.<br>
        Tidak perlu rapi sempurna—yang penting ruang itu terasa aman dan menenangkan.
      `
    }
  ],

  Spiritual: [
    {
      title: "Hari 1 — Hadir dengan Diri",
      activity: "Refleksi singkat",
      guide: `
        Luangkan waktu sebentar untuk bertanya dengan jujur pada diri sendiri:<br>
        “Apa yang sedang aku rasakan hari ini?”<br>
        Tidak perlu jawaban yang baik atau rapi.<br>
        Cukup sadari apa yang ada, tanpa menghakimi.
      `
    },
    {
      title: "Hari 2 — Keheningan yang Menenangkan",
      activity: "Diam / hening",
      guide: `
        Ambil waktu 5–10 menit untuk berhenti dan diam.<br>
        Boleh sambil bernapas pelan, atau hanya duduk tenang.<br>
        Hari ini, diam bukan kekosongan—melainkan ruang untuk bernapas.
      `
    },
    {
      title: "Hari 3 — Doa yang Sederhana",
      activity: "Doa atau refleksi pribadi",
      guide: `
        Berdoalah dengan kata-kata yang paling sederhana, atau tanpa kata sama sekali.<br>
        Anda tidak perlu merangkai kalimat indah.<br>
        Kehadiran Anda apa adanya sudah cukup.
      `
    },
    {
      title: "Hari 4 — Menata Arah",
      activity: "Refleksi makna",
      guide: `
        Luangkan waktu singkat untuk merenung:<br>
        apa yang memberi arti dalam hidup Anda akhir-akhir ini?<br>
        Tidak perlu jawaban besar—cukup satu hal kecil yang terasa nyata.
      `
    },
    {
      title: "Hari 5 — Syukur Kecil",
      activity: "Menyebutkan tiga hal sederhana",
      guide: `
        Pikirkan tiga hal kecil yang terasa baik hari ini.<br>
        Tidak harus istimewa atau mengesankan.<br>
        Rasakan sejenak kehangatannya, tanpa perlu menjelaskannya pada siapa pun.
      `
    }
  ],

  Relasi: [
    {
      title: "Hari 1 — Mengakui Kelelahan",
      activity: "Refleksi singkat",
      guide: `
        Luangkan sejenak untuk menyadari bagaimana perasaan Anda dalam relasi-relasi hari ini.<br>
        Tidak perlu menyalahkan siapa pun, termasuk diri sendiri.<br>
        Cukup akui: “Oh, ternyata aku lelah.”
      `
    },
    {
      title: "Hari 2 — Percakapan Aman",
      activity: "Berbicara dengan orang tepercaya",
      guide: `
        Pilih satu orang yang membuat Anda merasa aman untuk berbagi.<br>
        Anda tidak perlu mencari solusi atau memberi penjelasan panjang.<br>
        Hari ini, cukup izinkan diri Anda untuk didengar.
      `
    },
    {
      title: "Hari 3 — Jeda dari Relasi yang Menguras",
      activity: "Memberi jarak sementara",
      guide: `
        Jika memungkinkan, ambil jarak sejenak dari interaksi yang terasa melelahkan.<br>
        Ini bukan menjauh selamanya, hanya memberi ruang bernapas bagi diri sendiri.
      `
    },
    {
      title: "Hari 4 — Bersama Tanpa Peran",
      activity: "Hadir bersama orang lain",
      guide: `
        Habiskan waktu bersama orang atau komunitas tanpa harus berkontribusi apa pun.<br>
        Tidak perlu menghibur, membantu, atau menjadi apa-apa.<br>
        Cukup hadir sebagai diri sendiri.
      `
    },
    {
      title: "Hari 5 — Merasa Ditemani",
      activity: "Menyadari relasi yang menguatkan",
      guide: `
        Ingat kembali satu relasi yang membuat Anda merasa lebih ringan.<br>
        Rasakan rasa aman atau hangat yang muncul.<br>
        Hari ini, biarkan diri Anda ditemani.
      `
    }
  ],

  Ekspresif: [
    {
      title: "Hari 1 — Ekspresi Bebas",
      activity: "Menulis / menggambar bebas",
      guide: `
        Luangkan waktu untuk mengekspresikan apa pun yang ingin keluar dari dalam diri Anda.<br>
        Tidak ada yang menilai, dan tidak perlu terlihat bagus.<br>
        Hari ini, ekspresi adalah ruang aman—bukan sesuatu yang harus sempurna.
      `
    },
    {
      title: "Hari 2 — Musik & Suara",
      activity: "Mendengar atau bernyanyi pelan",
      guide: `
        Pilih lagu yang terasa menenangkan bagi hati.<br>
        Dengarkan atau nyanyikan dengan pelan, tanpa tujuan untuk tampil atau menghasilkan sesuatu.<br>
        Biarkan suara menemani Anda kembali pada ritme yang lebih lembut.
      `
    },
    {
      title: "Hari 3 — Aktivitas Tangan",
      activity: "Memasak / merapikan / berkebun",
      guide: `
        Lakukan satu aktivitas sederhana dengan gerakan yang pelan.<br>
        Rasakan setiap prosesnya—sentuhan, aroma, dan irama gerak.<br>
        Hari ini, tangan membantu hati untuk beristirahat.
      `
    },
    {
      title: "Hari 4 — Menikmati Keindahan",
      activity: "Melihat sesuatu yang indah",
      guide: `
        Luangkan waktu untuk memperhatikan keindahan kecil di sekitar Anda—alam, foto, atau benda sederhana.<br>
        Berhentilah sejenak dan biarkan diri menikmati tanpa perlu menganalisis.<br>
        Keindahan tidak perlu dijelaskan untuk dirasakan.
      `
    },
    {
      title: "Hari 5 — Merayakan Kehidupan",
      activity: "Melakukan hal kecil yang disukai",
      guide: `
        Pilih sesuatu yang memberi rasa hangat atau ringan bagi Anda.<br>
        Lakukan tanpa rasa bersalah dan tanpa target apa pun.<br>
        Hari ini, menikmati hidup adalah bagian dari pemulihan.
      `
    }
  ]
};
