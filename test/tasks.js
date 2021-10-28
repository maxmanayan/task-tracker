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

  describe("GET ONE endpoint", () => {
    it("Should return a single task object", (done) => {
      const paramId = "1123214";
      chai
        .request(server)
        .get(`/tasks/task/${paramId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("_id").eq(paramId);
          res.body.should.have.property("text");
          res.body.should.have.property("day");
          res.body.should.have.property("reminder");
          done();
        });
    });
    it("If endpoint is misspelled, should return 404 error", (done) => {
      const paramId = "2";
      chai
        .request(server)
        .get(`/tasks/taskd/${paramId}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it("If task ID does not exist, should return 404 error", (done) => {
      const paramId = "2";
      chai
        .request(server)
        .get(`/tasks/taskd/${paramId}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it("If param is undefined, should return 404 error", (done) => {
      const paramId = undefined;
      chai
        .request(server)
        .get(`/tasks/taskd/${paramId}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
