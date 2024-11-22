import React from 'react'
import { MemoryRouter, BrowserRouter } from 'react-router-dom'
import { InitialEntry } from '@remix-run/router'
import { MapContainer } from 'react-leaflet'
import { Provider } from 'react-redux'
import store from './store/store'


type TestProviderProps = {
    withMap?: boolean,
    children: React.ReactNode,
} & (
        { memory?: false } | {
            memory: true;
            entries: InitialEntry[];
        }
    )
export default function TestProvider({ children, withMap, ...props }: TestProviderProps) {
    const Router = props.memory ? MemoryRouter : BrowserRouter;
    const Map = withMap ? MapContainer : React.Fragment;

    return (
        <Router initialEntries={props.memory ? props.entries : undefined}>
            <Provider store={store}>
                <Map>
                    {children}
                </Map>
            </Provider>
        </Router>
    )
}
