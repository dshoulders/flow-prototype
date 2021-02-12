import { useContext } from '../lib/react/react-internal.js';
import { componentStore, Layout } from '../context/components.js';
import { html } from '../utils/markup.js';
import ComponentLoader from './ComponentLoader.js';

function Container ({ component }) {

    const components: Layout[] = useContext(componentStore).components;

    // children can be containers or compnents
    const children = components?.filter(c => c.parentId === component.id) ?? [];
    children.sort((a, b) => a.order - b.order);

    return html`
        <div className="container">
        ${
            children.map(child => html`<${ComponentLoader} id=${child.id} type=${child.type} /}>`)
        }
        </div>
    `;
}

export default Container;