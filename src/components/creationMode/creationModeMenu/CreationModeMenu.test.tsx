import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import CreationModeMenu from "./CreationModeMenu"
import AddingModeEnum from "../../../utils/addingModeEnum"
import TestProvider from "../../../TestProvider"

describe("test the creation mode menu", () => {

    test("find the buttons", () => {
        const setAddingMode = jest.fn()
        const addingMode = AddingModeEnum.ADD_TARGETS
        render(<TestProvider><CreationModeMenu addingMode={addingMode} setAddingMode={setAddingMode} /></TestProvider>)
        const buttons = screen.getAllByRole("button")

        expect(buttons).toHaveLength(7)
    })
    test("check if the state is update when buttons is click", () => {

        const setAddingMode = jest.fn()
        const addingMode = AddingModeEnum.INITIAL_STATE

        render(<TestProvider><CreationModeMenu addingMode={addingMode} setAddingMode={setAddingMode} /></TestProvider>)

        const addTargetBtn = screen.getByRole("button", { name: /add target/i })
        const editPolygonBtn = screen.getByRole("button", { name: /edit polygon/i })
        const entryPointBtn = screen.getByRole("button", { name: /entry point/i })
        const exitPointBtn = screen.getByRole("button", { name: /exit point/i })
        const generalBtn = screen.getByRole("button", { name: /general/i })

        expect(addTargetBtn).toBeInTheDocument()
        expect(editPolygonBtn).toBeInTheDocument()
        expect(entryPointBtn).toBeInTheDocument()
        expect(exitPointBtn).toBeInTheDocument()
        expect(generalBtn).toBeInTheDocument()

        fireEvent.click(addTargetBtn)
        expect(setAddingMode).toHaveBeenCalled()
        expect(setAddingMode).toHaveBeenCalledWith("ADD_TARGETS")
        fireEvent.click(editPolygonBtn)
        expect(setAddingMode).toHaveBeenCalled()
        expect(setAddingMode).toHaveBeenCalledWith("ADD_POLYGON")
        fireEvent.click(entryPointBtn)
        expect(setAddingMode).toHaveBeenCalled()
        expect(setAddingMode).toHaveBeenCalledWith("ADD_ENTRY")
        fireEvent.click(exitPointBtn)
        expect(setAddingMode).toHaveBeenCalled()
        expect(setAddingMode).toHaveBeenCalledWith("ADD_EXIT")
        fireEvent.click(generalBtn)
        expect(setAddingMode).toHaveBeenCalled()
        expect(setAddingMode).toHaveBeenCalledWith("GENERAL")
    })
    test("check the navigation when click on link", () => {
        const setAddingMode = jest.fn()
        const addingMode = AddingModeEnum.INITIAL_STATE

        render(<TestProvider><CreationModeMenu addingMode={addingMode} setAddingMode={setAddingMode} /></TestProvider>)
        const homeLink = screen.getByTestId("homeLink")
        expect(homeLink).toBeInTheDocument()
        expect(homeLink).toHaveAttribute("href", "/")
        const historyLink = screen.getByText(/history/i)
        expect(historyLink).toBeInTheDocument()
        expect(historyLink).toHaveAttribute("href","/history")
        const saveBtn = screen.getByTitle(/Send route request/i)
        expect(saveBtn).toBeInTheDocument()
        fireEvent.click(saveBtn)
    // TO-FIX check the navigation after response 
    })

})

