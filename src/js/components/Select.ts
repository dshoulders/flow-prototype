import { ComponentProps } from '../types/interfaces.js';
import { html } from '../utils/markup.js';

function Select ({ componentData }: ComponentProps) {
    
    console.log(`Render Select`)

    return html`
        <select />
    `;
}

export default Select;