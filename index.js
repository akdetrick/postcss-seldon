const postcss = require('postcss');
const { getCleanComment, parseComment } = require('./helpers');

const DEFAULT_OPTIONS = {
  key: 'doc'
};

/**
 * @description "/**doc" signifies the comment is a doc comment
 */
const RE_DOC_COMMENT = /^\*doc\n/g;

/**
 * @param {Object} comment comment node from AST
 * @param {Set} targetSet accumulator for parsed comment objects
 * @returns {undefined}
 */
const handleComment = (comment, targetSet) => {
  const text = getCleanComment(comment.text);
  if (!RE_DOC_COMMENT.test(text)) return;
  const commentObject = parseComment(text);
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
