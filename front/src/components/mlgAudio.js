import mlgHorn from 'resources/mlgHorn.mp3'

const MLG_HORN_SOUND = new Audio(mlgHorn)
MLG_HORN_SOUND.autoplay = true
MLG_HORN_SOUND.defaultMuted = false
MLG_HORN_SOUND.muted = false


export const playSound = () => {
    try {
        MLG_HORN_SOUND.play()
    } catch (error) {
        console.error(error)
    }
}

//this needs to be user triggered 1 time for mobile devices to accept autoplay on playSound()
export const activateSound = () => {
    try {
        MLG_HORN_SOUND.play()
        MLG_HORN_SOUND.pause()
    } catch (error) {
        console.error(error)
    }
}


export default {
    playSound,
    activateSound
}