const listHelper = require('../utils/list_helper')
const listWithBiggerBlog = [
  {
      id:"5a422a851b54a676234d17f7",
      title:"React patterns",
      author:"Michael Chan",
      url:"https://reactpatterns.com/",
      likes:7
  },
  {
      id:"5a422aa71b54a676234d17f8",
      title:"Go To Statement Considered Harmful",
      author:"Edsger W. Dijkstra",
      url:"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes:12
  },
  {
      id:"5a422b3a1b54a676234d17f9",
      title:"Canonical string reduction",
      author:"Edsger W. Dijkstra",
      url:"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes:12
  },
  {
      id:"5a422b891b54a676234d17fa",
      title:"First class tests",
      author:"Robert C. Martin",
      url:"http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes:10
  },
  {
      id:"5a422ba71b54a676234d17fb",
      title:"TDD harms architecture",
      author:"Robert C. Martin",
      url:"http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes:0
  },
  {
      id:"5a422bc61b54a676234d17fc",
      title:"Type wars",
      author:"Robert C. Martin",
      url:"http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes:2
  }
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
]
const listForMostBlog = [
  {
    id:"5a422a851b54a676234d17f7",
    title:"React patterns",
    author:"Michael Chan",
    url:"https://reactpatterns.com/",
    likes:7
},
{
    id:"5a422aa71b54a676234d17f8",
    title:"Go To Statement Considered Harmful",
    author:"Michael Chan",
    url:"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes:12
},
{
    id:"5a422b3a1b54a676234d17f9",
    title:"Canonical string reduction",
    author:"Edsger W. Dijkstra",
    url:"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes:12
},
{
    id:"5a422b891b54a676234d17fa",
    title:"Testing",
    author:"Edsger W. Dijkstra",
    url:"http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes:10
},
{
    id:"5a422ba71b54a676234d17fb",
    title:"TDD harms architecture",
    author:"Michael Chan",
    url:"http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes:0
},
{
    id:"5a422bc61b54a676234d17fc",
    title:"Type wars",
    author:"Null",
    url:"http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes:22
}
]


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(listWithBiggerBlog)).toBe(43)
  })
})

describe('favorite blog', () => {
  test('of empty list is nothing', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })

  test('when list has only one blog, equals the most likes of that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('of a bigger list with the most likes', () => {
    expect(listHelper.favoriteBlog(listWithBiggerBlog)).toEqual(listWithBiggerBlog[1])
  })
})

describe('most blog', () => {
  test('of empty list is nothing', () => {
    expect(listHelper.mostBlogs([])).toEqual({})
  })

  test('when list has only one blog, equals the most blogs of that', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({author: 'Edsger W. Dijkstra', blogs: 1})
  })

  test('of a bigger list with the most blogs posted by an author', () => {
    expect(listHelper.mostBlogs(listForMostBlog)).toEqual({author: "Michael Chan", blogs: 3})
  })
})

describe('most like', () => {
  test('of empty list is nothing', () => {
    expect(listHelper.mostLikes([])).toEqual({})
  })

  test('when list has only one blog, equals the most blogs of that', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({author: 'Edsger W. Dijkstra', likes: 5})
  })

  test('of a bigger list with the most likes posted by an author', () => {
    expect(listHelper.mostLikes(listForMostBlog)).toEqual({author: "Edsger W. Dijkstra", likes: 22})
  })
})
