import axios from 'axios'
const baseUrl = 'https://tides-of-battle-lite.herokuapp.com/cards'

const formatter = (request) => {
  return request.then(response => response.data)
}

const getAll = () => {
  /*const request = axios.get(baseUrl)
  return request.then(response => response.data)*/
  return formatter(axios.get(baseUrl))
}


export default { getAll }