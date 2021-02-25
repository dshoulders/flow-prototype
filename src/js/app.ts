import { render } from './lib/react-dom/react-dom-internal.js';
import { html } from './utils/markup.js';
import Root from './components/Root.js';

// Import statements should all use .js extension so that they are correct when transpiled
// Typescript transformations do not alter import paths
// https://github.com/evanw/esbuild/issues/622 

function App() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const flowId = urlParams.get('flow-id');
    const flowVersionId = urlParams.get('flow-version-id');

    return html`
        <${Root} flowId=${flowId} flowVersionId=${flowVersionId}/>
    `;
}

render(html`<${App}/>`, document.getElementById('app'));

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('../service-worker.js').then(function (registration) {
            // Registration successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // Registration failed
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
