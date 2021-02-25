import { html } from '../utils/markup.js';
import ComponentLoader from './ComponentLoader.js';

function Container ({ componentData, updateApplicationData, applicationData, childComponents }) {

    childComponents.sort((a, b) => a.order - b.order);

    return html`
        <div className="container">
        ${
            childComponents.map(child => html`
                <${ComponentLoader} 
                    componentId=${child.id} 
                    componentType=${child.componentType || child.containerType}
                    applicationData=${applicationData}
                    updateApplicationData=${updateApplicationData} 
                />
            `)
        }
        </div>
    `;
}

export default Container;