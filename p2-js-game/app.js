let lastRenderTime = 0;
let gameOver = false;
let snakeSpeed = 2;

//Audio
import { cobraAudio, normalAudio } from "./instruction.js";
const gameOverAudio = document.getElementById('game-over-sound')
const foodEatenAudio = document.getElementById('food-eaten-sound')
foodEatenAudio.volume = .5;
gameOverAudio.volume = .5;

export function timeline(currentTime) {
  requestAnimationFrame(timeline)
  if (gameOver) {
    gameOverPop.style.display = 'block'
    gameOverAudio.play()
    cobraAudio.pause()
    normalAudio.pause()
    return
  }
  const renderInSeconds = (currentTime - lastRenderTime) / 1000;
  if (renderInSeconds < 1 / snakeSpeed) {
    return
  }
  lastRenderTime = currentTime


  mainPhase()
  phase()
  console.log('snake')
}


const restartGame = document.querySelector('.restart-game')
const gameScreen = document.querySelector('.game-screen')

restartGame.addEventListener('click', stopper)
function stopper() {
  snakeBody = [
    { x: 11, y: 11 }
  ]
  snakeHead = snakeBody[0]
  direction = { x: 0, y: 0 };
  scoreValue = 0;
  score.innerHTML = `${scoreValue}`
  snakeSpeed = 2;
  gameOver = false
  gameOverPop.style.display = 'none'
  timeline()
  if (cobraMode === true) {
    cobraAudio.play()
  }
  else {
    normalAudio.play()
  }
  console.log('asdf')
}






//main functions
function mainPhase() {
  snakeMovement();
  foodEaten();
  death();
}

function phase() {
  gameScreen.innerHTML = '';
  snake(gameScreen);
  food(gameScreen);
}

//SNAKE
//SNAKE.for body
let snakeBody = [
  { x: 11, y: 11 }
]

function snake(gameScreen) {
  addSnakePart();
  snakeBody.forEach(part => {
    const snakePart = document.createElement('div')
    snakePart.style.gridRowStart = part.y
    snakePart.style.gridColumnStart = part.x
    snakePart.classList.add('snake');
    gameScreen.appendChild(snakePart);
  })
}

//SNAKE.for moving the snake
let direction = { x: 0, y: 0 }
let lastDirection = { x: 0, y: 0 }
window.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      if (lastDirection.y !== 0) {
        break
      }
      direction = { x: 0, y: -1 }
      break
    case 'ArrowDown':
      if (lastDirection.y !== 0) {
        break
      }
      direction = { x: 0, y: 1 }
      break
    case 'ArrowRight':
      if (lastDirection.x !== 0) {
        break
      }
      direction = { x: 1, y: 0 }
      break
    case 'ArrowLeft':
      if (lastDirection.x !== 0) {
        break
      }
      direction = { x: -1, y: 0 }
      break
  }
})
function snakeMovement() {
  const inputDirection = forInputDirection()
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }
  }
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}
function forInputDirection() {
  lastDirection = direction
  return direction
}

//FOOD
//FOOD.for making the food
let newFoodPos;
function randomingFoodPosition() {
  while (newFoodPos == null || headOnFood(newFoodPos)) {
    newFoodPos = generateRandomPosition()
  }
  return newFoodPos
}
function generateRandomPosition() {
  return {
    x: Math.floor(Math.random() * 21) + 1,
    y: Math.floor(Math.random() * 21) + 1
  }
}
let foodPos = randomingFoodPosition()
function food(gameScreen) {
  snakeBody.forEach(part => {
    const foodPart = document.createElement('div')
    foodPart.style.gridRowStart = foodPos.y
    foodPart.style.gridColumnStart = foodPos.x
    foodPart.classList.add('food');
    gameScreen.appendChild(foodPart);
  })
}

//FOOD.if the food is eaten
let cobraMode = false
let growth = 1;
let additionalBody = 0;
function foodEaten() {
  if (cobraMode === true) {
    if (headOnFood(foodPos)) {
      randomFactor()
      snakeGrowth(growth)
      foodPos = randomingFoodPosition()
      addScore()
      snakeSpeed += .4;
      showQuote()
      foodEatenAudio.play()
    }
  }
  if (cobraMode === false) {
    if (headOnFood(foodPos)) {
      snakeGrowth(growth)
      foodPos = randomingFoodPosition()
      addScore()
      snakeSpeed += .4;
      showQuote()
      foodEatenAudio.play()
    }
  }
}

function headOnFood(position, { ignoreHead = false } = {}) {
  return snakeBody.some((part, index) => {
    if (ignoreHead && index === 0) {
      return false
    }
    return samePosition(part, position)
  })
}
function samePosition(pos1, pos2) {
  return (pos1.x === pos2.x && pos1.y === pos2.y)
}
function snakeGrowth(amount) {
  additionalBody += amount
}
function addSnakePart() {
  for (let i = 0; i < additionalBody; i++) {
    snakeBody.push({ ...snakeBody.length - 1 })
  }
  additionalBody = 0;
}


