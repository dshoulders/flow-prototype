import { createContext, useReducer } from 'https://cdn.skypack.dev/react';
import { html } from '../utils/markup.js';
const getID = (()=>{
    let nextID = 0;
    return ()=>nextID++
    ;
})();
const initialState = [
    {
        id: getID(),
        name: 'Dave'
    },
    {
        id: getID(),
        name: 'Sally'
    },
    {
        id: getID(),
        name: 'Nigel'
    }, 
];
const listItemStore = createContext(initialState);
const { Provider  } = listItemStore;
const ListItemProvider = ({ children  })=>{
    const [listItems, dispatch] = useReducer((listItems1, action)=>{
        switch(action.type){
            case 'ADD_ITEM':
                return [
                    ...listItems1,
                    {
                        id: getID(),
                        name: action.payload.name
                    }, 
                ];
            case 'REMOVE_ITEM':
                return listItems1.filter((item)=>{
                    return item.id !== action.payload.id;
                });
            case 'REVERSE_ITEMS':
                return [
                    ...listItems1.reverse()
                ];
            case 'RENAME_ITEMS':
                return listItems1.map((li)=>{
                    li.name = 'Barry';
                    return li;
                });
            default:
                return listItems1;
        }
    }, initialState);
    return html`<${Provider} value=${{
        listItems,
        dispatch
    }}>${children}</${Provider}>`;
};
export { listItemStore, ListItemProvider };
