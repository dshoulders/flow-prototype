import { useContext } from 'https://cdn.skypack.dev/react';
import { html } from '../utils/markup.js';
import { listItemStore } from '../state/listItems.js';
import { ListItem } from '../state/listItems.ts';

function ListItem ({ name, id }: ListItem) {

    const { dispatch } = useContext(listItemStore);

    return html`
        <li key=${id}>
            <button onClick=${() => dispatch({ type: 'REMOVE_ITEM', id })}>X</button>
            ${name}
        </li>
    `;
}

export default ListItem;