const expect = require("chai").expect;
const sinon = require("sinon");

global.logger = {
  info: sinon.spy()
};

const log = require("../middlewares/log.middleware");

describe("log", () => {
  it("should log when called", () => {
    log({}, {}, () => {});
    expect(global.logger.info.calledOnce).to.be.true;
  });

  it("should call 'next'", () => {
    const next = sinon.spy();
    log({}, {}, next);
    expect(next.calledOnce).to.be.true;
  });
});
