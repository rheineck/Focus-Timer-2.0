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

function playAudio(forest) {
    sound.forest.loop = true
    let isOn = forest.classList.contains('on')
    console.log(isOn)
    console.log(forest.classList)
    isOn === false ? sound.forest.play() : sound.forest.pause()
}
// console.log(forest.classList)
forest.addEventListener('click', function() {
    forest.classList.add('on')  
    forest.classList.remove('off')
    // let isOn = forest.classList.contains('on')
    rain.classList.remove('on')
    rain.classList.add('off')
    cafeteria.classList.remove('on')
    cafeteria.classList.add('off')
    fire.classList.remove('on')
    fire.classList.add('off')
    sound.pressButton()
    playAudio(sound.forest)
    // sound.forest.play()
    // sound.rain.pause()
    // sound.cafeteria.pause()
    // sound.fire.pause()
})

forest.addEventListener('click',function() {
    forest.classList.add('off')
    forest.classList.remove('on')
    sound.forest.pause()
})

rain.addEventListener('click', function() {
    forest.classList.remove('on')
    forest.classList.add('off')
    rain.classList.add('on')
    rain.classList.remove('off')
    cafeteria.classList.remove('on')
    cafeteria.classList.add('off')
    fire.classList.remove('on')
    fire.classList.add('off')
    sound.rain.play()
    sound.cafeteria.pause()
    sound.fire.pause()
    sound.forest.pause()
})

cafeteria.addEventListener('click', function() {
    forest.classList.remove('on')
    forest.classList.add('off')
    rain.classList.remove('on')
    rain.classList.add('off')
    cafeteria.classList.add('on')
    cafeteria.classList.remove('off')
    fire.classList.remove('on')
    fire.classList.add('off')
    sound.pressButton()
    sound.cafeteria.play()
    sound.fire.pause()
    sound.rain.pause()
    sound.forest.pause()
})

fire.addEventListener('click', function() {
    forest.classList.remove('on')
    forest.classList.add('off')
    rain.classList.remove('on')
    rain.classList.add('off')
    cafeteria.classList.remove('on')
    cafeteria.classList.add('off')
    fire.classList.add('on')
    fire.classList.remove('off')
    sound.pressButton()
    sound.fire.play()
    sound.cafeteria.pause()
    sound.rain.pause()
    sound.forest.pause()
}) 