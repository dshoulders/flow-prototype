import { useContext, lazy, Suspense } from 'https://cdn.skypack.dev/react';
import { html } from '../utils/markup.js';
import { listItemStore } from '../state/listItems.js';
import components from '../config/components.js';
const ListItem = lazy(()=>import(components['list-item'])
); // Lazy-loaded
function List(props) {
    const { listItems  } = useContext(listItemStore);
    return html`\n        <${Suspense} fallback=${html`<div>loading...</div>`}>\n            <ul>                \n                ${listItems.map((item)=>html`<${ListItem} name=${item.name} id=${item.id} />`
    )}\n            </ul>\n        </${Suspense}>\n    `;
}
export default List;
