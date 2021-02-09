import { createContext, useReducer } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import { Action, ActionType } from "./actionTypes.js";

export interface Component {
    id: Number,
    name: String,
};

export interface Dispatch {
    (action: Action<ActionType, Component>)
};

const flattenContainers = (containers, parentId = null, collection = []) => {

    return containers.reduce((accumulation, container) => {
        const mappedContainer = {
            ...container,
            pageContainerId: parentId,
        };        

        delete mappedContainer.pageContainerResponses;
        
        const appendedAccumulation = [
            ...accumulation,
            mappedContainer,
        ];
        
        return flattenContainers(container.pageContainerResponses ?? [], container.id, appendedAccumulation);

    }, collection);
};

const flattenPageResponse = (pageResponse) => {
    const containers = flattenContainers(pageResponse.pageContainerResponses);
    console.log(containers);
    return containers;
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
