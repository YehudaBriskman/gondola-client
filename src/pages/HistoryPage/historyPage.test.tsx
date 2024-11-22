
import { describe } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import HistoryPage from './HistoryPage';
import Response from "../../pages/response/Response.tsx";
import TestProvider from '../../TestProvider.tsx';


describe('history page test', () => {

    test('displays items that match the search input', () => {
        render(<TestProvider><HistoryPage /></TestProvider>);
        const inputField = screen.getByPlaceholderText('Search a name...');
        fireEvent.change(inputField, { target: { value: '1' } });
        expect(screen.getByText('plan10')).toBeInTheDocument();
        expect(screen.queryByText('plan2')).toBeNull();
    });

    test('displays correct item name and date', () => {
        render(<TestProvider><HistoryPage /></TestProvider>);
        expect(screen.getByText('plan1')).toBeInTheDocument();
        expect(screen.getByText('17/02/2024')).toBeInTheDocument();
    });

    test('show button works and navigating to the correct page', () => {
        render(
        <TestProvider withMap memory entries={['/history']}>
                    <Routes>
                        <Route path='/history' element={<HistoryPage />} />
                        <Route path='/response/:id' element={<Response />} />
                    </Routes>
        </TestProvider>
   
        );

        expect(screen.getByText('History')).toBeInTheDocument();
        const link = screen.getByTitle('show-button:plan1');
        expect(link).toBeInTheDocument();
        expect(link.getAttribute('href')).toBe('/response/plan1');

        fireEvent.click(link);

        expect(screen.getByText('Legs')).toBeInTheDocument();
    })



    test('display NO RESULTS when no items match the search input', () => {
        render(<TestProvider><HistoryPage /></TestProvider>);
        fireEvent.change(screen.getByPlaceholderText('Search a name...'), { target: { value: 'uwyegfiowe' } });
        expect(screen.getByText('NO RESULTS')).toBeInTheDocument();
    })
})
