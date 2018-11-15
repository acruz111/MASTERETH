var raceEnrollment = artifacts.require('./raceEnrollment.sol');
var enrollmentLib = artifacts.require('./EnrollmentLib.sol');

contract('raceEnrollment', function (accounts) {
  const owner = accounts[0];
  const runner1 = accounts[1];
  const runner2 = accounts[2];
  const runner3 = accounts[2];


  const name = "Peter";
  const surname = "Smith";
  const age = 18;
  const dni = "12345678A";
  const raceTime = 170;
  const status = "Enrolled";

  const emptyAddress = '0x0000000000000000000000000000000000000000';

  it("Enroll a new runner with provided attributes", function () {
    raceEnrollment.deployed().then(function (contractInstance) {
      
      contractInstance.enrollRunner(name, surname, age, dni, raceTime, {from: runner1, value: web3.toWei(5, "ether")}).then(function (v) {
      })

      var LogEnrollment = contractInstance.logEnrollment({});
      LogEnrollment.watch(function (err, result) {
        if (!err) {
          assert.equal(5,web3.fromWei((result.args.balanceOwner).valueOf(), 'balance owner of the contract'));
          assert.equal(runner1,result.args.addressRunner, 'address of the runner enrolled');

        } else {
          console.error(err);
        }
      })
      
    });

  })


  it("Fetch a runner already enrolled",  function () {

    raceEnrollment.deployed().then(function (contractInstance) {
      return contractInstance.getAttributesRunner(runner1, { from: owner }).then(function (v) {
        assert.equal(v[0].valueOf(), name, 'name');
        assert.equal(v[1].valueOf(), surname, 'surname');
        assert.equal(v[2].valueOf(), age, 'age');
        assert.equal(v[3].valueOf(), dni, 'dni');
        assert.equal(v[4].valueOf(), raceTime, 'raceTime');
      });  
    });
  })

});

