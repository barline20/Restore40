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
      🌿 Tubuh Anda tampaknya telah bekerja cukup lama tanpa banyak jeda.
      Mungkin bukan karena aktivitas berat, tapi karena terus berjalan
      tanpa benar-benar berhenti. Wajar jika tubuh kini meminta perhatian lebih.
      <br><br>
      <strong>Nggak apa-apa, yuk mulai dari sini:</strong>,
      Kita pelankan ritme sedikit saja.
      Ambil jeda singkat di sela hari, dan dengarkan tubuh tanpa memaksanya terus kuat.
    `,
    Mental: `
      🕊️ Pikiran Anda terlihat terus aktif, bahkan saat tubuh ingin berhenti.
      Bahkan saat diam, kepala masih penuh dengan banyak hal.
      Ini bukan tanda lemah—ini tanda lelah.
      <br><br>
      <strong>Nggak apa-apa, yuk mulai dari sini:</strong>,
      Hari ini, tidak semua hal harus dipikirkan.
      Sebagian boleh ditaruh dulu, dan itu tidak apa-apa.
    `,
    Emosional: `
      💛 Ada perasaan yang mungkin selama ini Anda simpan sendiri.
      Bukan karena tidak mau berbagi, tapi karena sudah terbiasa menahan.
      Hati juga bisa capek.
      <br><br>
      <strong>Nggak apa-apa, yuk mulai dari sini:</strong>,
      Perhatikan dulu apa yang sedang Anda rasakan.
      Tidak perlu diubah atau dijelaskan—cukup diakui.
    `,
    Sensorik: `
      🌱 Indra Anda mungkin sudah terlalu lama sibuk.
      Layar, suara, dan aktivitas terus-menerus bisa membuat tubuh sulit benar-benar tenang.
      <br><br>
      <strong>Nggak apa-apa, yuk mulai dari sini:</strong>,
      Kita beri mata dan telinga sedikit jeda.
      Matikan layar sebentar dan cari suasana yang lebih lembut.
    `,
    Relasi: `
      🤍 Anda banyak hadir untuk orang lain.
      Kadang tanpa sadar, diri sendiri jadi belakangan.
      <br><br>
      <strong>Nggak apa-apa, yuk mulai dari sini:</strong>,
      Dekatlah dengan orang yang membuat Anda merasa aman.
      Tidak perlu memberi apa-apa—cukup hadir sebagai diri sendiri.
    `,
    Kreatif: `
      ✨ Bagian diri Anda yang menikmati hal-hal sederhana masih ada.
      Mungkin tertutup oleh kesibukan, bukan hilang.
      <br><br>
      <strong>Nggak apa-apa, yuk mulai dari sini:</strong>,
      Lakukan satu hal kecil yang Anda suka hari ini.
      Tanpa target, tanpa harus berguna.
    `,
    Spiritual: `
      🕯️ Anda mungkin sedang rindu berhenti sejenak.
      Bukan untuk menyerah, tapi untuk kembali mengingat apa yang memberi makna.
      Perjalanan yang panjang wajar membuat hati ingin diam.
      <br><br>
      <strong>Nggak apa-apa, yuk mulai dari sini:</strong>,
      Luangkan waktu hening yang singkat.
      Boleh dalam doa sederhana, refleksi, atau diam saja—apa adanya sudah cukup.
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
   DAY 1–5 (PROGRAM ISTIRAHAT FISIK)
====================================================== */

