import { render } from './lib/react-dom/react-dom-internal.js';
import { html } from './utils/markup.js';
import { ListItemProvider } from './state/listItems.js';
import ListControls from './components/ListControls.js';

// Import statements should all use .js extension so that they are correct when transpiled
// Typescript transformations do not alter import paths
// https://github.com/evanw/esbuild/issues/622 

function App () {

    return html`
        <${ListItemProvider}>
            <${ListControls}/>
        </${ListItemProvider}>
    `;
}

render(html`<${App}/>`, document.getElementById('app'));
