import { useContext } from '../lib/react/react-internal.js';
import { componentStore, Layout } from '../context/components.js';
import { html } from '../utils/markup.js';
import ComponentLoader from './ComponentLoader.js';

function Container ({ componentData, appplicationData }) {

    // const components: Layout[] = useContext(componentStore).components;

    // children can be containers or compnents
    const children = [
        ...componentData.containers,
        ...componentData.components,
    ];

    children.sort((a, b) => a.order - b.order);

    return html`
        <div className="container">
        ${
            children.map(child => html`<${ComponentLoader} componentData=${child} appplicationData=${appplicationData} /}>`)
        }
        </div>
    `;
}

export default Container;