const dayContentFisik = {
  1: {
    title: "Day 1 · Tidur Lebih Sadar 🌙",
    intro: "Hari ini kita membantu tubuh mengenali bahwa ia aman untuk beristirahat.",
     prompts: [
      "Menjelang tidur, hal apa yang biasanya masih Anda bawa dalam pikiran?",
      "Bagaimana rasanya ketika Anda memberi diri izin untuk berhenti hari ini?",
      "Apa satu hal kecil yang membuat tubuh terasa sedikit lebih tenang malam ini?"
    ],
    guidance: [
      "Menjelang tidur, cobalah mematikan layar sekitar 30 menit lebih awal.",
      "Berbaringlah dengan nyaman, lalu tarik napas perlahan sebanyak lima kali.",
      "Tidak perlu memaksa cepat tidur—cukup izinkan tubuh tahu bahwa waktunya beristirahat."
    ]
  },
  2: {
    title: "Day 2 · Peregangan Lembut 🌿",
    intro: "Hari ini kita bergerak pelan, mengikuti kemampuan tubuh apa adanya.",
    prompts: [
      "Bagian tubuh mana yang terasa paling membutuhkan perhatian hari ini?",
      "Apa yang Anda rasakan saat bergerak lebih pelan dari biasanya?",
      "Bagaimana rasanya berhenti sebelum tubuh benar-benar lelah?"
    ],
    guidance: [
      "Lakukan gerakan sederhana dengan ritme pelan.",
      "Tidak perlu jauh atau sempurna—cukup mengikuti kemampuan tubuh hari ini.",
      "Jika ada bagian yang terasa tidak nyaman, berhentilah dan beri tubuh waktu."
    ]
  },
  3: {
    title: "Hari 3 · Jalan Santai 🚶‍♀️",
    intro: "Hari ini kita mengajak tubuh bernapas lewat langkah yang ringan.",
    prompts: [
      "Bagaimana rasanya berjalan tanpa tujuan hari ini?",
      "Apa yang Anda sadari dari napas atau langkah kaki Anda?",
      "Apa perbedaan berjalan santai dibandingkan berjalan terburu-buru?"
    ],
    guidance: [
      "Berjalanlah selama 10–20 menit dengan langkah yang paling nyaman.",
      "Tidak ada tujuan khusus—cukup rasakan langkah kaki dan irama napas.",
      "Hari ini, berjalan adalah cara tubuh diajak bernapas kembali."
    ]
  },
  4: {
    title: "Hari 4 · Mendengarkan Tubuh 🤍",
    intro: "Hari ini kita berhenti sejenak untuk benar-benar mendengar tubuh.",
    prompts: [
      "Bagian tubuh mana yang terasa lelah atau tegang hari ini?",
      "Apa yang tubuh Anda minta saat ini—bergerak atau diam?",
      "Bagaimana rasanya hanya menyadari, tanpa harus memperbaiki?"
    ],
    guidance: [
      "Ambil waktu untuk duduk atau berbaring dengan sadar.",
      "Perhatikan bagian tubuh yang terasa lelah atau tegang.",
      "Tidak perlu diubah atau diperbaiki—cukup disadari dengan lembut."
    ]
  },
 5: {
    title: "Hari 5 · Merawat Tubuh 🌼",
    intro: "Hari ini kita merawat tubuh sebagai bentuk penghargaan.",
    prompts: [
      "Bentuk perawatan apa yang paling menenangkan tubuh Anda?",
      "Bagaimana rasanya menerima perawatan tanpa rasa bersalah?",
      "Apa yang ingin Anda ucapkan pada tubuh Anda hari ini?"
    ],
    guidance: [
      "Pilih satu hal sederhana yang menenangkan tubuh, seperti minum air hangat, mandi hangat, atau pijat ringan.",
      "Lakukan perlahan, dengan perhatian penuh pada sensasi yang muncul.",
      "Hari ini, merawat tubuh adalah bentuk penghargaan atas semua yang telah dijalaninya."
    ]
  }
};
/* ======================================================
   DAY 1–5 (PROGRAM ISTIRAHAT MENTAL)
====================================================== */

