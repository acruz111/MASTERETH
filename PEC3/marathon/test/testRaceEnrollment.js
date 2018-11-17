var raceEnrollment = artifacts.require('./raceEnrollment.sol');

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



  it("Enroll a new runner with provided attributes", async () => {
     
    await RaceEnrollment.enrollRunner(name, surname, age, dni, raceTime, {from: runner1, value: web3.toWei(5, 'ether')});
    var LogEnrollment = RaceEnrollment.logEnrollment();
    await LogEnrollment.watch((err, result) => {
      assert.equal(5,web3.fromWei((result.args.balanceOwner).valueOf()), 'balance owner of the contract');
      assert.equal(runner1,result.args.addressRunner, 'address of the runner enrolled');
    });
    
  });

   it("Enroll a new runner with non valid provided attributes", async () => {
     
    try{
      await RaceEnrollment.enrollRunner(name, surname, 17, dni, raceTime, {from: runner1, value: web3.toWei(5, 'ether')});
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error); 
    
    try{
      await RaceEnrollment.enrollRunner(name, surname, age, dni, raceTime, {from: runner2, value: web3.toWei(4, 'ether')});
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);  
    
   });

  it("Getting the address of the runner enrolled", async () => {

    const add1 = await RaceEnrollment.getAddressRunner({ from: runner1 });
    assert.equal(add1, runner1, 'Address of the runner enrolled');

  });

  it("Look for a runner already enrolled",   async () => {

    const v = await RaceEnrollment.getAttributesRunner(runner1, { from: owner });
     assert.equal(v[0].valueOf(), name, 'name');
     assert.equal(v[1].valueOf(), surname, 'surname');
     assert.equal(v[2].valueOf(), age, 'age');
     assert.equal(v[3].valueOf(), dni, 'dni');
     assert.equal(v[4].valueOf(), raceTime, 'raceTime');
      
  });  

  it("Pay price to the winner. After paying the price the balance's owner should be zero", async () => {

    await RaceEnrollment.enrollRunner(name, surname, age, dni, raceTime,{from: runner2, value: web3.toWei(5, 'ether')});  
    await RaceEnrollment.payPrice(runner2, { from: owner });
    const balanceOwner = await RaceEnrollment.getBalanceTotalEnrollments.call({ from: owner });
    assert.equal(0, balanceOwner, 'Balance`s owner after paying the price to the winner');

  });

  it("Pay price to the winner (Only owner)", async () => {

    
    try{
      await RaceEnrollment.payPrice(runner2, { from: runner1 });
    } catch (error) {
      err = error;
    }

  assert.ok(err instanceof Error);

  });  

  it("Getting all addresses of the enrolled runners", async () => {

    
    const alladd = await RaceEnrollment.getAllAddresses({ from: owner });
    assert.equal(alladd[0], runner1, 'Address of the runner1 enrolled');
    assert.equal(alladd[1], runner2, 'Address of the runner2 enrolled');

  });

  it("Getting all addresses of the enrolled runners (Only owner)", async () => {

    
    try
    {
      const alladd = await RaceEnrollment.getAllAddresses({ from: runner1 });
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);

  });

  it("Setting race time for a runner", async () => {

    await RaceEnrollment.enrollRunner(name, surname, age, dni, raceTime, {from: runner3, value: web3.toWei(5, 'ether')});
    await RaceEnrollment.setTimeRace(runner3, 200, { from: owner });
    const v = await RaceEnrollment.getAttributesRunner(runner3, { from: owner });
    assert.equal(v[4].valueOf(), 200, 'raceTime');

  });

  it("Setting race time for a runner (Only owner)", async () => {

    
    try{
      await RaceEnrollment.setTimeRace(runner3, 200, { from: runner1 });
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);

  });


  it("Test selfdestruct (Only owner).", async () => {

    try {
      await RaceEnrollment.destroyContract({ from: runner1 });
    } catch (error) {
        err = error;
    }
    assert.ok(err instanceof Error);

  });

});

