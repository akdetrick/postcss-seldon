const fs = require('fs');
const path = require('path');
const chai = require('chai');
const { parseComment } = require('../helpers');

const expect = chai.expect;

// key in postcss `result` object
const DOC_KEY = 'doc';
const fixtureBasePath = './test/fixtures/';

// kind of a hack; mimic AST text for comment
// elimiate comment delimiters
const cleanCommentForTest = (comment) => `${comment}`
  .replace(/\/\*\*doc/, '')
  .replace(/\*\//, '')
  .trim();

/**
 * Runs assertion using provided fixture by name.
 *
 * @param {String} message test message
 * @param {String} fixtureName name of fixture (match to file name)
 * @param {Object} opts plugin options
 */
const assert = (message, fixtureName, opts) => {
    const input = fs.readFileSync(
        path.join(fixtureBasePath, `${fixtureName}.css`).toString()
    );
    const expected = JSON.stringify(JSON.parse(
        fs.readFileSync(
            path.join(fixtureBasePath, `${fixtureName}.expected.json`)
        ).toString()
    ));
    const actual = JSON.stringify(
      parseComment(cleanCommentForTest(input))
    );

    it(message, () => { expect(actual).to.equal(expected) });
};

describe('postcss-seldon', () => {

    assert(
        'Should correctly parse doc comments without frontmatter',
        'no-frontmatter'
    );

    assert(
        'Should parse doc comments frontmatter and add object to `meta`',
        'frontmatter'
    );

    assert(
        'Should handle nested objects in yaml frontmatter',
        'frontmatter-nested'
    );

    assert(
        'Should render github flavored markdown tables as html tables',
        'gfm-tables'
    );

    assert(
        'Should render fenced code blocks as pre tags in html',
        'fenced-code-block'
    );
});
