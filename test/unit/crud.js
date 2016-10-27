import fetchMock from 'fetch-mock'
import should from 'should'
import cozy from '../../src'

describe('Fetch document', function(){

  before(() => fetchMock.get('/data/io.cozy.testobject/42', {"answer": 42}))
  after(() => fetchMock.restore())

  it("Call the proper route", async function(){
    let fetched = await cozy.find("io.cozy.testobject", "42")
    fetched.should.have.property("answer", 42)
  });

});
