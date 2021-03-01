import { html } from '../utils/markup.js';
import { useEffect, useState } from '../lib/react/react-internal.js';
import { ComponentProps } from '../types/interfaces.js';

/** Default Flow InputText component */
const InputText = ({ componentData, updateComponent }: ComponentProps) => {

    const [value, setValue] = useState(componentData.contentValue);

    useEffect(() => {
        /** Ensure value is updated when copmponentData changes */
        setValue(componentData.contentValue);
    }, [componentData.contentValue])
    
    const onChange = ({ target: { value }}) => setValue(value);

    const onBlur = ({ target: { value }}) => updateComponent({
        id: componentData.id,
        contentValue: value,
    });

    console.log(`Render InputText: ${value}`)

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