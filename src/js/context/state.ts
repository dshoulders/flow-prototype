import { createContext, useReducer } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';

export interface State {
    stateId: string, 
    stateToken: string, 
    currentMapElementId: string,
}

export enum ActionType {
    pageResponse = 'PAGE_RESPONSE',
};

interface Action { 
    type: ActionType, 
    payload: State 
};

export interface Dispatch {
    (action: Action)
};

const reducer = (state: State, action: Action) => {

    switch (action.type) {
        case ActionType.pageResponse:
            return action.payload;

        default:
            return state;
    };
}

const initialState: State = {
    stateId: null, 
    stateToken: null, 
    currentMapElementId: null,
};

const stateStore: { state: State, Provider: Function } = createContext(initialState);
const { Provider } = stateStore;

const StateProvider: Function = ( { children } ) => {

    const [state, dispatch]: [ State, Dispatch ] = useReducer(reducer, initialState);

    return html`<${Provider} value=${{ state, dispatch }}>${children}</${Provider}>`;
};

export { stateStore, StateProvider }