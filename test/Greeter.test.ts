/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import GreeterArtifact from '../artifacts/contracts/Greeter.sol/Greeter.json';
import { Greeter } from '../typechain';

describe('Basic', () => {
  let greeter: Greeter;
  const initMsg = 'hello blockchain!!!';

  const [admin, other] = waffle.provider.getWallets();

  before(async () => {});

  beforeEach(async () => {
    greeter = (await waffle.deployContract(admin, GreeterArtifact, [initMsg])) as Greeter;
  });

  it('constructor', async () => {});
});
