
/*eslint-disable */

/// <reference types="cypress" />

describe('Jornada de usuário transações', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('deve permitir que o usuário acesse a aplicação, realize uma transação e faça logout', () => {
        cy.login('neilton@alura.com', '123456')
        cy.url().should('eq', 'http://localhost:3000/home')
        cy.getByData('select-opcoes').select('Transferência')
        cy.getByData('form-input').type('100')
        cy.getByData('realiza-transacao').click()
        cy.getByData('lista-transacoes').find('li').last().contains('- R$ 100')
        cy.getByData('botao-sair').click()
        cy.location('pathname').should('eq', '/')
    })

    it('deve permitir que o usuário acesse a aplicação, realize um depósito e faça logout', () => {
        cy.login('neilton@alura.com', '123456')
        cy.url().should('eq', 'http://localhost:3000/home')
        cy.getByData('select-opcoes').select('Depósito')
        cy.getByData('form-input').type('100')
        cy.getByData('realiza-transacao').click()
        cy.getByData('lista-transacoes').find('li').last().contains('+ R$ 100')
        cy.getByData('botao-sair').click()
        cy.location('pathname').should('eq', '/')
    })

    it('deve permitir que o usuario acesse a aplicacao, realize operações de transação e depósito, confirmando o saldo após cada operação', () => {
        cy.login('neilton@alura.com', '123456')
        cy.url().should('eq', 'http://localhost:3000/home')
        cy.getByData('select-opcoes').select('Transferência')
        cy.getByData('form-input').type('100')
        cy.getByData('realiza-transacao').click()
        cy.getByData('lista-transacoes').find('li').last().contains('- R$ 100')
        cy.getByData('select-opcoes').select('Depósito')
        cy.getByData('form-input').type('100')
        cy.getByData('realiza-transacao').click()
        cy.getByData('lista-transacoes').find('li').last().contains('+ R$ 100')
        cy.getByData('botao-sair').click()
        cy.location('pathname').should('eq', '/')
    })
})