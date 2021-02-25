import { html } from '../utils/markup.js';
import { useState } from '../lib/react/react-internal.js';
import { ComponentProps } from "./ComponentPropsProvider.js";

const Outcome = ({ componentData, invoke }: ComponentProps) => {

    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {

        if (isLoading === true) return;

        setIsLoading(true);

        await invoke({
            outcomeId: componentData.id,
        });

        setIsLoading(false);
    };

    return html`
        <button 
            className='outcome${isLoading ? ' is-loading' : ''}' 
            onClick=${onClick}
        >
            ${componentData.label}
        <span className='loader' /></button>
    `;
}

export default Outcome;
