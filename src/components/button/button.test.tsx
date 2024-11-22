import { render, screen } from "@testing-library/react";
import Button from "./Button";
import TestProvider from "../../TestProvider";

describe("button component", () => {
    test("find the button on the screen", () => {
        render(<TestProvider ><Button /></TestProvider>);
        expect(screen.getByRole("button")).toBeInTheDocument()
    })
    test("check the children", () => {
        render(<TestProvider ><Button >my children</Button></TestProvider>);
        expect(screen.getByText("my children")).toBeInTheDocument()
    })
    test("check the props value", () => {
        render(<TestProvider ><Button data-testid="testidBtn"></Button></TestProvider>);
        expect(screen.getByTestId("testidBtn")).toBeInTheDocument()
    })
})
