import { html } from '../utils/markup.js';
import useComponent from "../hooks/useComponent.js";
import { useState } from '../lib/react/react-internal.js';

const InputText = ({ id, type }) => {

    const component = useComponent(id);
    const [value, setValue] = useState(component.contentValue);

    return html`
        <span className='form-control'>
            <label for=${id} className='label'>
                ${component.label}
                ${
                    component.isRequired || true ? html`<abbr className="required" title="required" aria-label="required">*</abbr>` : null
                }
            </label>
            <input className=${'input'} id=${id} value=${value} onChange=${({ target: { value }}) => setValue(value)} />
        </span>
    `;
}

export default InputText;