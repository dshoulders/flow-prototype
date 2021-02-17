import { lazy, Suspense, Component } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import components from '../config/components.js';
import ComponentPropsProvider from './ComponentPropsProvider.js';

class ComponentLoader extends Component<{ id: string, type: string}, null> {

    Component = lazy(() => import(components[this.props.type.toLowerCase()]));

    render() {
        return html`
            <${Suspense} fallback=${html`<div></div>`}>
                <${ComponentPropsProvider} Component=${this.Component} componentId=${this.props.id} />
            </${Suspense}>
        `;
    }
}

export default ComponentLoader;