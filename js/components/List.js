import * as React from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import { listItemStore } from '../state/listItems.js';
import components from '../config/components.js';

const ListItem = React.lazy(() => import(components['list-item'])); // Lazy-loaded

function List (props) {

    const { listItems } = React.useContext(listItemStore);

    return html`
        <${React.Suspense} fallback=${html`<div>loading...</div>`}>
            <ul>                
                ${
                    listItems.map(item => html`<${ListItem} name=${item.name} id=${item.id} key=${item.id} />`)
                }
            </ul>
        </${React.Suspense}>
    `;
}

export default List;