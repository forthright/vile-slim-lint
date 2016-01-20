# vile-slim-lint [![Circle CI](https://circleci.com/gh/brentlintner/vile-slim-lint.svg?style=svg&circle-token=1f9abaf70a595024e47e9f5163e4bc7cca2a4fad)](https://circleci.com/gh/brentlintner/vile-slim-lint)

A [vile](http://github.com/brentlintner/vile) plugin for
[slim-lint](https://github.com/sds/slim-lint).

## Requirements

- [nodejs](http://nodejs.org)
- [npm](http://npmjs.org)
- [ruby](http://ruby-lang.org)
- [rubygems](http://rubygems.org)

## Installation

Currently, you need to have `slim-lint` installed manually.

Example:

    npm i vile-slim-lint
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

## Ignoring Files

You can ignore files in your `.slim-lint.yml` config file.

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
