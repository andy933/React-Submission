const AddBlog = ({ title, author, url, addNewBlog, setTitle, setAuthor, setUrl }) => {
    return (
        <form onSubmit={addNewBlog}>
            <h2>create new</h2>
            <p>title:<input type='text' value={title} name='Title' onChange={({target}) => setTitle(target.value)} /></p>
            <p>author:<input type='text' value={author} name='Author' onChange={({target}) => setAuthor(target.value)} /></p>
            <p>url:<input type='text' value={url} name='url' onChange={({target}) => setUrl(target.value)} /></p>
            <button type="submit">create</button>
        </form>
    )
}

export default AddBlog