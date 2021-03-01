import * as signalR from 'https://www.unpkg.com/@aspnet/signalr@1.1.4/dist/esm/index.js';
import { TENANT_ID, InvokeType, PLATFROM_URI } from "../constants.js";

export interface InitailizeRequest {
    flowId: {
        id: string,
        versionId: string,
    }
};

export interface InvokeRequest {
    invokeType: InvokeType,
    mapElementInvokeRequest: {
        pageRequest?: {
            pageComponentInputResponses: {
                pageComponentId: string,
                contentValue: (string|number|boolean),
                objectData: any,
            }[]
        },
        selectedOutcomeId?: string,
    },
    stateId: string,
    stateToken: string,
    currentMapElementId: string,
}

export async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'ManyWhoTenant': TENANT_ID,
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
};

export async function initialize(flowId, flowVersionId) {

    const initailizeRequest: InitailizeRequest = {
        flowId: {
            id: flowId,
            versionId: flowVersionId
        },
    };

    const initializeResponse = await postData(`${PLATFROM_URI}/api/run/1`, initailizeRequest);     

    const invokeRequest: InvokeRequest = {
        invokeType: InvokeType.forward,
        mapElementInvokeRequest: {},
        stateId: initializeResponse.stateId,
        stateToken: initializeResponse.stateToken,
        currentMapElementId: initializeResponse.currentMapElementId,
    };

    const invokeResponse = await postData(`${PLATFROM_URI}/api/run/1/state/${initializeResponse.stateId}`, invokeRequest);

    return invokeResponse;
}

export async function invoke({
        stateId,
        stateToken,
        currentMapElementId,
        selectedOutcomeId,
        components,
        invokeType,
}) {
    const pageComponentInputResponses = components.map(({ pageComponentId, contentValue, objectData }) => ({
        pageComponentId,
        contentValue,
        objectData, 
    }));

    const invokeRequest: InvokeRequest = {
        invokeType,
        stateId,
        stateToken,
        currentMapElementId,
        mapElementInvokeRequest: {
            pageRequest: {
                pageComponentInputResponses,
            },
            selectedOutcomeId,
        },
    };

    const response = await postData(
        `${PLATFROM_URI}/api/run/1/state/${stateId}`, 
        invokeRequest,
    );

    return response;
}

export const sync = async ({
    stateId,
    stateToken,
    currentMapElementId,
}) => {
    const invokeRequest: InvokeRequest = {
        invokeType: InvokeType.sync,
        stateId,
        stateToken,
        currentMapElementId,
        mapElementInvokeRequest: {},
    };

    const response = await postData(
        `${PLATFROM_URI}/api/run/1/state/${stateId}`, 
        invokeRequest,
    );

    return response;
}

export const hubConnection = new signalR.HubConnectionBuilder().withUrl("http://localhost:5000/collaboration").build();

export const startServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('../service-worker.js').then(function (registration) {
                // Registration successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function (err) {
                // Registration failed
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
};

export const startRealtimeConnection = () => {
    hubConnection.start().catch(function (err) {
        return console.error(err.toString());
    });
};