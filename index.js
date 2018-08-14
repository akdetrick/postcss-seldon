var postcss = require('postcss');

const DEFAULT_OPTIONS = {
    key: 'doc'
};

module.exports = postcss.plugin('postcss-seldon', (opts) => {
    opts = { ...DEFAULT_OPTIONS, ...opts };

    // Work with options here

    return (root, result) => {
        // Transform CSS AST here
        result[opts.key] = [
            {
                meta: null,
                content: 'Just some good old markdown here'
            }
        ];
    };
});
