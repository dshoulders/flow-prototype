import { lazy, Suspense, Component } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import components from '../config/components.js';
import { ActionType, componentStore, Component as FlowComponent } from '../context/components.js';

class ComponentLoader extends Component<{ id: string, type: string}, null> {

    static contextType = componentStore

    Component = lazy(() => import(components[this.props.type.toLowerCase()]));

    render() {

        const { dispatch, components: flowComponents } = this.context
        const component = flowComponents.find(component => component.id === this.props.id);

        const updateComponent = (component) => {
            dispatch({
                type: ActionType.updateComponent,
                payload: component,
            })
        };

        return html`
            <${Suspense} fallback=${html`<div></div>`}>
                <${this.Component} component=${component} updateComponent=${updateComponent} />
            </${Suspense}>
        `;
    }
}

export default ComponentLoader;