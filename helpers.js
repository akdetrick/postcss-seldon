const matter = require('gray-matter');
const markdown = require('marked');

markdown.setOptions({
    renderer: new markdown.Renderer(),
    pedantic: false,
    tables: true,
    gfm: true
});

/**
 * @param {Ojbect} comment comment node from AST
 * @returns {String} comment trimmed with doc comment flag removed
 */
const getCleanComment = (text) => `${text}`
    .replace(/\*doc\n/, '')
    .trim();

/**
 * @param {String} text comment string
 * @returns {Object} doc ob with frontmatter `meta` and `html` from markdown
 */
const parseComment = (text) => {
    const serializedComment = matter(text);
    const hasFrontmatter = Boolean(Object.keys(serializedComment.data).length);

    return {
        meta: hasFrontmatter ? serializedComment.data : null,
        markdown: serializedComment.content,
        html: markdown(serializedComment.content),
    };
};

module.exports = {
  getCleanComment,
  parseComment,
};
