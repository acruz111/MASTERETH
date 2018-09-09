# MODULO 1: EJERCICIOS

## Ejercicio   para   la   comprobación   de   que   el   entorno   ha   sido   correctamente instalado: 

- truffle console

1. web3.version.node; -> 'EthereumJS TestRPC/v2.1.0/ethereum-js'
2. Sí que sincroniza nuevos bloques, aunque no de manera automática. Sólo al ejecutar el smart contract.
3. 
  - var miCuenta = web3.eth.accounts[0];
  - web3.eth.getBalance(miCuenta).toString(); -> '99940714800000000000'
  - Ver en carpeta images\balanceAccount1.png

4.   
  - var miCuenta3 = web3.eth.accounts[2];
  - console.log(miCuenta3); -> 0x3321a4f7203100644a2148eed03e4bc1af72b36b

5. web3.eth.blockNumber -> La blockchain se encuentra en el bloque 4
  -  Se han procesado 4 transacciones del Smart Contract, cada una de ellas en un     bloque. Ver images\blocks.png
6. web3.currentProvider ->  host: 'http://127.0.0.1:7545' 

7. 4.6 Gwei

## Ejercicios de solidity: 

### 1. Issue your Token (Remix)

  - Desde Run tab:
      * Environment - Injected Web3
                    - Account: Account1
      * Realizamos initalSupply de 99.000.000 a la Account 1 del sender (0x7ad437DA851a0E211B2c5Dbe7C6583640B6df3eb)
      * Click on Transact -> El contrato se despliega correctamente
      * balanceOf (0x7ad437DA851a0E211B2c5Dbe7C6583640B6df3eb) -> Resultado 99.000.000
      * 1.000.000 transfer to Account 2 (0x240aEC3427E4B7cF6Ac9E62f31B29E3004Db7Fc0)
      * balanceOf Account 1 = 98.000.000
      * balanceOf Account 2 = 1.000.000

  - DUDA: En Metamask he creado un nuevo token con la dirección del contrato (0x17dfac4465ad98a9e6e027f9a0069d50eb39e09e) con el símbolo de token ACT y 18 decimales.
              - Si accedo a Account1 el saldo es 0 ACT. Esperaría tener 98.000.000 ACT
              - Si accedo a Account2 el saldo es 0 ACT. Esperaría tener 1.000.000 ACT

### 2. Crowdsale (Remix)

  - Desde Run tab:
      * Environment - Injected Web3
                    - Account: Account1
      
      * Deploy del contrato:
        - ifSuccessfulSendTo: Account2
        - fundingGoalInEthers: 50
        - durationInMinutes: 5
        - etherCostOfEachToken: 1
        - addressOfTokenUsedAsReward: Account3

        Resultado: El contrato se despliega correctamente

  - DUDA: 
      - Al tratar de enviar fondos al contrato con Fallback() -> Gas estimation errored with the following message (see below). The transaction execution will likely fail. Do you want to force sending? Internal JSON-RPC error.
      - Si forzamos el envío: 
      transact to Crowdsale.(fallback) errored: Error: Error: [ethjs-rpc] rpc error with payload {"id":5001514790876,"jsonrpc":"2.0","params":["0xf86a0184b2d05e00832dc6c094170a971170ff548fb205a28661a14c8e94e29a3d80808602cb7619f29ea0d47d080af0e2abdc5d58a58f6ca7fb711acf3c9f91a0c15c325e9266a16b74faa00336d60152d141c1d4640d5c9cf0a7a70a32cff5e32988c09ce58f5b47436bd7"],"method":"eth_sendRawTransaction"} Error: VM Exception while processing transaction: revert

### 1. Issue your Token (Truffle)
  * REPOSITORIO: https://github.com/acruz111/TRUFFLE/tree/master/newToken
      - truffle init
      - Creamos bajo la carpeta contracts\MyToken.sol 
      - Creamos bajo la carpeta migrations\2_deploy_contracts.js
      - truffle compile
      - truffle migrate -> Error en la migración. El constructor del contrato necesita como argumento la address del msg.sender
      - instanciamos web3. Creamos src/js/app.js. 
      - Para poder realizar el deploy del contrato le pasamos como argumento la account[0] recuperada mediante web3. -> 
               module.exports = function(deployer, network, accounts) { deployer.deploy(myToken, accounts[0]);};

      - truffle compile
      - truffle migrate -> La migración del contrato se realiza correctamente.