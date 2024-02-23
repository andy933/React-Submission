const Blog = require('../models/blog')

const initialBlog = [
    {
        title: 'Blue Archive',
        author: 'Sensei',
        url: 'https://bluearchive.nexon.com/',
        likes: 150000
    },
    {
        title: 'A man who reads plenty of books, but he likes to skip the game stories',
        author: 'Checkmate',
        url: 'https://www.youtube.com/watch?v=v8THX_7isvo&t=327s',
        likes: 29.2
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

const nonexistingId = async () => {
    const blog = new Blog ({
        title: 'testing',
        author: 'testing',
        url: 'testing',
        likes: 10
    })
    await blog.save()
    await blog.deleteOne()

    // return blog.id.toString() also ok
    return blog._id.toString()
}

module.exports = {
    initialBlog, blogsInDb, nonexistingId
}