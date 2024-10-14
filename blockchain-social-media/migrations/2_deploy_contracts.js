// migrations/2_deploy_contracts.js
const PostContract = artifacts.require("PostContract");

module.exports = function (deployer) {
  deployer.deploy(PostContract);
};