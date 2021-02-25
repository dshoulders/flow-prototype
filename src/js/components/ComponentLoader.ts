import { lazy, Suspense, Component } from '../lib/react/react-internal.js';
import { html } from '../utils/markup.js';
import components from '../config/components.js';
import ComponentPropsProvider from './ComponentPropsProvider.js';

class ComponentLoader extends Component<{ componentId: any, componentType: string, applicationData: any, updateApplicationData, invoke }, null> {

    Component = lazy(() => import(components[this.props.componentType.toLowerCase()]));

    render() {

        return html`
            <${Suspense} fallback=${html`<div></div>`}>
                <${ComponentPropsProvider} 
                    Component=${this.Component} 
                    componentId=${this.props.componentId} 
                    applicationData=${this.props.applicationData} 
                    updateApplicationData=${this.props.updateApplicationData}
                    invoke=${this.props.invoke}
                />
            </${Suspense}>
        `;
    }
}

export default ComponentLoader;