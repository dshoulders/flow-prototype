import { html } from '../utils/markup.js';
import { useComponent } from "../hooks/hooks.js";
import { useState, useContext } from '../lib/react/react-internal.js';
import { componentStore, ActionType } from "../context/components.js";

const InputText = ({ id, type }) => {

    const component = useComponent(id);
    const [value, setValue] = useState(component.contentValue);

    const { dispatch } = useContext(componentStore);

    const onChange = ({ target: { value }}) => setValue(value);

    const onBlur = ({ target: { value }}) => {
        dispatch({
            type: ActionType.valueChange,
            payload: {
                id,
                contentValue: value,
            }
        })
    };

    return html`
        <span className='form-control'>
            <label for=${id} className='label'>
                ${component.label}
                ${
                    component.isRequired || true ? html`<abbr className="required" title="required" aria-label="required">*</abbr>` : null
                }
            </label>
            <input className=${'input'} id=${id} value=${value} onChange=${onChange} onBlur=${onBlur} />
        </span>
    `;
}

export default InputText;