import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogFrom'

const App = () => {
  const [newBlogs, setNewBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const blogFormRef = useRef()
  const sortedBlog = newBlogs.sort((a, b) => a.likes - b.likes)
  const [login, setLogin] = useState([])
  var loginUser = login.find(log => log?.name === user?.name)
 
  useEffect(() => {
    blogService.getAll().then(blogs => {
      setNewBlogs(blogs)
    })
    loginService.getAll().then(login => {
      setLogin(login)
    })
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then(returnedBlog => {
      setNewBlogs(newBlogs.concat(returnedBlog))
      const msg = `a new blog ${blogObject.title} by ${blogObject.author} added`
      setMessage(msg)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    })
      .catch(error => {
        const errorMsg = error.response.data.error.replace(':', ':\n').replaceAll('.', '').replaceAll(',', ',\n').concat('.')
        setMessage(`${errorMsg}`)
        setTimeout(() => {setMessage(null)}, 5000)
      })
  }

  const updateLike = (blogObject) => {
    blogService.update(blogObject.id, blogObject).then(updatedBlog => setNewBlogs(newBlogs.map(blog => blog.id !== blogObject.id ? blog : updatedBlog)))
  }

  const deleteBlog = async (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      await blogService.remove(blogObject.id)
      .then(() => {setNewBlogs(newBlogs.filter(b => b.id !== blogObject.id))})
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      // Our application has a small flaw: if the browser is refreshed (eg. pressing F5), the user's login information disappears.
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      // Thus, we use local storage
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
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
          <p>{user.name} logged in <button type='submit'>logout</button></p>
        </form>

        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} user={loginUser} />
        </Togglable>

        {loginUser && sortedBlog.map(blog =>
          <Blog key={blog.id} blog={blog} user={loginUser} updateLike={updateLike} deleteBlog={deleteBlog} />
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