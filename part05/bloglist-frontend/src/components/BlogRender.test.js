import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('Blog render tests', () => {
    const blog = {
        title: 'This is a test blog',
        author: 'Testy Klees',
        url: 'www.testthis.com',
        likes: 666,
    }

    test('renders only title and author', () => {
        const component = render (
            <Blog blog={blog} />
        )

        const divTitle = component.container.querySelector('.titleAndAuthor')

        expect(divTitle).toHaveTextContent(
            'This is a test blog -Testy Klees'
        )

        expect(
            component.container.querySelector('.toggleableContent')
        ).toHaveStyle('display: none')
    })

    test('renders url and likes when "view" button clicked', () => {
        const component = render (
            <Blog blog={blog} />
        )

        const button = component.getByText('view')
        fireEvent.click(button)

        expect(
            component.container.querySelector('.toggleableContent')
        ).not.toHaveStyle('display: none')
    })

    test('event handler called twice like button clicked twice', () => {
        const mockHandler = jest.fn()

        const component = render(
            <Blog blog={blog} updateLikes={mockHandler} />
        )

        const button = component.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})

describe('BlogForm tests', () => {
    const blog = {
        title: 'This is a test blog',
        author: 'Testy Klees',
        url: 'www.testthis.com',
        likes: 666,
    }

    test('form passed correct element when event handler called', () => {
        const createBlog = jest.fn()

        const component = render(
            <BlogForm createBlog={createBlog} />
        )

        let title = component.container.querySelector('input[name=title]')
        const form = component.container.querySelector('form')

        fireEvent.change(title, {
            target: { value: blog.title }
        })
        fireEvent.submit(form)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('This is a test blog')
    })
})