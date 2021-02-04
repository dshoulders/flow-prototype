import { html } from '../utils/markup.js';
import testing from '@testing-library/react'
import { ListItemProvider } from '../state/listItems.js'

const GlobalProviders = ({ children }) => {
  return html`
    <${ListItemProvider}>
        ${children}
    </${ListItemProvider}>
  `
}

export const customRender = (ui, options) =>
testing.render(ui, { wrapper: GlobalProviders, ...options })
