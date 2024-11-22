import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import General from "./General";
import TestProvider from "../../../TestProvider";

function getFormFields() {
    const form: HTMLFormElement = screen.getByTestId("general-form")
    const speed: HTMLInputElement = screen.getByLabelText("Speed")
    const alt: HTMLInputElement = screen.getByLabelText(/altitude/i)
    const wind_d: HTMLInputElement = screen.getByLabelText(/wind Direction/i)
    const wind_s: HTMLInputElement = screen.getByLabelText(/wind Speed/i)
    const radius: HTMLInputElement = screen.getByLabelText(/radius/i)
    const photo_d: HTMLInputElement = screen.getByLabelText(/photo delay/i)
    const notes: HTMLInputElement = screen.getByLabelText(/notes/i)
    const submit: HTMLButtonElement = screen.getByTestId("submit")
    const reset: HTMLButtonElement = screen.getByTestId("reset")
    return { form, speed, alt, wind_d, wind_s, radius, photo_d, submit, reset, notes }
}

describe("General form testing", () => {
    test("Render form a expected", () => {
        render(<TestProvider><General setAddingMode={jest.fn()} /></TestProvider>);

        const { alt, form, photo_d, radius, speed, wind_d, wind_s, notes, reset, submit } = getFormFields();
        
        expect(form).toBeInTheDocument()
        expect(speed).toBeInTheDocument()
        expect(alt).toBeInTheDocument()
        expect(wind_s).toBeInTheDocument()
        expect(wind_d).toBeInTheDocument()
        expect(radius).toBeInTheDocument()
        expect(photo_d).toBeInTheDocument()
        expect(notes).toBeInTheDocument()
        expect(reset).toBeInTheDocument()
        expect(submit).toBeInTheDocument()
        
    });

    test("Check form validation", async () => {
        render(<TestProvider><General setAddingMode={jest.fn()} /></TestProvider>);

        const { alt, form, photo_d, radius, speed, wind_d, wind_s, reset } = getFormFields()

        // sending one invalid value
        speed.value = "a"
        alt.value = "1"
        wind_d.value = "1"
        wind_s.value = "1"
        radius.value = "1"
        photo_d.value = "1"
        expect(form).toBeInvalid()

        // fix invalid value
        speed.value = "1";
        expect(form).toBeValid()

        fireEvent.click(reset)
        expect(form).toBeInvalid()

    })
})
