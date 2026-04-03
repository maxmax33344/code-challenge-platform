
const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const app = require('../server'); 
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const sinon = require('sinon');
const Challenge = require('../models/Challenge');
const { updateChallenge,getChallenges,addChallenge,deleteChallenge, hideChallenge } = require('../controllers/challengeController');
const { expect } = chai;

chai.use(chaiHttp);
let server;
let port;


describe('AddChallenge Challenge Test', () => {

  it('should create a new released challenge successfully', async () => {
    // Mock request data
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: { name: 'Printing challenge', description: 'Print odd number less than n.', example: 'Provide n = 10, print "1,3,5,7,9"', sampleInputSet: '10', sampleOutputSet: '1,3,5,7,9', constraints: 'n <=0 and n <500', unitTestSet: 'test', difficulty: 'Easy', category: 'Data Structure', releaseDate: '2026-01-30T00:00:00.000+00:00' }
    };

    // Mock Challenge that would be created
    const createdChallenge = { _id: new mongoose.Types.ObjectId(), ...req.body, released: true };

    // Stub Challenge.create to return the createdChallenge
    const createStub = sinon.stub(Challenge, 'create').resolves(createdChallenge);

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await addChallenge(req, res);

    // Assertions
    expect(createStub.calledOnceWith({...req.body, released: true })).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(createdChallenge)).to.be.true;

    // Restore stubbed methods
    createStub.restore();
  });
  
  it('should create a new unreleased challenge successfully', async () => {
    // Mock request data
    const today = new Date();
    const futureDate = today.setDate(today.getDate()+1).toString();

    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: { name: 'Printing challenge', description: 'Print odd number less than n.', example: 'Provide n = 10, print "1,3,5,7,9"', sampleInputSet: '10', sampleOutputSet: '1,3,5,7,9', constraints: 'n <=0 and n <500', unitTestSet: 'test', difficulty: 'Easy', category: 'Data Structure', releaseDate: futureDate }
    };

    // Mock Challenge that would be created
    const createdChallenge = { _id: new mongoose.Types.ObjectId(), ...req.body, released: false };

    // Stub Challenge.create to return the createdChallenge
    const createStub = sinon.stub(Challenge, 'create').resolves(createdChallenge);

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await addChallenge(req, res);

    // Assertions
    expect(createStub.calledOnceWith({...req.body, released: false })).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(createdChallenge)).to.be.true;

    // Restore stubbed methods
    createStub.restore();
  });

  it('should return 500 if an error occurs', async () => {
    // Stub Challenge.create to throw an error
    const createStub = sinon.stub(Challenge, 'create').throws(new Error('DB Error'));

    // Mock request data
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: { name: 'Printing challenge', description: 'Print odd number less than n.', example: 'Provide n = 10, print "1,3,5,7,9"', sampleInputSet: '10', sampleOutputSet: '1,3,5,7,9', constraints: 'n <=0 and n <500', unitTestSet: 'test', difficulty: 'Easy', category: 'Data Structure', releaseDate: '2026-01-30T00:00:00.000+00:00' }
    };

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await addChallenge(req, res);

    // Assertions
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    // Restore stubbed methods
    createStub.restore();
  });

});


