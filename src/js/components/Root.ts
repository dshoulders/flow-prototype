import { useState, useEffect, useContext } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import { postData, InitailizeRequest, InvokeRequest } from '../utils/network.js';
import { PLATFROM_URI, InvokeType } from "../constants.js";
import ComponentLoader from "./ComponentLoader.js";
import { componentStore, Dispatch } from '../state/components.js';
import { ActionType } from "../state/actionTypes.js";

function Root ({ flowId, flowVersionId }) {

    const [mainContainer, setMainContainer] = useState(null);

    const dispatch: Dispatch = useContext(componentStore).dispatch;

    useEffect(async () => {

        const initailizeRequest: InitailizeRequest = {
            flowId: {
                id: flowId,
                versionId: flowVersionId
            },
        };

        const { stateId, stateToken, currentMapElementId } = await postData(`${PLATFROM_URI}/api/run/1`, initailizeRequest);

        const invokeRequest: InvokeRequest = {
            invokeType: InvokeType.forward,
            mapElementInvokeRequest: {},
            stateId,
            stateToken,
            currentMapElementId,
        };

        const { mapElementInvokeResponses } = await postData(`${PLATFROM_URI}/api/run/1/state/${currentMapElementId}`, invokeRequest);

        dispatch({
            type: ActionType.pageResponse,
            payload: mapElementInvokeResponses[0].pageResponse,
        });

        const mainContainer = mapElementInvokeResponses[0]?.pageResponse?.pageContainerResponses[0] ?? null;

        setMainContainer(mainContainer);
    }, []);


    return html`
        <div className="flow">
            ${
                mainContainer ? html`<${ComponentLoader} id=${mainContainer.id} type=${mainContainer.containerType} />` : 'loading map element...'
            }            
        </div>
    `;
}

export default Root;
