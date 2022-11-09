import Home from '../pages/index';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Navbar', () => {
    it('renders the navbar', () => {
        render(<Home />);
        // check if all components are rendered
        expect(screen.getByText('Get started')).toBeInTheDocument();
        expect(screen.getByText('Our story')).toBeInTheDocument();
        expect(screen.getByText('Membership')).toBeInTheDocument();
        expect(screen.getByText('Sign In')).toBeInTheDocument();
    })
});

// describe('Hero', () => {
//     it('renders the hero', () => {
//         render(<Home />);
//         expect(screen.getByText())
//     })
// })