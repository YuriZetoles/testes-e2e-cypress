

/*eslint-disable */

describe ('formulário de cadastro', () => {
    beforeEach(()=> {
        cy.visit('/')
        cy.getByData('botao-login').click()
    })


it("Deve realizar login com sucesso", () => {
    cy.getByData('email-input').type('neilton@alura.com')
    cy.getByData('senha-input').type('123456')
    cy.getByData('botao-enviar').click()
    cy.location('pathname').should('eq', '/home')
})

it("Não deve permitir um email invalido", () => {

})

it("Deve realizar login com sucesso", () => {

})

it("Deve realizar login com sucesso", () => {

})

it("Deve realizar login com sucesso", () => {

})

it("Deve realizar login com sucesso", () => {

})

it("Deve realizar login com sucesso", () => {

})

})