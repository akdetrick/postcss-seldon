const postcss = require('postcss');
const matter = require('gray-matter');
const markdown = require('marked');

const DEFAULT_OPTIONS = {
    key: 'doc'
};

markdown.setOptions({
    renderer: new markdown.Renderer(),
    pedantic: false,
    tables: true,
    gfm: true
});

/**
 * @description "/**doc" signifies the comment is a doc comment
 */
const RE_DOC_COMMENT = /^\*doc\n/g;

/**
 * @param {String} text comment as string
 * @returns {String} comment trimmed with doc comment flag removed
 */
const getCleanComment = (text) => `${text}`
    .replace(/\*doc\n/, '')
    .trim();

/**
 * @param {Object} comment comment node from AST
 * @returns {Object} doc ob with frontmatter `meta` and `html` from markdown
 */
const parseComment = (comment) => {
    const serializedComment = matter(getCleanComment(comment.text));
    const hasFrontmatter = Boolean(Object.keys(serializedComment.data).length);

    return {
        meta: hasFrontmatter ? serializedComment.data : null,
        markdown: serializedComment.content,
        html: markdown(serializedComment.content),
    };
};

/**
 * @param {Object} comment comment node from AST
 * @param {Set} targetSet accumulator for parsed comment objects
 * @returns {undefined}
 */
const handleComment = (comment, targetSet) => {
    if (!RE_DOC_COMMENT.test(comment.text)) return;
    const commentObject = parseComment(comment);
    if (commentObject) targetSet.add(commentObject);
};

/**
 * @description PostCSS plugin definition
 */
module.exports = postcss.plugin('postcss-seldon', (opts) => {
    const _resultSet = new Set([]);
    opts = { ...DEFAULT_OPTIONS, ...opts };

    return (css, result) => {
        css.walkComments((comment) => {
            handleComment(comment, _resultSet);
        });
        result[opts.key] = Array.from(_resultSet);
    };
});
