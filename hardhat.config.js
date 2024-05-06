require("@nomicfoundation/hardhat-toolbox");

task("k6", "Run k6 tests").setAction(async function (args, hre) {
  await hre.run("test");
  // Run k6 script here
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
};
