require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("dotenv").config({ path: ".env" });

module.exports = {
  solidity: "0.8.17",

  networks: {
    matic: {
      url: process.env.ALCHEMY_KEY_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    }
  }
};
