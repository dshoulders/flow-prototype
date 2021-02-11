import { render } from './lib/react-dom/react-dom-internal.js';
import { html } from './utils/markup.js';
import { StateProvider } from './context/state.js';
import { ComponentProvider } from './context/components.js';
import { OutcomeProvider } from './context/outcomes.js';
import Root from './components/Root.js';

// Import statements should all use .js extension so that they are correct when transpiled
// Typescript transformations do not alter import paths
// https://github.com/evanw/esbuild/issues/622 

function App () {
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    const flowId = urlParams.get('flow-id');
    const flowVersionId = urlParams.get('flow-version-id');

    return html`
        <${StateProvider}>
            <${ComponentProvider}>
                <${OutcomeProvider}>
                    <${Root} flowId=${flowId} flowVersionId=${flowVersionId}/> 
                </${OutcomeProvider}>
            </${ComponentProvider}>
        </${StateProvider}>
    `;
}

render(html`<${App}/>`, document.getElementById('app'));
