import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import AddBlog from './components/AddBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [login, setLogin] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      console.log(blogs)
      setBlogs(blogs)
    })   
  }, [])

  useEffect(() => {
    loginService.getAll().then(logins => {
      console.log(logins)
      setLogin(logins)
    })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user =JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      let flag = false
      console.log('checking account')
      for (var i in login) {      
        console.log(login[i].username, 'vs', username)
        console.log(login[i].password, 'vs', password)
        if (login[i].username === username && login[i].password === password) {
          flag = true
          break
        }
      }
      if (flag === false) {
        console.log('incorrect')
        setMessage('wrong username or password')
        setTimeout(() => {
          setMessage('')
        }, 5000)
      }
      else {
        console.log('correct')
        const user = await loginService.login({username, password})
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        blogService.setToken(user.token)
        setUser(user)
      }
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    }
    catch(exception) {
      setMessage('Server error occurs')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const addNewBlog = async (event) => {
    event.preventDefault()
    const newObject = {
      title: title,
      author: author,
      url: url
    }
    try{
      const response = await blogService.create(newObject)
      setBlogs(blogs.concat(response))
      setMessage(`a new blog ${title} by ${author} added`)
      console.log(message)
      setTimeout(() => {
        setMessage('')
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
      console.log(newObject, response)
    }
    catch(exception) {
      setMessage('Server error occurs')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  } 

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      username<input type='text' value={username} name='Username' onChange={({target}) => setUsername(target.value)} />
      <br />
      password<input type='password' value={password} name='Password' onChange={({target}) => setPassword(target.value)} />
      <br />
      <button type='submit'>login</button>
    </form>
  )

  const blogList = () => (
    <div>
      <form onSubmit={handleLogout}>
        <h2>blogs</h2>
        <p>{user.username} logged in<button type='submit'>logout</button></p>
      </form>

      <AddBlog title={title} author={author} url={url} addNewBlog={addNewBlog} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} />
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification message={message} />
      {!user ? loginForm() : blogList()}
    </div>
  )
}

export default App