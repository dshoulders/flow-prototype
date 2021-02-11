import { html } from '../utils/markup.js';
import { State, stateStore, Dispatch as DispatchState } from "../context/state.js";
import { Component, Outcome, componentStore, Dispatch as DispatchComponents } from "../context/components.js";
import { useContext } from '../lib/react/react-internal.js';

const Outcome = ({ outcome }: { outcome: Outcome }) => {

    const { state }: { state: State } = useContext(stateStore); 

    const onClick = () => {

    };

    return html`
        <button className='outcome' onClick=${onClick}>${outcome.label}</button>
    `;
}

export default Outcome;