//Check for wall and body
let snakeHead = snakeBody[0]
function death() {
  gameOver = hitWall(snakeHead) || hitBody()
}
function hitWall(position) {
  return (
    position.x < 1 || position.x > 21 || position.y < 1 || position.y > 21
  )
}
function hitBody() {
  return headOnFood(snakeHead, { ignoreHead: true })
}

//Score

const score = document.querySelector('.score')
let scoreValue = 0;
function addScore() {
  scoreValue++;
  score.innerHTML = `${scoreValue}`
}

//Cobra mode
import { btnOffGameAudio, btnPlayGameAudio } from "./instruction.js";
export function cobra() {
  cobraMode = true
  window.requestAnimationFrame(timeline)
  btnPlayGameAudio.addEventListener('click', playGameCobraAudio)
  btnOffGameAudio.addEventListener('click', offGameCobraAudio)
}

function playGameCobraAudio() {
  cobraAudio.pause()
  normalAudio.pause()
  btnPlayGameAudio.style.display = 'none'
  btnOffGameAudio.style.display = 'block'
}
function offGameCobraAudio() {
  cobraAudio.play()
  normalAudio.pause()
  btnOffGameAudio.style.display = 'none'
  btnPlayGameAudio.style.display = 'block'
}


let factor = 0;
function getFactor() {
  return factor = Math.floor(Math.random() * 6)
}
export function randomFactor() {
  getFactor()
  console.log(factor)
  console.log(snakeSpeed)
  if (factor === 1) {
    if (snakeSpeed >= 3) {
      snakeSpeed -= 2
    }
  }
  if (factor === 2) {
    snakeSpeed += 4
  }
  if (factor === 3) {
    console.log(snakeBody.length)
    if (snakeBody.length > 4) {
      console.log(growth)
      console.log(additionalBody)
      for (let i = 0; i < 3; i++) {
        snakeBody.pop();
      }
    }
    console.log(snakeBody.length)
  }
  if (factor === 4) {
    return (growth = 4)
  }
  if (factor === 5) {
    return (growth = 3)
  }
}


// Game over 
const gameOverPop = document.querySelector('.game-over-pop')

//Quotes
import { popDialog } from "./instruction.js";
const dialog1 = 'Ang bilis talaga ng panahon. Parang dati tao lang siya, pero ngayon, AHAS na!'
const dialog2 = 'Huwag matakot sa AHAS ng kagubatan, matakot ka sa AHAS na kaibigan. Anong tamis ng ngiti sa iyong harapan pero sinisiraan ka pala sa talikuran.'
const dialog3 = 'Hindi lahat ng ahas nasa gubat, minsan, nasa tabi mo lang!'
const dialog4 = 'Kapag ba ang ahas sumuko na, ang tawag ba dun SAWA-na?'
const dialog5 = 'Ang sorry ay para sa mga bagay na hindi sinasadya at hindi para sa mga bagay na paulit-ulit ginagawa.'
const dialog6 = 'Ang LOVE ay parang pananim yan kahit anong gawin mo may mga PESTE at SALOT pa ring sisira.'
const dialog7 = 'Ang hirap pala talaga magmahal ng taong manhid, pero teka manhid ba talaga siya o iba lang talaga mahal nya.'
const dialog8 = 'Hindi lahat ng patama tungkol sayo sadyang natatamaan ka lang kasi feel mo.'
const dialog9 = 'Yung madali namang iwasan yung taong gusto mo pero mahirap lang talaga iwasan yung nararamdaman mo.'
const dialog10 = 'Dapat ba akong ngumiti dahil magkaibigan tayo? O dapat ba akong malungkot dahil hanggang magkaibigan lang tayo?'
let whichQuote = 0;
function generateNumber() {
  return whichQuote = Math.floor(Math.random() * 10)
}
function showQuote() {
  generateNumber()
  if (whichQuote === 0) {
    popDialog.innerHTML = dialog1
  }
  if (whichQuote === 1) {
    popDialog.innerHTML = dialog2
  }
  if (whichQuote === 2) {
    popDialog.innerHTML = dialog3
  }
  if (whichQuote === 3) {
    popDialog.innerHTML = dialog4
  }
  if (whichQuote === 4) {
    popDialog.innerHTML = dialog5
  }
  if (whichQuote === 5) {
    popDialog.innerHTML = dialog6
  }
  if (whichQuote === 6) {
    popDialog.innerHTML = dialog7
  }
  if (whichQuote === 7) {
    popDialog.innerHTML = dialog8
  }
  if (whichQuote === 8) {
    popDialog.innerHTML = dialog9
  }
  if (whichQuote === 9) {
    popDialog.innerHTML = dialog10
  }
}

