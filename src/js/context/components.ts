import { createContext, useReducer } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import { Renderable } from "../types/interfaces.js";
import { InvokeType } from '../constants.js';

export enum ActionType {
    valueChange = 'VALUE_CHANGE',
    updateComponent = 'COMPONENT_UPDATE',
    pageResponse = 'PAGE_RESPONSE',
};

export interface Layout extends Renderable {
    isEditable: boolean,
    isEnabled: boolean,
    isVisible: boolean,
    pageContainerId: string,
    parentId: string,
    tags: string[],
    type: string,
}

export interface Component extends Layout {
    columns: [],
    componentType: string,
    content: string,
    contentType: string,
    contentValue: (string|number|boolean),
    fileDataRequest: any,
    hasEvents: boolean,
    height: number,
    helpInfo: string,
    hintValue: string,
    imageUri: string,
    isMultiSelect: boolean,
    isRequired: boolean,
    isSearchable: boolean,
    isValid: boolean,
    maxSize: number,
    objectData: [],
    objectDataRequest: any,
    pageContainerDeveloperName: string,
    size: number,
    validationMessage: string,
    width: number,
};

export interface Container extends Layout {
    containerType: string,
};

export interface Outcome extends Renderable {
    isBulkAction: boolean,
    isOut: boolean,
    pageActionBindingType: string,
    pageActionType: string,
    pageObjectBindingId: string,
}

interface Action { 
    type: ActionType, 
    payload: Component 
};

export interface Dispatch {
    (action: Action)
};

const flattenContainers = (containers, parentId = null, collection = []) => {

    return containers.reduce((accumulation, container) => {
        const mappedContainer = {
            ...container,
            parentId,
            type: container.containerType,
        };        

        delete mappedContainer.pageContainerResponses;
        
        const appendedAccumulation = [
            ...accumulation,
            mappedContainer,
        ];
        
        return flattenContainers(container.pageContainerResponses ?? [], container.id, appendedAccumulation);

    }, collection);
};

const consolidateContainers = (containers, pageResponse): Container[] => {
    return containers.map(containerMeta => {

        const containerData = pageResponse.pageContainerDataResponses.find(dataResponse => dataResponse.pageContainerId === containerMeta.id);

        return {
            ...containerMeta,
            ...containerData,
        };
    });
};

const consolidateComponents = (pageResponse): Component[] => {
    return pageResponse.pageComponentResponses.map(componentMeta => {

        const componentData = pageResponse.pageComponentDataResponses.find(dataResponse => dataResponse.pageComponentId === componentMeta.id);

        return {
            ...componentMeta,
            ...componentData,
            parentId: componentMeta.pageContainerId,
            type: componentMeta.componentType,
        };
    });
};

const flattenPageResponse = (invokeResponse): Layout[] => {

    const { pageResponse } = invokeResponse.mapElementInvokeResponses[0];
    
    const flattenedContainerMeta = flattenContainers(pageResponse.pageContainerResponses);
    
    const containers = consolidateContainers(flattenedContainerMeta, pageResponse);
    const components = consolidateComponents(pageResponse);
    const outcomes = invokeResponse.mapElementInvokeResponses[0].outcomeResponses.map(outcome => ({
        ...outcome,
        type: 'outcome'
    }));

    return [
        ...containers,
        ...components,
        ...outcomes,
    ];
};

const updateComponent = (partialComponent, components) => {
    const updatedComponents = components.map((component: Component) :Component => {

        if (component.id !== partialComponent.id) {
            return component;
        }

        return {
            ...component,
            ...partialComponent,
        }
    });
    return updatedComponents;
}

const updateValue = (id: string, value: (string|number|boolean), components: Component[]): Component[] => {
    const updatedComponents = components.map((component: Component) :Component => {

        if (component.id !== id) {
            return component;
        }

        return {
            ...component,
            contentValue: value,
        }
    });
    return updatedComponents;
}

const mergeComponentData = (pageResponse, components) => {
    const dataResponses = [
        ...pageResponse.pageComponentDataResponses,
        ...pageResponse.pageContainerDataResponses,
    ];

    return components.map((component) => {
        const dataResponse = dataResponses.find(
            dataResponse => dataResponse.pageContainerId === component.id || dataResponse.pageComponentId === component.id
        );

        if (dataResponse === null) {
            return component;
        }

        return {
            ...component,
            ...dataResponse,
        };
    });
};

const processInvokeResponse = (response, components) => {

    switch (response.invokeType) {
        case InvokeType.forward:
            return flattenPageResponse(response);

        case InvokeType.sync:
            return mergeComponentData(response.mapElementInvokeResponses[0].pageResponse, components);
    }
};

const reducer = (components: Component[], action: Action) => {

    switch (action.type) {
        case ActionType.pageResponse:
            return processInvokeResponse(action.payload, components);

        case ActionType.valueChange:
            return updateValue(action.payload.id, action.payload.contentValue, components);

        case ActionType.updateComponent:
            return updateComponent(action.payload, components);

        default:
            return components;
    };
}

const initialState: Component[] = [];
const componentStore: { components: Component[], Provider: Function } = createContext(initialState);
const { Provider } = componentStore;

const ComponentProvider: Function = ( { children } ) => {

    const [components, dispatch]: [ Component[], Dispatch ] = useReducer(reducer, initialState);

    return html`<${Provider} value=${{ components, dispatch }}>${children}</${Provider}>`;
};

export { componentStore, ComponentProvider }
