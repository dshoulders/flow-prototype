import { InvokeType } from '../constants.js';
import { useEffect, useState } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import { hubConnection, initialize, invoke, sync } from '../utils/network.js';
import ComponentLoader from "./ComponentLoader.js";

function Root ({ flowId, flowVersionId }) {

    const [appState, setAppState] = useState(null);

    useEffect(() => {

        (async () => {

            // Initializes and invokes a forward from start to first map element
            const invokeResponse = await initialize(flowId, flowVersionId);

            setAppState(invokeResponse);
        })();

    }, [flowId, flowVersionId, setAppState]);

    useEffect(() => {

        const receiveInvoke = (outcomeId) => {
            // A collaborator has invoked this outcome
            // We need to do the same 
            invokeHandler({ outcomeId });
        }

        hubConnection.on("ReceiveInvoke", receiveInvoke);

        return () => hubConnection.off("ReceiveInvoke", receiveInvoke);
    }, [appState]);

    const invokeHandler = async ({ outcomeId, invokeType = InvokeType.forward }) => {

        const invokeResponse = await invoke({
            stateId: appState.stateId,
            stateToken: appState.stateToken,
            currentMapElementId: appState.currentMapElementId,
            selectedOutcomeId: outcomeId,
            components: appState.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses,
            invokeType,
        });

        setAppState(invokeResponse);
        
        return invokeResponse;
    };

    const onInvoke = ({ outcomeId, invokeType = InvokeType.forward }) => {

        const invokeResponse = invokeHandler({ outcomeId, invokeType });

        // Inform collaborators that we have invoked the outcome
        hubConnection.invoke('SendInvoke', outcomeId).catch(function (err) {
            return console.error(err.toString());
        });

        return invokeResponse;
    };

    const pageResponse = appState?.mapElementInvokeResponses[0]?.pageResponse ?? null;
    const mainContainer = pageResponse?.pageContainerResponses[0] ?? null;
    const pageOutcomes = appState?.mapElementInvokeResponses[0]?.outcomeResponses?.map(
        outcomeResponse => ({
            ...outcomeResponse, 
            componentType: 'outcome',
        }),
    ) ?? [];

    const updateApplicationData = (applicationData) => {

        // TODO: allow a partial appState and merge it before setting state

        setAppState({
            ...applicationData
        });
    };

    console.log(`Render Root`)

    return html`
        <div className="flow">
            ${
                mainContainer ? html`
                    <${ComponentLoader} 
                        componentId=${mainContainer.id} 
                        componentType=${mainContainer.containerType}
                        applicationData=${appState}
                        updateApplicationData=${updateApplicationData}
                        invoke=${onInvoke}
                    />` : 'loading map element...'
            }   
            ${
                pageOutcomes.map(outcome => html`
                    <${ComponentLoader} 
                        componentId=${outcome.id} 
                        componentType='outcome'
                        applicationData=${appState}
                        updateApplicationData=${updateApplicationData}
                        invoke=${onInvoke}
                    />`)
            }         
        </div>
    `;
}

export default Root;
