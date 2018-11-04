pragma solidity ^0.4.24;

/**
 * Import Ownable Contract
 */

import "./Ownable.sol";
/**
 * Import Enrollment Library
 */
//import "./EnrollmentLib.sol";

contract raceEnrollment is Ownable {
    
    uint256 feeRace = 5;

    struct Runner {
        address addressRunner;
        string name;
        string surname;
        string age;
        string dni;
        uint   raceTime;
    }

    //Look for runners enrolled by address
    mapping (address => Runner) private runnersByAdress;
    //Look for runners by race time
    mapping (uint => Runner) private runnersByRaceTime;
    //Balance of the race's owner
    mapping (address => uint) private balances;

    // Events - publicize actions to external listeners
    event logEnrollment(uint balanceOwner, address addressRunner);

    /// @notice Enroll runner in the race
    /// @return The balance of the funds collected during the enrollment (Balance of the race's owner)
    /// @return The address of the enrolled runner
    function enrollRunner() public payable {
//      require(EnrollmentLib.isValidFee(amount, feeRace));
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