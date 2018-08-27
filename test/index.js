const fs = require('fs');
const path = require('path');
const chai = require('chai');
const { parseComment } = require('../helpers');

const expect = chai.expect;

// key in postcss `result` object
const DOC_KEY = 'doc';
const fixtureBasePath = './test/fixtures/';

/**
 * Runs assertion using provided fixture by name.
 *
 * This plugin adds a key to the postcss `result` object that
 * contains data about documentation comments. In our assertions,
 * we use JSON stringify to deep compare the generated data structure
 * to an expected result.
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

    it(message, () => {
        return postcss([plugin(opts)])
            .process(input)
            .then(result => {
                const actual = JSON.stringify(result[DOC_KEY]);
                expect(result.warnings().length).to.equal(0);
                expect(actual).to.equal(expected);
            });
    });
};

describe('postcss-seldon', () => {

    assert(
        'Should not parse invalid doc comments',
        'no-doc-comments'
    );

/*     assert(
        'Should correctly parse doc comments without frontmatter',
        'no-frontmatter'
    );

    assert(
        'Should parse doc comments frontmatter and add object to `meta`',
        'frontmatter'
    ); */
});
