import { createContext, useReducer } from 'https://cdn.skypack.dev/react';
import { html } from '../utils/markup.js';

export interface ListItem {
    id: Number,
    name: String,
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

const listItemStore: { listItems: ListItem[], Provider: Function } = createContext(initialState);
const { Provider } = listItemStore;

const ListItemProvider: Function = ( { children } ) => {

    const [listItems, dispatch]: [ ListItem[], Function ] = useReducer((listItems: ListItem[], action: { type: String, payload: any }) => {

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
    }, initialState);

    return html`<${Provider} value=${{ listItems, dispatch }}>${children}</${Provider}>`;
};

export { listItemStore, ListItemProvider }
