import { html } from '../utils/markup.js';
import { useComponent } from "../hooks/hooks.js";

function createMarkup(str) {
    return {__html: str};
}

function Presentation ({ id, type }) {

    const component = useComponent(id);

    // TODO: Don't use dangerouslySetInnerHTML

    return html`
        <div dangerouslySetInnerHTML=${createMarkup(component.content)} />
    `;
}

export default Presentation;