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

  beforeEach('setup contract for each test', async function () {
    await raceEnrollment.deployed();
  });

 
  it("enroll a new runner with provided attributes", function () {
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

    raceEnrollment.deployed().then(function (contractInstance) {
      return contractInstance.getAttributesRunner(runner1, { from: account }).then(function (v) {
        document.getElementById("NameRunnerRetrieved").innerHTML = v[0].valueOf();
        document.getElementById("SurNameRunnerRetrieved").innerHTML = v[1].valueOf();
        document.getElementById("AgeRunnerRetrieved").innerHTML = v[2].valueOf();
        document.getElementById("DNIRunnerRetrieved").innerHTML = v[3].valueOf();
        document.getElementById("RaceTimeRunnerRetrieved").innerHTML = v[4].valueOf();

        assert.equal(v[0].valueOf(), name, 'name');
        assert.equal(v[1].valueOf(), surname, 'surnmae');
        assert.equal(v[2].valueOf(), age, 'age');
        assert.equal(v[3].valueOf(), dni, 'dni');
        assert.equal(v[4].valueOf(), raceTime, 'raceTime');

      }).catch(function (e) {
        console.log(e);
      
      });
    });

  });
});

// contract('MetaCoin', function (accounts) {
//   it('should put 10000 MetaCoin in the first account', function () {
//     return MetaCoin.deployed().then(function (instance) {
//       return instance.getBalance.call(accounts[0])
//     }).then(function (balance) {
//       assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account")
//     })
//   })
// it('should call a function that depends on a linked library', function () {
//   var meta
//   var metaCoinBalance
//   var metaCoinEthBalance

//   return MetaCoin.deployed().then(function (instance) {
//     meta = instance
//     return meta.getBalance.call(accounts[0])
//   }).then(function (outCoinBalance) {
//     metaCoinBalance = outCoinBalance.toNumber()
//     return meta.getBalanceInEth.call(accounts[0])
//   }).then(function (outCoinBalanceEth) {
//     metaCoinEthBalance = outCoinBalanceEth.toNumber()
//   }).then(function () {
//     assert.equal(
//       metaCoinEthBalance,
//       2 * metaCoinBalance,
//       'Library function returned unexpeced function, linkage may be broken'
//     )
//   })
// })

// }); 

