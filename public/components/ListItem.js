import { useContext } from 'https://cdn.skypack.dev/react';
import { html } from '../utils/markup.js';
import { listItemStore } from '../state/listItems.js';
import { ListItem } from '../state/listItems.ts';
function ListItem({ name , id  }) {
    const { dispatch  } = useContext(listItemStore);
    return html`\n        <li key=${id}>\n            <button onClick=${()=>dispatch({
            type: 'REMOVE_ITEM',
            id
        })
    }>X</button>\n            ${name}\n        </li>\n    `;
}
export default ListItem;
