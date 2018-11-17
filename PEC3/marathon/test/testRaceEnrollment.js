var raceEnrollment = artifacts.require('./raceEnrollment.sol');
var enrollmentLib = artifacts.require('./EnrollmentLib.sol');

contract('raceEnrollment', async (accounts) => {
  const owner = web3.eth.accounts[0];
  const runner1 = web3.eth.accounts[1];
  const runner2 = web3.eth.accounts[2];
  const runner3 = web3.eth.accounts[3];


  const name = "Peter";
  const surname = "Smith";
  const age = 18;
  const dni = "12345678A";
  const raceTime = 170;
  const status = "Enrolled";

  const emptyAddress = '0x0000000000000000000000000000000000000000';

  let RaceEnrollment;


  beforeEach('setup contract for each test', async () => {
     RaceEnrollment = await raceEnrollment.deployed();
  });



it("Enroll a new runner with provided attributes", async () => {
    
 // const RaceEnrollment = await raceEnrollment.deployed();
  
  await RaceEnrollment.enrollRunner(name, surname, age, dni, raceTime, {from: runner1, value: web3.toWei(5, 'ether')});
    var LogEnrollment = RaceEnrollment.logEnrollment();

    await LogEnrollment.watch((err, result) => {
      assert.equal(5,web3.fromWei((result.args.balanceOwner).valueOf()), 'balance owner of the contract');
      assert.equal(runner1,result.args.addressRunner, 'address of the runner enrolled');
    });
    
  });

  it("Pay price to the winner. After paying the price the balance's owner should be zero", async () => {

   // const RaceEnrollment = await raceEnrollment.deployed();
    await RaceEnrollment.enrollRunner(name, surname, age, dni, raceTime,
      {from: runner2, value: web3.toWei(5, 'ether')});  
    await RaceEnrollment.payPrice(runner2, { from: owner });
    const balanceOwner = await RaceEnrollment.getBalanceTotalEnrollments.call({ from: owner });
    assert.equal(0, balanceOwner, 'Balance`s owner after paying the price to the winner');

  });


  // it("Look for a runner already enrolled",  function () {

  //   raceEnrollment.deployed().then(function (contractInstance) {
  //     return contractInstance.getAttributesRunner(runner1, { from: owner }).then(function (v) {
  //       assert.equal(v[0].valueOf(), name, 'name');
  //       assert.equal(v[1].valueOf(), surname, 'surname');
  //       assert.equal(v[2].valueOf(), age, 'age');
  //       assert.equal(v[3].valueOf(), dni, 'dni');
  //       assert.equal(v[4].valueOf(), raceTime, 'raceTime');
        
  //     });  
  //   });
  // })

   it("Look for a runner already enrolled",   async () => {

      const v = await RaceEnrollment.getAttributesRunner(runner1, { from: owner });
        assert.equal(v[0].valueOf(), name, 'name');
        assert.equal(v[1].valueOf(), surname, 'surname');
        assert.equal(v[2].valueOf(), age, 'age');
        assert.equal(v[3].valueOf(), dni, 'dni');
        assert.equal(v[4].valueOf(), raceTime, 'raceTime');
        
      });  
});

