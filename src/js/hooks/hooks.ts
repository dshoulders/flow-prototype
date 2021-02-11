import { useContext } from '../lib/react/react-internal.js';
import { postData, InvokeRequest } from '../utils/network.js';
import { PLATFROM_URI, InvokeType } from "../constants.js";
import { Component, componentStore, Dispatch as DispatchComponents, ActionType as ActionTypeComponents } from '../context/components.js';
import { State, stateStore, Dispatch as DispatchState, ActionType as ActionTypeState } from '../context/state.js';
import { Outcome as TOutcome, outcomeStore, Dispatch as DispatchOutcomes, ActionType as ActionTypeOutcomes } from '../context/outcomes.js';

export const useComponent = (id: string) => {
    const components: Component[] = useContext(componentStore).components;

    return components.find(component => component.id === id);
}

export const useInvoke = async (outcomeId?: string) => {

    const { dispatch: dispatchState, state }: { dispatch: DispatchState, state: State} = useContext(stateStore); 
    const { dispatch: dispatchOutcomes, outcomes }: { dispatch: DispatchOutcomes, outcomes: TOutcome[] } = useContext(outcomeStore);
    const { dispatch: dispatchComponents, components }: { dispatch: DispatchComponents, components: Component[]} = useContext(componentStore);

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
            selectedOutcomeId: outcomeId,
        },
    };

    const { mapElementInvokeResponses, stateId, stateToken, currentMapElementId } = await postData(
        `${PLATFROM_URI}/api/run/1/state/${state.currentMapElementId}`, 
        invokeRequest,
    );

    dispatchState({
        type: ActionTypeState.pageResponse,
        payload: {
            stateId, 
            stateToken, 
            currentMapElementId,
        },
    })

    dispatchComponents({
        type: ActionTypeComponents.pageResponse,
        payload: mapElementInvokeResponses[0].pageResponse,
    });

    dispatchOutcomes({
        type: ActionTypeOutcomes.pageResponse,
        payload: mapElementInvokeResponses[0].pageResponse.outcomeResponses,
    })
};