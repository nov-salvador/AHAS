import { timeline, cobra} from "./app.js"

const instruction = document.querySelector('.H-T-P-instruction')
const gameMode = document.querySelector('.game-mode')
const openInstruction = document.querySelector('.btn-how-to-play')
const closeInstruction = document.querySelector('.close-instruction')
const openGameMode = document.querySelector('.btn-start-game')
const closeGameMode = document.querySelector('.close-game-mode')
const btnNormalMode = document.querySelector('.btn-normal-mode')
const btnCobraMode = document.querySelector('.btn-cobra-mode')
const titleMenu = document.querySelector('.title-menu')
const gameBlock = document.querySelector('.game-block')
const returnHome = document.querySelector('.return-home')
const restartHome = document.querySelector('.restart-home')
const scoreContainer = document.querySelector('.score-container')
const fullscreen = document.querySelector('.fullscreen')

export const popDialog = document.querySelector('.pop-dialog')
const btnPlayTitleAudio = document.getElementById('play-audio')
const btnOffTitleAudio = document.getElementById('off-audio')
export const btnPlayGameAudio = document.getElementById('play-game-audio')
export const btnOffGameAudio = document.getElementById('off-game-audio')


openInstruction.addEventListener('click', () => {
  instruction.showModal();
  instructionAudio.play();
  titleMenuAudio.pause()
})
closeInstruction.addEventListener('click', () => {
  instruction.close();
  instructionAudio.pause();
  titleMenuAudio.play()
  offAudio()
})

openGameMode.addEventListener('click', () => {
  gameMode.showModal();
  gameModeAudio.play()
  titleMenuAudio.pause()
})
closeGameMode.addEventListener('click', () => {
  gameMode.close();
  gameModeAudio.pause()
  titleMenuAudio.play()
  offAudio()
})

btnNormalMode.addEventListener('click', () => {
  gameMode.close();
  titleMenu.style.display = 'none'
  setTimeout(() => {
    gameBlock.style.display = 'flex'
    restartHome.style.display = 'flex'
    scoreContainer.style.display = 'flex'
    fullscreen.style.display = 'block'
  }, 800)
  popDialog.style.display = 'block'
  normalClickAudio.play()
  gameModeAudio.pause()
  setTimeout(() => {
    normalAudio.play()
    requestAnimationFrame(timeline)
  }, 1500) 
})

returnHome.addEventListener('click', () => {
  window.location = './'
})

btnCobraMode.addEventListener('click', () => {
  gameMode.close();
  titleMenu.style.display = 'none'
  setInterval(() => {
    gameBlock.style.display = 'flex'
    restartHome.style.display = 'flex'
    scoreContainer.style.display = 'flex'
    fullscreen.style.display = 'block'
  }, 800)
  popDialog.style.display = 'block'
  gameModeAudio.pause()
  cobraClickAudio.play()
  setTimeout(() => {
    cobra()
    cobraAudio.play()
  }, 1000)
})


         //Audio
const titleMenuAudio = document.getElementById('title-menu-sound')
const instructionAudio = document.getElementById('instruction-sound')
const gameModeAudio = document.getElementById('game-mode-sound')
const normalClickAudio = document.getElementById('normal-click-sound')
export const normalAudio = document.getElementById('normal-sound')
export const cobraAudio = document.getElementById('cobra-sound')
const cobraClickAudio = document.getElementById('cobra-click-sound')
titleMenuAudio.volume = .5;
instructionAudio.volume = .4;
gameModeAudio.volume = .4;
normalAudio.volume = .2;
cobraAudio.volume = .1;

btnPlayTitleAudio.addEventListener('click', playAudio)
btnOffTitleAudio.addEventListener('click', offAudio)

function playAudio(){
  titleMenuAudio.pause()
  btnPlayTitleAudio.style.display = 'none'
  btnOffTitleAudio.style.display = 'block'
}
function offAudio(){
  titleMenuAudio.play()
  btnOffTitleAudio.style.display = 'none'
  btnPlayTitleAudio.style.display = 'block'
}

btnPlayGameAudio.addEventListener('click', playGameAudio)
btnOffGameAudio.addEventListener('click', offGameAudio)

function playGameAudio(){
  normalAudio.pause()
  btnPlayGameAudio.style.display = 'none'
  btnOffGameAudio.style.display = 'block'
}
function offGameAudio(){
  normalAudio.play()
  btnOffGameAudio.style.display = 'none'
  btnPlayGameAudio.style.display = 'block'
}