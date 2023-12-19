import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        important: true,
      }
    return request.then(response => response.data.concat(nonExisting))
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}
/* 
export default {
    getAll: getAll,
    create: create,
    update: update
}
 */

export default {getAll, create, update}

// The App component has become somewhat bloated after adding the code for communicating with the backend server. 
// In the spirit of the single responsibility principle, we deem it wise to extract this communication into its own module.
// https://en.wikipedia.org/wiki/Single_responsibility_principle