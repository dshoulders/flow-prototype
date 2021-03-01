import react from '../lib/react/react-internal.js';
import htm from '../lib/htm.js';

/** Initialize htm with react.createElement
 * https://github.com/developit/htm
*/
export const html = htm.bind(react.createElement);
