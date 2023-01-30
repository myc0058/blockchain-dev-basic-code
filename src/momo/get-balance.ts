import hre, { ethers } from 'hardhat';
import { getGasOption } from '../utils/gas';
import * as fs from 'fs';
import { Momo } from '../../typechain';

async function main() {
  const [admin] = await hre.ethers.getSigners();

  const chainId = hre.network.config.chainId || 0;

  const deployedMomoJson = fs.readFileSync(
    __dirname + '/momo.deployed.json',
    'utf-8',
  );
  const deployedMomo = JSON.parse(deployedMomoJson);
  const momo = (await ethers.getContractAt(
    deployedMomo.abi,
    deployedMomo.address,
  )) as Momo;

  const adminBalance = await momo.balanceOf(admin.address);

  console.log(adminBalance);
  console.log(ethers.utils.formatEther(adminBalance));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
