let _ = require("lodash")
let vile = require("@brentlintner/vile")

let to_json = (string) =>
  _.attempt(JSON.parse.bind(null, string))

let slim_lint = (custom_config_path) => {
  let opts = {}

  opts.args = ["-r", "json"]

  if (custom_config_path) {
    opts.args = opts.args.concat("-c", custom_config_path)
  }

  opts.args = opts.args.concat(".")

  return vile
    .spawn("slim-lint", opts)
    .then((stdout) => stdout ? to_json(stdout) : { files: [] })
}

let vile_issues = (file) =>
  _.get(file, "offenses", []).map((offense) => {
    let line = _.get(offense, "location.line")
    let severity = offense.severity == "warning" ? vile.WARNING : vile.ERROR
    return vile.issue(
      severity,
      file.path,
      offense.message,
      line ? { line: line } : undefined
    )
  })

let punish = (plugin_data) =>
  slim_lint(plugin_data.config)
    .then((cli_json) =>
      _.flatten(
        _.get(cli_json, "files", [])
          .map(vile_issues)
      )
   )


module.exports = {
  punish: punish
}
