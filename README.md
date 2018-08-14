# PostCSS Seldon [![Build Status][ci-img]][ci]

[PostCSS] plugin to collect documentation from structured comments in CSS..

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/akdetrick/postcss-seldon.svg
[ci]:      https://travis-ci.org/akdetrick/postcss-seldon

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

```js
postcss([ require('postcss-seldon') ])
```

See [PostCSS] docs for examples for your environment.
