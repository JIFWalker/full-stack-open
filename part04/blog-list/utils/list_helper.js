
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0
    blogs.forEach(blog => {
        total = blog.likes + total
    })
    return total
}

module.exports = {
    dummy,
    totalLikes
}