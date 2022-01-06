// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
    cy.contains('Add Blog').click()
    cy.request({
        url: 'http://localhost:3003/api/blogs/',
        method: 'POST',
        body: { title, author, url, likes },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
    })

    cy.visit('http://localhost:3000')
})

Cypress.Commands.add('openView', (title) => {
    cy.contains(title)
        .parent()
        .parent()
        .contains('view')
        .click()
})

Cypress.Commands.add('like', (title) => {
    cy.get('#blogs')
        .contains(title)
        .parent()
        .contains('like')
        .click()
})

Cypress.Commands.add('checkLikeOrder', () => {
    cy.get('.blog').find('.likes')
        .should(($likes) => {
            let likesArray = $likes.map((i, el) =>
                parseInt(Cypress.$(el).text()))
            likesArray = likesArray.get()
            switch (true) {
            case likesArray[0] === likesArray[1] :
                expect(likesArray[1]).to.be.greaterThan(likesArray[2])
                expect(likesArray[2]).to.be.lessThan(likesArray[0])
                break
            case likesArray[1] === likesArray[2] :
                expect(likesArray[0]).to.be.greaterThan(likesArray[1])
                expect(likesArray[2]).to.be.lessThan(likesArray[0])
                break
            default :
                expect(likesArray[0]).to.be.greaterThan(likesArray[1])
                expect(likesArray[1]).to.be.greaterThan(likesArray[2])
                expect(likesArray[2]).to.be.lessThan(likesArray[0])
            }


        })
})
