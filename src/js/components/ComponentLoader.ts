import { lazy, Suspense, useState, useEffect } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import components from '../config/components.js';
import ComponentPropsProvider from './ComponentPropsProvider.js';

/**
 * Loads a file containing a default export of a React component.
 * The file url is defined in the component list (config/components.js) in the format: "componentType": "file-url.js"
 * Uses React.Suspense to show a fallback UI while a file is being loaded.
 * Passes the lazy loaded React component to the child component, once loaded.
 * All props passed to this component, except componentType are passed on to the child component.
 */
const ComponentLoader = ({ componentType, componentId, applicationData, updateApplicationData, invoke }) => {

    const [Component, setComponent] = useState(lazy(() => import(components[componentType.toLowerCase()])));

    useEffect(() => {
        setComponent(lazy(() => import(components[componentType.toLowerCase()])));
    }, [componentType])

    return html`
            <${Suspense} fallback=${html`<div></div>`}>
                <${ComponentPropsProvider} 
                    Component=${Component} 
                    componentId=${componentId} 
                    applicationData=${applicationData} 
                    updateApplicationData=${updateApplicationData}
                    invoke=${invoke}
                />
            </${Suspense}>
        `;
};

export default ComponentLoader;

