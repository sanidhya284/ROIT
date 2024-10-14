const { net } = require("web3");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost
      port: 7545,            // Standard Ethereum port
      network_id: "*",       // Any network (default: none)
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      settings: {          // Optional compiler settings
        optimizer: {
          enabled: true,  // Enable optimization
          runs: 200,      // Optimize for how many times you intend to run the code
        },
      },
    },
  },
};