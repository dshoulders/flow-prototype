import { useEffect, useContext } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import { initialize } from '../utils/network.js';
import ComponentLoader from "./ComponentLoader.js";
import { Component, componentStore, Dispatch as DispatchComponents, ActionType as ActionTypeComponents } from '../context/components.js';
import { State, stateStore, Dispatch as DispatchState, ActionType as ActionTypeState } from '../context/state.js';

function Root ({ flowId, flowVersionId }) {

    const { dispatch: dispatchState }: { dispatch: DispatchState, state: State } = useContext(stateStore);
    const { dispatch: dispatchComponents, components }: { dispatch: DispatchComponents, components: Component[]} = useContext(componentStore);

    useEffect(() => {

        (async () => {

            const invokeResponse = await initialize(flowId, flowVersionId);

            dispatchState({
                type: ActionTypeState.pageResponse,
                payload: {
                    stateId: invokeResponse.stateId, 
                    stateToken: invokeResponse.stateToken, 
                    currentMapElementId: invokeResponse.currentMapElementId,
                },
            })

            dispatchComponents({
                type: ActionTypeComponents.pageResponse,
                payload: invokeResponse,
            });
        })();

    }, [flowId, flowVersionId]);

    const mainContainer = components.find(component => component.parentId === null) ?? null;
    const outcomes = components.filter(component => component.type === 'outcome');

    return html`
        <div className="flow">
            ${
                mainContainer ? html`<${ComponentLoader} id=${mainContainer.id} type=${mainContainer.type} />` : 'loading map element...'
            }   
            ${
                outcomes.map(outcome => html`<${ComponentLoader} id=${outcome.id} type=${'outcome'} />`)
            }         
        </div>
    `;
}

export default Root;
