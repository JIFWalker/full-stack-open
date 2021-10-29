

describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Holo',
            username: 'WiseWolf',
            password: 'Apples'
        }
        const user2 = {
            name: 'Senko',
            username: 'HelpfulFox',
            password: 'mofumofu'
        }

        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.request('POST', 'http://localhost:3003/api/users/', user2)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Log In To Application')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('WiseWolf')
            cy.get('#password').type('Apples')
            cy.get('#login-button').click()

            cy.contains('Login Succesful!')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('Wisewolf')
            cy.get('#password').type('Onions')
            cy.get('#login-button').click()

            cy.get('.error')
                .should('contain', 'Error')
                .and('have.css', 'color', 'rgb(255, 0, 0)')

            cy.get('html').should('not.contain', 'Holo has logged in')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'WiseWolf', password: 'Apples' })
        })

        it('A blog can be created', function() {
            cy.contains('Add Blog').click()
            cy.get('#title').type('I Love Apples')
            cy.get('#author').type('Holo')
            cy.get('#url').type('yummy.apples')
            cy.get('#create').click()

            cy.get('html').should('contain', 'I Love Apples -Holo')
        })

        describe('When a blog exists', function() {
            beforeEach(function() {
                cy.login({ username: 'WiseWolf', password: 'Apples' })
                cy.createBlog({
                    title: 'I Love Apples',
                    author: 'Holo',
                    url: 'yummy.apples'
                })
                cy.contains('I Love Apples')
                    .parent()
                    .as('ILA')
                    .contains('view')
                    .click()
            })

            it('A blog can be liked', function() {
                cy.get('@ILA')
                    .contains('like')
                    .click()

                cy.get('.notification').should('contain', 'I Love Apples was liked!')
            })

            it('A blog can be deleted by logged in user', function() {
                cy.get('@ILA')
                    .contains('remove')
                    .click()
            })

            it('Other user can not delete blog', function() {
                cy.contains('logout')
                    .click()

                cy.login({ username: 'HelpfulFox', password: 'mofumofu' })

                cy.get('@ILA')
                    .contains('view')
                    .click()

                cy.should('not.contain', 'remove')
            })
        })

    })
})