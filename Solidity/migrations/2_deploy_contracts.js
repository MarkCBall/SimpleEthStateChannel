var StateChannels = artifacts.require("./StateChannels.sol");

module.exports = function(deployer) {
  deployer.deploy(StateChannels, "hello world");
};
