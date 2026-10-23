let runs = 0;
let wickets = 0;
let legalBalls = 0;
let currentOverBalls = [];
let target = null;

function updateDisplay() {
  document.getElementById("runs").textContent = runs;
  document.getElementById("wickets").textContent = wickets;
  
  const oversCompleted = Math.floor(legalBalls / 6);
  const ballsInCurrentOver = legalBalls % 6;
  document.getElementById("overs").textContent = `${oversCompleted}.${ballsInCurrentOver}`;
  document.getElementById("balls").textContent = legalBalls;

  const totalOversFraction = legalBalls / 6;
  const crr = totalOversFraction > 0 ? (runs / totalOversFraction).toFixed(2) : "0.00";
  document.getElementById("crr").textContent = crr;

  const thisOverContainer = document.getElementById("thisOverDisplay");
  if (currentOverBalls.length === 0) {
    thisOverContainer.textContent = "No balls bowled yet";
  } else {
    thisOverContainer.innerHTML = currentOverBalls.map(item => {
      let extraClass = "";
      if (item === "4") extraClass = "four";
      if (item === "6") extraClass = "six";
      if (item === "W") extraClass = "wicket";
      return `<span class="ball-tag ${extraClass}">${item}</span>`;
    }).join("");
  }
}

function addRuns(r) {
  if (wickets >= 10) {
    alert("Innings Over! All out.");
    return;
  }
  runs += r;
  legalBalls += 1;
  currentOverBalls.push(r.toString());

  if (legalBalls % 6 === 0) {
    currentOverBalls = [];
  }
  updateDisplay();
  checkTarget();
}

function addExtra(type) {
  if (wickets >= 10) return;
  runs += 1;
  if (type === "wide") {
    currentOverBalls.push("Wd");
  } else {
    currentOverBalls.push("Nb");
  }
  updateDisplay();
  checkTarget();
}

function takeWicket() {
  if (wickets >= 10) {
    alert("All wickets fallen!");
    return;
  }
  wickets += 1;
  legalBalls += 1;
  currentOverBalls.push("W");

  if (legalBalls % 6 === 0) {
    currentOverBalls = [];
  }
  updateDisplay();
}

function setTarget() {
  const inputVal = parseInt(document.getElementById("targetInput").value);
  if (!isNaN(inputVal) && inputVal > 0) {
    target = inputVal;
    document.getElementById("targetDisplay").textContent = target;
  }
}

function checkTarget() {
  if (target && runs >= target) {
    alert("Target Achieved! Team Won!");
  }
}

function resetMatch() {
  runs = 0;
  wickets = 0;
  legalBalls = 0;
  currentOverBalls = [];
  target = null;
  document.getElementById("targetDisplay").textContent = "Not Set";
  document.getElementById("targetInput").value = "";
  updateDisplay();
}
