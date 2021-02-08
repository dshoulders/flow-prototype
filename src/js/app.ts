import { render } from './lib/react-dom/react-dom-internal.js';
import { useEffect } from './lib/react/react-internal.js';
import { html } from './utils/markup.js';
import { ListItemProvider } from './state/listItems.js';
import ListControls from './components/ListControls.js';
import { postData, InitailizeRequest, InvokeRequest } from './utils/network.js';
import { PLATFROM_URI, InvokeType } from "./constants.js";

// Import statements should all use .js extension so that they are correct when transpiled
// Typescript transformations do not alter import paths
// https://github.com/evanw/esbuild/issues/622 

function App () {
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    const flowId = urlParams.get('flow-id');
    const flowVersionId = urlParams.get('flow-version-id');

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

        await postData(`${PLATFROM_URI}/api/run/1/state/${currentMapElementId}`, invokeRequest);
    });

    return html`
        <${ListItemProvider}>
            <${ListControls}/>
        </${ListItemProvider}>
    `;
}

render(html`<${App}/>`, document.getElementById('app'));
