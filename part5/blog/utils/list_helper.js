var _ = require('lodash')
let maxAuthor = ''
let maxNumber = 0

const dummy = (blog) => {
    return 1
}

const totalLikes = (blog) => {
    return blog.length > 0 ? blog.reduce(
        (accumulate, current) => accumulate + current.likes, 0,
    ) : 0
}

const favoriteBlog = (blog) => {
    const maxValue = Math.max(...blog.map(b => b.likes))
    return blog.length > 0 ? blog.find(b => b.likes === maxValue) : {}
}

const mostBlogs = (blog) => {
    const authorCounts = _.countBy(blog, 'author')
    _.forEach(authorCounts, function(value, key) {
        if (value > maxNumber) {
            maxAuthor = key
            maxNumber = value
        }
    })

    return blog.length > 0 ? {
        author: maxAuthor,
        blogs: maxNumber
    } : {}
}

const mostLikes = (blog) => {
    for (let i = 0; i < blog.length; i++) {
        const firstAuthor = blog[i].author
        let temp = blog[i].likes
        for (let j = i + 1; j < blog.length; j++) {
            if (blog[j].author === firstAuthor) {
                temp += blog[j].likes
            }
        }
        if (temp > maxNumber) {
            maxAuthor = firstAuthor
            maxNumber = temp
        }
    }

    return blog.length > 0 ? {
        author: maxAuthor,
        likes: maxNumber
    } : {}
}

module.exports = { 
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}