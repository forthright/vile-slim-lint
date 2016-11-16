Promise = require "bluebird"
slim_lint_json = require "./../fixtures/slim-lint-json"

setup = (vile) ->
  vile.spawn.returns new Promise (resolve) ->
    resolve({
      code: 0
      stdout: JSON.stringify slim_lint_json
      stderr: ""
    })

issues = [
  {
    path: "app/views/auth_tokens/_form.html.slim",
    title: "Some global issue",
    message: "Some global issue",
    type: "error",
    signature: "slim-lint::Some global issue",
    where: undefined
  }
  {
    path: "app/views/auth_tokens/edit.html.slim",
    title: "Use 2 spaces for indentation in a hash...",
    message: "Use 2 spaces for indentation in a hash...",
    signature: "slim-lint::Use 2 spaces for indentation in a hash...",
    type: "style",
    where: { start: { line: 5 } }
  }
  {
    path: "app/views/auth_tokens/edit.html.slim",
    title: "Line is too long. [89\/80]",
    message: "Line is too long. [89\/80]",
    type: "style",
    signature: "slim-lint::Line is too long. []",
    where: { start: { line: 11 } }
  }
]

module.exports =
  issues: issues
  setup: setup
