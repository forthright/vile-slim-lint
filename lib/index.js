"use strict";

var _ = require("lodash");
var vile = require("@brentlintner/vile");

var allowed = function allowed(file) {
  return !!file.match(/\.slim$/);
};

var slim_lint = function slim_lint(custom_config_path) {
  var opts = {};

  opts.args = ["-r", "json"];

  if (custom_config_path) {
    opts.args = opts.args.concat("-c", custom_config_path);
  }

  opts.args = opts.args.concat(process.cwd());

  return vile.spawn("slim-lint", opts).then(function (stdout) {
    return stdout ? JSON.parse(stdout) : { files: [] };
  });
};

var vile_issues = function vile_issues(file) {
  return _.get(file, "offenses", []).map(function (offense) {
    var severity = offense.severity == "warning" ? vile.WARNING : vile.ERROR;
    var line = _.get(offense, "location.line");
    return vile.issue(severity, file.path, offense.message, line ? { line: line } : undefined);
  });
};

// TODO: too complex
var punish = function punish(plugin_data) {
  return vile.promise_each(process.cwd(), allowed, function (filepath) {
    return vile.issue(vile.OK, filepath);
  }, { read_data: false }).then(function (all_files) {
    return slim_lint(plugin_data.config).then(function (cli_json) {
      var issues = _.get(cli_json, "files", []);
      return _.flatten(issues.map(vile_issues));
    }).then(function (issues) {
      return _.reject(all_files, function (file) {
        return _.any(issues, function (issue) {
          return issue.file == file.file;
        });
      }).concat(issues);
    });
  });
};

module.exports = {
  punish: punish
};