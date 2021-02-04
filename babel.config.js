module.exports = {
    "env": {
        "dev": {
            presets: ['@babel/preset-typescript'],
        },
        "test": {
            presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
        }
    }
}