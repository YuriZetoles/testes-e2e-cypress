/*eslint-disable*/
describe('Pagina inicial', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Deve renderizar o titulo principal', () => {
    cy.getByData('titulo-principal').contains('Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!')
  })

  it('Deve renderizar os cards', () => {
    cy.contains('h3', 'Conta e cartão gratuitos').should('be.visible')
    cy.contains('h3', 'Saques sem custo').should('be.visible')
    cy.contains('h3', 'Programa de pontos').should('be.visible')
    cy.contains('h3', 'Seguro Dispositivos').should('be.visible')
  })

  describe('Botão da pagina inicial', () => {
    it('Deve renderizar os botões', () => {
      cy.getByData('botao-cadastro').contains('Abrir minha conta').should('be.visible')
      cy.getByData('botao-login').contains('Já tenho conta').should('be.visible')
    })
  })
})