const BlogList = require('../models/bloglist')

const initialBlogs = [
  {    
    title: "Example Blog Post",
    author: "John Doe",
    url: "https://example.com",
    likes: 5
  },
  {
    title: "RecipeTinEats",
    author: "Nagi Maehashi",
    url: "https://www.recipetineats.com/",
    likes: 10
  },
  {    
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {    
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Consider…",
    likes: 5
  },
]

const blogsInDb = () => {
  return BlogList.find({})
    .then(response => {      
      return response.map(blog => blog.toJSON())
    })      
}

module.exports = {
    initialBlogs,
    blogsInDb
}