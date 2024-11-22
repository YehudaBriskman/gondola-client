import { render, screen } from "@testing-library/react"
import AddNewTarget from "./AddNewTarget"
import TestProvider from "../../../TestProvider"


describe("test the add new target form", () => {
    test("when the user press send", () => {
        const setAddingMode = jest.fn()
        const setCurrentIndex = jest.fn()

        render(
            <TestProvider withMap>
                <AddNewTarget index={1} setAddingMode={setAddingMode} setCurrentIndex={setCurrentIndex} />
            </TestProvider>
        )
        const targetNameInputElement = screen.getByPlaceholderText(/Target Name/i)
        expect(targetNameInputElement).toBeInTheDocument()
    })
})