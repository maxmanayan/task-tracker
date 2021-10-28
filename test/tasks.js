// imports
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

// middleware
chai.should();
chai.use(chaiHttp);

// tests
describe("All HTTP endpoints for tasks router", () => {
  describe("GET ALL endpoint", () => {
    it("Should return an array of all task objects", (done) => {
      chai
        .request(server)
        .get("/tasks")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
    it("If endpoint is misspelled, should return 404 error", (done) => {
      chai
        .request(server)
        .get("/task")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