const dayContentMental = {
  1: {
    title: "Hari 1 · Mengosongkan Kepala 🕊️",
    intro: "Luangkan waktu sejenak. Jika memungkinkan, tulislah di sebuah kertas. Tidak perlu rapi atau panjang—ini hanya untuk menemani Anda hari ini.",
    prompts: [
      "Apa saja yang ingin keluar dari kepala Anda hari ini?",
      "Hal apa yang paling sering muncul di pikiran akhir-akhir ini?",
      "Bagaimana rasanya setelah menuliskannya?"
    ],
    guidance: [
      "Luangkan sekitar 10 menit untuk menulis apa pun yang ingin keluar dari kepala Anda.",
      "Tidak perlu rapi, tidak perlu masuk akal, dan tidak perlu disimpan.",
      "Jika di tengah jalan Anda ingin berhenti, itu juga tidak apa-apa.",
      "Hari ini, menulis hanyalah cara untuk memberi ruang bernapas bagi pikiran."
    ]
  },

  2: {
    title: "Hari 2 · Diam yang Aman 🌿",
    intro: "Hari ini kita berhenti sejenak, tanpa tuntutan apa pun.",
    prompts: [
      "Bagaimana rasanya duduk diam hari ini?",
      "Pikiran apa yang datang dan pergi?",
      "Apa yang tubuh Anda rasakan saat diam?"
    ],
    guidance: [
      "Carilah posisi duduk yang paling nyaman bagi tubuh Anda.",
      "Luangkan 5–10 menit untuk hanya hadir, sambil menarik dan menghembuskan napas secara perlahan.",
      "Bila pikiran datang dan pergi, biarkan saja—tidak perlu dilawan atau diikuti.",
      "Diam hari ini adalah tempat aman untuk beristirahat sejenak."
    ]
  },

  3: {
    title: "Hari 3 · Membaca Ringan 📖",
    intro: "Hari ini kita menemani pikiran dengan bacaan yang menenangkan.",
    prompts: [
      "Bagian mana dari bacaan yang terasa menenangkan?",
      "Bagaimana rasanya membaca tanpa target?",
      "Apa yang Anda rasakan setelah berhenti membaca?"
    ],
    guidance: [
      "Pilih bacaan pendek yang terasa menenangkan bagi hati.",
      "Baca dengan pelan, tanpa target untuk selesai atau memahami semuanya.",
      "Boleh berhenti kapan saja saat tubuh atau pikiran merasa cukup.",
      "Hari ini, membaca bukan untuk menambah beban, tetapi menemani keheningan."
    ]
  },

  4: {
    title: "Hari 4 · Melepaskan Beban 🤍",
    intro: "Hari ini Anda tidak diminta menyelesaikan apa pun.",
    prompts: [
      "Hal apa yang akhir-akhir ini terasa memberatkan pikiran?",
      "Bagaimana rasanya menuliskannya tanpa mencari solusi?",
      "Apa yang terasa berbeda setelah menuliskannya?"
    ],
    guidance: [
      "Tuliskan apa saja yang memenuhi kepala atau terasa memberatkan akhir-akhir ini.",
      "Tidak perlu mencari solusi atau jawaban.",
      "Cukup biarkan semuanya keluar dari pikiran ke atas kertas.",
      "Hari ini, Anda tidak diminta menyelesaikan apa pun—hanya meletakkannya sebentar."
    ]
  },

  5: {
    title: "Hari 5 · Menyederhanakan 🌱",
    intro: "Hari ini kita memilih untuk tidak membawa semuanya sekaligus.",
    prompts: [
      "Apa satu hal yang paling realistis Anda lakukan hari ini?",
      "Apa yang bisa Anda izinkan untuk menunggu?",
      "Bagaimana rasanya memilih satu fokus saja?"
    ],
    guidance: [
      "Pilih satu hal yang paling penting atau paling mungkin Anda lakukan hari ini.",
      "Tidak harus besar, cukup satu langkah kecil yang terasa realistis.",
      "Izinkan hal-hal lain untuk menunggu tanpa rasa bersalah.",
      "Hari ini, kesederhanaan adalah bentuk kebaikan bagi diri sendiri."
    ]
  }
};
/* ======================================================
   DAY 1–5 (PROGRAM ISTIRAHAT SENSORIK)
====================================================== */

