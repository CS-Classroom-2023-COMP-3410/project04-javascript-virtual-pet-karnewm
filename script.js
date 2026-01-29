
let petState = JSON.parse(localStorage.getItem("petState")) || {
  hunger: 50,
  energy: 50,
  happiness: 50,
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
  applyColor(energyStatus, 100 - petState.energy); // tiredness = low energy
  applyColor(happinessStatus, 100 - petState.happiness);

  let mood = "Neutral";

  if (petState.happiness > 70) {
    mood = "Happy";
  } else if (petState.hunger > 70) {
    mood = "Hungry";
  } else if (petState.energy < 30) {
    mood = "Sleepy";
  } else {
    mood = "Neutral";
  }

  moodStatus.textContent = mood;
  petImage.textContent = catArt[mood.toLowerCase()];

  localStorage.setItem("petState", JSON.stringify(petState));
}

function applyColor(element, value) {
  element.classList.remove("status-high", "status-low");

  if (value > 70) {
    element.classList.add("status-high"); // red
  } else if (value < 30) {
    element.classList.add("status-low"); // yellow
  }
}

document.getElementById("feed-btn").addEventListener("click", () => {
  petState.hunger = Math.max(0, petState.hunger - 20);
  petState.happiness = Math.min(100, petState.happiness + 5);
  animatePet();
  updateUI();
});

document.getElementById("play-btn").addEventListener("click", () => {
  petState.happiness = Math.min(100, petState.happiness + 20);
  petState.energy = Math.max(0, petState.energy - 10);
  animatePet();
  updateUI();
});

document.getElementById("sleep-btn").addEventListener("click", () => {
  petState.energy = Math.min(100, petState.energy + 30);
  petState.hunger = Math.min(100, petState.hunger + 10);
  updateUI();
});


setInterval(() => {
  petState.hunger = Math.min(100, petState.hunger + 2);
  petState.energy = Math.max(0, petState.energy - 1);
  petState.happiness = Math.max(0, petState.happiness - 1);
  updateUI();
}, 3000);


function animatePet() {
  petImage.classList.add("shake");
  setTimeout(() => petImage.classList.remove("shake"), 400);
}


updateUI();