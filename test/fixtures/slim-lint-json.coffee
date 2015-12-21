module.exports = {
  "metadata": {
    "slim_lint_version": "0.6.1",
    "ruby_engine": "ruby",
    "ruby_patchlevel": "173",
    "ruby_platform": "x86_64-linux"
  },
  "files": [
    {
      "path": "app/views/auth_tokens/_form.html.slim",
      "offenses": [
        {
          "severity": "..other_severity..",
          "message": "Some global issue"
        }
      ]
    },
    {
      "path": "app/views/auth_tokens/edit.html.slim",
      "offenses": [
        {
          "severity": "warning",
          "message": "Use 2 spaces for indentation in a hash...",
          "location": { "line": 5 }
        },
        {
          "severity": "warning",
          "message": "Line is too long. [89\/80]",
          "location": { "line": 11 }
        }
      ]
    }
  ]
}
