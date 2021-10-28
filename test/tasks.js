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

  describe("POST endpoint", () => {
    it("Should return the task object that was posted to the new array", (done) => {
      const sampleTask = {
        text: "Write Tests",
        day: "Oct 28th at 12:00 pm",
        reminder: false,
      };
      chai
        .request(server)
        .post("/tasks/task")
        .send(sampleTask)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.a("object");
          res.body.should.have.property("_id");
          res.body.should.have.property("text").eq(sampleTask.text);
          res.body.should.have.property("day").eq(sampleTask.day);
          res.body.should.have.property("reminder").eq(sampleTask.reminder);
          done();
        });
    });
    it("If req has invalid properties, should return a 400 err", (done) => {
      const sampleTask = {
        text: true,
        day: 10.28,
        reminder: "yes",
      };
      chai
        .request(server)
        .post("/tasks/task")
        .send(sampleTask)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("If req is undefined, should return a 400 err", (done) => {
      const sampleTask = undefined;
      chai
        .request(server)
        .post("/tasks/task")
        .send(sampleTask)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("If endpoint is invalid, should return a 404 err", (done) => {
      const sampleTask = {
        text: "Write Tests",
        day: "Oct 28th at 12:00 pm",
        reminder: false,
      };
      chai
        .request(server)
        .post("/tasks/taskd")
        .send(sampleTask)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
