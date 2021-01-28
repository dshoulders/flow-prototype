import { useContext } from 'https://cdn.skypack.dev/react';
import { html } from '../utils/markup.js';
import { listItemStore, ListItem as TListItem } from '../state/listItems.js';

function ListItem ({ name, id }: TListItem) {

    const { dispatch } = useContext(listItemStore);

    return html`
        <li key=${id}>
            <button onClick=${() => dispatch({ type: 'REMOVE_ITEM', payload: { id }})}>X</button>
            ${name}
        </li>
    `;
}

export default ListItem;
