export interface Action<TActionType, TPayload> { 
    type: TActionType, 
    payload: TPayload 
};

export enum ActionType {
    addItem = 'ADD_ITEM',
    removeItem = 'REMOVE_ITEM',
    reverseItems = 'REVERSE_ITEMS',
    renameItems = 'RENAME_ITEMS',

    pageResponse = 'PAGE_RESPONSE',
};