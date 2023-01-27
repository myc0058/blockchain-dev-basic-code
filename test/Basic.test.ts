import { expect } from 'chai';

describe('Basic', () => {
  before(async () => {
    console.log('execute before');
  });

  beforeEach(async () => {
    console.log('execute beforeEach');
  });

  it('test', async () => {
    console.log('execute test');
  });

  it('test2 ', async () => {
    console.log('execute test2');

    const str = 'mo mo mo';
    const strArray = str.split(' ');
    expect(strArray.length).to.be.equal(3);

    expect(strArray[0]).to.be.equal('mo');
    expect(strArray[1]).to.be.equal('mo');
    expect(strArray[2]).to.be.equal('mo');
  });
});
