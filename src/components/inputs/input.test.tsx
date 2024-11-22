import { fireEvent, render, screen } from "@testing-library/react"
import TestProvider from "../../TestProvider";
import Input from "./Input";

describe("check the input component", () => {
    test("find the input element on the screen", () => {
        render(<TestProvider ><Input type="number" placeholder="placeHolderTest" /></TestProvider>);
        expect(screen.getByPlaceholderText("placeHolderTest")).toBeInTheDocument()

    })

    test("check the label of the input", () => {
        render(<TestProvider ><Input name="name" label="inputLabel" type="number" placeholder="placeHolderTest" /></TestProvider>);
        expect(screen.getByLabelText("inputLabel")).toBeInTheDocument()

    })
    test("check the number of the inputs", () => {
        render(<TestProvider ><Input name="name" type="text" /></TestProvider>);
        const input = screen.getAllByRole("textbox")
        expect(input).toHaveLength(1)

    })
    test("check the lang of the number in the element", () => {
        render(<TestProvider ><Input placeholder="text" name="nameTest" type="number" /></TestProvider>);
        const input = screen.getByPlaceholderText<HTMLInputElement>("text")
        const userInput =  32.1234567
        expect(input).toBeInTheDocument()

        fireEvent.change(input, {
            target: {
                value: userInput
            }
        })       
        expect(+input.value).toBe(userInput)
    })
})
