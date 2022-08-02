let baseUrl = './api'

const NODE_ENV = process.env.NODE_ENV
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL

if (NODE_ENV === 'development') {
    baseUrl = REACT_APP_BACKEND_URL || baseUrl
}

export default { baseUrl, NODE_ENV }