# PostCSS-Viewports

[![npm-version]][npm]

This allows you do add data-[viewport] properties to your CSS easily, making it easier to control styling for different viewports via the HTML.

It will use any properties preceded by or wrapped by a @viewport rule and add data-[viewport] properties for these properties.

## Using PostCSS-Viewports

### Setup

```js
var options = {
    viewports: {
        'lap': '800px',
        'palm': '400px'
    }
};

postcss([
  require('postcss-viewports')(options)
])
```

Options:

- `viewports`, a list of your viewport names and max-widths.


### Usage

```css
body {
    font-size: 14px;
}

/* Just apply to next property */
@viewports all;
.is-hidden {
    display: none;
}

/* Apply for nested properties */
@viewports all {
    .one-whole {
        width: 100%;
    }
    .one-half {
        width: 50%;
    }
}
```

will output

```css
body {
    font-size: 14px;
}

.is-hidden {
    display: none;
}

@media screen and (max-width: 800px) {

    [data-lap~="is-hidden"] {
        display: none;
    }
}

@media screen and (max-width: 400px) {

    [data-palm~="is-hidden"] {
        display: none;
    }
}

.one-whole {
        width: 100%;
    }

@media screen and (max-width: 800px) {

    [data-lap~="one-whole"] {
        width: 100%;
    }
}

@media screen and (max-width: 400px) {

    [data-palm~="one-whole"] {
        width: 100%;
    }
}

.one-half {
        width: 50%;
    }

@media screen and (max-width: 800px) {

    [data-lap~="one-half"] {
        width: 50%;
    }
}

@media screen and (max-width: 400px) {

    [data-palm~="one-half"] {
        width: 50%;
    }
}
```

This allows you do something like:

```html
<div class="one-half" data-palm-"one-whole">
    ...
</div>
<div class="one-half" data-palm="one-whole">
    ...
</div>

```

[npm]: https://www.npmjs.com/package/postcss-viewports
[npm-version]: http://img.shields.io/npm/v/postcss-viewports.svg?style=flat-square
