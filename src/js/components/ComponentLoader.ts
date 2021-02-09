import { lazy, Suspense } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import components from '../config/components.js';

function ComponentLoader ({ id, type = '' }) {

    const Component = lazy(() => import(components[type.toLowerCase()]));

    return html`
        <${Suspense} fallback=${html`<div>loading component...</div>`}>
            <${Component} id=${id} type=${type} />
        </${Suspense}>
    `;
}

export default ComponentLoader;