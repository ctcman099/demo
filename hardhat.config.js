require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.12",
      },
      {
        version: "0.6.12",
        settings: {},
      },
    ],
  },
};
