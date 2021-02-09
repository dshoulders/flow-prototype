import { useContext } from '../lib/react/react-internal.js';
import { componentStore } from '../state/components.js';
import { html } from '../utils/markup.js';

function Presentation ({ id, type }) {

    const { components } = useContext(componentStore);

    return html`
        <div>
        ${ id }
        presentation
        </div>
    `;
}

export default Presentation;