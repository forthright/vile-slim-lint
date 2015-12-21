let _ = require("lodash")
let vile = require("@brentlintner/vile")

let allowed = (file) => !!file.match(/\.slim$/)

let slim_lint = (custom_config_path, all_file_paths) => {
  let opts = {}

  opts.args = ["-r", "json"]

  if (custom_config_path) {
    opts.args = opts.args.concat("-c", custom_config_path)
  }

  opts.args = opts.args.concat(process.cwd())

  return vile
    .spawn("slim-lint", opts)
    .then((stdout) => stdout ?  JSON.parse(stdout) : { files: [] })
}

let vile_issues = (file) =>
  _.get(file, "offenses", []).map((offense) => {
    let severity = offense.severity == "warning" ? vile.WARNING : vile.ERROR
    let line = _.get(offense, "location.line")
    return vile.issue(
      severity,
      file.path,
      offense.message,
      line ? { line: line } : undefined
    )
  })

// TODO: too complex
let punish = (plugin_data) => {
  return vile.promise_each(
    process.cwd(),
    allowed,
    (filepath) => vile.issue(vile.OK, filepath),
    { read_data: false }
  )
  .then((all_files) => {
    let all_file_paths = all_files.map((issue) => issue.file)
    return slim_lint(plugin_data.config, all_file_paths)
      .then((cli_json) => {
        var issues = _.get(cli_json, "files", [])
        return _.flatten(issues.map(vile_issues))
      })
      .then((issues) => {
        return _.reject(all_files, (file) => {
          return _.any(issues, (issue) => issue.file == file.file)
        }).concat(issues)
      })
  })
}

module.exports = {
  punish: punish
}
