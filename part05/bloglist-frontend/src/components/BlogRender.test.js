import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

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
})