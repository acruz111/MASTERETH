var ownable = artifacts.require('./Ownable.sol');
var raceEnrollment = artifacts.require('./raceEnrollment.sol');

module.exports = function (deployer) {
  deployer.deploy(ownable);
  deployer.deploy(raceEnrollment);
};

