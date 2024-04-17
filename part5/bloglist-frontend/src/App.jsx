import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogFrom'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [login, setLogin] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const blogFormRef = useRef()
  const sortedBlog = blogs.sort((a, b) => a.likes - b.likes)

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
        const user = await loginService.login({ username, password })
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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      const msg = `a new blog ${blogObject.title} by ${blogObject.author} added`
      setMessage(msg)
      setTimeout(() => {
        setMessage('')
      }, 5000)
      console.log(msg, '\n', blogObject, '\n', returnedBlog)
    })
      .catch(error => {
        const errorMsg = error.response.data.error
          .replace(':', ':\n').replaceAll('.', '').replaceAll(',', ',\n').concat('.')
        setMessage(`${errorMsg}`)
        setTimeout(() => {setMessage(null)}, 5000)
        console.error(errorMsg)
      })
  }

  const updateLike = (blogObject) => {
    blogService.update(blogObject.id, blogObject).then(updatedBlog => setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : updatedBlog)))
  }

  const deleteBlog = (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      blogService.remove(blogObject.id).then(() => setBlogs(blogs.filter(b => b.id !== blogObject.id)))
    }
  }

  const loginForm = () => {
    return (
      <div>

        <div>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </div>

      </div>
    )
  }

  const blogList = () => {
    return (
      <div>
        <form onSubmit={handleLogout}>
          <h2>blogs</h2>
          <p>{user.username} logged in <button type='submit'>logout</button></p>
        </form>

        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>

        {sortedBlog.map(blog =>
          <Blog key={blog.id} blog={blog} updateLike={updateLike} deleteBlog={deleteBlog} />
        )}
      </div>
    )}

  return (
    <div>
      <Notification message={message} />
      {!user ? loginForm() : blogList()}
    </div>
  )
}

export default App