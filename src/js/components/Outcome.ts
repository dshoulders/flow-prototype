import { html } from '../utils/markup.js';
import { useState } from '../lib/react/react-internal.js';
import { ComponentProps } from "./ComponentPropsProvider.js";

const Outcome = ({ componentData: outcome, invokeOutcome }: ComponentProps) => {

    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {

        if (isLoading === true) return;

        setIsLoading(true);

        await invokeOutcome();

        setIsLoading(false);
    };

    return html`
        <button 
            className='outcome${isLoading ? ' is-loading' : ''}' 
            onClick=${onClick}
        >
            ${outcome.label}
        <span className='loader' /></button>
    `;
}

export default Outcome;
