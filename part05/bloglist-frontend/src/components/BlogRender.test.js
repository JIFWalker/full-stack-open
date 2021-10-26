import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('Blog render tests', () => {

    test('renders only title and author', () => {
        const blog = {
            title: 'This is a test blog',
            author: 'Testy Klees',
            url: 'www.testthis.com',
            likes: 666,
        }

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
})