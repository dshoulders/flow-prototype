import { useContext } from '../lib/react/react-internal.js';
import { componentStore } from '../state/components.js';
import { html } from '../utils/markup.js';

function InputText ({ id, type }) {

    const { components } = useContext(componentStore);

    return html`
        <div>
        ${ id }
        input
        </div>
    `;
}

export default InputText;