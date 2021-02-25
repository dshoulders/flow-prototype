import { html } from '../utils/markup.js';
import { useEffect } from '../lib/react/react-internal.js';
import { hubConnection } from '../utils/network.js';

// Flattens a nested tree of container meta data objects
// Adds a 'parentId' property to each container meta data object
const flattenContainers = (containers, parentId = null, collection = []) => {

    return containers.reduce((accumulation, container) => {

        container.parentId = parentId;
        
        const appendedAccumulation = [
            ...accumulation,
            container,
        ];
        
        return flattenContainers(container.pageContainerResponses ?? [], container.id, appendedAccumulation);

    }, collection);
};

// A wrapper component for all Flow components
// Handles interacting with hubConnection at a component level
// Handles updates to componentData objects, triggering application re-renders
const ComponentPropsProvider = ({ componentId, Component, applicationData, updateApplicationData, invoke }) => {

    useEffect(() => {

        // Subscribe to component updates from collaborators
        const receiveComponent = (component) => {
            if (component.id === componentId) {
                updateComponent(component);
            }
        }

        hubConnection.on("ReceiveComponent", receiveComponent);

        return () => hubConnection.off("ReceiveComponent", receiveComponent);
    }, []);

    const pageResponse = applicationData?.mapElementInvokeResponses[0]?.pageResponse ?? null;

    const containerMetas = pageResponse?.pageContainerResponses ?? [];

    const flattenedContainerMetas = flattenContainers(containerMetas);
    const componentMetas = pageResponse?.pageComponentResponses ?? [];

    // Collection of merged componentMeta and componentData objects
    const components = componentMetas.map((componentMeta) => {
        const componentData = pageResponse.pageComponentDataResponses.find((c => c.pageComponentId === componentMeta.id));
        return {
            ...componentMeta,
            ...componentData,
        };
    });
    // Collection of merged containerMeta and containerData objects
    const containers = flattenedContainerMetas.map((containerMeta) => {
        const containerData = pageResponse.pageContainerDataResponses.find((c => c.pageContainerId === containerMeta.id));
        return {
            ...containerMeta,
            ...containerData,
        };
    });
    // Collection of page level outome data objects
    const outcomes = applicationData?.mapElementInvokeResponses[0]?.outcomeResponses ?? [];

    // Find container or component or outcome data from all collections
    const componentData = [...containers, ...components, ...outcomes].find(component => component.id === componentId);

    // Find child containers and components to provide to rendering containers
    const childContainers = containers.filter(container => container.parentId === componentId);
    const childComponents = components.filter((component => component.pageContainerId === componentId));

    // Finds and updates the component within the application data 
    // then calls updateApplicationData with the mutated application data
    const updateComponent = (updatedComponentData) => {

        const componentData = applicationData.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses.find(
            componentData => componentData.pageComponentId === componentId
        );

        const assignableComponentDataProperties = [
            'content',
            'contentValue',
            'fileDataRequest',
            'imageUri',
            'isEditable',
            'isEnabled',
            'isRequired',
            'isValid',
            'isVisible',
            'objectData',
            'objectDataRequest',
            'tags',
            'validationMessage',
        ];

        Object.entries(updatedComponentData).forEach(([key, val]) => {
            if (assignableComponentDataProperties.includes(key)) {
                componentData[key] = val;
            }
        });

        updateApplicationData(applicationData);
    };

    const onUpdateComponent = (updatedComponentData) => {

        hubConnection.invoke('SendComponent', updatedComponentData).catch(function (err) {
            return console.error(err.toString());
        });

        updateComponent(updatedComponentData);
    };

    return html`
        <${Component} 
            componentData=${componentData} 
            updateComponent=${onUpdateComponent} 
            applicationData=${applicationData} 
            updateApplicationData=${updateApplicationData} 
            childComponents=${[...childContainers, ...childComponents]}
            invoke=${invoke}
        />
    `;
};

export default ComponentPropsProvider;
