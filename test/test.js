const expect = require("chai").expect;
const sinon = require("sinon");

const validate = require("../middlewares/validate");

describe("validate", () => {
  var next, send, status, res;

  beforeEach(() => {
    next = sinon.spy();
    send = sinon.spy();
    status = sinon.spy(httpStatusCode => ({ send }));
    res = { status };
  });

  describe("id", () => {
    const checkValid = id => {
      validate.id({ params: { id } }, res, next);
      expect(next.calledOnce).to.be.true;
      expect(status.notCalled).to.be.true;
    };

    describe("valid ids", () => {
      it("should succeed with '1'", () => {
        checkValid("1");
      });
      it("should succeed with '2'", () => {
        checkValid("2");
      });
      it("should succeed with '123'", () => {
        checkValid("123");
      });
      it("should succeed with '10298302185'", () => {
        checkValid("10298302185");
      });
      it("should succeed with '8819829'", () => {
        checkValid("8819829");
      });
    });

    describe("invalid ids", () => {
      const checkInvalid = id => {
        validate.id({ params: { id } }, res, next);
        expect(status.calledOnce).to.be.true;
        expect(status.calledOnceWithExactly(500)).to.be.true;
        expect(send.calledOnce).to.be.true;
        expect(next.notCalled).to.be.true;
      };

      it("should send error for zero", () => {
        checkInvalid("0");
      });

      it("should send error for negative integers", () => {
        checkInvalid("-1");
      });

      it("should send error when id has letter", () => {
        checkInvalid("1a");
      });
      it("should send error when id has space", () => {
        checkInvalid("2 3");
      });
      it("should send error when id is just letters", () => {
        checkInvalid("sldjfad");
      });
      it("should send error when id has symbol", () => {
        checkInvalid("1]23");
      });
    });
  });

  describe("groupBody", () => {
    const name = "a";
    const description = "b";

    describe("valid bodies", () => {
      const checkValid = body => {
        validate.groupBody({ body }, res, next);
        expect(next.calledOnce).to.be.true;
        expect(status.notCalled).to.be.true;
      };

      it("should succeed with just valid name", () => {
        checkValid({ name });
      });
      it("should succeed with undefined description", () => {
        checkValid({ name, description: undefined });
      });
      it("should succeed with null description", () => {
        checkValid({ name, description: null });
      });
      it("should succeed with empty string description", () => {
        checkValid({ name, description: "" });
      });
      it("should succeed with non-empty string description", () => {
        checkValid({ name, description });
      });
    });

    describe("invalid bodies", () => {
      const checkInvalid = body => {
        validate.groupBody({ body }, res, next);
        expect(next.notCalled).to.be.true;
        expect(status.calledOnceWithExactly(500)).to.be.true;
        expect(send.calledOnce).to.be.true;
      };

      it("should send error if name is empty string", () => {
        checkInvalid({ name: "" });
      });

      it("should send error if name is number and description is missing", () => {
        checkInvalid({ name: 1 });
      });

      it("should send error if name is number and description is valid", () => {
        checkInvalid({ name: 1, description });
      });

      it("should send error if invalid property exists without description", () => {
        checkInvalid({ name, foo: "bar" });
      });

      it("should send error if invalid property exists with description", () => {
        checkInvalid({ name, description, foo: "bar" });
      });

      it("should send error if description is number", () => {
        checkInvalid({ name, description: 1 });
      });
    });
  });
});
