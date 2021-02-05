import { createContext, useReducer } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';

export interface ListItem {
    id: Number,
    name: String,
};

export interface Action<ActionType, TPayload> { 
    type: ActionType, 
    payload: TPayload 
};

export enum ActionType {
    addItem = 'ADD_ITEM',
    removeItem = 'REMOVE_ITEM',
    reverseItems = 'REVERSE_ITEMS',
    renameItems = 'RENAME_ITEMS',
};

export interface Dispatch {
    (action: Action<ActionType, ListItem>)
};

const getID: () => Number = (() => {
    let nextID = 0;
    return () => nextID++;
})();

const initialState: ListItem[] = [
    { id: getID(), name: 'Dave' },
    { id: getID(), name: 'Sally' },
    { id: getID(), name: 'Nigel' }, 
];

const reducer = (listItems: ListItem[], action: Action<ActionType, ListItem>) => {

    switch (action.type) {
        case ActionType.addItem:
            return  [
                ...listItems,
                { id: getID(), name: action.payload.name },
            ];

        case ActionType.removeItem:
            return listItems.filter((item) => {
                return item.id !== action.payload.id;
            });

        case ActionType.reverseItems:
            return [...listItems.reverse()];

        case ActionType.renameItems:
            return listItems.map(li => {
                li.name = 'Barry';
                return li;
            });

        default:
            return listItems;
    };
}

const listItemStore: { listItems: ListItem[], Provider: Function } = createContext(initialState);
const { Provider } = listItemStore;

const ListItemProvider: Function = ( { children } ) => {

    const [listItems, dispatch]: [ ListItem[], Dispatch ] = useReducer(reducer, initialState);

    return html`<${Provider} value=${{ listItems, dispatch }}>${children}</${Provider}>`;
};

export { listItemStore, ListItemProvider }
