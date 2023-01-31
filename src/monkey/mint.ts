import hre, { ethers } from 'hardhat';
import { getGasOption } from '../utils/gas';
import * as fs from 'fs';
import { Monkey } from '../../typechain';

async function main() {
  const [admin] = await hre.ethers.getSigners();

  const chainId = hre.network.config.chainId || 0;

  const deployedMonkeyJson = fs.readFileSync(
    __dirname + '/monkey.deployed.json',
    'utf-8',
  );
  const deployedMonkey = JSON.parse(deployedMonkeyJson);
  const monkey = (await ethers.getContractAt(
    deployedMonkey.abi,
    deployedMonkey.address,
  )) as Monkey;

  const transaction = await monkey.mint('brown');
  await transaction.wait();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
