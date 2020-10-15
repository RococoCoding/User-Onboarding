describe("Test inputs", ()=> {
  before(()=>{
    cy.visit("")
  }) 
  beforeEach(()=>{
    cy.get('button').should("be.disabled")
  })
  it("Checks name and button", ()=>{
    cy.get('[type="text"]').type("Alice Chang").should("have.value", "Alice Chang")
  })
  it("Checks email", ()=>{
    cy.get('[type="email"]').type("test@email.com")
  })
  it("Checks password", ()=> {
    cy.get('[type="passwordInput"]').type("testpassword")
  })
  it("checks checkbox", ()=> {
    cy.get('[type="checkbox"]').check()
  })
})

describe("Checks filled in form", ()=> {
  it("checks form submit and button clickability", ()=> {
    cy.get('form').submit()
    cy.get('button').click() 
  })  
})