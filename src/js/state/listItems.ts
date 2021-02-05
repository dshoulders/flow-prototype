import { createContext, useReducer } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';

export interface ListItem {
    id: Number,
    name: String,
};

export interface Action<TPayload> { 
    type: String, 
    payload: TPayload 
};

export interface Dispatch {
    (action: Action<ListItem>)
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

const reducer = (listItems: ListItem[], action: Action<ListItem>) => {

    switch (action.type) {
        case 'ADD_ITEM':
            return  [
                ...listItems,
                { id: getID(), name: action.payload.name },
            ];

        case 'REMOVE_ITEM':
            return listItems.filter((item) => {
                return item.id !== action.payload.id;
            });

        case 'REVERSE_ITEMS':
            return [...listItems.reverse()];

        case 'RENAME_ITEMS':
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
