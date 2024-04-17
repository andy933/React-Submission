import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: likes
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes(0)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>

        <p>title:<input type='text' value={title} name='Title' onChange={event => setTitle(event.target.value)} /></p>
        <p>author:<input type='text' value={author} name='Author' onChange={event => setAuthor(event.target.value)} /></p>
        <p>url:<input type='text' value={url} name='url' onChange={event => setUrl(event.target.value)} /></p>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm