var ownable = artifacts.require('./Ownable.sol');
var enrollmentLib = artifacts.require("./EnrollmentLib.sol");
var raceEnrollment = artifacts.require('./raceEnrollment.sol');

module.exports = function (deployer) {
  deployer.deploy(ownable);
  deployer.deploy(enrollmentLib);
  deployer.deploy(raceEnrollment);
  deployer.link(enrollmentLib,raceEnrollment);
};

