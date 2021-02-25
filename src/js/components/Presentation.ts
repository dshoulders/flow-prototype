import { html } from '../utils/markup.js';

function createMarkup(str) {
    return {__html: str};
}

function Presentation ({ componentData }) {

    // TODO: Don't use dangerouslySetInnerHTML

    return html`
        <div dangerouslySetInnerHTML=${createMarkup(componentData.content)} />
    `;
}

export default Presentation;