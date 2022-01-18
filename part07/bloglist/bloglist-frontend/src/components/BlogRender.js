import React from 'react'

const BlogRender = ({
    blogs,
    Blog,
    user,
}) => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    if (blogs.length === 0) {
        return (
            <h2>
                No blogs in list!
            </h2>
        )
    } else if (!blogs[0].id) {
        return (
            <div>
            Loading...
            </div>
        )
    } else {
        return (
            <div id='blogs'>
                { sortedBlogs.map(blog =>
                    <Blog
                        key = {blog.id}
                        blog = {blog}
                        loggedUser={user}
                    />)
                }
            </div>
        )}
}

export default BlogRender