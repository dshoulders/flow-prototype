import * as React from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import { listItemStore } from '../state/listItems.js';
import List from './List.js';

const ListControls = () => {

    const { dispatch } = React.useContext(listItemStore);

    return html`<div>
        <style>
        .lists {
            display: flex;
        }
        </style>
        <div className="lists" title="List of names">
            <${List}/>
        </div>
        <button onClick=${() => dispatch({ type: 'ADD_ITEM', name: 'Jenny' })}>Add</button>
        <button onClick=${() => dispatch({ type: 'REVERSE_ITEMS' })}>Reverse</button>
        <button onClick=${() => dispatch({ type: 'RENAME_ITEMS' })}>Rename</button>
    </div>`
}

export default ListControls;
