import { useContext } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import { listItemStore } from '../state/listItems.js';
import List from './List.js';

const ListControls = () => {

    const { dispatch } = useContext(listItemStore);

    return html`<div>
        <style>
        .lists {
            display: flex;
        }
        </style>
        <div className="lists">
            <${List}/>
        </div>
        <button onClick=${() => dispatch({ type: 'ADD_ITEM', payload: { name: 'Jenny' }})}>Add</button>
        <button onClick=${() => dispatch({ type: 'REVERSE_ITEMS' })}>Reverse</button>
        <button onClick=${() => dispatch({ type: 'RENAME_ITEMS' })}>Rename</button>
    </div>`
}

export default ListControls;
