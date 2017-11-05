code2png
===============================================================================

Beautiful code screenshots without leaving the command line. Plays well with
HTML-filtering input forms, Twitter, and all kinds of groovy things like that.

```sh
$ code2png index.js -o readme.png
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
$ code2png foo.c
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
