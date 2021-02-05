import { useContext } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import { listItemStore, ListItem as TListItem, Dispatch } from '../state/listItems.js';

function ListItem ({ name, id }: TListItem) {

    const dispatch: Dispatch  = useContext(listItemStore).dispatch;

    return html`
        <li key=${id}>
            <button 
                onClick=${
                    () => dispatch({ 
                        type: 'REMOVE_ITEM', 
                        payload: { id, name: null }
                    })
                }
            >X</button>
            ${name}
        </li>
    `;
}

export default ListItem;
