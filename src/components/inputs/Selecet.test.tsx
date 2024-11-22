import { fireEvent, render, screen } from "@testing-library/react"
import TestProvider from "../../TestProvider"
import Select from "./Select"

describe("select component", () => {
    test("find all the elements on the screen", () => {
        render(<TestProvider >
            <Select label={"LabelName"} name={"name"} >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </Select>
        </TestProvider>)

        const optionElementArr = screen.getAllByRole("option")
        const selectElement = screen.getByRole("combobox")
        const optionElement = screen.getByRole("option", { name: "1" })
        setTimeout(() => {
            // eslint-disable-next-line testing-library/await-async-query
            const labelElement = screen.findByLabelText("LabelName")
            expect(labelElement).toBeInTheDocument()
        }, 0)
        expect(optionElementArr).toHaveLength(5)
        expect(selectElement).toBeInTheDocument()
        expect(optionElement).toBeInTheDocument()

    })
    test("find the real length of option", () => {
        render(<TestProvider >
            <Select label={"LabelName"} name={"name"} >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </Select>
        </TestProvider>)
        const optionElement = screen.getAllByRole("option")
        expect(optionElement).toHaveLength(5)
    })
    test("check the change option in the select value in numbers", () => {
        render(<TestProvider >
            <Select label={"LabelName"} name={"name"} >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </Select>
        </TestProvider>)

        const selectElement = screen.getByRole<HTMLSelectElement>("combobox")
        expect(selectElement).toBeInTheDocument()

        fireEvent.change(selectElement, {
            target: {
                value: "2"
            }
        })
        expect(selectElement.value).toBe("2")
    })
    test("check the change option in the select value in strings", () => {
        render(<TestProvider >
            <Select label={"LabelName"} name={"name"} >
                <option>south</option>
                <option>east</option>
                <option>west</option>
                <option>north</option>
            </Select>        </TestProvider>)
        const selectElement = screen.getByRole<HTMLSelectElement>("combobox")
        expect(selectElement).toBeInTheDocument()

        fireEvent.change(selectElement, {
            target: {
                value: "east"
            }
        })
        expect(selectElement.value).toBe("east")

    })
})

