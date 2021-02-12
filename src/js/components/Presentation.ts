import { html } from '../utils/markup.js';

function createMarkup(str) {
    return {__html: str};
}

function Presentation ({ component }) {

    // TODO: Don't use dangerouslySetInnerHTML

    return html`
        <div dangerouslySetInnerHTML=${createMarkup(component.content)} />
    `;
}

export default Presentation;