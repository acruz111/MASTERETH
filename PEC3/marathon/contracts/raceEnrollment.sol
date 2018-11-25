pragma solidity 0.4.24;


/** 
* @title Enrollments into a Race
* @author Antonio Cruz
* @notice You can use this contract to enroll runners, simulate a race and pay a price.
* @dev For more implementation details read the "design_pattern_decisions.md" document. 
*/

// Import Ownable Contract
import "./Ownable.sol";
// Import Enrollment Library 
import "./EnrollmentLib.sol";

contract raceEnrollment is Ownable {

    bool public emergencyStop;
    modifier noEmergency 
    { 
        if (!emergencyStop) 
        _;
    }
    
    modifier inEmergency 
    {
        if (emergencyStop) 
        _;
    }
   
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
    //Balance of the race's owner
    mapping (address => uint) private balances;

    // Events - publicize actions to external listeners
    event logEnrollment(uint balanceOwner, address addressRunner);
    event logSimulateTimeRace(address addressRunner, uint timeRace);


    /**
     * @notice Enroll runner in the race
     * @dev Conditions to allow the enrollment are: Fee 5 ethers && Age >=18 years old.
     * @param _name This is the name of the runner enrolled in the race.
     * @param _surname This is the surname of the runner enrolled in the race
     * @param _age This is the age of the runner enrolled in the race
     * @param _dni This is the dni of the runner enrolled in the race
     * @param _raceTime This is the time that took the runner to finish the race.
     */
    function enrollRunner(string _name, string _surname, uint _age, string _dni, uint _raceTime) 
    public 
    noEmergency
    payable 
    {     
      require(EnrollmentLib.isValidFee(msg.value, FEE_RACE));
      require(EnrollmentLib.isOver18(_age));

      allAdresses.push(msg.sender);
      runnersByAdress[msg.sender] = Runner ({addressRunner: msg.sender, name: _name, surname: _surname, age: _age, dni: _dni,
        raceTime: _raceTime, status: Status.Enrolled });
      balances[owner] += msg.value;
      emit logEnrollment(balances[owner], msg.sender); //Front catches this event
    }

    /**
     * @notice Get the address of the runner enrolled
     * @dev Function is used in the frontend to display the address of the current user
     * @return address Address of the runner enrolled
     */    
    function getAddressRunner() public view returns (address) {
        return msg.sender;
    }
   
    /**
     * @notice Get the balance of the funds collected during the enrollment (Balance of the owner of the race)
     * @dev Function is used in the frontend to display the total funds collected during the enrollment process.
     * @return uint Total funds collected.
     */      
    function getBalanceTotalEnrollments() public view returns (uint) {
        return balances[owner];
    }

    /** 
     * @notice Get runner info inside the Runner struct.
     * @param _addressRunner Address of the runner for whom the information is to be retrieved.
     * @return string Name of the runner
     * @return string Surname of the runner 
     * @return uint Age of the runner
     * @return string dni of the runner
     * @return uint Time that took the runner to finish the race. If the race has not been started time = 0.
     */
    function getAttributesRunner(address _addressRunner) 
    public 
    noEmergency
    view 
    returns (string _name, string _surname, uint _age, string _dni, uint _raceTime)
    {
        
        _name = runnersByAdress[_addressRunner].name;
        _surname = runnersByAdress[_addressRunner].surname;
        _age = runnersByAdress[_addressRunner].age;
        _dni = runnersByAdress[_addressRunner].dni;
        _raceTime = runnersByAdress[_addressRunner].raceTime;
        
        return (_name, _surname, _age, _dni, _raceTime);
    }

    /**
     * @notice Get all the runners'addresses
     * @dev Function is used in the frontend to display each runner's address during the simulation race process.
     * @return address[] Array that contains all the runners' addresses
     */       
    function getAllAddresses() 
    public 
    onlyOwner
    view 
    returns (address[]) 
    {
        return allAdresses;
    }

    /**
     * @notice Set the simulated time performed by each runner to finish the race
     * @dev Function is used to set the raceTime. Owner of the smart contract can set the race time for each runner.
     * @param _addressRunner Address of the runner 
     * @param _raceTime Time performed by the runner to finish the race.
     */       
    function setTimeRace(address _addressRunner, uint _raceTime) 
    public
    noEmergency     
    onlyOwner
    {
      runnersByAdress[_addressRunner].raceTime = _raceTime;
      emit logSimulateTimeRace(_addressRunner, _raceTime); //Front catches this event

    }

    /**
     * @notice Pay a price to the winner
     * @dev Owner of the smart contract can pay the price.
     * @param winner address to pay the price
     */      
    function payPrice(address winner) 
    public 
    noEmergency
    onlyOwner
    {
           uint amountPrice = balances[owner];
           balances[owner] = 0;
           winner.transfer(amountPrice);
    }


    /** 
     * @notice Fallback function - Called if other functions don't match call or sent ether without data
     * Typically, called when invalid data is sent
     * Added so ether sent to this contract is reverted if the contract fails. Otherwise, the sender's money is transferred to contract
     */
    function () public payable{ 
        revert();
    }

      
    /** 
     * @notice Destroy all data stored.
     * Smart contract kill function. 
     */
    function destroyContract ()
        public
        onlyOwner
    {
        selfdestruct(owner);
    }

    
    /**
    * @notice Enable the emergency stop.
    * @dev Owner of the smart contract activate the emergency stop.
    */
    function enableEmergency() 
        public 
        onlyOwner
    {
        emergencyStop = !emergencyStop;        
    }
}