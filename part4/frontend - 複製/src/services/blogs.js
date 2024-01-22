import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const createBlog = (newObject) => {
    const req = axios.post(baseUrl, newObject)
    return req.then(res => res.data)
}

const updateBlog = (id, newObject) => {
    const req = axios.put(`${baseUrl}/:${id}`, newObject)
    return req.then(res => res.data)
}

const removeBlog = (id) => {
    const req = axios.delete(`${baseUrl}/:${id}`)
    return req.then(res => res.data)
}

export default {
    getAll,
    createBlog,
    updateBlog,
    removeBlog
}