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
    contentValue: (string|number|boolean),
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

export interface Outcome extends Renderable {
    isBulkAction: boolean,
    isOut: boolean,
    pageActionBindingType: string,
    pageActionType: string,
    pageObjectBindingId: string,
}
export interface InputProps { 
    componentData: Component, 
    updateComponent: (component: Partial<Component>) => Component
};