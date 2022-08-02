import taDa from 'resources/taDa.mp3'
import pew from 'resources/pew.mp3'
import hLaugh from 'resources/hLaugh.mp3'
import bell from 'resources/bell.mp3'
import { useState } from 'react'

const SOUND_STORAGE = 'skullSound'

const defaultSound = () => localStorage.getItem(SOUND_STORAGE) || 'taDa'

const useSound = () => {
    const [sound, setSound] = useState(defaultSound)
}