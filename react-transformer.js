const { process } = require('esbuild-jest');

module.exports = {
    process(src, filename, options) {

        // If the importing file has  

        // Swap the local imports for npm packages.
        // jest tests will not work our local version of react/react-dom
        // because react-testing-library depends on a 'react' npm module
        // this instance of react must be the same running instance that is rendering components.
        const srcWithReactImportsReplaced = src
            .replace(/from '.*\/react\/react-internal\.js'/mg, 'from \'react\'')
            .replace(/from '.*\/react-dom\/react-dom-internal\.js'/mg, 'from \'react-dom\'')

        // continue processing with esbuild-jest transformer
        const result = process(
            srcWithReactImportsReplaced,
            filename,
            options
        );

        return result;
    },
};