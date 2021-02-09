import { useMemo, lazy } from "../lib/react/react-internal";
import components from '../config/components.js';

export const getComponent = (componentType = '') => lazy(() => import(components[componentType])); // Lazy-loaded
