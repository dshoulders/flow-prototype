import { useContext, useState } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import { Component, componentStore, Dispatch as DispatchComponents, ActionType as ActionTypeComponents, ActionType } from '../context/components.js';
import { State, stateStore, Dispatch as DispatchState, ActionType as ActionTypeState } from '../context/state.js';
import { invoke } from "../utils/network.js";
import { InvokeType } from '../constants.js';
import { Outcome } from '../context/components.js';

interface InvokeOutcome {
    ({ outcomeId, invokeType }?: { outcomeId?: string, invokeType?: InvokeType }): Promise<{any}>
}

interface UpdateComponent {
    (component: Component): void,
}

export interface ComponentProps { 
    component: Outcome, 
    updateComponent: UpdateComponent,
    invokeOutcome: InvokeOutcome,
};

const ComponentPropsProvider = ({ componentData: initialComponentData, Component, applicationData }) => {

    const [componentData, setComponent] = useState(initialComponentData);

    const updateComponent = (updatedComponentData) => {

        // TODO: Keep record of updated component data
        
        setComponent({
            ...componentData,
            ...updatedComponentData,
        });
    };

    return html`
        <${Component} componentData=${componentData} updateComponent=${updateComponent} applicationData=${applicationData} />
    `;
};

export default ComponentPropsProvider;