const dayContentSensory = {
  1: {
    title: "Hari 1 · Puasa Layar Singkat 🌱",
    intro: "Luangkan waktu sejenak. Jika memungkinkan, tulislah di sebuah kertas. Tidak perlu rapi atau panjang—ini hanya untuk menemani Anda hari ini.",
    prompts: [
      "Bagaimana rasanya memberi mata jeda hari ini?",
      "Apa yang Anda sadari setelah menjauh dari layar?",
      "Bagian mana dari diri Anda yang terasa lebih tenang?"
    ],
    guidance: [
      "Luangkan waktu 30–60 menit tanpa gadget apa pun.",
      "Tidak perlu melakukan hal yang produktif atau berguna.",
      "Cukup beri mata dan pikiran kesempatan untuk beristirahat sejenak."
    ]
  },

  2: {
    title: "Hari 2 · Keheningan 🤍",
    intro: "Hari ini kita memberi ruang bagi keheningan yang sederhana.",
    prompts: [
      "Suara apa saja yang Anda dengar saat diam?",
      "Bagaimana tubuh Anda merespons keheningan?",
      "Apa perbedaan suasana sebelum dan sesudah diam?"
    ],
    guidance: [
      "Ambil posisi duduk yang paling nyaman.",
      "Tidak perlu musik atau suara tambahan.",
      "Dengarkan saja suara-suara kecil di sekitar Anda, apa adanya."
    ]
  },

  3: {
    title: "Hari 3 · Cahaya & Ruang 🌤️",
    intro: "Hari ini kita menata suasana agar indra lebih tenang.",
    prompts: [
      "Bagaimana perubahan cahaya memengaruhi perasaan Anda?",
      "Apa yang Anda rasakan saat ruang terasa lebih lapang?",
      "Bagian tubuh mana yang terasa lebih rileks?"
    ],
    guidance: [
      "Redupkan lampu di ruang tempat Anda beristirahat.",
      "Jika memungkinkan, bukalah jendela untuk memberi ruang bagi udara dan cahaya alami.",
      "Biarkan suasana yang lebih tenang membantu tubuh melepas ketegangan."
    ]
  },

  4: {
    title: "Hari 4 · Suara yang Menenangkan 🎵",
    intro: "Hari ini kita menemani indra dengan suara yang lembut.",
    prompts: [
      "Suara apa yang paling menenangkan bagi Anda?",
      "Bagaimana napas Anda saat mendengarkan suara tersebut?",
      "Apa yang terasa berubah setelahnya?"
    ],
    guidance: [
      "Pilih suara alam atau musik instrumental yang lembut.",
      "Atur volumenya pelan.",
      "Nikmati tanpa sambil mengerjakan hal lain."
    ]
  },

  5: {
    title: "Hari 5 · Ruang Aman 🏡",
    intro: "Hari ini kita menciptakan satu sudut kecil yang terasa aman.",
    prompts: [
      "Sudut mana yang paling sering Anda gunakan?",
      "Bagaimana perasaan Anda setelah merapikannya?",
      "Apa arti rasa nyaman bagi Anda hari ini?"
    ],
    guidance: [
      "Pilih satu sudut kecil yang sering Anda gunakan.",
      "Rapikan secukupnya hingga terasa lebih nyaman.",
      "Tidak perlu rapi sempurna—yang penting ruang itu terasa aman dan menenangkan."
    ]
  }
};
/* ======================================================
   DAY 1–5 (PROGRAM ISTIRAHAT SPIRITUAL)
====================================================== */

