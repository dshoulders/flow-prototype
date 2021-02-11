import { createContext, useReducer } from '../lib/react/react-internal.js';
import { Renderable } from "../types/interfaces.js";
import { html } from '../utils/markup.js';

export enum ActionType {
    pageResponse = 'PAGE_RESPONSE',
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
    payload: Outcome
};

export interface Dispatch {
    (action: Action)
};

const reducer = (outcomes: Outcome[], action: Action) => {

    switch (action.type) {
        case ActionType.pageResponse:
            return action.payload.mapElementInvokeResponses[0].outcomeResponses;

        default:
            return outcomes;
    };
}

const initialState: Outcome[] = [];
const outcomeStore: { outcomes: Outcome[], Provider: Function } = createContext(initialState);
const { Provider } = outcomeStore;

const OutcomeProvider: Function = ( { children } ) => {

    const [outcomes, dispatch]: [ Outcome[], Dispatch ] = useReducer(reducer, initialState);

    return html`<${Provider} value=${{ outcomes, dispatch }}>${children}</${Provider}>`;
};

export { outcomeStore, OutcomeProvider }
