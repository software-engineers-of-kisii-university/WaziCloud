let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let baseUrl = require('../../config/env').apiUrl;
let userCredentials = require('./sample-data').user.admin;
let userData = require('./sample-data.json').sampleUser;
let utils = require('../utils');

let createdDomianId = "";
chai.use(chaiHttp);

let getUsers = () => chai.request(baseUrl).get(`/users`)
let createUser = (u) => chai.request(baseUrl).post(`/users`).send(u)
let getUser = (id) => chai.request(baseUrl).get(`/users/${id}`)
let findUsers = (r) => chai.request(baseUrl).get(`/users/search/${r}`)
let deleteUser = (id) => chai.request(baseUrl).delete(`/users/${id}`)

describe('Users', () => {
  let withAdmin = null
  let withNormal = null

  //Retrieve the tokens and delete pre-existing sensor
  before(async function () {
    try {
      withAdmin = await utils.getAdminAuth()
      withNormal = await utils.getNormalAuth()
    } catch (err) {
      console.log('error:' + err)
    }
  });
  
  //Clean after each test
  afterEach(async function () {
    try {
    } catch (err) {
      console.log('error:' + err)
      throw err
    }
  });

  describe('Get all users', () => {
    it('should return all users', async () => {
      let res = await getUsers().set(withAdmin)
      res.should.have.status(200);
    });
  });
  describe('Create user', () => {
    it.skip('should create a new user', async () => {
      let res = await createUser(userData).set(withAdmin)
      res.should.have.status(200);
    });
  });
  describe('Search users', () => {
    it.skip('should search users with specific criteria', async () => {
      let res = await findUsers("{firstName: cdupont}").set(withAdmin)
      res.should.have.status(200);
    });
  });
  describe('Get user', () => {
    it('should get a specific user', async () => {
      let res2 = await getUsers("2ecfae24-f340-4ad0-a12e-02cdc60cd8ba").set(withAdmin)
      res2.should.have.status(200);
    });
  });
  describe('update user', () => {
    it.skip('should update user data', async () => {
      let res = await createUser(userData).set(withAdmin)
      let res2 = await updateUsers(res, {firstName: test}).set(withAdmin)
      res2.should.have.status(200);
    });
  });
  describe('Remove user', () => {
    it.skip('should remove a user', async () => {
      let res = await createUser(userData).set(withAdmin)
      let res2 = await deleteUser(res).set(withAdmin)
      res2.should.have.status(200);
    });
  });
})
