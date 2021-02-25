import { lazy, Suspense, Component } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import components from '../config/components.js';
import ComponentPropsProvider from './ComponentPropsProvider.js';

class ComponentLoader extends Component<{ componentData: any, applicationData: any }, null> {

    Component = lazy(() => import(components[(this.props.componentData.componentType || this.props.componentData.containerType).toLowerCase()]));

    render() {
        return html`
            <${Suspense} fallback=${html`<div></div>`}>
                <${ComponentPropsProvider} 
                    Component=${this.Component} 
                    componentData=${this.props.componentData} 
                    applicationData=${this.props.applicationData} 
                />
            </${Suspense}>
        `;
    }
}

export default ComponentLoader;