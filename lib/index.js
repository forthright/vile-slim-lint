"use strict";

var _ = require("lodash");
var vile = require("@forthright/vile");

var to_json = function to_json(string) {
  return _.attempt(JSON.parse.bind(null, string));
};

var slim_lint = function slim_lint(plugin_config) {
  var custom_config_path = _.get(plugin_config, "config");
  var paths = _.get(plugin_config, "allow", []);
  var exclude = _.get(plugin_config, "ignore", []);
  var opts = {};

  opts.args = ["-r", "json"];

  if (custom_config_path) {
    opts.args = opts.args.concat("-c", custom_config_path);
  }

  if (!_.isEmpty(exclude)) {
    opts.args = _.concat(opts.args, "-e", exclude.join(","));
  }

  opts.args.push("--no-color");

  if (_.isEmpty(paths)) {
    opts.args = _.concat(opts.args, ".");
  } else {
    opts.args = _.concat(opts.args, paths);
  }

  return vile.spawn("slim-lint", opts).then(function (stdout) {
    return stdout ? to_json(stdout) : { files: [] };
  });
};

var signature = function signature(offense) {
  var without_line_info = _.get(offense, "message", "undefined").replace(/\d*\/\d*/g, "");
  return "slim-lint::" + without_line_info;
};

var context = function context(offense) {
  return offense.severity == "warning" ? vile.STYL : vile.ERR;
};

var line_info = function line_info(offense) {
  var line = _.get(offense, "location.line");
  if (line) return { start: { line: line } };
};

var vile_issues = function vile_issues(file) {
  return _.get(file, "offenses", []).map(function (offense) {
    return vile.issue({
      type: context(offense),
      path: file.path,
      title: offense.message,
      message: offense.message,
      signature: signature(offense),
      where: line_info(offense)
    });
  });
};

var punish = function punish(plugin_data) {
  return slim_lint(plugin_data).then(function (cli_json) {
    return _.flatten(_.get(cli_json, "files", []).map(vile_issues));
  });
};

module.exports = {
  punish: punish
};