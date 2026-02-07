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

/* =========*
