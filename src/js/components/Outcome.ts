import { html } from '../utils/markup.js';
import { useState } from '../lib/react/react-internal.js';

const Outcome = ({ outcome }) => {

    return html`
        <button className='outcome'>${outcome.label}</button>
    `;
}

export default Outcome;