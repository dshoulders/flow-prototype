import * as React from '../lib/react/react-internal.js';
import htm from '../lib/htm.js';

// Initialize htm with react
export const html = htm.bind(React.createElement);
