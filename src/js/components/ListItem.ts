import { useContext } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import { listItemStore, ListItem as TListItem, Dispatch, ActionType } from '../state/listItems.js';

const ListItem: React.FC<TListItem> = ({ name, id }) => {

    const dispatch: Dispatch  = useContext(listItemStore).dispatch;

    return html`
        <li key=${id}>
            <button 
                onClick=${
                    () => dispatch({ 
                        type: ActionType.removeItem, 
                        payload: { id, name: null }
                    })
                }
            >X</button>
            ${name}
        </li>
    `;
}

export default ListItem;
