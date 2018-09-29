# PEC2:

## Ejercicio 2: Alojar una DApp en IPFS

### A partir de un truffle project modificar el frontend para mostrar su nombre al ejecutar la aplicación

####  1. Clonar el proyecto de una DApp

>  Download DApp from: https://github.com/christinto/ChrisPerry_FinalProject_Consensys/archive/master.zip

####  2. Modifico index.html

  ![img1](./images/name.png)


###  Configurar el entorno

####  1. Iniciamos Ganache Blockchain

> ganache-cli

   ![img2](./images/ganache.png)

####  2. Compilamos y migramos los smart contracts

> truffle compile
> truffle migrate

   ![img3](./images/migrate.png)

####  3. Conectamos MetaMask a ganache-cli

  ~~~
   Conectamos MetaMask a ganache-cli en el puerto 8545
  ~~~
	

###  Arrancar un Daemon de IPFS y alojar la DApp
    
####  1. Arrancamos un daemon de IPFS

> ipfs daemon
  
   ![img4](./images/ipfsDaemon.png)

####  2. Desde otro terminal comprobamos los nodos a los que estamos  conectados

> ipfs swarm peers 

   ![img5](./images/peers.png)

####  3. Consultamos el id de nuestro nodo

> ipfs id

   ![img6](./images/nodeid.png)

####  4. Copiamos los ficheros del frontend a una única carpeta de distribucion (/dist)
> mkdir dist
> rsync -r src/ dist/
> rsync -r build/contracts/ dist/ 
> ls -l dist/

~~~
Necesitamos también los ficheros .json de los contratos (Tenemos las ABI y también información sobre la red donde se han desplegado los contratos)
~~~
   ![img7](./images/distContent.png)

####  5. Añadimos la carpeta dist a IPFS

> ipfs add -r dist/

~~~
El último hash es el que nos interesa para publicar en IPFS:
QmUxfK9MgusMPHPMLvfxjrJzpV1ZLxuWgHD82pspjTMucp
~~~
  
   ![img8](./images/hashdist.png)


####  6. Publicamos el contenido en IPFS

> ipfs name publish QmUxfK9MgusMPHPMLvfxjrJzpV1ZLxuWgHD82pspjTMucp 
 
   ![img9](./images/hashpublished.png)

####  7. Desde un browser accedemos a la DApp en localhost

> localhost:8080/ipns/QmbYS5pyLcRsDouzJtiD89Dfn4vwGdBBrznC6D35sfdwJm/ 

   ![img10](./images/browser1.png)

####  8. Damos de alta un nuevo vehículo

   ![img11](./images/alta1.png)
   ![img12](./images/alta1fin.png)


####  9. Consultamos el alta

   ![img13](./images/busqueda.png)

####  10. Desde un browser accedemos a la DApp a través del gateway

> https://gateway.ipfs.io/ipns/QmbYS5pyLcRsDouzJtiD89Dfn4vwGdBBrznC6D35sfdwJm/

   ![img14](./images/browser2.png)


