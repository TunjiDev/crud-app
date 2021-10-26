process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');

chai.should();
chai.use(chaiHttp);


describe("Get All Persons", () => {

  describe("GET /person", () => {
      it("should fetch all persons from the database", (done) => {
          chai.request(app)
              .get("/person")
              .end((err, response) => {
                  console.log(response.status);
                  response.should.have.status(200);
                  response.body.allPersons.should.be.a('array');
                  // response.body.should.be.a('array');
                  // response.body.length.should.not.be.eql(0);
                  done();
              });
      });
  });
});