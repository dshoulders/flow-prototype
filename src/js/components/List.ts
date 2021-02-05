import { useContext, lazy, Suspense } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import { listItemStore } from '../state/listItems.js';
import components from '../config/components.js';

const ListItem = lazy(() => import(components['list-item'])); // Lazy-loaded

function List (props) {

    const { listItems } = useContext(listItemStore);

    return html`
        <${Suspense} fallback=${html`<div>loading...</div>`}>
            <ul>                
                ${
                    listItems.map(item => html`<${ListItem} name=${item.name} id=${item.id} key=${item.id} />`)
                }
            </ul>
        </${Suspense}>
    `;
}

export default List;