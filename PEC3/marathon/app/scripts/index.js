// Import the page's CSS. Webpack will know what to do with it.
import '../styles/app.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import raceEnrollmentArtifact from '../../build/contracts/raceEnrollment.json'
// raceEnrollment is our usable abstraction, which we'll use through the code below.
var raceEnrollment = contract(raceEnrollmentArtifact)

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts
var account

 const App = {
  start: function () {
    window.focus();
    var self = this

    // Bootstrap the raceEnrollment abstraction for Use.
    raceEnrollment.setProvider(web3.currentProvider)

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }

      if (accs.length === 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

      self.refreshAddress();
    })
  },

  enrollRunner: function () {
    var self = this;
    
    var amount = parseInt(document.getElementById("amount").value);
    var name = String(document.getElementById("name").value);
    var surname = String(document.getElementById("surName").value);
    var age = parseInt(document.getElementById("age").value);
    var dni = String(document.getElementById("dni").value);
    var raceTime = 0;

    raceEnrollment.deployed().then(function (contractInstance) {
      
      contractInstance.enrollRunner(name, surname, age, dni, raceTime, {from: account, value: web3.toWei(amount, "ether"), gas: 500000 }).then(function (v) {
        self.setStatus("Runner enrolled!");

      }).catch(function (e) {
        console.log(e);
        self.setStatus("Error enrolling runner");
      
      });

      var LogEnrollment = contractInstance.logEnrollment({});
      LogEnrollment.watch(function (err, result) {
        if (!err) {
          document.getElementById("totalAmount").innerHTML = web3.fromWei((result.args.balanceOwner).valueOf(), 'ether'); ;
          // document.getElementById("addressOfTheRunner").innerHTML = result.args.addressRunner;
        } else {
          console.error(err);
        }
      })
      
    });
  },

  payPrice: function () {
    var self = this;
    var addressWinner = document.getElementById("addressOfTheWinner").value;

    raceEnrollment.deployed().then(function (contractInstance) {
      
      contractInstance.payPrice(addressWinner, { from: account }).then(function (v) {
        self.setStatus("Price payed!");

      }).catch(function (e) {
        console.log(e);
        self.setStatus("Error paying price to the winner");
      
      });
      
    });
  },

  refreshAddress: function () {
    var self = this;

    raceEnrollment.deployed().then(function (contractInstance) {
      return contractInstance.getAddressRunner({ from: account }).then(function (v) {
        document.getElementById("addressOfTheRunner").innerHTML = v.valueOf();

      }).catch(function (e) {
        console.log(e);
        self.setStatus("Error getting address");
      
      });
    });
  },

  fetchAttributesRunner: function () {
    var self = this;
    var addressToFetch = document.getElementById("addressToFetch").value;

    raceEnrollment.deployed().then(function (contractInstance) {
      return contractInstance.getAttributesRunner(addressToFetch, { from: account }).then(function (v) {
        document.getElementById("NameRunnerRetrieved").innerHTML = v[0].valueOf();
        document.getElementById("SurNameRunnerRetrieved").innerHTML = v[1].valueOf();
        document.getElementById("AgeRunnerRetrieved").innerHTML = v[2].valueOf();
        document.getElementById("DNIRunnerRetrieved").innerHTML = v[3].valueOf();
        document.getElementById("RaceTimeRunnerRetrieved").innerHTML = v[4].valueOf();

        self.setStatus("Runner found!");


      }).catch(function (e) {
        console.log(e);
        self.setStatus("Error getting Runner's attributes");
      
      });
    });
  },

  simulateRace: function () {
     var self = this;
     var raceTime;
     var maxTime = 300;
     var minTime = 120;


     raceEnrollment.deployed().then(function (contractInstance) {
       return contractInstance.getAllAddresses({ from: account }).then(function (addressesResult) {
        for (var i=0; i < addressesResult.length; i++) {

          raceTime = generateRandomTime(minTime, maxTime);

          contractInstance.setTimeRace(addressesResult[i], raceTime, {from: account}).then(function (v) {
            self.setStatus("Time race saved to the runner!");
    
          }).catch(function (e) {
            console.log(e);
            self.setStatus("Error setting race time");
          
          });

        }  



       }).catch(function (e) {
         console.log(e);
         self.setStatus("Error simulating race");
      
       });
     });
  },

  generateRandomTime: function (minTime, maxTime) {
    return (Math.floor((Math.random() * maxTime) + 1));
 },

  setStatus: function (message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
    
}

window.App = App

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn(
      'Using web3 detected from external source.' +
      ' If you find that your accounts don\'t appear,' +
      ' ensure you\'ve configured that source properly.' +
      ' If using MetaMask, see the following link.' +
      ' Feel free to delete this warning. :)' +
      ' http://truffleframework.com/tutorials/truffle-and-metamask'
    )
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn(
      'No web3 detected. Falling back to http://127.0.0.1:8545.' +
      ' You should remove this fallback when you deploy live, as it\'s inherently insecure.' +
      ' Consider switching to Metamask for development.' +
      ' More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
    )
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
  }

  App.start();
})


// Refresh the page content when the user change from tab to tab (MetaMask opened in a different tab of the browser)
document.addEventListener('visibilitychange', function(e) {
  if(!document.hidden){
    window.location.reload(true);
    console.log("User clicked back on DApp tab");  
  }
});


