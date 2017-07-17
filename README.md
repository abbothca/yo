# generator-first [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> 

## Installation

First, install [Yeoman](http://yeoman.io) and generator-first using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-first
```

Then generate your new project:

```bash
yo first
```

Then start compiling your project:

```bash
gulp
```

For loading Google fonts to use gulp task **fonts_load** from the object **fontsForDownloaded** 
(just get your API key on [Google Fonts Developer API](https://developers.google.com/fonts/docs/developer_api) and add it in the variable **fontList**):

```bash
var fontsForDownloaded = [
    {
        family: "Roboto",
        variant: ['300', '300italic']
    },
    {
        family: "Open Sans",
        variant: ['300', '400', '600']
    },
    {
        family: "Lato",
        variant: ['300', '700']
    }
];
```

```bash
gulp fonts_load
```

For generating of browser fonts and css from ttf or otf files, just run:

```bash
gulp fontgen
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

 © [Liuba]()


[npm-image]: https://badge.fury.io/js/generator-first.svg
[npm-url]: https://npmjs.org/package/generator-first
[travis-image]: https://travis-ci.org/abbothca/generator-first.svg?branch=master
[travis-url]: https://travis-ci.org/abbothca/generator-first
[daviddm-image]: https://david-dm.org/abbothca/generator-first.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/abbothca/generator-first
[coveralls-image]: https://coveralls.io/repos/abbothca/generator-first/badge.svg
[coveralls-url]: https://coveralls.io/r/abbothca/generator-first
