Promise = require "bluebird"
slim_lint_json = require "./../fixtures/slim-lint-json"

setup = (vile) ->
  vile.spawn.returns new Promise (resolve) ->
    resolve(JSON.stringify slim_lint_json)

issues = [
  {
    file: "app/views/auth_tokens/_form.html.slim",
    msg: "Some global issue",
    type: "error",
    where: { end: {}, start: { } },
    data: {}
  }
  {
    file: "app/views/auth_tokens/edit.html.slim",
    msg: "Use 2 spaces for indentation in a hash...",
    type: "warn",
    where: { end: {}, start: { line: 5 } },
    data: {}
  }
  {
    file: "app/views/auth_tokens/edit.html.slim",
    msg: "Line is too long. [89\/80]",
    type: "warn",
    where: { end: {}, start: { line: 11 } },
    data: {}
  }
]

module.exports =
  issues: issues
  setup: setup
