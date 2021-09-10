const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const endgameElement = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('modes');



const words = [
  'frame', 'lovely', 'tension', 'utopia', 'dagger', 'mandatory', 'trinity', 'tendon', 'academic', 'greece',
 'monopoly', 'capitalism', 'furious', 'dangerous', 'predator', 'clavicle', 'shield', 'factory', 'grind',
 'crush', 'revival', 'shady', 'infinite', 'encore', 'murdered', 'human', 'petrified', 'berserk', 'jewel',
 'flour', 'flower', 'anonymous', 'anomalus', 'congenital', 'dignity', 'personal', 'conflict', 'worthy', 'core',
 'fantasy', 'fantastic', 'forward', 'wayward', 'absolute', 'remarks', 'drift', 'guilty', 'innocent', 'gem',
 'cruise', 'crash', 'autonomy', 'winter', 'magical', 'experience', 'life', 'happy', 'chronic', 
 'storm', 'crowd', 'swamp', 'respect', 'credit', 'understand', 'earthquake','telepathy', 'communication', 'slippery',
 'dependent', 'silver', 'superficial', 'mandatory', 'inferior', 'hormone', 'photosynthesis', 'synthetic', 'feeble', 'drift',
 'tide', 'steer', 'north', 'sigh', 'hallucination', 'imagination', 'reality', 'modern', 'hypocrisy', 'heist', 
 'mitochondria', 'mitigation', 'irrigation', 'mitosis', 'trenches', 'treacherous', 'disaster', 'novice', 'freedom', 'civilization',
 'population', 'greatness', 'dodge', 'complication', 'rejoice', 'congress'
];



let randomWord;


let score = 0;


let time = 10;


// Set difficulty to value in local storage or medium mode
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';


// Set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';


// Focus on text on start
text.focus();


// Start count down
const timeInterval = setInterval(updateTime, 1000);


function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

function updateScore() {
  score++;
  scoreElement.innerHTML = score;
}

function updateTime() {
  time--;
  timeElement.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

function gameOver() {
  endgameElement.innerHTML = `
    <h1>Game Over</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play Again</button>
  `;

  endgameElement.style.display = 'flex';
}

addWordToDOM();



// Event listeners

// Input Typing
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 1;
    } else if (difficulty === 'medium') {
      time += 2;
    } else {
      time += 3;
    }

    updateTime();
  }
});

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('show'));

// Settings select
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});

