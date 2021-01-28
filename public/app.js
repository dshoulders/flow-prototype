import { render } from 'https://cdn.skypack.dev/react-dom';
import { html } from './utils/markup.js';
import { ListItemProvider } from './state/listItems.js';
import ListControls from './components/ListControls.js';
function App() {
    return html`\n        <${ListItemProvider}>\n            <${ListControls}/>\n        </${ListItemProvider}>\n    `;
}
render(html`<${App}/>`, document.getElementById('app'));
