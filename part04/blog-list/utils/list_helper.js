var _ = require('lodash')


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

const mostBlogs = (blogs) => {
    const authors = _.chain(blogs)
        .countBy('author')
        .toPairs()
        .last()
        .value()

    const most = {
        author: authors[0],
        blogs: authors[1]
    }

    return most
}

const mostLikes = (Blogs) => {
    const blogs = _.chain(Blogs)
        .map(blog => _.pick(blog, ['author', 'likes']))
        .groupBy('author')
        .map(author => {
            let total = 0
            return _.last(author.map(blog =>
            { total += blog.likes
                return { author: blog.author, likes: total }
            }))
        })
        .orderBy('likes', 'desc')
        .head()
        .value()


    return blogs
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}