import * as React from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import { listItemStore } from '../state/listItems.js';

function ListItem ({ name, id }) {

    const { dispatch } = React.useContext(listItemStore);

    return html`
        <li key=${id}>
            <button onClick=${() => dispatch({ type: 'REMOVE_ITEM', id })}>X</button>
            ${name}
        </li>
    `;
}

export default ListItem;