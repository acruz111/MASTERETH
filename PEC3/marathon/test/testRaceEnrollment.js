var raceEnrollment = artifacts.require('./raceEnrollment.sol');

/**
 * @author Antonio Cruz
 * @Test for raceEnrollment.sol
 * Declaration of variables that will be useful to test the functions and attributes values.
 */

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

  let RaceEnrollment;
  let err = null;


  beforeEach('setup contract for each test', async () => {
     RaceEnrollment = await raceEnrollment.deployed();
  });

  /**
   * Test that is possible to enroll a new runner providing valid attributes.
   * After enrolling the runner, compare the expected values of the owner's balance and
   * the address of the runner enrolled.
   */
  it("Enroll a new runner with provided attributes", async () => {
     
    await RaceEnrollment.enrollRunner(name, surname, age, dni, raceTime, {from: runner1, value: web3.toWei(5, 'ether')});
    var LogEnrollment = RaceEnrollment.logEnrollment();
    await LogEnrollment.watch((err, result) => {
      assert.equal(5,web3.fromWei((result.args.balanceOwner).valueOf()), 'balance owner of the contract');
      assert.equal(runner1,result.args.addressRunner, 'address of the runner enrolled');
    });
    
  });

  /**
   * Test that is possible to get the address of a runner.
   */
  it("Getting the address of the runner enrolled", async () => {

    const add1 = await RaceEnrollment.getAddressRunner({ from: runner1 });
    assert.equal(add1, runner1, 'Address of the runner enrolled');

  });


  /**
   * Test that is possible to retrieve the attributes of a enrolled runner.
   * Compare the values of the struct with the expected ones.
   */
  it("Look for a runner already enrolled",   async () => {

    const v = await RaceEnrollment.getAttributesRunner(runner1, { from: owner });
     assert.equal(v[0].valueOf(), name, 'name');
     assert.equal(v[1].valueOf(), surname, 'surname');
     assert.equal(v[2].valueOf(), age, 'age');
     assert.equal(v[3].valueOf(), dni, 'dni');
     assert.equal(v[4].valueOf(), raceTime, 'raceTime');
      
  });  

  /** 
   * Test that is possible to perform a transaction. Transfer ethers to an address
   * After the transfer of the ethers, the balance of the source account (owner of the contract) results zero
   */
  it("Pay price to the winner. After paying the price the balance's owner should be zero", async () => {

    await RaceEnrollment.enrollRunner(name, surname, age, dni, raceTime,{from: runner2, value: web3.toWei(5, 'ether')});  
    await RaceEnrollment.payPrice(runner2, { from: owner });
    const balanceOwner = await RaceEnrollment.getBalanceTotalEnrollments.call({ from: owner });
    assert.equal(0, balanceOwner, 'Balance`s owner after paying the price to the winner');

  });

  /**
   * Only the owner can transfer ethers to the winner's address
   * Used try/catch to get the revert error from the require.
   */
  it("Pay price to the winner (Only owner)", async () => {

    
    try{
      await RaceEnrollment.payPrice(runner2, { from: runner1 });
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);

  });  

  /**
   * Test that all the addresses of the runners enrolled can be retrieved
   */ 
  it("Getting all addresses of the enrolled runners", async () => {

    
    const alladd = await RaceEnrollment.getAllAddresses({ from: owner });
    assert.equal(alladd[0], runner1, 'Address of the runner1 enrolled');
    assert.equal(alladd[1], runner2, 'Address of the runner2 enrolled');

  });

  /**
   * Only de owner can retrieve all the addresses registered
   * Used try/catch to get the revert error from the require.
   */
  it("Getting all addresses of the enrolled runners (Only owner)", async () => {

    
    try
    {
      const alladd = await RaceEnrollment.getAllAddresses({ from: runner1 });
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);

  });

  /**
   * Test that a race time can be set for a specific runner
   */ 
  it("Setting race time for a runner", async () => {

    await RaceEnrollment.enrollRunner(name, surname, age, dni, raceTime, {from: runner3, value: web3.toWei(5, 'ether')});
    await RaceEnrollment.setTimeRace(runner3, 200, { from: owner });
    const v = await RaceEnrollment.getAttributesRunner(runner3, { from: owner });
    assert.equal(v[4].valueOf(), 200, 'raceTime');

  });

  /**
   * Only the owner can set the race time for a runner
   * Used try/catch to get the revert error from the require.
   */ 
  it("Setting race time for a runner (Only owner)", async () => {

    
    try{
      await RaceEnrollment.setTimeRace(runner3, 200, { from: runner1 });
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);

  });


  /** 
   * Only the owner can perform the destruction.
   * Used try/catch to catch de error.
   */ 
  it("Test selfdestruct (Only owner).", async () => {

    try {
      await RaceEnrollment.destroyContract({ from: runner1 });
    } catch (error) {
        err = error;
    }
    assert.ok(err instanceof Error);

  });

  /**
   * Test that only the owner can activate the emergency stop.
   * Used try/catch to catch de error.
   */ 
  it("Test Emergency Stop", async () => {

    try {
        await RaceEnrollment.enableEmergency({ from: runner1 });
    } catch (error) {
        err = error;
    }
    assert.ok(err instanceof Error);
  });

});