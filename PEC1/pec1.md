# PEC1:

## Ejercicio 1: 

### Archivo genesis y pantallazo del cliente Geth al inicio de la sincronización

####  1. Creamos un directorio para el nodo de nuestra red.	
>     mkdir node1

####  2. Creamos una cuenta mediante el cliente Geth
>     geth --datadir node1 account new

   ![img1](./ejercicio1/images/account1.png)

####  3. Creamos el fichero genesis.json e incluimos nuestra cuenta recién creada, inicializándola con un balance = 0.

![genesis.json](./ejercicio1/genesis.json)
>
	{
	    "config": {
		"chainId": 1,
		"homesteadBlock": 0,
		"eip155Block": 0,
		"eip158Block": 0
	    },
	    "alloc": {
		"0x7b9c7564a0a67b21908a8f52a0a22f1cf193d736": {"balance": "000000000"}
	      },
	    "coinbase"   : "0x0000000000000000000000000000000000000000",
	    "difficulty" : "0x20000",
	    "extraData"  : "",
	    "gasLimit"   : "0x2fefd8",
	    "nonce"   : "0x0000000000000097",
	    "mixhash" : "0x0000000000000000000000000000000000000000000000000000000000000000",
	    "parentHash" : "0x0000000000000000000000000000000000000000000000000000000000000000",
	    "timestamp"  : "0x00"
	}
	

####  4. Instanciamos el nodo de nuestra blockchain e iniciamos la sincronización:
       
>       geth --identity node1 init genesis.json --datadir node1
  
  ![img2](./ejercicio1/images/instancia1.png)

>      geth --datadir node1 --networkid 1 --rpc --rpcaddr "0.0.0.0" --rpcport 8545 --port 30300
    
   ![img3](./ejercicio1/images/synchro1.png)



### Balance de la cuenta creada

####  5. Nos conectamos al nodo 1 
>       geth attach ./node1/geth.ipc
   
   ![img4](./ejercicio1/images/connect_node1.png)

  
####  6. Comprobamos el balance de la cuenta antes de iniciar  el minado 
>      eth.accounts[0] 
>      eth.getBalance("0x7b9c7564a0a67b21908a8f52a0a22f1cf193d736")
   
   ![img5](./ejercicio1/images/balance_before_mining.png)

####  7. Iniciamos el minado y comprobamos el balance de la cuenta tras unos minutos
>      miner.start(1)
 
   ![img6](./ejercicio1/images/mining1.png)

>      miner.stop()
>	eth.getBalance("0x7b9c7564a0a67b21908a8f52a0a22f1cf193d736").
     
   ![img7](./ejercicio1/images/balance_after_mining.png)
   
~~~ 
El balance de la cuenta tras el minado es 185 ETH
~~~

####  8. Convertimos el balance de wei a ETH 
>     web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]).toNumber()) 
 
 ![img8](./ejercicio1/images/weitoeth.png)
      




