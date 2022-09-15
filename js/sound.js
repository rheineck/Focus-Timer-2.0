export default function() {
    const buttonPressAudio = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true")
    const kitchenTimer = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true")
    const forest = new Audio("https://github.com/rheineck/soundsFocusTimer/blob/main/forest.wav?raw=true")
    const rain = new Audio("https://github.com/rheineck/soundsFocusTimer/blob/main/rain.wav?raw=true")
    const cafeteria = new Audio("https://github.com/rheineck/soundsFocusTimer/blob/main/cafeteria.wav?raw=true")
    const fire = new Audio("https://github.com/rheineck/soundsFocusTimer/blob/main/fire.wav?raw=true")
    let musics = {forest, rain, cafeteria, fire}
    musics.forest.loop = true
    musics.rain.loop = true
    musics.cafeteria.loop = true
    musics.fire.loop = true

    function pressButton() {
        buttonPressAudio.play()
    }

    function timeEnd() {
        kitchenTimer.play()
    }

    function playAudio(music, musics) {
        let isOn = music.classList.contains('on')
        isOn == false ? musics.pause() : musics.play()
    }

    return {
        pressButton,
        timeEnd,
        playAudio,
        musics
    }
}