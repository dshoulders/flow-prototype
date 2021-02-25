import { lazy, Suspense, useState, useEffect } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import components from '../config/components.js';
import ComponentPropsProvider from './ComponentPropsProvider.js';

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

