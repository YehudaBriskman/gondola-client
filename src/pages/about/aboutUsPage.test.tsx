import { describe } from '@jest/globals';
import AboutUsPage from '../about/AboutUsPage';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import Homepage from '../homepage/Homepage';




describe('home page component test', () => {
    test('the gondola header is presented', () => {
        render(<BrowserRouter><AboutUsPage></AboutUsPage></BrowserRouter>);
        const aboutUsText = screen.getByText('Gondola');
        expect(aboutUsText).toBeVisible();
    });

    test('about us text is on the page', () => {
        render(<BrowserRouter><AboutUsPage></AboutUsPage></BrowserRouter>);
        screen.getByText('The system was developed by');
        screen.getByText(`'AMLAH Development' Department.`);
        screen.getByText('Purpose of the system is to plan flight routes.');
    });

    test('"go Back" link button working and navigating the user to home page', () => {
        render(
            <MemoryRouter initialEntries={['/about']}>
                <Routes>
                    <Route path='/about' element={<AboutUsPage />} />
                    <Route path='/' element={<Homepage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Gondola')).toBeInTheDocument();
        const link = screen.getByTitle('home-icon');
        expect(link).toBeInTheDocument();
        expect(link.getAttribute('href')).toBe('/');

        fireEvent.click(link);

        expect(screen.getByText('Gondola')).toBeInTheDocument();
    });

    test.todo('check footer if presented');
    test.todo('check the gondola icon');
    test.todo('check all 3 icons of the teams on the footer');
});



//describe() - creates a block to group together several related tests. to be more organized.
//test.todo() - if you are planning on writing tests. these tests will be highlighted in the summary output
//               at the end so you know how many tests you still need todo.

