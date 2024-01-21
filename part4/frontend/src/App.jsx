import { useState, useEffect } from 'react'
import './App.css'
import './index.css'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogservices from './services/blogs'

function App() {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    blogservices.getAll().then(initialBlogs => {setBlogs(initialBlogs)})
  }, [])

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleLikesChange = (event) => {
    setLikes(event.target.value)
  }

  const addBlog =(event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: Number(likes)
    }

    console.log(newBlog)

    blogservices.createBlog(newBlog)
    .then(createdBlog => { 
      setBlogs(blogs.concat(createdBlog)) 
      setMessage(`${title} is successfully added to the blogs!`)
      setTimeout(() => {setMessage(null)}, 5000)
      console.log(blogs)
    })
    .catch(error => {
      setMessage(`${error.response.data.error}`)  
      setTimeout(() => {setMessage(null)}, 5000)   
      console.log(error.response.data)    
    })

    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  const renewBlog = (id) => {
    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: likes
    }

    blogservices.updateBlog(id, newBlog).then(updatedBlog => setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog)))
  }

  const deleteBlog = (id) => {
    blogservices.removeBlog(id).then(removedBlog => setBlogs(blogs.filter(b => b.id !== id)))
    setMessage(`${title} is successfully removed from the blogs.`)
    setTimeout(() => {setMessage(null)}, 5000)
  }

  return (
    <>
      <Notification message = {message} />
      <h2>Blog List</h2>
      <h2>Add a new blog</h2>
      <BlogForm addBlog={addBlog} title={title} author={author} url={url} likes={likes}
      handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange}
      handleUrlChange={handleUrlChange} handleLikesChange={handleLikesChange} />
    </>
  )
}

export default App
