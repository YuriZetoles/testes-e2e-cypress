/*eslint-disable */

/// <reference types="cypress" />

describe('página inicial', () => {
    let authToken;
    let saldo;

    beforeEach(() => {
        cy.visit('/')
    })


    it('deve permitir que o usuário acesse a aplicação, realize uma transação e faça um logout', () => {
        cy.login('neilton@alura.com', '123456')
        cy.url().should('eq', 'http://localhost:3000/home')
        cy.getByData('select-opcoes').select('Transferência')
        cy.getByData('form-input').type('100')
        cy.getByData('realiza-transacao').click()
        cy.getByData('lista-transacoes').find('li').last().contains('- R$ 100')
        cy.getByData('botao-sair').click()
        cy.location('pathname').should('eq', '/')
    })

    it('Deve retornar token de autenticação da api utilizando o cy.request', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8000/public/login',
            body: {
                email: 'neilton@alura.com',
                senha: '123456'
            }
        }).then((response) => {
            authToken = response.body.access_token
            expect(authToken).to.not.be.null
            expect(response.status).to.eq(200)
        })
    })

    it('Deve retornar token de autenticação da api utilizando o cy.request', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8000/saldo',
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
            body: {
                email: 'neilton@alura.com',
                senha: '123456'
            }
        }).then((response) => {
            expect(response.body).to.not.be.null
            expect(response.status).to.eq(200)
            saldo = response.body
        })
    })

    it('deve permitir que o usuário acesse a aplicação, realize um depósito e faça um logout', () => {
        cy.login('neilton@alura.com', '123456')
        cy.url().should('eq', 'http://localhost:3000/home')
        cy.getByData('select-opcoes').select('Depósito')
        cy.getByData('form-input').type('50')
        cy.getByData('realiza-transacao').click()
        cy.getByData('lista-transacoes').find('li').last().contains('R$ 50')
        cy.getByData('botao-sair').click()
        cy.location('pathname').should('eq', '/')
    })

    it('deve permitir que o usuário acesse a aplicação, realize operações de transação e depósito, confirmando o saldo após cada operação', () => {
        cy.login('neilton@alura.com', '123456')
        cy.url().should('eq', 'http://localhost:3000/home')
        cy.getByData('select-opcoes').select('Transferência')
        cy.getByData('form-input').type('100')
        cy.getByData('realiza-transacao').click()
        cy.getByData('lista-transacoes').find('li').last().contains('- R$ 100')
        cy.get('[data-testid="saldo"]').should('be.visible').and('contain', 'R$')
        cy.getByData('select-opcoes').select('Depósito')
        cy.getByData('form-input').clear().type('200')
        cy.getByData('realiza-transacao').click()
        cy.getByData('lista-transacoes').find('li').last().contains('R$ 200')
        cy.get('[data-testid="saldo"]').should('be.visible').and('contain', 'R$')
        cy.getByData('lista-transacoes').find('li').should('have.length.at.least', 2)
        cy.getByData('botao-sair').click()
        cy.location('pathname').should('eq', '/')
    })
})