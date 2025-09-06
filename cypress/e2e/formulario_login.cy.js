

/*eslint-disable */


/// <reference types="cypress" />

describe('formulário de cadastro', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.getByData('botao-login').click()
    })

    it('deve realizar login com sucesso', () => {
        cy.getByData('email-input').type('neilton@alura.com')
        cy.getByData('senha-input').type('123456')
        cy.intercept('POST', '/**').as('login')
        cy.getByData('botao-enviar').click()
        cy.wait('@login').its('response.statusCode').should('eq', 200)
        cy.location('pathname').should('eq', '/home')
        cy.contains('p', 'Olá, Neilton').should('be.visible')
    })

    it('não deve permitir login com e-mail inválido sem .com', () => {
        cy.getByData('email-input').type('teste@vini')
        cy.getByData('senha-input').type('123456')
        cy.getByData('botão-enviar').click()
        cy.getByData('mensagem-erro').should('exist').and('have.text', 'O email digitado é inválido')
    })

    it('não deve permitir login com e-mail inválido sem @', () => {
        cy.getByData('email-input').type('testevini.com')
        cy.getByData('senha-input').type('123456')
        cy.getByData('botão-enviar').click()
        cy.getByData('mensagem-erro').should('exist').and('have.text', 'O email digitado é inválido')
    })

    it('não deve permitir um email em branco', () => {
        cy.getByData('senha-input').type('123456')
        cy.getByData('botao-enviar').click()
        cy.getByData('botao-enviar').click()
        cy.getByData('mensagem-erro').should('exist').and('have.text', 'O campo email é obrigatório')
    })
})







// describe ('formulário de login', () => {
//     beforeEach(()=> {
//         cy.visit('/')
//         cy.getByData('botao-login').click({force: true})
//         cy.getByData('email-input', {timeout: 5000}).should('be.visible')
//         cy.intercept('POST', '/public/login').as('login')
//     })


// it("Deve realizar login com sucesso", () => {
//     cy.getByData('email-input').type('neilton@alura.com')
//     cy.getByData('senha-input').type('123456')
//     cy.getByData('botao-enviar').click()
//     cy.wait('@login').its('response.statusCode').should('eq', 200)
//     cy.location('pathname').should('eq', '/home')
//     cy.contains('p', 'Olá, Neilton').should('be.visible')
// })

// it("Não deve permitir um email invalido", () => {
//     cy.getByData('email-input').type('neilton@alura,com')
//     cy.getByData('senha-input').type('123456')
//     cy.get('form').submit()
//     cy.getByData('mensagem-erro').should('contain', 'O email digitado é inválido')
// })

// it("Não deve permitir um email branco", () => {
//     cy.getByData('senha-input').type('123456', {force: true})
//     cy.getByData('botao-enviar').click()
//     cy.contains('O campo email é obrigatório').should('be.visible')
// })

// it("Deve informar erro ao logar quando email ou senha estiverem errados", () => {
//     cy.getByData('email-input').type('neilton@alura.com')
//     cy.getByData('senha-input').type('senhaerrada', {force: true})
//     cy.getByData('botao-enviar').click()
//     cy.wait('@login').its('response.statusCode').should('eq', 401)
// })



// })