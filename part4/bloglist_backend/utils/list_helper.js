const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
    const likesArray = blogs.map(blog => blog.likes)
    // console.log('likes:', likesArray)
    const totalLikes = (total, likes) => {
        return total + likes
    }
    
    return likesArray.reduce(totalLikes , 0)
}

const favoriteBlog = (blogs) => {
    // spread operator converts array into single arguments ([5, 2, 10]) => (5, 2, 10)
    const mostLiked = blogs.filter(blog => blog.likes === Math.max(...blogs.map(blog => blog.likes)))

    return mostLiked[0]
}

const mostBlogs = (blogs) => {
  const countBlogs = blogs.reduce((acc, blog) => {    
    acc[blog.author] = (acc[blog.author] || 0) + 1
    return acc
  }, {})  

  // no initial value, takes the first element of the array
  const [ author, totalBlogs ] = Object.entries(countBlogs).reduce((max, current) => 
    current[1] > max[1] ? current : max
  )  
  
  return { author, totalBlogs }
}

const mostLikes = (blogs) => {
  const countLikes = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes
    return acc
  }, {})

  const [ author, totalLikes ] = Object.entries(countLikes).reduce((max, current) => 
    current[1] > max[1] ? current : max
  )  

  return { author, totalLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}