describe('Update Function Test', () => {

  it('should update released challenge successfully', async () => {
    // Mock challenge data
    const today = new Date();
    const futureDate = today.setDate(today.getDate()+1).toString();
    const challengeId = new mongoose.Types.ObjectId();
    const existingChallenge = {
      _id: challengeId,
      name: "Old Challenge",
      description: "Old Description",
      example: "old Example",
      sampleInputSet: "old SampleInputSet",
      sampleOutputSet: "old SampleOutputSet",
      constraints: "old Constraints",
      unitTestSet: "old Unit Test",
      difficulty: "Easy",
      category: "Data Structure",
      releaseDate: futureDate,
      released: false,
      save: sinon.stub().resolvesThis(), // Mock save method
    };
    // Stub Challenge.findById to return mock challenge
    const findByIdStub = sinon.stub(Challenge, 'findById').resolves(existingChallenge);

    // Mock request & response
    const req = {
      params: { id: challengeId },
      body: { name: "New Challenge", difficulty: "Medium" }
    };
    const res = {
      json: sinon.spy(), 
      status: sinon.stub().returnsThis()
    };

    // Call function
    await updateChallenge(req, res);

    // Assertions
    expect(existingChallenge.name).to.equal("New Challenge");
    expect(existingChallenge.difficulty).to.equal("Medium");
    expect(res.status.called).to.be.false; // No error status should be set
    expect(res.json.calledOnce).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });

  it('should update released challenge to unreleased challenge successfully', async () => {
    // Mock challenge data
    const today = new Date();
    const beforeDate = today.setDate(today.getDate()-1).toString();
    const challengeId = new mongoose.Types.ObjectId();
    const existingChallenge = {
      _id: challengeId,
      name: "Old Challenge",
      description: "Old Description",
      example: "old Example",
      sampleInputSet: "old SampleInputSet",
      sampleOutputSet: "old SampleOutputSet",
      constraints: "old Constraints",
      unitTestSet: "old Unit Test",
      difficulty: "Easy",
      category: "Data Structure",
      releaseDate: today,
      released: false,
      save: sinon.stub().resolvesThis(), // Mock save method
    };
    // Stub Challenge.findById to return mock challenge
    const findByIdStub = sinon.stub(Challenge, 'findById').resolves(existingChallenge);

    // Mock request & response
    const req = {
      params: { id: challengeId },
      body: { name: "New Challenge", difficulty: "Medium", releaseDate: beforeDate}
    };
    const res = {
      json: sinon.spy(), 
      status: sinon.stub().returnsThis()
    };

    // Call function
    await updateChallenge(req, res);

    // Assertions
    expect(existingChallenge.name).to.equal("New Challenge");
    expect(existingChallenge.difficulty).to.equal("Medium");
    expect(existingChallenge.releaseDate).to.equal(beforeDate);
    expect(existingChallenge.released).to.equal(false);
    expect(res.status.called).to.be.false; // No error status should be set
    expect(res.json.calledOnce).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });



  it('should return 404 if challenge is not found', async () => {
    const findByIdStub = sinon.stub(Challenge, 'findById').resolves(null);

    const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await updateChallenge(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Challenge not found' })).to.be.true;

    findByIdStub.restore();
  });

  it('should return 500 on error', async () => {
    const findByIdStub = sinon.stub(Challenge, 'findById').throws(new Error('DB Error'));

    const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await updateChallenge(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.called).to.be.true;

    findByIdStub.restore();
  });



});



describe('GetChallenge Function Test', () => {

  it('should return released challenges for user', async () => {
    // Mock user ID
    const userId = new mongoose.Types.ObjectId();

    // Mock challenge data
    const challenges = [
      { _id: new mongoose.Types.ObjectId(), name: "Challenge 1", released: true},
      { _id: new mongoose.Types.ObjectId(), name: "Challenge 2", released: false}
    ];

    // Stub Challenge.find to return mock challenges
    const findStub = sinon.stub(Challenge, 'find').resolves(challenges);

    // Mock request & response
    const req = { user: { role: 'user' } };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    // Call function
    await getChallenges(req, res);

    // Assertions
    expect(findStub.calledOnceWith({ released: true })).to.be.true;
    expect(res.json.calledWith(challenges)).to.be.true;
    expect(res.status.called).to.be.false; // No error status should be set

    // Restore stubbed methods
    findStub.restore();
  });

  it('should return all challenges for admin', async () => {
    // Mock user ID
    const userId = new mongoose.Types.ObjectId();

    // Mock challenge data
    const challenges = [
      { _id: new mongoose.Types.ObjectId(), name: "Challenge 1", released: true},
      { _id: new mongoose.Types.ObjectId(), name: "Challenge 2", released: false}
    ];

    // Stub Challenge.find to return mock challenges
    const findStub = sinon.stub(Challenge, 'find').resolves(challenges);

    // Mock request & response
    const req = { user: { role: 'admin' } };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    // Call function
    await getChallenges(req, res);

    // Assertions
    expect(findStub.calledOnceWith()).to.be.true;
    expect(res.json.calledWith(challenges)).to.be.true;
    expect(res.status.called).to.be.false; // No error status should be set

    // Restore stubbed methods
    findStub.restore();
  });

  it('should return 500 on error', async () => {
    // Stub Challenge.find to throw an error
    const findStub = sinon.stub(Challenge, 'find').throws(new Error('DB Error'));

    // Mock request & response
    const req = { user: { id: new mongoose.Types.ObjectId() } };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    // Call function
    await getChallenges(req, res);

    // Assertions
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    // Restore stubbed methods
    findStub.restore();
  });

});



describe('DeleteChallenge Function Test', () => {

  it('should delete a challenge successfully', async () => {
    // Mock request data
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };

    // Mock challenge found in the database
    const challenge = { remove: sinon.stub().resolves() };

    // Stub Challenge.findById to return the mock challenge
    const findByIdStub = sinon.stub(Challenge, 'findById').resolves(challenge);

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await deleteChallenge(req, res);

    // Assertions
    expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
    expect(challenge.remove.calledOnce).to.be.true;
    expect(res.json.calledWith({ message: 'Challenge deleted' })).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });

  it('should return 404 if challenge is not found', async () => {
    // Stub Challenge.findById to return null
    const findByIdStub = sinon.stub(Challenge, 'findById').resolves(null);

    // Mock request data
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await deleteChallenge(req, res);

    // Assertions
    expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Challenge not found' })).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });

  it('should return 500 if an error occurs', async () => {
    // Stub Challenge.findById to throw an error
    const findByIdStub = sinon.stub(Challenge, 'findById').throws(new Error('DB Error'));

    // Mock request data
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await deleteChallenge(req, res);

    // Assertions
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });

  

});

describe('Hide Challenge Function Test', () => {

  it('should hide a challenge successfully', async () => {
    // Mock request data
    const challengeId = new mongoose.Types.ObjectId();
    const today = new Date();
    const newReleaseDate = new Date('2999-01-30');

    // Mock challenge found in the database
    const challenge = { _id: challengeId, releaseDate: today, released: true};

    // Stub Challenge.findById to return the mock challenge
    const findByIdStub = sinon.stub(Challenge, 'findById').resolves(challenge);

    // Mock request data
    const req = { params: {id: challengeId}};
    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await hideChallenge(req, res);

    // Assertions
    expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
    expect(challenge.releaseDate.toISOString).to.equal(newReleaseDate.toISOString);
    expect(challenge.released).to.equal(false);
    expect(res.json.calledOnce).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });

  it('should return 404 if challenge is not found', async () => {
    // Stub Challenge.findById to return null
    const findByIdStub = sinon.stub(Challenge, 'findById').resolves(null);

    // Mock request data
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await deleteChallenge(req, res);

    // Assertions
    expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Challenge not found' })).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });

  it('should return 500 if an error occurs', async () => {
    // Stub Challenge.findById to throw an error
    const findByIdStub = sinon.stub(Challenge, 'findById').throws(new Error('DB Error'));

    // Mock request data
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await deleteChallenge(req, res);

    // Assertions
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });

  

});

