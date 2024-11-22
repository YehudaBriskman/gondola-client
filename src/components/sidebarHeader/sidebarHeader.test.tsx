import { render, screen } from "@testing-library/react"
import SidebarHeader from './SidebarHeader';
import React from "react";

describe("test for sidebar-header", () => {
    test("check if the logo img is display", () => {
        render(<SidebarHeader name="moti" />);
        const logo = screen.getByAltText("Gondola")
        expect(logo).toBeInTheDocument()
    })
    test("make sure the props is display as need", () => {

        const propsName = "gondola";
        render(<SidebarHeader name={propsName} />);
        const title = screen.getByText(propsName);
        expect(title).toBeInTheDocument();
    })
})
