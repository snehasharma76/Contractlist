// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const LINKAddress = "0x326c977e6efc84e512bb9c30f76e30c160ed06fb";
const oracleAddress = "0xc8D925525CA8759812d0c299B90247917d4d4b7C";
const jobId = "a7330d0b4b964c05abc66a26307047c0";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const _APIConsumer = await ethers.getContractFactory("APIConsumer");
  const apiConsumer = await _APIConsumer.deploy(LINKAddress, oracleAddress, jobId);

  await apiConsumer.deployed();

  console.log("Deployed address:", apiConsumer.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
