/// <reference types="cypress" />

const URL = "http://127.0.0.1:8080"

context("memotest", () => {
    before(() => {
        cy.visit(URL)
    })

    describe("Checkea que los componentes del juego esten presente", () => {
        it("test", () => {
            cy.get("#ronda").should("exist")
            cy.get("#estado").should("exist")
            cy.get(".cuadro").should("have.length", 4)
            cy.get("#comenzar").should("exist")
        })
    })
    describe("Prueba cambio en estado y rondas al comenzar", () => {
        it("Verifica el cambio de estado al comenzar", () => {
            cy.get("#comenzar").click()
            cy.get("#estado").should("contain.text", "Turno de la maquina")
        })
        it("Verifica el cambio de ronda al comenzar", () => {
            cy.reload()
            cy.get("#comenzar").click()
            cy.get("#ronda").should("contain.text", "Ronda # 1")
        })


    })
})