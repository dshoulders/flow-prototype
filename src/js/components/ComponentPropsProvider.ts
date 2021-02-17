import { useContext } from '../lib/react/react-internal.js';
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

const ComponentPropsProvider = ({ componentId, Component }) => {

    const { dispatch: dispatchComponents, components }: { dispatch: DispatchComponents, components: Component[]} = useContext(componentStore);
    const { dispatch: dispatchState, state }: { dispatch: DispatchState, state: State } = useContext(stateStore);

    const component = components.find(component => component.id === componentId);

    const updateComponent = (component) => {
        dispatchComponents({
            type: ActionType.updateComponent,
            payload: component,
        })
    };

    const invokeHandler = async ({ outcomeId = componentId, invokeType = InvokeType.forward } = { outcomeId: componentId, invokeType: InvokeType.forward }) => {
        const response = await invoke({
            stateId: state.stateId,
            stateToken: state.stateToken,
            currentMapElementId: state.currentMapElementId,
            selectedOutcomeId: outcomeId,
            components,
            invokeType,
        });

        dispatchState({
            type: ActionTypeState.pageResponse,
            payload: {
                stateId: response.stateId, 
                stateToken: response.stateToken, 
                currentMapElementId: response.currentMapElementId,
            },
        })

        dispatchComponents({
            type: ActionTypeComponents.pageResponse,
            payload: response,
        });

        return response;
    }

    return html`
        <${Component} component=${component} updateComponent=${updateComponent} invokeOutcome=${invokeHandler} />
    `;
};

export default ComponentPropsProvider;
