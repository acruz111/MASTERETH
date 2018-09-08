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