const dayContentSpiritual = {
  1: {
    title: "Hari 1 · Hadir dengan Diri 🌿",
    intro: "Luangkan waktu sejenak. Jika memungkinkan, tulislah di sebuah kertas. Tidak perlu rapi atau panjang—ini hanya untuk menemani Anda hari ini.",
    prompts: [
      "Apa yang sedang Anda rasakan hari ini?",
      "Bagaimana kondisi hati Anda saat ini?",
      "Apa yang paling ingin Anda akui hari ini?"
    ],
    guidance: [
      "Luangkan waktu sebentar untuk bertanya dengan jujur pada diri sendiri, “Apa yang sedang aku rasakan hari ini?”",
      "Tidak perlu jawaban yang baik atau rapi.",
      "Cukup sadari apa yang ada, tanpa menghakimi."
    ]
  },

  2: {
    title: "Hari 2 · Keheningan yang Menenangkan 🌿",
    intro: "Hari ini Anda tidak perlu melakukan apa pun—cukup berhenti sejenak.",
    prompts: [
      "Bagaimana rasanya saat Anda berhenti dan diam?",
      "Apa yang Anda sadari dari napas Anda?",
      "Apa yang terasa berbeda setelah keheningan?"
    ],
    guidance: [
      "Ambil waktu 5–10 menit untuk berhenti dan diam.",
      "Boleh sambil bernapas pelan, atau hanya duduk tenang.",
      "Hari ini, diam bukan kekosongan—melainkan ruang untuk bernapas."
    ]
  },

  3: {
    title: "Hari 3 · Doa yang Sederhana 🌿",
    intro: "Hari ini, Anda boleh datang apa adanya.",
    prompts: [
      "Hal apa yang ingin Anda sampaikan hari ini?",
      "Bagaimana rasanya hadir tanpa kata-kata?",
      "Apa yang Anda rasakan setelah waktu doa atau hening?"
    ],
    guidance: [
      "Berdoalah dengan kata-kata yang paling sederhana, atau tanpa kata sama sekali.",
      "Anda tidak perlu merangkai kalimat indah.",
      "Kehadiran Anda apa adanya sudah cukup."
    ]
  },

  4: {
    title: "Hari 4 · Menata Arah 🌿",
    intro: "Hari ini kita berhenti sejenak untuk menata kembali arah.",
    prompts: [
      "Apa yang memberi arti dalam hidup Anda akhir-akhir ini?",
      "Hal kecil apa yang terasa bermakna?",
      "Ke mana hati Anda ingin melangkah?"
    ],
    guidance: [
      "Luangkan waktu singkat untuk merenung: apa yang memberi arti dalam hidup Anda akhir-akhir ini?",
      "Tidak perlu jawaban besar.",
      "Cukup satu hal kecil yang terasa nyata."
    ]
  },

  5: {
    title: "Hari 5 · Syukur Kecil 🌿",
    intro: "Hari ini kita menutup dengan hal-hal sederhana.",
    prompts: [
      "Hal kecil apa yang terasa baik hari ini?",
      "Apa yang membuat hati sedikit lebih hangat?",
      "Bagaimana rasanya menyadari hal-hal kecil itu?"
    ],
    guidance: [
      "Pikirkan tiga hal kecil yang terasa baik hari ini.",
      "Tidak harus istimewa atau mengesankan.",
      "Rasakan sejenak kehangatannya, tanpa perlu menjelaskannya pada siapa pun."
    ]
  }
};
/* ======================================================
   DAY 1–5 (PROGRAM ISTIRAHAT RELASI)
====================================================== */

