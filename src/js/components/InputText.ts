import { html } from '../utils/markup.js';
import { useState } from '../lib/react/react-internal.js';
import { Component } from "../context/components.js";

interface InputProps { 
    componentData: Component, 
    updateComponent: (component: Component) => Component
};

const InputText = ({ componentData, updateComponent }: InputProps) => {

    const [value, setValue] = useState(componentData.contentValue);
    
    const onChange = ({ target: { value }}) => setValue(value);

    const onBlur = ({ target: { value }}) => updateComponent({
        id: componentData.id,
        contentValue: value,
    });

    return html`
        <span className='form-control'>
            <label for=${componentData.id} className='label'>
                ${componentData.label}
                ${
                    componentData.isRequired || true ? html`<abbr className="required" title="required" aria-label="required">*</abbr>` : null
                }
            </label>
            <input className=${'input'} id=${componentData.id} value=${value} onChange=${onChange} onBlur=${onBlur} />
        </span>
    `;
}

export default InputText;