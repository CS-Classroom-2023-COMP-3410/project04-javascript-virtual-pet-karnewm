let petState = JSON.parse(localStorage.getItem("petState")) || {
  hunger: 50,
  energy: 50,
  happiness: 50
};

const petImage = document.getElementById("pet-image");
const hungerStatus = document.getElementById("hunger-status");
const energyStatus = document.getElementById("energy-status");
const happinessStatus = document.getElementById("happiness-status");
const moodStatus = document.getElementById("mood-status");

const catArt = {
  happy: `
 /\\_/\\
( ^.^ )
 > ^ <
`,
  hungry: `
 /\\_/\\
( -.- )
(  =  )
`,
  sleepy: `
 /\\_/\\
( -_ - )
 z   z
`,
  neutral: `
 /\\_/\\
( o.o )
 > ^ <
`
};

function updateUI() {
  hungerStatus.textContent = petState.hunger;
  energyStatus.textContent = petState.energy;
  happinessStatus.textContent = petState.happiness;

  applyColor(hungerStatus, petState.hunger);
  applyColor(energyStatus, 100 - petState.energy);
  applyColor(happinessStatus, 100 - petState.happiness);

  let mood = "neutral";

  if (petState.hunger > 70) mood = "hungry";
  else if (petState.energy < 70) mood = "sleepy";
  else if (petState.happiness < 70) mood = "neutral";
  if (petState.happiness > 70) mood = "happy";

  moodStatus.textContent = mood.charAt(0).toUpperCase() + mood.slice(1);
  petImage.textContent = catArt[mood];

  localStorage.setItem("petState", JSON.stringify(petState));
}

function applyColor(element, value) {
  element.classList.remove("status-high", "status-low");
  if (value > 70) element.classList.add("status-high");
  else if (value < 30) element.classList.add("status-low");
}

document.getElementById("feed-btn").addEventListener("click", () => {
  petState.hunger = Math.max(0, petState.hunger - 25);
  petState.happiness = Math.min(100, petState.happiness + 10);
  animatePet();
  updateUI();
});

document.getElementById("play-btn").addEventListener("click", () => {
  petState.happiness = Math.min(100, petState.happiness + 25);
  petState.energy = Math.max(0, petState.energy - 20);
  animatePet();
  updateUI();
});

document.getElementById("sleep-btn").addEventListener("click", () => {
  petState.energy = Math.min(100, petState.energy + 40);
  petState.hunger = Math.min(100, petState.hunger + 15);
  updateUI();
});

setInterval(() => {
  petState.hunger = Math.min(100, petState.hunger + 5);
  petState.energy = Math.max(0, petState.energy - 3);
  petState.happiness = Math.max(0, petState.happiness - 3);
  updateUI();
}, 1000);

function animatePet() {
  petImage.classList.add("shake");
  setTimeout(() => petImage.classList.remove("shake"), 400);
}

updateUI();