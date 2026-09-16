// https://on.cypress.io/api

describe('component library demo smoke journey', () => {
  it('opens the real home page and a core component demo', () => {
    cy.visit('/')
    cy.contains('h1', 'Vue Table Components').should('be.visible')
    cy.contains('button', '查看示範').click()
    cy.contains('h1', '組件示範中心').should('be.visible')
    cy.contains('h3', 'SearchableListPanel').parents('.demo-card').contains('button', '查看示範').click()
    cy.contains('h2', 'SearchableListPanel 示範').should('be.visible')
    cy.contains('用戶管理').should('be.visible')
  })
})

describe('local mock search and pagination', () => {
  it('uses stable mock identities and real filtered totals, resets page after search/size changes', () => {
    cy.visit('/demo/searchable-list-panel')
    const rows = '#searchable-list-panel-demo .el-table__body-wrapper tbody tr'
    cy.get(rows).should('have.length', 2).first().should('contain', '張小明')
    cy.get('.el-pagination__total').should('contain', '5')
    cy.get('.el-pagination .btn-next').click()
    cy.get(rows).first().should('contain', '王小美')
    cy.get(rows).last().should('contain', '陳大強')
    cy.get('.search-input input').type('林小芳{enter}')
    cy.get(rows).should('have.length', 1).first().should('contain', '林小芳')
    cy.get('.el-pagination__total').should('contain', '1')
    cy.get('.el-pager .is-active').invoke('text').should('match', /^\s*1\s*$/)
    cy.get('.search-input input').clear().type('{enter}')
    cy.get(rows).should('have.length', 2).first().should('contain', '張小明')
    cy.get('.el-pagination .btn-next').click()
    cy.get('.el-pagination .el-select').click()
    cy.get('.el-select-dropdown__item').filter(':visible').contains(/^\s*5\s*項\/頁\s*$/).click()
    cy.get(rows).should('have.length', 5)
    cy.get('.el-pager .is-active').invoke('text').should('match', /^\s*1\s*$/)
    cy.get('.search-input input').type('not-a-user{enter}')
    cy.contains('.el-empty', '暫無資料').should('be.visible')
    cy.get('.el-pagination').should('not.exist')
  })
})
