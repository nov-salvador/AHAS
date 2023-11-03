let lastTime = 0;
let speed = 5;
let step= 0;


//Audio
const titleMenuAudio = new Audio();
titleMenuAudio.src = "./assets/sounds/title-menu-sound.mp3"

function titleTime(presentTime){
  window.requestAnimationFrame(titleTime)
  const seconds = (presentTime - lastTime) / 1000;
  if (seconds < 1 / speed){
    return
  }
  lastTime = presentTime
  if (step === 21){
    const startMenu = document.querySelector('.start-menu')
    startMenu.style.display = 'flex'
    return 
  }
  moveSnakeMenu()
  console.log(step)
  step++;
}

window.requestAnimationFrame(titleTime)


function siteLoaded(){
  // titleMenuAudio.muted()
  titleMenuAudio.play();
  console.log('play')
}

const menuSnakeHead = document.querySelector('.snake-head');
const letterA = document.querySelector('.letter-A');
const letterH = document.querySelector('.letter-H');
const letterA2 = document.querySelector('.letter-A2');
const letterS = document.querySelector('.letter-S');
// let menuSnakeBody= [menuSnakeHead]
let path = [
  {x: 4, y: 1},
  {x: 3, y: 1},
  {x: 2, y: 1},
  {x: 1, y: 1},
  {x: 1, y: 2},
  {x: 1, y: 3},
  {x: 1, y: 4},
  {x: 2, y: 4},
  {x: 3, y: 4},
  {x: 4, y: 4},
  {x: 4, y: 3},
  {x: 3, y: 3},
  {x: 2, y: 3},
  {x: 2, y: 2},
  {x: 3, y: 2},
  {x: 4, y: 2},
  {x: 4, y: 1},
  {x: 3, y: 1},
  {x: 2, y: 1},
  {x: 1, y: 1},
]

function moveSnakeHead(){
  if (step != 20){
    menuSnakeHead.style.gridColumnStart = path[step].x;
    menuSnakeHead.style.gridRowStart = path[step].y;
  }
  else{
    menuSnakeHead.style.display = 'none'
  }
}
function moveLetterA(){
  if(step === 3){
    letterA.style.display = 'none'
  }
  for(let i = 4; i < 21; i++){
    if(step === i){
      letterA.style.display = 'flex'
      letterA.style.gridColumnStart = path[i - 1].x
      letterA.style.gridRowStart = path[i - 1].y;
    }
  }
}
function moveLetterH(){
  if(step === 5){
    letterH.style.display = 'none'
  }
  for(let i = 7; i < 21; i++){
    if(step === i){
      letterH.style.display = 'flex'
      letterH.style.gridColumnStart = path[i - 2].x
      letterH.style.gridRowStart = path[i - 2].y;
    }
  }
}
function moveLetterA2(){
  if(step === 9){
    letterA2.style.display = 'none'
  }
  for(let i = 12; i < 21; i++){
    if(step === i){
      letterA2.style.display = 'flex'
      letterA2.style.gridColumnStart = path[i - 3].x
      letterA2.style.gridRowStart = path[i - 3].y;
    }
  }
}
function moveLetterS(){
  if(step === 14){
    letterS.style.display = 'none'
  }
  for(let i = 18; i < 21; i++){
    if(step === i){
      letterS.style.display = 'flex'
      letterS.style.gridColumnStart = path[i - 4].x
      letterS.style.gridRowStart = path[i - 4].y;
    }
  }
}
function moveSnakeMenu(){
  moveSnakeHead()
  moveLetterA()
  moveLetterH()
  moveLetterA2()
  moveLetterS()
}
