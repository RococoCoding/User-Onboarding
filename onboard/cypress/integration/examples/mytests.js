describe("Test test suite", ()=> {
  before(()=>{
    cy.visit("")
  }) 
  afterEach(()=> {
    cy.get('button').click()
  })
  it("Checks name", ()=>{
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
  it("checks form submit", ()=> {
    cy.get('form').submit()
  })  
})

// lakjdf