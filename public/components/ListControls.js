import { useContext } from 'https://cdn.skypack.dev/react';
import { html } from '../utils/markup.js';
import { listItemStore } from '../state/listItems.js';
import List from './List.js';
const ListControls = ()=>{
    const { dispatch  } = useContext(listItemStore);
    return html`<div>\n        <style>\n        .lists {\n            display: flex;\n        }\n        </style>\n        <div className="lists">\n            <${List}/>\n        </div>\n        <button onClick=${()=>dispatch({
            type: 'ADD_ITEM',
            name: 'Jenny'
        })
    }>Add</button>\n        <button onClick=${()=>dispatch({
            type: 'REVERSE_ITEMS'
        })
    }>Reverse</button>\n        <button onClick=${()=>dispatch({
            type: 'RENAME_ITEMS'
        })
    }>Rename</button>\n    </div>`;
};
export default ListControls;
