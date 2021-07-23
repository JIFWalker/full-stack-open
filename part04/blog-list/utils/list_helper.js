
const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0
    blogs.forEach(blog => {
        total = blog.likes + total
    })
    return total
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    })
    return favorite
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}