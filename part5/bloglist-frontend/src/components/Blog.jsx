import { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({username, blog, user, updateLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? 'none' : ''
  }

  const showWhenVisible = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? '' : 'none'
  }

  const toggle = () => {
    setVisible(!visible)
  }

  const updateBlog = (event) => {
    updateLike({
      user: blog.user,
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
    })
    console.log(blog.user, blog.user.username, username)
  }

  const remove = (event) => {
    deleteBlog({
      user: blog.user,
      id: blog.id,
      title: blog.title,
      author: blog.author,
    })
  }

  return (
    <div className='blogItem'>
      <div style={blogStyle} className='blog'>
        {blog.title} {blog.author} <button onClick={toggle}>view</button>
      </div>
      <div style={showWhenVisible} className='details' >
        {blog.title} <button onClick={toggle}>hide</button>
        <p>{blog.url}</p>
        <p>likes <span className='likes'>{blog.likes}</span> <button onClick={updateBlog}>like</button></p>
        <p>{blog.name}</p>
        { blog?.user?.id === user.id && <button onClick={remove}>remove</button> }
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog