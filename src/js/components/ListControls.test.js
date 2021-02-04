import { screen, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { html } from '../utils/markup.js';
import { ListItemProvider } from '../state/listItems.js';
import ListControls from './ListControls.js';

test('loads and displays greeting', async () => {

    render(html`<${ListItemProvider}><${ListControls}/></${ListItemProvider}>`);

    screen.getByText('Add').click();

    const lazyElement = await screen.findByText(/Jenny/i)

    await waitFor(() =>
        expect(lazyElement).toBeInTheDocument()
    )
});