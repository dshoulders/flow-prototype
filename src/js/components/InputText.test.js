import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { html } from '../utils/markup.js';

import InputText from './InputText.js'

test('Shows correct label and value', async () => {

    const componentData = {
        contentValue: 'abc',
        label: 'My Label',
        id: '123',
        isRequired: true,
    };

    const updateComponent = () => {};

    render(html`<${InputText} componentData=${componentData} updateComponent=${updateComponent} />`);

    const inputElement = screen.getByLabelText(/My Label/i);

    expect(inputElement.value).toBe('abc');
});

test('Shows asterisk when value isRequired = true', async () => {

    const componentData = {
        contentValue: 'abc',
        label: 'My Label',
        id: '123',
        isRequired: true,
    };

    const updateComponent = () => {};

    render(html`<${InputText} componentData=${componentData} updateComponent=${updateComponent} />`);

    const labelElement = screen.getByText(/My Label/i);

    expect(labelElement.textContent).toMatch(/\*/);
});

test('Updates input element value on change events', async () => {

    const componentData = {
        contentValue: 'abc',
        label: 'My Label',
        id: '123',
        isRequired: true,
    };

    const updateComponent = () => {};

    render(html`<${InputText} componentData=${componentData} updateComponent=${updateComponent} />`);

    const inputElement = screen.getByLabelText(/My Label/i);

    fireEvent.change(inputElement, { target: { value: 'xyz' } })

    expect(inputElement.value).toBe('xyz');
});

test('updateComponent is called on blur', async () => {

    const componentData = {
        contentValue: 'abc',
        label: 'My Label',
        id: '123',
        isRequired: true,
    };

    const updateComponent = jest.fn();

    render(html`<${InputText} componentData=${componentData} updateComponent=${updateComponent} />`);

    const inputElement = screen.getByLabelText(/My Label/i);

    fireEvent.focus(inputElement);
    fireEvent.blur(inputElement);

    expect(updateComponent).toBeCalled();
});