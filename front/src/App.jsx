import { useState, useEffect } from 'react'
import TideCards from 'components/TideCards'
import NativeSelector from 'components/NativeSelector'
import usersService from 'services/users'
import './App.css'

import { activateSound } from 'components/mlgAudio'
import tokenManager from 'services/tokenManager'

const saveUser = (username, token) => {
    localStorage.setItem('Username', username)
    localStorage.setItem('Token', token)
}
const getDefaultUser = () => {
    const storedUser = localStorage.getItem('Username')
    const Token = localStorage.getItem('Token')

    if (!storedUser || !Token) return ''

    tokenManager.setToken(Token)
    return storedUser
}



const LoginScreen = ({ username, setUsername, usernameOptions }) => {
    const handleChange = async (value) => {
        const username = value
        if (!username || username === 'None') return

        const token = await usersService.login(username)
        if (!token) {
            console.log('login failed')
            return
        }

        saveUser(username, token) //update localStorage
        setUsername(username) //update state
    }

    return (
        <NativeSelector
            value={ username }
            valueOptions={ usernameOptions }
            handleChange={ handleChange }
            label={ 'Username' }
        />
    )
}

const StringComp = ({ json, tag }) => {
    let jsonString = 'error'
    try {
        jsonString = JSON.stringify(json, null, 2)
    } catch (error) {
        console.error(error)
    }

    return (
        <div>
            { tag }
            < pre >
                { jsonString }
            </pre >
        </div>
    )
}

const SingleStats = ({ userStats }) => {
    const { username, stats } = userStats

    return (
        <div style={ { border: '1px solid black' } }>
            { username }
            <StringComp key={ 'self' } json={ stats.self } tag={ 'self' } />
            <StringComp key={ 'against' } json={ stats.against } tag={ 'against' } />
        </div>
    )
}

const StatsDisplay = () => {
    const [statsState, setStatsState] = useState({ showStats: false, stats: null })

    const { showStats, stats } = statsState

    const fetchStats = async () => {
        const newStats = await usersService.stats() || []
        setStatsState({ showStats: true, stats: newStats })
    }

    const showStatsHandler = async () => {
        if (!stats) {
            const newStats = await usersService.stats() || []
            setStatsState({ showStats: true, stats: newStats })
        } else {
            setStatsState({ ...statsState, showStats: true })
        }
    }

    if (!showStats) {
        return (
            <div>
                <button onClick={ showStatsHandler }>SHOW STATS</button>
            </div>
        )
    }

    if (!stats) {
        return (
            <div>
                <button onClick={ () => setStatsState({ ...statsState, showStats: false }) }>HIDE STATS</button>
                <button onClick={ fetchStats }>REFRESH STATS</button>
                <div className='stats' >
                    FETCH STATS
                </div>
            </div>
        )
    }

    const usersStats = Object.values(stats)
    const userStatComps = usersStats.map((user) => <SingleStats key={ user.username } userStats={ user } />)

    return (
        <div>
            <button onClick={ () => setStatsState({ ...statsState, showStats: false }) }>HIDE STATS</button>
            <button onClick={ fetchStats }>REFRESH STATS</button>
            <div className='stats'>
                { userStatComps }
            </div>
        </div>
    )
}

const App = () => {
    const [username, setUsername] = useState(() => getDefaultUser())
    const [audioActivated, setAudioActivated] = useState(false)
    const [usernameOptions, setUsernameOptions] = useState([])


    useEffect(() => {
        const fetchUsernames = async () => {
            const usernames = await usersService.usernames()
            setUsernameOptions(usernames)
        }
        fetchUsernames()
    }, [])

    if (!username) {
        return (
            <div className='App'>
                <LoginScreen username={ username } setUsername={ setUsername } usernameOptions={ usernameOptions } />
            </div>
        )
    }

    const handleActivateAudio = () => {
        activateSound()
        setAudioActivated(true)
    }

    if (!audioActivated) {
        return (
            <div className='App'>
                <button onClick={handleActivateAudio}>PRESS TO ACTIVATE AUDIO</button>
            </div>
        )
    }

    const logout = () => {
        localStorage.clear()
        setUsername('')
    }

    const forceFakeRefresh = () => {
        const oldUsername = username
        setUsername('')
        setTimeout(() => setUsername(oldUsername), 50)
    }

    return (
        <div className='App'>
            <TideCards logout={ logout } username={ username } usernameOptions={ usernameOptions } />
            <button onClick={ forceFakeRefresh }>FAKE REFRESH</button>
            <StatsDisplay />
        </div>
    )
}

export default App
