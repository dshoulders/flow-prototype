import { createContext, useReducer } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import { Action, ActionType } from "./actionTypes.js";

export interface Renderable {
    attributes: string[],
    id: string,
    developerName: string,
    label: string,
    order: number,
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
    contentValue: string,
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

export interface Dispatch {
    (action: Action<ActionType, Component>)
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

const flattenPageResponse = (pageResponse): Layout[] => {
    const flattenedContainerMeta = flattenContainers(pageResponse.pageContainerResponses);

    const containers = consolidateContainers(flattenedContainerMeta, pageResponse);
    const components = consolidateComponents(pageResponse);

    console.log([...containers, ...components]);

    return [
        ...containers,
        ...components,
    ];
};

const reducer = (components: Component[], action: Action<ActionType, Component>) => {

    switch (action.type) {
        case ActionType.pageResponse:
            return flattenPageResponse(action.payload);

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
