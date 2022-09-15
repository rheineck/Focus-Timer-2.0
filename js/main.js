import Sound from "./sound.js"

const buttonPlay = document.querySelector('.play')
const buttonPause = document.querySelector('.pause')
const buttonStop = document.querySelector('.stop')
const buttonSet = document.querySelector('.set')
const buttonUp = document.querySelector('.up')
const buttonDown = document.querySelector('.down')
const forest = document.querySelector('.forest')
const rain = document.querySelector('.rain')
const cafeteria = document.querySelector('.cafeteria')
const fire = document.querySelector('.fire')
const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')
const buttonDark = document.querySelector('.dark')
const buttonLight = document.querySelector('.light')
const theme = document.querySelector('.theme-dark')
const sound = Sound()

let forestVolume = document.querySelector('.volume')
let rainVolume = document.querySelector('.volume')
let cafeteriaVolume = document.querySelector('.volume')
let fireVolume = document.querySelector('.volume')
let timerTimeOut
let minutes = Number(minutesDisplay.textContent)

function getMinutes() {
    let newMinutes = prompt('Quantos minutos?')
    if(!newMinutes) {
        return false
    }

    return newMinutes
}

function updateDisplay(newMinutes, seconds) {
    newMinutes = newMinutes === undefined ? minutes : newMinutes
    seconds = seconds == undefined ? 0: seconds
    minutesDisplay.textContent = String(newMinutes).padStart(2, "0")
    secondsDisplay.textContent = String(seconds).padStart(2, "0")
}

function reset() {
    updateDisplay(minutes, 0)
    clearTimeout(timerTimeOut)
}

function countdown(){
        
    timerTimeOut = setTimeout(function() {
        let seconds = Number(secondsDisplay.textContent)
        let minutes = Number(minutesDisplay.textContent)
        let isFinished = minutes <= 0 && seconds <=0

        updateDisplay(minutes, 0)

        if(isFinished) {
            reset()
            updateDisplay()
            sound.timeEnd()
            buttonPlay.classList.remove('hide')
            buttonPause.classList.add('hide')
            buttonStop.classList.add('hide')
            buttonSet.classList.remove('hide')
            return
        }

        if(seconds <= 0) {
            seconds = 60
            --minutes
        }

        updateDisplay(minutes, String(seconds - 1))
        
        countdown()

    }, 1000)
}

function updateMinutes(newMinutes) {
    minutes = newMinutes
}

function hold() {
    clearTimeout(timerTimeOut)
}

buttonPlay.addEventListener('click', function(){
    buttonPlay.classList.add('hide')
    buttonPause.classList.remove('hide')
    buttonStop.classList.remove('hide')
    buttonSet.classList.add('hide')
    countdown()
    sound.pressButton()
})

buttonPause.addEventListener('click', function (){
    buttonPlay.classList.remove('hide')
    buttonPause.classList.add('hide')
    hold()
    sound.pressButton()
})

buttonStop.addEventListener('click', function() {
    buttonPlay.classList.remove('hide')
    buttonPause.classList.add('hide')
    buttonStop.classList.add('hide')
    buttonSet.classList.remove('hide')
    reset()
    sound.pressButton()
})

buttonSet.addEventListener('click', function(){
    let newMinutes = getMinutes()
    if(!newMinutes) {
        reset()
        return
    }

    updateDisplay(newMinutes, 0)
    updateMinutes(newMinutes)
    sound.pressButton()
})

buttonDown.addEventListener('click', function() {
    if(minutes > 0) {
        updateMinutes(minutes - 5)
        updateDisplay(minutes)
    }
})

buttonUp.addEventListener('click', function() {
    updateMinutes(minutes + 5)
    updateDisplay(minutes)
})

buttonLight.addEventListener('click', function() {
    buttonLight.classList.add('hide')
    buttonDark.classList.remove('hide')
    theme.classList.remove('theme-light')
    theme.classList.add('theme-dark')
})

buttonDark.addEventListener('click', function() {
    buttonDark.classList.add('hide')
    buttonLight.classList.remove('hide')
    theme.classList.add('theme-light')
    theme.classList.remove('theme-dark')
})

forest.addEventListener('click', function() {
    forest.classList.toggle('on')
    rain.classList.remove('on')
    cafeteria.classList.remove('on')
    fire.classList.remove('on')
    sound.playAudio(forest, sound.musics.forest)
    sound.playAudio(rain, sound.musics.rain)
    sound.playAudio(cafeteria, sound.musics.cafeteria)
    sound.playAudio(fire, sound.musics.fire)
})

forestVolume.addEventListener('change', function() {
    let volumeForest = forestVolume.value
    sound.musics.forest.volume = volumeForest 
})

rain.addEventListener('click', function() {
    forest.classList.remove('on')
    rain.classList.toggle('on')
    cafeteria.classList.remove('on')
    fire.classList.remove('on')
    sound.playAudio(forest, sound.musics.forest)
    sound.playAudio(rain, sound.musics.rain)
    sound.playAudio(cafeteria, sound.musics.cafeteria)
    sound.playAudio(fire, sound.musics.fire)
})

rainVolume.addEventListener('change', function() {
    let volumeRain = rainVolume.value
    sound.musics.rain.volume = volumeRain 
})

cafeteria.addEventListener('click', function() {
    forest.classList.remove('on')
    rain.classList.remove('on')
    cafeteria.classList.toggle('on')
    fire.classList.remove('on')
    sound.playAudio(forest, sound.musics.forest)
    sound.playAudio(rain, sound.musics.rain)
    sound.playAudio(cafeteria, sound.musics.cafeteria)
    sound.playAudio(fire, sound.musics.fire)
})

cafeteriaVolume.addEventListener('change', function() {
    let volumeCafeteria = cafeteriaVolume.value
    sound.musics.cafeteria.volume = volumeCafeteria 
})

fire.addEventListener('click', function() {
    forest.classList.remove('on')
    rain.classList.remove('on')
    cafeteria.classList.remove('on')
    fire.classList.toggle('on')
    sound.playAudio(forest, sound.musics.forest)
    sound.playAudio(rain, sound.musics.rain)
    sound.playAudio(cafeteria, sound.musics.cafeteria)
    sound.playAudio(fire, sound.musics.fire)
})

fireVolume.addEventListener('change', function() {
    let volumeFire = fireVolume.value
    sound.musics.fire.volume = volumeFire
})