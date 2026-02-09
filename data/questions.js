/* ======================================================
QUESTIONS DATA – RESTORE 40+
Urutan jawaban:
3 = Ya
2 = Terkadang
1 = Tidak
====================================================== */

const questions = [

/* ======================
A. LELAH FISIK
====================== */
{
  id: 1,
  text: "Pilihan antara tidur atau mengerjakan satu tugas lagi, saya lebih memilih tidur.",
  category: "Fisik"
},
{
  id: 2,
  text: "Badan seringkali capek, tapi sulit bisa langsung tidur nyenyak.",
  category: "Fisik"
},
{
  id: 3,
  text: "Jam tidur saya sering kurang dari yang ideal.",
  category: "Fisik"
},

/* ======================
B. LELAH PIKIRAN (MENTAL)
====================== */
{
  id: 4,
  text: "Masalah kecil seringkali membuat gampang emosi.",
  category: "Mental"
},
{
  id: 5,
  text: "Saya lebih sering membayangkan hidup ideal daripada menghadapi kenyataan hidup yang ada.",
  category: "Mental"
},
{
  id: 6,
  text: "Waktunya tidur, tapi pikiran masih jalan terus.",
  category: "Mental"
},

/* ======================
C. LELAH EMOSIONAL
====================== */
{
  id: 7,
  text: "Lebih sering mengingat kegagalan daripada keberhasilan.",
  category: "Emosional"
},
{
  id: 8,
  text: "Memikirkan arah hidup membuat hati berat.",
  category: "Emosional"
},
{
  id: 9,
  text: "Saya cenderung melihat sisi berat kehidupan.",
  category: "Emosional"
},

/* ======================
D. LELAH SPIRITUAL
====================== */
{
  id: 10,
  text: "Saya merasa harus tampil baik-baik saja di depan orang.",
  category: "Spiritual"
},
{
  id: 11,
  text: "Saya lebih memilih menghindari acara kebersamaan.",
  category: "Spiritual"
},
{
  id: 12,
  text: "Jika sedang memerlukan bantuan, saya bingung harus hubungi siapa.",
  category: "Spiritual"
},

/* ======================
E. LELAH SENSORIK
====================== */
{
  id: 13,
  text: "Suara berisik membuat saya tidak nyaman.",
  category: "Sensorik"
},
{
  id: 14,
  text: "Saya menatap layar monitor secara rutin setiap hari.",
  category: "Sensorik"
},
{
  id: 15,
  text: "Saya kurang peka dengan bau di sekitar.",
  category: "Sensorik"
},
{
  id: 16,
  text: "Saya lebih memilih makanan instan atau minuman manis.",
  category: "Sensorik"
},
{
  id: 17,
  text: "Sentuhan fisik membuat saya tidak nyaman.",
  category: "Sensorik"
},

/* ======================
F. LELAH SOSIAL / RELASI
====================== */
{
  id: 18,
  text: "Saya lebih mendahulukan orang lain daripada kepentingan saya sendiri.",
  category: "Relasi"
},
{
  id: 19,
  text: "Ketika menyediakan waktu untuk diri sendiri, saya sering merasa bersalah.",
  category: "Relasi"
},
{
  id: 20,
  text: "Saya merasa usaha yang saya lakukan sering kurang dihargai orang lain.",
  category: "Relasi"
},

/* ======================
G. LELAH EKSPRESIF
====================== */
{
  id: 21,
  text: "Mendapatkan ide baru sulit menurut saya.",
  category: "Ekspresif"
},
{
  id: 22,
  text: "Saya tidak merasa kreatif.",
  category: "Ekspresif"
},
{
  id: 23,
  text: "Saya sedang membutuhkan semangat dan inspirasi.",
  category: "Ekspresif"
}

];

/* ======================================================
OPTIONS (GLOBAL)
Dipakai saat render pertanyaan
====================================================== */
const answerOptions = [
  { label: "Ya", value: 3 },
  { label: "Terkadang", value: 2 },
  { label: "Tidak", value: 1 }
];