const dayContentRelational = {
  1: {
    title: "Hari 1 · Mengakui Kelelahan 🌿",
    intro: "Luangkan waktu sejenak. Jika memungkinkan, tulislah di sebuah kertas. Tidak perlu rapi atau panjang—ini hanya untuk menemani Anda hari ini.",
    prompts: [
      "Bagaimana perasaan Anda dalam relasi-relasi hari ini?",
      "Relasi mana yang paling menguras energi Anda akhir-akhir ini?",
      "Apa yang Anda rasakan saat mengakui kelelahan itu?"
    ],
    guidance: [
      "Luangkan sejenak untuk menyadari bagaimana perasaan Anda dalam relasi-relasi hari ini.",
      "Tidak perlu menyalahkan siapa pun, termasuk diri sendiri.",
      "Cukup akui: “Oh, ternyata aku lelah.”"
    ]
  },

  2: {
    title: "Hari 2 · Percakapan Aman 🌿",
    intro: "Hari ini, Anda tidak perlu mencari solusi—cukup memberi ruang untuk didengar.",
    prompts: [
      "Siapa satu orang yang terasa aman untuk Anda?",
      "Bagaimana rasanya berbicara tanpa harus menjelaskan semuanya?",
      "Apa yang Anda rasakan setelah didengar?"
    ],
    guidance: [
      "Pilih satu orang yang membuat Anda merasa aman untuk berbagi.",
      "Anda tidak perlu mencari solusi atau memberi penjelasan panjang.",
      "Hari ini, cukup izinkan diri Anda untuk didengar."
    ]
  },

  3: {
    title: "Hari 3 · Jeda dari Relasi yang Menguras 🌿",
    intro: "Hari ini, menjaga diri adalah bentuk perhatian, bukan penolakan.",
    prompts: [
      "Interaksi apa yang terasa paling melelahkan akhir-akhir ini?",
      "Bagaimana rasanya membayangkan jeda sejenak?",
      "Apa yang tubuh atau hati Anda butuhkan hari ini?"
    ],
    guidance: [
      "Jika memungkinkan, ambil jarak sejenak dari interaksi yang terasa melelahkan.",
      "Ini bukan menjauh selamanya.",
      "Hanya memberi ruang bernapas bagi diri sendiri."
    ]
  },

  4: {
    title: "Hari 4 · Bersama Tanpa Peran 🌿",
    intro: "Hari ini, Anda boleh hadir tanpa menjadi apa-apa.",
    prompts: [
      "Bagaimana rasanya hadir tanpa peran atau tanggung jawab?",
      "Apa yang berubah saat Anda tidak perlu memberi?",
      "Bagian mana dari diri Anda yang terasa lebih ringan?"
    ],
    guidance: [
      "Habiskan waktu bersama orang atau komunitas tanpa harus berkontribusi apa pun.",
      "Tidak perlu menghibur, membantu, atau menjadi apa-apa.",
      "Cukup hadir sebagai diri sendiri."
    ]
  },

  5: {
    title: "Hari 5 · Merasa Ditemani 🌿",
    intro: "Hari ini, Anda tidak perlu berjalan sendirian.",
    prompts: [
      "Relasi mana yang membuat Anda merasa lebih ringan?",
      "Apa yang Anda rasakan saat mengingat relasi itu?",
      "Bagaimana rasanya menerima kehadiran orang lain?"
    ],
    guidance: [
      "Ingat kembali satu relasi yang membuat Anda merasa lebih ringan.",
      "Rasakan rasa aman atau hangat yang muncul.",
      "Hari ini, biarkan diri Anda ditemani."
    ]
  }
};
/* ======================================================
   DAY 1–5 (PROGRAM ISTIRAHAT EKSPRESIF)
====================================================== */

