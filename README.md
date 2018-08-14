# PostCSS Seldon [![Build Status](https://travis-ci.org/akdetrick/postcss-seldon.svg?branch=master)](https://travis-ci.org/akdetrick/postcss-seldon)

# (work in progress)

[PostCSS] plugin to collect documentation from structured comments in CSS.
`postcss-seldon` attaches an object, `docs`, to the `postcss` result. Nothing more, nothing less.

**`postcss-seldon` + your favorite templating language = automated CSS documentation**

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/akdetrick/postcss-seldon.svg
[ci]:      https://travis-ci.org/akdetrick/postcss-seldon

## Structured documentation comments

Add structured documentation comments and `postcss-seldon` will provide an object representing all
comments found in your CSS.

```css
/*doc
---
title: any frontmatter
foo: bar
---

# This is markdown

*/
.foo {
    /* Input example */
}
```

#### `result.doc`
```js
[
  {
    meta: {
      title: "any frontmatter",
      foo: "bar"
    },
    markdown: "# This is markdown",
    html: "<h1>This is markdown</h1>"
  }
]
```

## Usage

```js
postcss([ require('postcss-seldon') ])
```

See [PostCSS] docs for examples for your environment.

----
This project was inspired by [hologram](http://trulia.github.io/hologram/).
In Isaac Asimov's _Foundation_ trilogy, Hari Seldon is a character that appears only in _hologram_ form.
