import { html } from '../utils/markup.js';
import { useState } from '../lib/react/react-internal.js';
import { Component } from "../context/components.js";

interface InputProps { 
    component: Component, 
    updateComponent: (component: Component) => Component
};

const InputText = ({ component, updateComponent }: InputProps) => {

    const [value, setValue] = useState(component.contentValue);
    
    const onChange = ({ target: { value }}) => setValue(value);

    const onBlur = ({ target: { value }}) => updateComponent({
        id: component.id,
        contentValue: value,
    });

    return html`
        <span className='form-control'>
            <label for=${component.id} className='label'>
                ${component.label}
                ${
                    component.isRequired || true ? html`<abbr className="required" title="required" aria-label="required">*</abbr>` : null
                }
            </label>
            <input className=${'input'} id=${component.id} value=${value} onChange=${onChange} onBlur=${onBlur} />
        </span>
    `;
}

export default InputText;