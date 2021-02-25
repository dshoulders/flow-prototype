import { InvokeType } from '../constants.js';
import { useEffect, useState } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import { initialize, invoke } from '../utils/network.js';
import ComponentLoader from "./ComponentLoader.js";

const nestPageResponse = (container, pageResponse) => {

    const containerData = pageResponse.pageContainerDataResponses.find(cd => cd.pageContainerId === container.id);
    const components = pageResponse.pageComponentResponses.reduce((accumulation, componentMeta) => {
        
        if (componentMeta.pageContainerId === container.id) {

            const componentData = pageResponse.pageComponentDataResponses.find(cd => cd.pageComponentId === componentMeta.id);

            const mergedComponent = {
                ...componentMeta,
                ...componentData,
            }

            accumulation.push(mergedComponent);
        }

        return accumulation;
    }, []);

    const containers = container.pageContainerResponses?.map((container) => nestPageResponse(container, pageResponse)) ?? [];

    const mergedContainer = {
        ...container,
        ...containerData,
        components,
        containers,
    };

    return mergedContainer;
};


function Root ({ flowId, flowVersionId }) {

    const initialAppState = {
        componentTree: null,
        pageOutcomes: null,
        navigation: null,
        applicationData: null,
    };

    const [appState, setAppState] = useState(initialAppState);

    useEffect(() => {

        (async () => {

            // Initializes and invokes a forward from start to first map element
            const invokeResponse = await initialize(flowId, flowVersionId);

            const pageResponse = invokeResponse?.mapElementInvokeResponses[0]?.pageResponse ?? null;

            const componentTree = nestPageResponse(pageResponse?.pageContainerResponses[0] ?? null, pageResponse);

            const pageOutcomes = invokeResponse?.mapElementInvokeResponses[0]?.outcomeResponses?.map(
                outcomeResponse => ({
                    ...outcomeResponse, 
                    componentType: 'outcome',
                }),
            ) ?? null;

            setAppState({
                componentTree,
                pageOutcomes,
                navigation,
                applicationData: invokeResponse,
            })
        })();

    }, [flowId, flowVersionId]);

    const invokeHandler = async ({ outcomeId, invokeType = InvokeType.forward }) => {

        // TODO: Get records of updated component data
        
        return await invoke({
            stateId: appState.stateId,
            stateToken: appState.stateToken,
            currentMapElementId: appState.currentMapElementId,
            selectedOutcomeId: outcomeId,
            components,
            invokeType,
        });
    };
    
    const {
        // Processed, nested tree of container, component and outcome data
        // Only containers can be nested and will contain a mixed list of containers and components
        // A component will contain a list of outcomes that should be placed with the component 
        componentTree,
        // Top level page outcome elements data
        pageOutcomes,
        // Top level page navigation element data
        navigation,
        // Full invoke response
        applicationData,
    } = appState;

    console.log(componentTree);

    return html`
        <div className="flow">
            ${
                componentTree ? html`
                    <${ComponentLoader} 
                        componentData=${componentTree} 
                        applicationData=${applicationData} 
                    />` : 'loading map element...'
            }   
            ${
                pageOutcomes?.map(outcome => html`<${ComponentLoader} componentData=${outcome} />`) ?? []
            }         
        </div>
    `;
}

export default Root;
