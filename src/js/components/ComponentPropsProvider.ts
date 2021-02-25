import { html } from '../utils/markup.js';
import { Component, Outcome } from '../types/interfaces.js';
import { InvokeType } from '../constants.js';
import { useEffect } from '../lib/react/react-internal.js';
import { hubConnection } from '../utils/network.js';
interface InvokeOutcome {
    ({ outcomeId, invokeType }?: { outcomeId?: string, invokeType?: InvokeType }): Promise<{any}>
}

interface UpdateComponent {
    (component: Component): void,
}

export interface ComponentProps { 
    component: Outcome, 
    updateComponent: UpdateComponent,
    invokeOutcome: InvokeOutcome,
};

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


const ComponentPropsProvider = ({ componentId, Component, applicationData, updateApplicationData, invoke }) => {

    useEffect(() => {

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

    const components = componentMetas.map((componentMeta) => {
        const componentData = pageResponse.pageComponentDataResponses.find((c => c.pageComponentId === componentMeta.id));
        return {
            ...componentMeta,
            ...componentData,
        };
    });
    const containers = flattenedContainerMetas.map((containerMeta) => {
        const containerData = pageResponse.pageContainerDataResponses.find((c => c.pageContainerId === containerMeta.id));
        return {
            ...containerMeta,
            ...containerData,
        };
    });
    const outcomes = applicationData?.mapElementInvokeResponses[0]?.outcomeResponses ?? [];

    const componentData = [...containers, ...components, ...outcomes].find(component => component.id === componentId);

    const childComponents = components.filter((component => component.pageContainerId === componentId));

    const childContainers = containers.filter(container => container.parentId === componentId);

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
