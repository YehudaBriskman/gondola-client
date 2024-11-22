import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import AddPolygon from "./AddPolygon"
import { Provider } from "react-redux"
import store from "../../../store/store"
import { MapContainer } from "react-leaflet"
import { HOME_COORDINATES } from "../../../constants"

describe("test edit polygon form", () => {
    const renderAddPolygon = () => {
        const setAddingMode = jest.fn()
        render(
            <MapContainer
                zoomControl={false}
                center={HOME_COORDINATES}
                zoom={7}
            >
                <Provider store={store}>
                    <AddPolygon setAddingMode={setAddingMode} />
                </Provider>
            </MapContainer>
        )
    }
    beforeEach(() => {

        // eslint-disable-next-line testing-library/no-render-in-setup
        renderAddPolygon()
    })
    afterEach(() => {
        cleanup()
    })

    test("when the user add point", () => {

        const latInputElement = screen.getByPlaceholderText("Latitude")
        const LongInputElement = screen.getByPlaceholderText("Longitude")
        const plusBtn = screen.getByText('+')

        fireEvent.change(latInputElement, {
            target: {
                value: 32
            }
        })
        fireEvent.change(LongInputElement, {
            target: {
                value: 33
            }
        })
        fireEvent.click(plusBtn)
        const latPoint = screen.getByText(32)
        const longPoint = screen.getByText(33)
        expect(latPoint).toBeInTheDocument()
        expect(longPoint).toBeInTheDocument()
    })
    test("when user delete point", async () => {

        const latPoint = screen.getByText(32)
        const longPoint = screen.getByText(33)
        expect(latPoint).toBeInTheDocument()
        expect(longPoint).toBeInTheDocument()

        setTimeout(async () => {
            // eslint-disable-next-line testing-library/await-async-query
            const removeBtn = screen.findByTestId("32r")

            expect(removeBtn).toBeInTheDocument()
            fireEvent.click(await removeBtn)
            expect(latPoint).not.toBeInTheDocument()
            expect(longPoint).not.toBeInTheDocument()
        }, 0)





    })
    test("when user cancel the edit", () => {
        const editBtn = screen.getByTestId("32e")
        const removeBtn = screen.getByTestId("32r")
        expect(editBtn).toBeInTheDocument()
        expect(removeBtn).toBeInTheDocument()

        fireEvent.click(editBtn)

        setTimeout(() => {
            const cancelBtn = screen.getByTestId("32c")
            expect(cancelBtn).toBeInTheDocument()
            const saveBtn = screen.getByTestId("32s")
            expect(saveBtn).toBeInTheDocument()
            fireEvent.click(cancelBtn)
            expect(editBtn).not.toBeInTheDocument()
            expect(removeBtn).not.toBeInTheDocument()
        }, 0)



    })
    test("when user the edit point", async () => {

        const editBtn = screen.getByTestId('32e')

        fireEvent.click(editBtn)

        setTimeout(async () => {
            const saveBtn = screen.findByText('32s')

            const latInputElement = screen.getByText("32")
            fireEvent.change(latInputElement, {
                target: {
                    value: 80
                }
            })

            fireEvent.click(await saveBtn)

            const updateSpan = screen.getByText("80")

            expect(updateSpan).toBeInTheDocument()

        }, 0)


    })

})