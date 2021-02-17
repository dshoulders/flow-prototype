const CACHE_NAME = 'flow-cache-v1';

self.addEventListener('install', function (event: ExtendableEvent) {

    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {

                console.log('Opened cache');

                return fetch('/file-list.json').then(function (response) {
                    return response.json();
                }).then(function (files) {
                    files.push('/' + self.location.search); // capture html file url with query string
                    return cache.addAll(files);
                });
            })
    );
});

self.addEventListener('fetch', function (event: FetchEvent) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                var newRequest = event.request.clone();

                return fetch(newRequest).catch(function () {
                    return customHandler(event.request);
                })
            })
    );
});

async function customHandler(request) {

    if (/\/api\/run\/1\/state/.test(request.url)) {

        console.log(request);

        const requestBody = await request.json();

        const inputText = requestBody?.mapElementInvokeRequest?.pageRequest?.pageComponentInputResponses.find(
            component => component.pageComponentId === "63602a6a-a7fd-0d69-832a-5d46eec2534e",
        ).contentValue ?? 'Dave';

        const body = {
            "alertEmail": null,
            "annotations": null,
            "authorizationContext": {
                "authenticationType": "USERNAME_PASSWORD",
                "directoryId": null,
                "directoryName": null,
                "loginUrl": null
            },
            "culture": {
                "brand": null,
                "country": "USA",
                "developerName": null,
                "developerSummary": null,
                "id": null,
                "language": "EN",
                "variant": null
            },
            "currentMapElementId": "50230982-5619-4d1c-ae5a-a40d3e5cc0e2",
            "currentStreamId": null,
            "frames": null,
            "invokeType": "FORWARD",
            "isHistoricalNavigationEnabled": false,
            "joinFlowUri": "https://flow.manywho.com/b176772a-ffc7-4ed6-88cb-6f44dffcd784/play/default?join=0350cac1-c219-48cf-ab65-303d39e57b1a",
            "mapElementInvokeResponses": [
                {
                    "developerName": "First",
                    "label": "First",
                    "mapElementId": "50230982-5619-4d1c-ae5a-a40d3e5cc0e2",
                    "outcomeResponses": [
                        {
                            "attributes": null,
                            "developerName": "UpdateName",
                            "id": "f57b85fa-deeb-4196-a398-d9a4e212fa66",
                            "isBulkAction": false,
                            "isOut": false,
                            "label": "Update Name",
                            "order": 0,
                            "pageActionBindingType": "SAVE",
                            "pageActionType": null,
                            "pageObjectBindingId": null
                        }
                    ],
                    "pageResponse": {
                        "attributes": null,
                        "label": null,
                        "order": 0,
                        "pageComponentDataResponses": [
                            {
                                "content": `<p>Your name is ${inputText}</p>`,
                                "contentValue": null,
                                "fileDataRequest": null,
                                "imageUri": null,
                                "isEditable": false,
                                "isEnabled": true,
                                "isRequired": false,
                                "isValid": true,
                                "isVisible": true,
                                "objectData": null,
                                "objectDataRequest": null,
                                "pageComponentId": "5a3b9317-f24f-13ca-67f7-7a832e1e94ef",
                                "tags": null,
                                "validationMessage": null
                            },
                            {
                                "content": null,
                                "contentValue": "Dave",
                                "fileDataRequest": null,
                                "imageUri": null,
                                "isEditable": true,
                                "isEnabled": true,
                                "isRequired": false,
                                "isValid": true,
                                "isVisible": true,
                                "objectData": null,
                                "objectDataRequest": null,
                                "pageComponentId": "63602a6a-a7fd-0d69-832a-5d46eec2534e",
                                "tags": null,
                                "validationMessage": null
                            }
                        ],
                        "pageComponentResponses": [
                            {
                                "attributes": null,
                                "columns": null,
                                "componentType": "presentation",
                                "contentType": null,
                                "developerName": "DisplayName",
                                "hasEvents": false,
                                "height": 0,
                                "helpInfo": null,
                                "hintValue": null,
                                "id": "5a3b9317-f24f-13ca-67f7-7a832e1e94ef",
                                "isMultiSelect": false,
                                "isSearchable": false,
                                "label": null,
                                "maxSize": 0,
                                "order": 3,
                                "pageContainerDeveloperName": "Main Container",
                                "pageContainerId": "5cf470fc-9b8f-ed50-8842-7b28b77577c6",
                                "size": 0,
                                "width": 0
                            },
                            {
                                "attributes": null,
                                "columns": null,
                                "componentType": "input",
                                "contentType": "ContentString",
                                "developerName": "Name",
                                "hasEvents": false,
                                "height": 0,
                                "helpInfo": null,
                                "hintValue": null,
                                "id": "63602a6a-a7fd-0d69-832a-5d46eec2534e",
                                "isMultiSelect": false,
                                "isSearchable": false,
                                "label": "What is your name?",
                                "maxSize": 255,
                                "order": 0,
                                "pageContainerDeveloperName": "Main Container",
                                "pageContainerId": "5cf470fc-9b8f-ed50-8842-7b28b77577c6",
                                "size": 25,
                                "width": 0
                            }
                        ],
                        "pageContainerDataResponses": [
                            {
                                "isEditable": true,
                                "isEnabled": true,
                                "isVisible": true,
                                "pageContainerId": "5cf470fc-9b8f-ed50-8842-7b28b77577c6",
                                "tags": null
                            },
                            {
                                "isEditable": true,
                                "isEnabled": true,
                                "isVisible": true,
                                "pageContainerId": "5d9bbc8e-6eb9-4ea5-03ed-3542816b9590",
                                "tags": null
                            },
                            {
                                "isEditable": true,
                                "isEnabled": true,
                                "isVisible": true,
                                "pageContainerId": "94d7ebc9-0a96-9b94-d7e0-2f5c1726582f",
                                "tags": null
                            },
                            {
                                "isEditable": true,
                                "isEnabled": true,
                                "isVisible": true,
                                "pageContainerId": "68081be6-3878-374f-1b40-4d6cab9f18a8",
                                "tags": null
                            },
                            {
                                "isEditable": true,
                                "isEnabled": true,
                                "isVisible": true,
                                "pageContainerId": "83cc3f57-a420-bf97-5d1a-02f62a6cdd55",
                                "tags": null
                            },
                            {
                                "isEditable": true,
                                "isEnabled": true,
                                "isVisible": true,
                                "pageContainerId": "fd4d0132-c6e7-0503-e633-e35af74994e2",
                                "tags": null
                            }
                        ],
                        "pageContainerResponses": [
                            {
                                "attributes": null,
                                "containerType": "VERTICAL_FLOW",
                                "developerName": "Main Container",
                                "id": "5cf470fc-9b8f-ed50-8842-7b28b77577c6",
                                "label": null,
                                "order": 0,
                                "pageContainerResponses": [
                                    {
                                        "attributes": null,
                                        "containerType": "VERTICAL_FLOW",
                                        "developerName": "Container 3",
                                        "id": "fd4d0132-c6e7-0503-e633-e35af74994e2",
                                        "label": "Container 3",
                                        "order": 3,
                                        "pageContainerResponses": null
                                    },
                                    {
                                        "attributes": null,
                                        "containerType": "VERTICAL_FLOW",
                                        "developerName": "Container 1",
                                        "id": "5d9bbc8e-6eb9-4ea5-03ed-3542816b9590",
                                        "label": "Container 1",
                                        "order": 4,
                                        "pageContainerResponses": [
                                            {
                                                "attributes": null,
                                                "containerType": "VERTICAL_FLOW",
                                                "developerName": "Container 2",
                                                "id": "94d7ebc9-0a96-9b94-d7e0-2f5c1726582f",
                                                "label": "Container 2",
                                                "order": 0,
                                                "pageContainerResponses": null
                                            },
                                            {
                                                "attributes": null,
                                                "containerType": "VERTICAL_FLOW",
                                                "developerName": "Container 4",
                                                "id": "68081be6-3878-374f-1b40-4d6cab9f18a8",
                                                "label": "Container 4",
                                                "order": 1,
                                                "pageContainerResponses": [
                                                    {
                                                        "attributes": null,
                                                        "containerType": "VERTICAL_FLOW",
                                                        "developerName": "Container 5",
                                                        "id": "83cc3f57-a420-bf97-5d1a-02f62a6cdd55",
                                                        "label": "Container 5",
                                                        "order": 0,
                                                        "pageContainerResponses": null
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "tags": null
                    },
                    "rootFaults": null
                }
            ],
            "navigationElementReferences": [],
            "notAuthorizedMessage": null,
            "outputs": null,
            "parentStateId": null,
            "preCommitStateValues": null,
            "runFlowUri": "https://flow.manywho.com/b176772a-ffc7-4ed6-88cb-6f44dffcd784/play/default?flow-id=66b0c625-d865-412d-a766-be326790f62b",
            "stateId": "0350cac1-c219-48cf-ab65-303d39e57b1a",
            "stateLog": null,
            "stateToken": "949ae10f-0db2-45ea-8027-526e36a3ddb0",
            "stateValues": null,
            "statusCode": "200",
            "voteResponse": null,
            "waitMessage": null
        };

        return new Response(JSON.stringify(body), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (/\/api\/run\/1/.test(request.url)) {
        const body = {
            "currentMapElementId": "7f366325-6b0f-400c-8b60-c6c0133b8868",
            "stateId": "c53333c3-f3c6-4469-8fe5-6dbeee78040d",
            "stateToken": "a9b6b63d-f5e6-4b03-a994-d53bed262f35",
            "statusCode": "200"
        };

        return new Response(JSON.stringify(body), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export { };