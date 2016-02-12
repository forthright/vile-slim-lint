let _ = require("lodash")
let vile = require("@forthright/vile")

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

let signature = (offense) => {
  let without_line_info = _.get(offense, "message", "undefined")
      .replace(/\d*\/\d*/g, "")
  return `slim-lint::${without_line_info}`
}

let context = (offense) =>
  offense.severity == "warning" ? vile.STYL : vile.ERR

let line_info = (offense) => {
  let line = _.get(offense, "location.line")
  if (line) return { start: { line: line } }
}

let vile_issues = (file) =>
  _.get(file, "offenses", []).map((offense) =>
    vile.issue({
      type: context(offense),
      path: file.path,
      title: offense.message,
      message: offense.message,
      signature: signature(offense),
      where: line_info(offense)
    }))

let punish = (plugin_data) =>
  slim_lint(plugin_data.config)
    .then((cli_json) =>
      _.flatten(
        _.get(cli_json, "files", [])
          .map(vile_issues)))


module.exports = {
  punish: punish
}
