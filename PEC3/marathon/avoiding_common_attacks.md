---
Title:  Race Simulation
Author: Antonio Cruz
Date:   November 2018
FIle:   Avoiding Common Attacks
---

Avoiding Common Attacks
===

## Index
- [Race Conditions](#race-conditions)
	- [Reentrancy & Pitfalls in Race Condition Solutions](#reentrancy--pitfalls-in-race-condition-solutions)
	- [Cross-function Race Conditions](#cross-function-race-conditions)
- [Integer Overflow and Underflow](#integer-overflow-and-underflow)
- [DoS with (Unexpected) revert](#dos-with-unexpected-revert)
- [DoS with Block Gas Limit](#dos-with-block-gas-limit)
- [Fallback function](#fallback-function)
- [Recommendations](#recommendations)
	- [Remember that on-chain data is public](#remember-that-on-chain-data-is-public)
	- [AES Encryption](#aes-encryption)
	- [Require use](#require-use)
	- [Explicitly mark visibility in functions and state variables](#explicitly-mark-visibility-in-functions-and-state-variables)
	- [Lock pragmas to specific compiler version](#lock-pragmas-to-specific-compiler-version)
	- [Avoid using tx.origin](#avoid-using-txorigin)

## Race Conditions

### Reentrancy & Pitfalls in Race Condition Solutions

Race conditions can occur across multiple functions and contracts. It's recommended finishing all internal work first.

To prevent that a function could be called repeteadly, like the "payPrice()" function:
 - Reduce the sender’s balance before making the transfer of value. Set the owner's balance to 0.
 - Use of address.transfer(). Safe against reentrancy. Safest way to send ether.

Without using address.transfer(), the call would be vulnerable to a race condition.

### Cross-function Race Conditions

Another possible similar attack exist when two different functions share the same state. 

In this project there are no functions that share the same state.

## Integer Overflow and Underflow

If a balance reaches the maximum uint value (2^256) it will circle back to zero. 

In this project, uint are used to increment the total amount of the prize to be paid to the winner of the race. Calculation made in enrollRunner() function. It would be necessary to implement a Math Library.

## DoS with (Unexpected) revert

In this project there isn't an implementation of a "leader" system.

## DoS with Block Gas Limit

- Even though a dynamic array is used in this project, the contract avoid any looping behaviour. Getter will handle the access to the array information. getAllAddresses().
- Only the Owner can pay the prize to the winner.
- Only the Owner can set the race time for each runner.

## Fallback function 

Ether sent to this contract is reverted if the contract fails.

## Recommendations

### Remember that on-chain data is public

This DApp manages information that can be considered sensitive.

Below, you can find a proposed solution to encrypt the information due to the public nature of the blockchain.

#### AES Encryption

This DApp manages information about runners. To protect this information, in the client side could be implemented the [node.js Crypto module](https://nodejs.org/api/crypto.html).

Before the user can push his information into the blockchain, would be necessary to encrypt the attributes of the runner using a password.
This password would be used to cipher and decipher the information. To protect the password could be used Keccak256.

### Require use

In order to allow the enrollment of a runner, the user must pay a 5 ether fee and the runner's age must be at least 18 years old.
To validate this input, require conditions are used in the code by means of the library (`EnrollmentLib.sol`).

### Explicitly mark visibility in functions and state variables

To make clear who can call the functions or access to a variable, all the functions and state variables are marked.

### Lock pragmas to specific compiler version

For security, the pragma is locked to the last release of [Solidity version: 0.4.24](https://github.com/ethereum/solidity/releases).

The pragma of the Library float because could be used for other developers.

### Avoid using tx.origin

All functions that requires, use msg.sender. Avoided to use tx.origin.
