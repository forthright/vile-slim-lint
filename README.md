# vile-slim-lint [![Circle CI](https://circleci.com/gh/forthright/vile-slim-lint.svg?style=svg&circle-token=1f9abaf70a595024e47e9f5163e4bc7cca2a4fad)](https://circleci.com/gh/forthright/vile-slim-lint) [![Build status](https://ci.appveyor.com/api/projects/status/mfb65fn2i8dc70xc/branch/master?svg=true)](https://ci.appveyor.com/project/brentlintner/vile-slim-lint/branch/master)

[![score-badge](https://vile.io/brentlintner/vile-slim-lint/badges/score?token=uFywUmzZfbg6UboLzn6R)](https://vile.io/brentlintner/vile-slim-lint) [![security-badge](https://vile.io/brentlintner/vile-slim-lint/badges/security?token=uFywUmzZfbg6UboLzn6R)](https://vile.io/brentlintner/vile-slim-lint) [![coverage-badge](https://vile.io/brentlintner/vile-slim-lint/badges/coverage?token=uFywUmzZfbg6UboLzn6R)](https://vile.io/brentlintner/vile-slim-lint) [![dependency-badge](https://vile.io/brentlintner/vile-slim-lint/badges/dependency?token=uFywUmzZfbg6UboLzn6R)](https://vile.io/brentlintner/vile-slim-lint)

A [vile](https://vile.io) plugin for [slim-lint](https://github.com/sds/slim-lint).

## Requirements

- [nodejs](http://nodejs.org)
- [npm](http://npmjs.org)
- [ruby](http://ruby-lang.org)
- [rubygems](http://rubygems.org)

## Installation

Currently, you need to have `slim-lint` installed manually.

Example:

    npm i @forthright/vile-slim-lint --save-dev
    gem install slim-lint

Note: A good strategy is to use [bundler](http://bundler.io).

## Config

By default, `.slim-lint.yml` should be picked up without any
extra config.

You can specify a custom path as well:

```yml
slim-lint:
  config: some/custom_path.yml
```

You can also specify an `allow` list which is passed to `slim-lint`.

```yml
slim-lint:
  allow: [ "app", "spec" ]
```

## Ignoring Files

You can ignore files in your `.slim-lint.yml` config file.

You can also use the `allow` setting:

```yml
slim-lint:
  ignore: [ "lib" ]
```

## Architecture

This project is currently written in JavaScript. Slim-lint provides
a JSON CLI output that is currently used until a more ideal
IPC option is implemented.

- `bin` houses any shell based scripts
- `src` is es6+ syntax compiled with [babel](https://babeljs.io)
- `lib` generated js library

## Hacking

    cd vile-slim-lint
    npm install
    gem install slim-lint
    npm run dev
    npm test
