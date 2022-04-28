import React, { useState } from 'react'
import { Button, ListGroup, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { updateLikes, addComment } from '../reducers/blogReducer'

const Blog = ({ blog, loggedUser }) => {
    const dispatch = useDispatch()
    const [newComment, setNewComment] = useState('')
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        borderWidth: 1,
        marginBottom: 10
    }
    if (!blog) {
        return null
    }

    const blogOwnerID = JSON.stringify(blog.user)
    const userID = JSON.stringify(loggedUser.id)


    const isAuthor = () => (blogOwnerID.includes(userID)) ? '' : 'none'

    const removeBlog = (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`) === true) {


            try {
                dispatch(
                    deleteBlog(blog)
                )

                dispatch(
                    setNotification([`${blog.title} was removed!`, 'notification'], 10)
                )
            } catch (exception) {
                dispatch(
                    setNotification(
                        [exception.toString(), 'error'], 10)
                )
            }
        }
    }

    const likeButton = (blog) => {
        try {
            dispatch(
                updateLikes(blog)
            )

            dispatch(
                setNotification(
                    [`${blog.title} was liked!`, 'notification'], 10)
            )

        } catch (exception) {
            dispatch(
                setNotification(
                    [exception.toString(), 'error'], 10)
            )
        }
    }

    const commentList = (blog.comments) ? (blog.comments.map( comment => {
        return (
            <ListGroup.Item key={comment}>{comment}</ListGroup.Item>
        )
    })) : null

    const handleChange = (event) => {
        event.preventDefault()
        const value = event.target.value
        setNewComment(value)
    }

    const handleComment = () => {
        try {
            dispatch(
                addComment(blog, newComment)
            )


        } catch (exception) {
            dispatch(
                setNotification(
                    [exception.toString(), 'error'], 10)
            )
        }
    }


    return(

        <div style={blogStyle}>
            <div key={blog.id} className='blog' >
                <h2 className='titleAndAuthor' style={{ display: 'inline', paddingRight: 5 }}>
                    {blog.title} -{blog.author}
                </h2>

                <div>
                    <a className='url' href={blog.url}>{blog.url}</a>

                    <div>
                        <p className='likes' style={{ display: 'inline', paddingRight: 5 }} >{blog.likes}</p>
                        <Button type='Button' className='likeButton' size='sm'  onClick={() => likeButton(blog)}>like</Button>
                    </div>

                    <Button type='Button' style={{ display: isAuthor(), marginTop: 10, padding: 5 }} size='sm' variant='danger' onClick={() => removeBlog(blog)}>remove</Button>
                </div>


                <h2>Comments</h2>

                <Form onSubmit={handleComment}>
                    <Form.Control
                        id='comment'
                        type='text'
                        name='comment'
                        onChange={handleChange}
                    />
                    <Button id='create' size='sm' type='submit'>Add Comment</Button>
                </Form>

                <ListGroup>
                    {commentList}
                </ListGroup>



            </div>

        </div>
    )
}

export default Blog

