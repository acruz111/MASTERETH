---
Title:  Race Simulation
Author: Antonio Cruz
Date:   November 2018
File:   Desing Patters Decisions
---

Desing Patters Decisions
===

## Index

- [Contract structure](#contract-structure)
	- [Restricting Access - Modifiers](#restricting-access---modifiers)
	- [Struct](#struct)
	- [Mapping](#mapping)
	- [Library](#library)
	- [Dynamic Array (upgradable pattern)](#dynamic-array-upgradable-pattern)
	- [Emergency Stop - Only advanced users](#emergency-stop---only-advanced-users)
	- [Lifetime (Mortal) - Only advanced users](#lifetime-mortal---only-advanced-users)
- [Other possible implementations](#other-possible-implementations)

## Contract structure

In this project there are multiple smart contracts
```
Contracts
|___Ownable.sol
|	|___ raceEnrollment.sol
|___EnrollmentLib.sol
```

### Restricting Access - Modifiers

To restrict some functions of the smart contracts, a modifier has been implemented, `onlyOwner`.  
Only the owner of the contract is able to:
- Retrieve all the addresses of the runners enrolled.
- Set the race time for each runner, when simulating the race.
- Pay the price to the winner of the race.

To enable the emergency stop, two modifiers have been implemented `noEmergency`and `inEmergency` to check if the emergency is enabled.

### Struct

`raceEnrollment` contract uses a Struct to store the information about the runners enrolled in the race. 

### Mapping

A mapping is used to easily find a Runner struct information using the address of the runner.
A mapping is used to easily find the total amount of the funds collected, accessing the balance by means of the contract's owner address.

### Library

A library has been implemented to validate that input constraints are fulfilled to allow a runner to be enrolled.
- Validate the user pays the fee to allow the enrollment (`5 ethers`)
- Validate the runner is at least 18 years old

### Dynamic Array (upgradable pattern)

A dynamic array is used to store the addresses of the runners enrolled in the race.

Dynamic because there is no limitation in the number of runners that are allowed to be enrolled.

### Emergency Stop - Only advanced users

Only the owner of the contract can enable the Emergency Stop `enableEmergency()`. This function is critical and cannot be accessed from the UI.
In order to execute this function, an advanced user can get the smart contract code and use Remix Ethereum IDE. 

When the emergency is enabled is not possible to enroll runners, get the attributes of a enrolled runner, set the race time for a runner and 
paying the price to the winner of the race. 

### Lifetime (Mortal) - Only advanced users

`raceEnrollment.sol` has a `destroyContract()` function. This function is critical and cannot be accessed from the UI.
In order to execute this function, an advanced user can get the smart contract code and use Remix Ethereum IDE.


## Other possible implementations

- It would be necessary to implement a Math Library or to use SafeMath library from OpenZeppelin because of security purposes.
In this project, uint are used to increment the total amount of the prize to be paid to the winner of the race. Calculation made in enrollRunner() function. The SafeMath library would protect the contract against integer overflow and underflow attacks.

- This DApp manages information about runners. To protect this information, in the client side could be implemented the [node.js Crypto module](https://nodejs.org/api/crypto.html). It would be necessary to encrypt the attributes of the runner by means of a password used to cipher and decipher the information.
