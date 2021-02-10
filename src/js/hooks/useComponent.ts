import { useContext } from '../lib/react/react-internal.js';
import { Component, componentStore } from '../state/components.js';

export default function useComponent(id) {
    const components: Component[] = useContext(componentStore).components;

    return components.find(component => component.id === id);
}