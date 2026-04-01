// ===== STATE =====

let showPinyin = false;
let showGloss = false;

let sets = {};
let currentSetName = null;
let currentCards = [];
let activeCount = 0;
let currentIndex = 0;


// ===== INITIALIZATION =====

function groupBySet() {
  cards.forEach(c => {
    if (!sets[c.set]) sets[c.set] = [];
    sets[c.set].push(c);
  });
}

function populateSets() {
  const select = document.getElementById("setSelect");

  Object.keys(sets).forEach((setName, i) => {
    const opt = document.createElement("option");
    opt.value = setName;
    opt.textContent = setName;
    select.appendChild(opt);

    if (i === 0) currentSetName = setName;
  });
}

function initSet(name) {
  currentSetName = name;
  currentCards = [...sets[name]];
  activeCount = currentCards.length;
  currentIndex = 0;
}


// ===== CARD LOGIC =====

function rand(n) {
  return Math.floor(Math.random() * n);
}

function render() {
  const card = currentCards[currentIndex];

  document.getElementById("card").textContent = card.hanzi;
  document.getElementById("pinyin").value = showPinyin ? card.pinyin : "";
  document.getElementById("gloss").value = showGloss ? card.gloss : "";
}

function nextCard() {
  if (activeCount <= 1) return;

  let i;
  do {
    i = rand(activeCount);
  } while (i === currentIndex);

  currentIndex = i;
  render();
}

function forgetCard() {
  if (activeCount <= 1) return;

  const last = activeCount - 1;

  [currentCards[currentIndex], currentCards[last]] =
    [currentCards[last], currentCards[currentIndex]];

  activeCount--;

  nextCard();
}


// ===== UI BINDINGS =====

function bindUI() {
  document.getElementById("nextBtn").onclick = nextCard;
  document.getElementById("forgetBtn").onclick = forgetCard;
  document.getElementById("resetBtn").onclick = () => {
    initSet(currentSetName);
    render();
  };

  document.getElementById("pinyinBtn").onclick = () => {
    showPinyin = !showPinyin;
    render();
  };

  document.getElementById("glossBtn").onclick = () => {
    showGloss = !showGloss;
    render();
  };

  document.getElementById("setSelect").onchange = e => {
    initSet(e.target.value);
    render();
  };
}


// ===== Handles deck dropdown =====

function loadCards(data) {
  cards = data;
  sets = {};

  groupBySet();
  populateSets();
  initSet(currentSetName);
  render();
}


// ===== STARTUP =====

function start() {
  groupBySet();
  populateSets();
  initSet(currentSetName);
  bindUI();
  render();
}

document.addEventListener("DOMContentLoaded", start);