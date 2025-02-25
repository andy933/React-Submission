const BlogForm = ({ addBlog, title, author, url, likes, 
    handleTitleChange, handleAuthorChange, handleUrlChange, handleLikesChange }) => {
    return (
        <form onSubmit={addBlog}>

        <table className="table">
          <tbody>
            <tr><td>title:</td><td><input value = {title} onChange={handleTitleChange} /></td></tr>
            <tr><td>author:</td><td><input value = {author} onChange={handleAuthorChange} /></td></tr>
            <tr><td>url:</td><td><input value = {url} onChange={handleUrlChange} /></td></tr>
            <tr><td>likes:</td><td><input value = {likes} onChange={handleLikesChange} /></td></tr>
          </tbody>
        </table>

        <div className="form">
          <button type="submit">add</button>
        </div>
    
      </form>
    )
}

export default BlogForm