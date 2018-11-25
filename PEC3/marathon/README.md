---
Title:  Race Simulation
Author: Antonio Cruz
Date:   November 2018
File:   README
---
===


## Index

- [What does this project do?](#what-does-this-project-do)
- [How to set up?](#how-to-set-up)
- [Use Cases](#use-cases)
- [How to use this DAPP?](#how-to-use-this-dapp)
- [Test](#test)

## What does this project do?

This project is about a Decentralized Application (DApp) that allows users to be enrolled as runners in a marathon. The information regarding each runner can be consulted at any time. The DApp simulate the race and set a random race time to each runner. Then the winner of the marathon will get a prize.

The DApp is based on standards explained in [design_pattern_decisions.md](https://github.com/acruz111/MASTERETH/blob/master/PEC3/marathon/design_pattern_decisions.md) file.

The DApp takes into account the following security topics: [avoiding_common_attacks.md](https://github.com/acruz111/MASTERETH/blob/master/PEC3/marathon/avoiding_common_attacks.md)


## How to set up?

Clone this repository.
```
$ git clone https://github.com/acruz111/MASTERETH.git
```
Go to MASTERETH/PEC3/marathon folder
```
$ npm install //This take a while with some update recommendations.
``` 
You must see something like this:

```
$ ls
app                         design_pattern_decisions.md  node_modules       test
avoiding_common_attacks.md  images                       package.json       truffle.js
build                       LICENSE                      package-lock.json  webpack.config.js
contracts                   migrations                   README.md

```
Start Ganache or Ganache-cli. Open a new terminal and in the path of the project.

```
$ truffle compile
```

```
$ truffle migrate --reset // Use --reset if you have a previous build.
```
If the migration is successful.

**I recommend at this point to run the tests.**

```
$ truffle test
```
If everything goes well, you will see:

![Alt text](https://github.com/acruz111/MASTERETH/blob/master/PEC3/marathon/images/tests.png)

```
$ npm run dev
```

Go to [http://localhost:8080](http://localhost:8080/) 


If everything goes well, you will see:

![Alt text](https://github.com/acruz111/MASTERETH/blob/master/PEC3/marathon/images/frontimg.png)


### Use cases
---
#### Enroll runners in the race
1. The address of the runner is automatically displayed on the screen (is taken from Metamask)
2. Insert the Enrollment Fee: 5 (exact fee that has to be paid)
3. Insert the Name of the runner
4. Insert the Surname of the runner
5. Insert the age of the runner: 18 (this is the minimum age allowed to participate in the race)
6. Insert the dni of the runner
8. Enroll a runner in the race by clicking on `Enroll` button.
9. Submit the Transaction in MetaMask.
---

#### Look for runners enrolled in the race.
1. Insert the address of the enrolled runner that you want to get the information
2. Click on `Fetch for Runner` button

---

#### Simulate Race
1. Click on `Simulate Race` button
2. Submit all the transactions in Metamask

---

#### Pay Prize to the winner of the Marathon
1. Insert the address of the winner
2. Click on `Pay Prize` button
3. Submit the Transaction in MetaMask.

---

## How to use this DApp?
* The first thing is to enroll several runners in the race. It is recommended to enroll at least 3 runners.
    * For each runner, select from Metamask a different account.
* Once all the runners of the race have been enrolled, look for any of the runners.
    * Input the address of the runner you are interested in, and click on `Fetch for Runner` to get the runner information.
* Simulate the Race. (Only the owner can simulate the race)
    * When `Simulate Race` button is clicked on, a random race time is assigned for each runner. The winner is the runner that got assigned the   fastest race time.
* Pay Prize to the winner. (Only the owner can pay the prize) 
    * The Prize is the total amount collected from the fees, i.e (if the number of the runners enrolled are 3, the Prize will be 15 ethers, 5 ethers per each runner).
    * Input the address of the winner and click on `Pay Prize` button    

### A demo of how to use the DApp can be found in:
[Demo Video](https://github.com/acruz111/MASTERETH/blob/master/PEC3/marathon/images/demo2.mkv/) 

---
After clicking on the link -  "View Raw" to play the video.

---
---

## Thanks for using this DApp!

---

## Test

### raceEnrollment.sol

1. Test that is possible to enroll a new runner providing valid attributes.
    - After enrolling the runner, compare the expected values of the owner's balance and the address of the runner enrolled.  
2. Test that is possible to get the address of a runner.
3. Test that is possible to retrieve the attributes of a enrolled runner.
    - Compare the values of the struct with the expected ones.
4. Test that is possible to perform a transaction. Transfer ethers to an address
    - After the transfer of the ethers, the balance of the source account (owner of the contract) results zero
5. Test that only the owner can transfer ethers to the winner's address
    - Used try/catch to get the revert error from the require.
6. Test that all the addresses of the runners enrolled can be retrieved
7. Test that only de owner can retrieve all the addresses registered
    - Used try/catch to get the revert error from the require.
8. Test that a race time can be set for a specific runner
9. Test that only the owner can set the race time for a runner
    - Used try/catch to get the revert error from the require
10. Test that only the owner can perform the destruction.
    - Used try/catch to catch de error.
11. Test that only the owner can activate the emergency stop.
    - Used try/catch to catch de error.
    

   

   

   

 

    
