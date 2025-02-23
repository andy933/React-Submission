import axios from 'axios'
const baseUrl = '/api/login'
const userUrl = '/api/users'

const getAll = () => {
  const request = axios.get(userUrl)
  return request.then(response => response.data)
}

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${userUrl}/${id}`, newObject)
  return response.data
}

export default { getAll, login, update }