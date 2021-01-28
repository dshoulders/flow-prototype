import react from 'https://cdn.skypack.dev/react';
import htm from 'https://unpkg.com/htm?module';

// Initialize htm with react
export const html = htm.bind(react.createElement);
