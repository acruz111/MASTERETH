pragma solidity ^0.4.24;

/**
 * Import Ownable Contract
 */

import "./Ownable.sol";
/**
 * Import Enrollment Library
 */
import "./EnrollmentLib.sol";

contract raceEnrollment is Ownable {

    uint constant FEE_RACE = 5 ether;
    address[] public allAdresses;
    uint i=0;

    enum Status {
        Enrolled,
        NotEnrolled
    }

    struct Runner {
        address addressRunner;
        string name;
        string surname;
        uint   age;
        string dni;
        uint   raceTime;
        Status status;
    }

    //Look for runners enrolled by address
    mapping (address => Runner) private runnersByAdress;
    //Look for runners by race time
    mapping (uint => Runner) private runnersByRaceTime;
    //Balance of the race's owner
    mapping (address => uint) private balances;

    // Events - publicize actions to external listeners
    event logEnrollment(uint balanceOwner, address addressRunner);
    event logSimulateTimeRace(address addressRunner, uint timeRace);


    /// @notice Enroll runner in the race
    function enrollRunner(string _name, string _surname, uint _age, string _dni, uint _raceTime) 
    public 
    payable 
    {     
      require(EnrollmentLib.isValidFee(msg.value, FEE_RACE));
      allAdresses.push(msg.sender);
      runnersByAdress[msg.sender] = Runner ({addressRunner: msg.sender, name: _name, surname: _surname, age: _age, dni: _dni,
        raceTime: _raceTime, status: Status.Enrolled });
      balances[owner] += msg.value;
      emit logEnrollment(balances[owner], msg.sender); //Front catches this event
    }

    // Get the address of the runner enrolled
    function getAddressRunner() public view returns (address) {
        return msg.sender;
    }
   
     // Get the balance of the funds collected during the enrollment (Balance of the race's owner)
    function getBalanceTotalEnrollments() public view returns (uint) {
        return balances[owner];
    }

    // Get the attributes of the Runners of the marathon
    function getAttributesRunner(address _addressRunner) public view returns (string _name, string _surname, uint _age, string _dni, uint _raceTime) {
        
        _name = runnersByAdress[_addressRunner].name;
        _surname = runnersByAdress[_addressRunner].surname;
        _age = runnersByAdress[_addressRunner].age;
        _dni = runnersByAdress[_addressRunner].dni;
        _raceTime = runnersByAdress[_addressRunner].raceTime;
        
        return (_name, _surname, _age, _dni, _raceTime);
    }

    // Get all the addresses enrolled in the race
    function getAllAddresses() 
    public 
//    onlyOwner
    view 
    returns (address[]) 
    {
        return allAdresses;
    }

    // Set the simulated time performed by each runner to finish the race
    function setTimeRace(address _addressRunner, uint _raceTime) 
    public     
    {
      runnersByAdress[_addressRunner].raceTime = _raceTime;
      emit logSimulateTimeRace(_addressRunner, _raceTime); //Front catches this event

    }

    // Get the winner of the marathon (the fastest runner)
    function getWinnerAddress(uint _fastestTime) public view returns (address) {
        
        address addressWinner;
        addressWinner = runnersByRaceTime[_fastestTime].addressRunner;        
        return (addressWinner);
    }

    /// @notice Only the Owner of the Race can pay a price to the winner
    /// @param  winner address to pay the price
    function payPrice(address winner) 
    public 
    onlyOwner
    {
           uint amountPrice = balances[owner];
           balances[owner] = 0;
           winner.transfer(amountPrice);
    }


    // Fallback function - Called if other functions don't match call or sent ether without data
    // Typically, called when invalid data is sent
    // Added so ether sent to this contract is reverted if the contract fails
    // otherwise, the sender's money is transferred to contract
    function () public payable{ 
        revert();
    }
}