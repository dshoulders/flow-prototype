import { html } from '../utils/markup.js';
import { useContext } from '../lib/react/react-internal.js';
import { Component, componentStore, Dispatch as DispatchComponents, ActionType as ActionTypeComponents } from '../context/components.js';
import { State, stateStore, Dispatch as DispatchState, ActionType as ActionTypeState } from '../context/state.js';
import { Outcome as TOutcome, outcomeStore, Dispatch as DispatchOutcomes, ActionType as ActionTypeOutcomes } from '../context/outcomes.js';
import { InvokeRequest, postData } from '../utils/network.js';
import { InvokeType, PLATFROM_URI } from '../constants.js';

const Outcome = ({ outcome }: { outcome: TOutcome }) => {

    const { dispatch: dispatchState, state }: { dispatch: DispatchState, state: State} = useContext(stateStore); 
    const { dispatch: dispatchOutcomes, outcomes }: { dispatch: DispatchOutcomes, outcomes: TOutcome[] } = useContext(outcomeStore);
    const { dispatch: dispatchComponents, components }: { dispatch: DispatchComponents, components: Component[]} = useContext(componentStore);

    const onClick = async () => {

        const pageComponentInputResponses = components.map(({ id, contentValue, objectData }) => ({
            pageComponentId: id,
            contentValue,
            objectData, 
        }));

        const invokeRequest: InvokeRequest = {
            invokeType: InvokeType.forward,
            stateId: state.stateId,
            stateToken: state.stateToken,
            currentMapElementId: state.currentMapElementId,
            mapElementInvokeRequest: {
                pageRequest: {
                    pageComponentInputResponses,
                },
                selectedOutcomeId: outcome.id,
            },
        };

        const response = await postData(
            `${PLATFROM_URI}/api/run/1/state/${state.stateId}`, 
            invokeRequest,
        );

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

        dispatchOutcomes({
            type: ActionTypeOutcomes.pageResponse,
            payload: response,
        });

    };

    return html`
        <button className='outcome' onClick=${onClick}>${outcome.label}</button>
    `;
}

export default Outcome;