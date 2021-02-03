
const { process } = require('babel-jest');

module.exports = {
    process(src, filename, options) {

        // jest tests will not work our local version of react/react-dom
        // swap the local imports for npm packages
        const srcWithReactImportsReplaced = src
            .replace(/from '.*\/react\/react-internal\.js'/mg, 'from \'react\'')
            .replace(/from '.*\/react-dom\/react-dom-internal\.js'/mg, 'from \'react-dom\'')

        // continue processing with babel-jest (the default) transformer
        const result = process(
            srcWithReactImportsReplaced,
            filename,
            options
        );

        return result;
    },
};
