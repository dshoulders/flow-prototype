import { useContext } from '../lib/react/react-internal.js';
import { componentStore } from '../state/components.js';
import { html } from '../utils/markup.js';
import ComponentLoader from './ComponentLoader.js';

function Container ({ id, type }) {

    const { components } = useContext(componentStore);

    const children = components?.filter(c => c.pageContainerId === id) ?? [];

    console.log(children);

    return html`
        <div>
        ${ id }
        ${
            children.map(child => html`<${ComponentLoader} id=${child.id} type=${child?.componentType ?? child.containerType} /}>`)
        }
        </div>
    `;
}

export default Container;