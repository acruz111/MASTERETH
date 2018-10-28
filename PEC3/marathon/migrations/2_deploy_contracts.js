var raceEnrollment = artifacts.require('./raceEnrollment.sol')

module.exports = function (deployer) {
  deployer.deploy(raceEnrollment)
}
