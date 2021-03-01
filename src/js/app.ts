import { render } from './lib/react-dom/react-dom-internal.js';
import { html } from './utils/markup.js';
import Root from './components/Root.js';
import { startRealtimeConnection, startServiceWorker } from './utils/network.js';

/**
 * Import statements should all use .js extension so that they are correct when transpiled
 * Typescript transformations do not alter import paths
 * https://github.com/evanw/esbuild/issues/622
 */

/** The entry component */
function App() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const flowId = urlParams.get('flow-id');
    const flowVersionId = urlParams.get('flow-version-id');

    return html`
        <${Root} flowId=${flowId} flowVersionId=${flowVersionId}/>
    `;
}

/**
 * Render the App component into the #app HTML element
 * TODO: Need to be able to define the element to render into
 */
render(html`<${App}/>`, document.getElementById('app'));

startServiceWorker();
startRealtimeConnection("http://localhost:5000/collaboration");
