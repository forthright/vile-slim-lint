mimus = require "mimus"
slim_lint = mimus.require "./../lib", __dirname, []
chai = require "./helpers/sinon_chai"
util = require "./helpers/util"
vile = mimus.get slim_lint, "vile"
expect = chai.expect

# TODO: write integration tests for spawn -> cli
# TODO: don't use setTimeout everywhere (for proper exception throwing)

describe "slim-lint", ->
  afterEach mimus.reset
  after mimus.restore
  beforeEach ->
    mimus.stub vile, "spawn"
    util.setup vile

  describe "#punish", ->
    it "converts slim-lint json to issues", ->
      slim_lint
        .punish {}
        .should.eventually.eql util.issues

    it "handles an empty response", ->
      vile.spawn.reset()
      vile.spawn.returns new Promise (resolve) -> resolve ""

      slim_lint
        .punish {}
        .should.eventually.eql []

    it "calls slim-lint as json, with no color", (done) ->
      slim_lint
        .punish {}
        .should.be.fulfilled.notify ->
          setTimeout ->
            vile.spawn.should.have.been
              .calledWith "slim-lint", args: [
                              "-r"
                              "json"
                              "--no-color"
                            ]
            done()

    describe "with a custom config path", ->
      it "passes the path as a slim-lint cli option", (done) ->
        config_path = ".custom-config.yml"

        slim_lint
          .punish config: config_path
          .should.be.fulfilled.notify ->
            setTimeout ->
              vile.spawn.should.have.been
                .calledWith "slim-lint", args: [
                              "-r"
                              "json"
                              "-c"
                              config_path
                              "--no-color"
                            ]
              done()

    describe "with an ignore list", ->
      it "passes the exclude option as a slim-lint cli option", (done) ->
        slim_lint
          .punish ignore: ["foo", "bar"]
          .should.be.fulfilled.notify ->
            setTimeout ->
              vile.spawn.should.have.been
                .calledWith "slim-lint", args: [
                              "-r"
                              "json"
                              "-e"
                              "foo"
                              "bar"
                              "--no-color"
                            ]
              done()

    describe "with an allow list", ->
      it "passes the file args to slim-lint", (done) ->
        slim_lint
          .punish allow: ["foo", "bar"]
          .should.be.fulfilled.notify ->
            setTimeout ->
              vile.spawn.should.have.been
                .calledWith "slim-lint", args: [
                              "-r"
                              "json"
                              "--no-color"
                              "foo"
                              "bar"
                            ]
              done()
