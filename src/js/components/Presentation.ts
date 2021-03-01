import { ComponentProps } from '../types/interfaces.js';
import { html } from '../utils/markup.js';

function createMarkup(str) {
    return {__html: str};
}

/** Default Flow presentation component */
function Presentation ({ componentData }: ComponentProps) {
    
    console.log(`Render Presentation: ${componentData.content}`)

    // TODO: Don't use dangerouslySetInnerHTML

    return html`
        <div dangerouslySetInnerHTML=${createMarkup(componentData.content)} />
    `;
}

export default Presentation;