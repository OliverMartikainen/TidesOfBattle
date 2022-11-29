let TOKEN

export const setToken = (token) => {
    TOKEN = token ? `bearer ${token}` : null
}

export const getAuthHeader = () => ({
    headers: { Authorization: TOKEN }
})

export default {
    getAuthHeader,
    setToken
}