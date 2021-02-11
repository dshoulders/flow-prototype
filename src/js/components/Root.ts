import { useState, useEffect, useContext } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import { postData, InitailizeRequest, InvokeRequest } from '../utils/network.js';
import { PLATFROM_URI, InvokeType } from "../constants.js";
import ComponentLoader from "./ComponentLoader.js";
import { Component, componentStore, Dispatch as DispatchComponents, ActionType as ActionTypeComponents } from '../context/components.js';
import { stateStore, Dispatch as DispatchState, ActionType as ActionTypeState } from '../context/state.js';
import { Outcome as TOutcome, outcomeStore, Dispatch as DispatchOutcomes, ActionType as ActionTypeOutcomes } from '../context/outcomes.js';
import Outcome from "./Outcome.js";
import { useComponent, invoke } from '../hooks/hooks.js';

function Root ({ flowId, flowVersionId }) {

    const dispatchState: DispatchState = useContext(stateStore).dispatch;
    const { dispatch: dispatchOutcomes, outcomes }: { dispatch: DispatchOutcomes, outcomes: TOutcome[] } = useContext(outcomeStore);
    const { dispatch: dispatchComponents, components }: { dispatch: DispatchComponents, components: Component[]} = useContext(componentStore);

    useEffect(() => {
        
        const doStuff = async () => {

            const initailizeRequest: InitailizeRequest = {
                flowId: {
                    id: flowId,
                    versionId: flowVersionId
                },
            };

            const { stateId, stateToken, currentMapElementId } = await postData(`${PLATFROM_URI}/api/run/1`, initailizeRequest);

            dispatchState({
                type: ActionTypeState.pageResponse,
                payload: {
                    stateId, 
                    stateToken, 
                    currentMapElementId,
                },
            });        

            const invokeRequest: InvokeRequest = {
                invokeType: InvokeType.forward,
                mapElementInvokeRequest: {},
                stateId,
                stateToken,
                currentMapElementId,
            };

            const { mapElementInvokeResponses } = await postData(`${PLATFROM_URI}/api/run/1/state/${currentMapElementId}`, invokeRequest);

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
                payload: mapElementInvokeResponses[0].outcomeResponses,
            });
        };

        doStuff();
    }, []);

    const mainContainer = components.find(component => component.parentId === null) ?? null;

    return html`
        <div className="flow">
            ${
                mainContainer ? html`<${ComponentLoader} id=${mainContainer.id} type=${mainContainer.type} />` : 'loading map element...'
            }   
            ${
                outcomes.map(outcome => html`<${Outcome} outcome=${outcome} />`)
            }         
        </div>
    `;
}

export default Root;
