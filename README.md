code2png
===============================================================================

Generate PNG images of source files--convenient for HTML-filtering input forms,
Twitter, and all kinds of groovy things like that.

```sh
$ cat bin/code2png | head -n5 | code2png -o readme.png
```

![](readme.png)

Installation
-------------------------------------------------------------------------------

```sh
$ npm install -g code2png
```

Usage
-------------------------------------------------------------------------------

Pass a source file by name:

```sh
$ code2png foo.c -o foo.png
```

...or pipe it in:

```sh
$ cat foo.c | code2png -o foo.png
```

TODO
-------------------------------------------------------------------------------

- Support additional languages, themes

License
-------------------------------------------------------------------------------

MIT