const dayContentExpressive = {
  1: {
    title: "Hari 1 · Ekspresi Bebas 🌿",
    intro: "Luangkan waktu sejenak. Jika memungkinkan, tulislah di sebuah kertas atau siapkan media sederhana. Tidak perlu rapi atau panjang—ini hanya untuk menemani Anda hari ini.",
    prompts: [
      "Apa yang ingin keluar dari dalam diri Anda hari ini?",
      "Bagaimana rasanya mengekspresikan tanpa dinilai?",
      "Apa yang Anda rasakan setelah memberi ruang pada ekspresi?"
    ],
    guidance: [
      "Luangkan waktu untuk mengekspresikan apa pun yang ingin keluar dari dalam diri Anda.",
      "Tidak ada yang menilai, dan tidak perlu terlihat bagus.",
      "Hari ini, ekspresi adalah ruang aman—bukan sesuatu yang harus sempurna."
    ]
  },

  2: {
    title: "Hari 2 · Musik & Suara 🎶",
    intro: "Hari ini, suara menemani Anda kembali ke ritme yang lebih lembut.",
    prompts: [
      "Lagu atau suara apa yang terasa menenangkan bagi Anda?",
      "Bagaimana perasaan Anda saat mendengarkan atau bernyanyi pelan?",
      "Apa yang berubah setelah Anda memberi ruang pada suara?"
    ],
    guidance: [
      "Pilih lagu yang terasa menenangkan bagi hati.",
      "Dengarkan atau nyanyikan dengan pelan, tanpa tujuan untuk tampil atau menghasilkan sesuatu.",
      "Biarkan suara menemani Anda kembali pada ritme yang lebih lembut."
    ]
  },

  3: {
    title: "Hari 3 · Aktivitas Tangan 🤲",
    intro: "Hari ini, tangan membantu hati untuk beristirahat.",
    prompts: [
      "Aktivitas tangan apa yang Anda pilih hari ini?",
      "Sensasi apa yang paling Anda sadari selama melakukannya?",
      "Bagaimana perasaan Anda setelah bergerak pelan?"
    ],
    guidance: [
      "Lakukan satu aktivitas sederhana seperti memasak, merapikan, atau berkebun.",
      "Lakukan dengan gerakan yang pelan.",
      "Rasakan setiap prosesnya—sentuhan, aroma, dan irama gerak."
    ]
  },

  4: {
    title: "Hari 4 · Menikmati Keindahan 🌸",
    intro: "Hari ini, Anda diajak berhenti sejenak untuk menikmati yang indah.",
    prompts: [
      "Keindahan kecil apa yang Anda perhatikan hari ini?",
      "Bagaimana rasanya menikmati tanpa menganalisis?",
      "Apa yang Anda rasakan setelah berhenti sejenak?"
    ],
    guidance: [
      "Luangkan waktu untuk memperhatikan keindahan kecil di sekitar Anda—alam, foto, atau benda sederhana.",
      "Berhentilah sejenak dan biarkan diri menikmati tanpa perlu menganalisis.",
      "Keindahan tidak perlu dijelaskan untuk dirasakan."
    ]
  },

  5: {
    title: "Hari 5 · Merayakan Kehidupan ✨",
    intro: "Hari ini, menikmati hidup adalah bagian dari pemulihan.",
    prompts: [
      "Hal kecil apa yang memberi rasa hangat atau ringan hari ini?",
      "Bagaimana rasanya melakukannya tanpa target?",
      "Apa yang ingin Anda syukuri dari hari ini?"
    ],
    guidance: [
      "Pilih sesuatu yang memberi rasa hangat atau ringan bagi Anda.",
      "Lakukan tanpa rasa bersalah dan tanpa target apa pun.",
      "Hari ini, menikmati hidup adalah bagian dari pemulihan."
    ]
  }
};


function openDay(day) {
  if (day !== currentDay) return;

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

  document.querySelectorAll(".day")[currentDay - 1]?.classList.remove("locked");

  if (currentDay > 5) {
    renderPackages();
    goTo("final");
  } else {
    openDay(currentDay);
  }
}
<button onclick="nextDay()">Lanjutkan</button>
/* ======================================================
   PAKET – KONSISTEN LELAH
====================================================== */

function renderPackages() {
  const map = {
    Mental: "Tenang",
    Emosional: "Tenang",
    Sensorik: "Tenang",
    Sosial: "Bertumbuh",
    Spiritual: "Bertumbuh",
    Fisik: "Menyeluruh",
    Ekspresif: "Menyeluruh"
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
    Tenang: ["Fokus Kelelahan Mental, Emosional, Sensorik", "Rp199.000", "Rp299.000"],
    Bertumbuh: ["Fokus Kelelahan Sosial & Spiritual", "Rp349.000", "Rp499.000"],
    Menyeluruh: ["Pendampingan seluruh Kelelahan", "Rp599.000", "Rp799.000"]
  };

  return `
    <div class="package ${name === recommended ? "recommended" : ""}">
      <h3>${name === recommended ? "⭐ " : ""}Paket ${name}</h3>
      <p>${data[name][0]}</p>
      <p><del>${data[name][2]}</del> · <strong>${data[name][1]}</strong></p>
    </div>
  `;
}
