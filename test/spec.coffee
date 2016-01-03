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
    mimus.stub vile, "promise_each"
    mimus.stub vile, "spawn"
    util.setup vile

  describe "#punish", ->
    it "only collects slim files for all files", (done) ->
      slim_lint
        .punish {}
        .should.be.fulfilled.notify ->
          setTimeout ->
            allowed = vile.promise_each.args[0][1]
            expect(allowed("some/file.html.slim")).to.eql true
            expect(allowed("another/file.rb")).to.eql false
            expect(allowed("one_more.js")).to.eql false
            done()
          , 1

    it "converts slim-lint json to issues", ->
      slim_lint
        .punish {}
        .should.eventually.eql util.issues

    it "creates a separate list of ok issues for all rb files", (done) ->
      slim_lint
        .punish {}
        .should.be.fulfilled.notify ->
          setTimeout ->
            create_issue = vile.promise_each.args[0][2]
            expect(create_issue("some_other.slim")).to
              .eql util.all_files[2]
            done()
          , 1

    it "handles an empty response", ->
      vile.spawn.reset()
      vile.spawn.returns new Promise (resolve) -> resolve ""

      slim_lint
        .punish {}
        .should.eventually.eql util.all_files

    it "calls slim-lint in the cwd", (done) ->
      slim_lint
        .punish {}
        .should.be.fulfilled.notify ->
          setTimeout ->
            vile.promise_each.should.have.been
              .calledWith process.cwd()

            vile.spawn.should.have.been
              .calledWith "slim-lint", args: [
                              "-r"
                              "json"
                              "."
                            ]
            done()
          , 1

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
                              "."
                            ]
              done()
            , 1
