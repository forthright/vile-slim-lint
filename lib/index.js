"use strict";

var _ = require("lodash");
var vile = require("@brentlintner/vile");

var to_json = function to_json(string) {
  return _.attempt(JSON.parse.bind(null, string));
};

var slim_lint = function slim_lint(custom_config_path) {
  var opts = {};

  opts.args = ["-r", "json"];

  if (custom_config_path) {
    opts.args = opts.args.concat("-c", custom_config_path);
  }

  opts.args = opts.args.concat(".");

  return vile.spawn("slim-lint", opts).then(function (stdout) {
    return stdout ? to_json(stdout) : { files: [] };
  });
};

var vile_issues = function vile_issues(file) {
  return _.get(file, "offenses", []).map(function (offense) {
    var line = _.get(offense, "location.line");
    var severity = offense.severity == "warning" ? vile.WARNING : vile.ERROR;
    return vile.issue(severity, file.path, offense.message, line ? { line: line } : undefined);
  });
};

var punish = function punish(plugin_data) {
  return slim_lint(plugin_data.config).then(function (cli_json) {
    return _.flatten(_.get(cli_json, "files", []).map(vile_issues));
  });
};

module.exports = {
  punish: punish
};