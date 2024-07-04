import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IndexPage from '../page';

describe('IndexPage', () => {
    it('renders a heading', () => {
        render(<IndexPage />);
        const heading = screen.getByRole('heading', { name: /GitHub Repositories/i });
        expect(heading).toBeInTheDocument();
    });

    it('renders repository items', async () => {
        render(<IndexPage />);
        const repoItems = await screen.findAllByRole('listitem');
        expect(repoItems).toHaveLength(10); // assuming 10 items per page
    });

    it('toggles the flag button', async () => {
        render(<IndexPage />);
        const flagButtons = await screen.findAllByRole('button', { name: /flag/i });
        expect(flagButtons[0]).toHaveTextContent('Flag');

        fireEvent.click(flagButtons[0]);
        expect(flagButtons[0]).toHaveTextContent('Unflag');
    });

    it('paginates results', async () => {
        render(<IndexPage />);
        const nextButton = screen.getByRole('button', { name: /next/i });
        fireEvent.click(nextButton);

        const repoItems = await screen.findAllByRole('listitem');
        expect(repoItems).toHaveLength(10); // still assuming 10 items per page
    });
});
