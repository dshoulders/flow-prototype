import * as React from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';

const getID = (() => {
    let nextID = 0;
    return () => nextID++;
})();

const initialState =  [
    { id: getID(), name: 'Dave' },
    { id: getID(), name: 'Sally' },
    { id: getID(), name: 'Nigel' }, 
];

const reducer = (listItems, action) => {

    switch (action.type) {
        case 'ADD_ITEM':
            return  [
                ...listItems,
                { id: getID(), name: action.name },
            ];

        case 'REMOVE_ITEM':
            return listItems.filter((item) => {
                return item.id !== action.id;
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
};

const listItemStore = React.createContext(initialState);
const { Provider } = listItemStore;

const ListItemProvider = ( { children } ) => {

    const [listItems, dispatch] = React.useReducer(reducer, initialState);

    return html`<${Provider} value=${{ listItems, dispatch }}>${children}</${Provider}>`;
};

export { listItemStore, ListItemProvider }
