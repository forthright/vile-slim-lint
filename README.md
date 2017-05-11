# vile-slim-lint [![Circle CI](https://circleci.com/gh/forthright/vile-slim-lint.svg?style=shield&circle-token=1f9abaf70a595024e47e9f5163e4bc7cca2a4fad)](https://circleci.com/gh/forthright/vile-slim-lint) [![Build status](https://ci.appveyor.com/api/projects/status/mfb65fn2i8dc70xc/branch/master?svg=true)](https://ci.appveyor.com/project/brentlintner/vile-slim-lint/branch/master) [![score-badge](https://vile.io/api/v0/projects/vile-slim-lint/badges/score?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-slim-lint) [![security-badge](https://vile.io/api/v0/projects/vile-slim-lint/badges/security?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-slim-lint) [![coverage-badge](https://vile.io/api/v0/projects/vile-slim-lint/badges/coverage?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-slim-lint) [![dependency-badge](https://vile.io/api/v0/projects/vile-slim-lint/badges/dependency?token=USryyHar5xQs7cBjNUdZ)](https://vile.io/~brentlintner/vile-slim-lint)

A [vile](https://vile.io) plugin for [slim-lint](https://github.com/sds/slim-lint).

## Requirements

- [nodejs](http://nodejs.org)
- [npm](http://npmjs.org)
- [ruby](http://ruby-lang.org)
- [rubygems](http://rubygems.org)

## Installation

Currently, you need to have `slim-lint` installed manually.

Example:

    npm i -D vile vile-slim-lint
    gem install slim-lint

Note: A good strategy is to use [bundler](http://bundler.io).

## Config

By default, `.slim-lint.yml` should be picked up without any
extra config.

You can specify a custom path as well:

```yaml
slim-lint:
  config: some/custom_path.yml
```

## Ignoring Files

You can ignore files in your `.slim-lint.yml` config file.

You can also use the `vile.ignore` or `slim-lint.ignore` setting:

```yaml
slim-lint:
  ignore:
    - lib
```

## Allowing Files

You can set `vile.allow` or `slim-lint.allow` and this
plugin will honour it.

Example:

```yaml
slim-lint:
  allow:
    - app/views/foo
```

## Gotchas

You might run into issues with the `RuboCop` linter enabled,
as it generates tmp files that may get picked up by other Ruby
plugins that could be running in parallel.

Although it is a big trade off, disabling the linter should fix the issue.

In your `.slim-lint.yml`:

```yaml
linters:
  RuboCop:
    enabled: false
```

## Versioning

This project ascribes to [semantic versioning](http://semver.org).

## Licensing

This project is licensed under the [MPL-2.0](LICENSE) license.

Any contributions made to this project are made under the current license.

## Contributions

Current list of [Contributors](https://github.com/forthright/vile-slim-lint/graphs/contributors).

Any contributions are welcome and appreciated!

All you need to do is submit a [Pull Request](https://github.com/forthright/vile-slim-lint/pulls).

1. Please consider tests and code quality before submitting.
2. Please try to keep commits clean, atomic and well explained (for others).

### Issues

Current issue tracker is on [GitHub](https://github.com/forthright/vile-slim-lint/issues).

Even if you are uncomfortable with code, an issue or question is welcome.

### Code Of Conduct

This project ascribes to [contributor-covenant.org](http://contributor-covenant.org).

By participating in this project you agree to our [Code of Conduct](CODE_OF_CONDUCT.md).

### Maintainers

- Brent Lintner - [@brentlintner](http://github.com/brentlintner)

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
