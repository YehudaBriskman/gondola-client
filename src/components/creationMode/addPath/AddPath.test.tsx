import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import TestProvider from "../../../TestProvider"
import AddPath from "./AddPath"
import AddingModeEnum from "../../../utils/addingModeEnum"

describe("test the creation mode menu", () => {
    test("find the buttons", () => {
        const setAddingMode = jest.fn()
        render(<TestProvider withMap><AddPath path="entry" setAddingMode={setAddingMode} /></TestProvider>)
        const btn = screen.getAllByRole("button")
        expect(btn).toHaveLength(4)
    })
    test("check if the state is update when the user click on buttons", () => {
        const setAddingMode = jest.fn()
        render(<TestProvider withMap><AddPath path="entry" setAddingMode={setAddingMode} /></TestProvider>)

        const saveBtn = screen.getByRole("button", { name: /save/i })
        const cancelBtn = screen.getByRole("button", { name: /cancel/i })

        expect(saveBtn).toBeInTheDocument()
        expect(cancelBtn).toBeInTheDocument()

        fireEvent.click(saveBtn)
        expect(setAddingMode).toHaveBeenCalledTimes(1)
        expect(setAddingMode).toHaveBeenLastCalledWith(AddingModeEnum.INITIAL_STATE)

        fireEvent.click(cancelBtn)
        expect(setAddingMode).toHaveBeenCalledTimes(2)
        expect(setAddingMode).toHaveBeenLastCalledWith(AddingModeEnum.INITIAL_STATE)

    })
})
