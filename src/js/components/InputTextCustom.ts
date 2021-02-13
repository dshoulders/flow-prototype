import { html } from 'http://localhost:8080/js/utils/markup.js';
import { useState } from 'http://localhost:8080/js/lib/react/react-internal.js';
import { Component } from "http://localhost:8080/js/context/components.js";

interface InputProps { 
    component: Component, 
    updateComponent: (component: Component) => Component
};

const InputText = ({ component, updateComponent }: InputProps) => {

    const [value, setValue] = useState(component.contentValue);
    
    const onChange = ({ target: { value }}) => setValue(value + '-');

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