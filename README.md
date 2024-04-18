# Prueba técnica para puesto de practicante pre profesional - Desarrollo Javascript

¡Hola! Soy Alejandra San Martin Tavera  
En el presente repositorio se encuentra mi resolución de la prueba técnica solicitada para esta segunda fase de selección.

### Tabla de contenido
* 1. [Ejercicio algoritmico](#1-ejercicio-algorítmico)
  * 1.1. [Variables definidas](#11-variables-definidas)
  * 1.2 [Casos iniciales](#12-casos-iniciales)
  * 1.3 [Map de words](#13-map-de-words)
  * 1.4 [Recursividad para el recorrido de las diferentes subcadenas de ```s```](#14-recursividad-para-el-recorrido-de-las-diferentes-subcadenas-de-s)
* 2. [Docker Compose](#2-docker-compose)
  * 2.1 [Instalar Git](#21-instalar-git)
  * 2.2 [Clonar el proyecto en una carpeta](#22-clonar-el-proyecto-en-una-carpeta)
  * 2.3 [Construir los servicios en Docker Compose](#23-construir-los-servicios-en-docker-compose)
  * 2.4 [Crear e iniciar contenedores de Docker Compose](#24-crear-e-iniciar-contenedores-de-docker-compose)
  * 2.5 [Revisar Docker Desktop](#25-revisar-docker-desktop)
  * 2.6 [Comprobar los puertos de los contenedores](#26-comprobar-los-puertos-de-los-contenedores)
  * 2.7 [Revisar Docker Compose Logs](#27-revisar-docker-compose-logs)
  * 2.8 [Endpoints](#28-endpoints)
    * 2.8.1 [Verificar conexión](#281-verificar-conexión)
    * 2.8.2 [Ver elementos en la colección "culqi"](#282-ver-elementos-en-la-colección-culqi)
    * 2.8.3 [Insertar elemento en la colección "culqi"](#283-insertar-elemento-en-la-colección-culqi)
  * 2.9 [Revisión de la estructura en Windows PowerShell](#29-revisión-de-la-estructura-en-windows-powershell)
    * 2.9.1 [Comando para visualizar los contenedores creados en Docker](#291-comando-para-visualizar-los-contenedores-creados-en-docker)
    * 2.9.2 [Comandos para llegar a la base de datos en el contenedor de MongoDB](#292-comandos-para-llegar-a-la-base-de-datos-en-el-contenedor-de-mongodb)
      * 2.9.2.1 [Paso 1](#2921-paso-1)
      * 2.9.2.2 [Paso 2](#2922-paso-2)
      * 2.9.2.3 [Paso 3](#2923-paso-3)
      * 2.9.2.4 [Paso 4](#2924-paso-4)
      * 2.9.2.5 [Paso 5](#2925-paso-5)
      * 2.9.2.6 [Paso 6](#2926-paso-6)
* 3. [Especificaciones sobre la creación de contenedores](#3-especificaciones-sobre-la-creación-de-contenedores)
  * 3.1 [Dockerfile](#31-dockerfile)
  * 3.2 [docker-compose.yml](#32-docker-composeyml)

## 1. Ejercicio algorítmico

Primero se mostrará el algoritmo completo y luego una explicación por partes del mismo.

El algoritmo resuelto se encuentra en la carpeta **utils** y es el siguiente:

```
function getIndexes(s, words) {
    var wordLength = parseInt(words[0].length)
    var wordArrayLength = parseInt(words.length)
    var concatWordLength = parseInt(wordArrayLength * wordLength)
    var result = []
    var map = new Map()

    if(s.length < concatWordLength || s == "" || words == []){
        return []
    }


    for(var i=0; i<wordArrayLength;i++){
        map.set(words[i], 1)
    }

    for(var i= 0; i < (s.length - concatWordLength)+1; i++){
        var subCad = s.substring(i,(i+concatWordLength))
        
        var mapResults = new Map()
        var count = 0
        for(var j=0; j<=((subCad.length - wordLength)); j = j + wordLength){
            var cad = subCad.substring(j,(wordLength+j))

            if(!mapResults.has(cad,1) && map.has(cad)){
                mapResults.set(cad,1)
                count++
            }
        }

        if(count == wordArrayLength){
            result.push(i)
        }
    }
    console.log("results: ", result);
    return result;
}

module.exports = {getIndexes}
```

### 1.1. Variables definidas
```
var wordLength = parseInt(words[0].length)
var wordArrayLength = parseInt(words.length)
var concatWordLength = parseInt(wordArrayLength * wordLength)
var result = []
var map = new Map()
```
* ```wordLenght``` es un ```Int``` igual al largo de la primera palabra dentro del array ```words```. Esto debido a que en las indicaciones se menciona que todas las palabras en ese array son del mismo largo.
* ```wordArrayLength``` es el largo del arreglo ```words```; es decir, la cantidad de palabras en el arreglo.
* ```concatWordLenght``` es la mutiplicación entre ```wordArrayLength``` y ```wordLength```, lo cual como resultado da el largo de las diferentes palabras permutadas del array ```words```.
  * Ejemplo: Si el ```words = ["foo","bar"]```, entonces ```wordArrayLength``` = 2 y ```wordLength``` = 3, por lo tanto; las permutaciones son palabras de largo 6 (```concatWordLength = 6```)
* ```result = []``` alberga el primer índice de las palabas encontradas en ```s```.
* ```var map = new Map()``` almacena cada palabra de ```words```.

### 1.2. Casos iniciales
```
if(s.length < concatWordLength || s == "" || words == []){
        return []
}
```
* Si el largo de la palabra ```s``` es menor a ```concatWordLength```, puesto que las palabras permutadas en ```words``` excederán en tamaño de la palabra en donde buscarlas.
* Si ```s == ""``` no hay palabra en donde buscar las permutaciones concatenadas.
* Si ```words == []``` no hay un arreglo de palabras a concatenar.


### 1.3. Map de words
Agrega a ```map``` cada palabra en el arreglo ```words```. Se utilizará luego para comprobación.
```
for(var i=0; i<wordArrayLength;i++){
        map.set(words[i], 1)
}
```

### 1.4. Recursividad para el recorrido de las diferentes subcadenas de ```s```
```
for(var i= 0; i < (s.length - concatWordLength)+1; i++){
    var subCad = s.substring(i,(i+concatWordLength))
        
    var mapResults = new Map()
    var count = 0
    for(var j=0; j<=((subCad.length - wordLength)); j = j + wordLength){
        var cad = subCad.substring(j,(wordLength+j))

        if(!mapResults.has(cad,1) && map.has(cad)){
            mapResults.set(cad,1)
            count++
            }
        }

    if(count == wordArrayLength){
        result.push(i)
    }
}
```
* Primero, ```for(var i= 0; i < (s.length - concatWordLength)+1; i++)``` indica que solo se debe recorrer ```s``` hasta el máximo de palabras que son del tamaño de las concatenaciones permutadas en ```words```
  * Ejemplo: Si ```s = "foobarthefoobar``` y ```words=["foo", "bar"]```, solo se puede recorrer hasta llegar al **índice 9** de ```s```.
* ```var subCad = s.substring(i,(i+concatWordLength))``` hace una subcadena de ```s``` tomando el índice ```i``` hasta el largo de ```concatWordLength``` sumándole ```i``` para que el final de la cadena aumente con cada recursión
  * Ejemplo: Si ```s="foobarthefoobar"``` y ```words=["foo","bar"]```, entonces ```concatWordLength = 6``` y ```subCab``` solo puede ser de dicho tamaño.
* ```var mapResults = new Map()``` para crear un map que almacene en cada recursión de ```s``` los valores de las palabras divididas.
* ```var count = 0``` es una variable auxiliar que almacena la cantidad de palabras dentro de la subdivisión de palabras de ```s``` que están contenidas en ```words```/```map``` (mapa de cada palabra y una llave).
* ```for(var j=0; j<=((subCad.length - wordLength)); j = j + wordLength)``` indica que solo se puede recorrer por la cantidad de palabras en ```words```, pero en este caso el índice aumenta dependiendo del tamaño de ```wordLength```.
* ```var cad = subCad.substring(j,(wordLength+j))``` indica que cada subcadena extraida de subCad puede ser dividada de tal forma que el tamaño sea de ```wordLength```, aumentándole ```j``` para mover el índice final de la palabra.
* ```if(!mapResults.has(cad,1) && map.has(cad))``` 
  verifica que la subcadena ```cad```  de ```subCad``` no se encuntre ya agregado a ```mapResults```  para evitar que se evalúen repeticiones de la misma palabra y que dicha subcadena ```cad```  se encuentre dentro de ```map``` definido inicialmente.
  * Si cumple con las condiciones, se agrega ```cad``` al mapa de palabras agregadas compuesto por las subcadenas y  ```mapResults.set(cad,1)``` y el contador aumenta en 1 con el proósito de contar cuantas palabras que están en ``` word```  también están en ```subCad``` (```count++```).
* Pasos previos a finalizar, se comprueba con ```if(count == wordArrayLength)``` si el contador, que representa la cantidad de palabras en ```subCad``` que forman parte de ```words```, es igual a ```wordArrayLength```, eso indicaría que la ```subCad``` es una concatenación de una permutación de las palabras contenidas en ```words```.
* Finalmente, ```result.push(i)``` agrega el primer índice de la palabra que va encontrando que sí es una permutación de ```words``` que está contenida en ```s```.

## 2. Docker Compose

A continuación, indicaré el paso a paso para poder visualizar los resultados de la prueba. Desde clonar el proyecto hasta utilizar la línea de comandos de Windows PowerShell para consultar la colección "culqi" en la base de datos Mongodb dentro del Docker container.

### 2.1 Instalar Git
Primero, se necesita instalar Git para poder clonar este repositorio. Se puede descargar en este [enlace](#https://git-scm.com/download/win) para **Windows** en caso no se tenga instalado previamente.

### 2.2 Clonar el proyecto en una carpeta

```
git clone https://github.com/alejandraSMT/prueba-tecnica-culqi.git
```

### 2.3 Construir los servicios en Docker Compose
```
docker compose build
```

### 2.4 Crear e iniciar contenedores de Docker Compose
```
docker compose up
```

*El siguiente comando se ha utilizado en la elaboración de este proyecto para limpiar conexiones, pero no es necesariamente parte del paso a paso de como ejecutar Docker Compose*
> :warning: :warning: :warning: Este es un comando que elimina los contenedores, conexiones, volúmenes e imágenes :warning: :warning: :warning:
>```
>docker compose down
>```

### 2.5 Revisar Docker Desktop
Ahora, en Docker Desktop previamente instalado se pueden observar los contenedores en la opción del menú de *Containers*

### 2.6 Comprobar los puertos de los contenedores
Al darle click al nuevo conjunto de contenedores que lleva el nombre de la carpeta del proyecto, se puede verificar que tanto NodeJS como MongoDB tienen cada uno su propio contenedor
* NodeJS -> Ports **4000:3000**
  * En el localhost:4000 podremos realizar consultas a MongoDB desde Postman o el navegador
  * Se conecta a través del puerto 3000 con Docker
* MongoDB toma por defecto el puerto **27017**

### 2.7 Revisar Docker Compose Logs
En los logs se puede verificar que tanto el contenedor de NodeJS y el de MongoDB están conectados y listos para recibir peticiones. 

**Para verificar que NodeJS y MongDB estén conectados entre sí dentro del Docker, en los logs debe salir el siguiente mensaje**
```
MongoDB is connected
```
Una vez se verificó que todo está conectado y creado correctamente, se pueden realizar consultas.

### 2.8 Endpoints
Los endpoints que se han trabajado hacen uso de **express.Router**, por lo que no se accede a todos con la url base de localhost:4000/, sino que siguen cierta estructura.
#### 2.8.1 Verificar conexión
Este endpoint es uno base para verificar la conexión con MongoDB
```
http://localhost:4000/
```
El mensaje que se debe mostrar en pantalla es: "Server connected!", así como lo define el código.
```
app.get('/',function(req,res){
  res.send("Server connected!");
});
```

> La ruta de los siguientes endpoints se definió en el app.js de la siguiente manera
> ```app.use('/api/culqi',require("./routes/result_router.js"))```

#### 2.8.2 Ver elementos en la colección "culqi"
```
http://localhost:4000/api/culqi/getResults
```
Ejemplo de lo que debería devolver en caso encuentre elementos dentro de la colección:
```
[
  {
    "_id": "66207c7e2066727bda55c280",
    "output": [0, 6]
  },
  {
    "_id": "66208d986e15d7c7d3ddaf2f",
    "output": []
  },
  {
    "_id": "66208d9e6e15d7c7d3ddaf31",
    "output": [0, 6]
  }
]
```
Mensajes de respuesta en los diferentes casos
* Sin errores: "Succesfully fecthed results!"
* Cone errores: Se muestra el mensaje de error y el json de error es el siguiente 
  ```{"message":"Error fetching results :("}```

Endpoint:  
Se hace uso de la función .find() de **mongoose** para hallar todos los elementos en la colección "culqi"
```
router.get("/getResults", async (req, res) => {
    try{
        const listResults = await Culqi.find({}, { __v: 0 })
        console.log("Succesfully fecthed results!")
        res.json(listResults)
    }catch(error){
        res.json({"message":"Error fetching results :("})
        console.log(error.message)
    }
});
```
#### 2.8.3 Insertar elemento en la colección "culqi"
```
http://localhost:400/api/culqi/addResult
```
Este endpoint recibe un body con la siguiente estructura JSON:
```
{
    "s": "barfoothefoobarman",
    "words":["bar","foo","the"]
}
```
Mensajes de respuesta en los diferentes casos
* Si hay error al momento de la carga del endpoint, se recibirá este mensaje de error: 
    ```{"meesage":"Error!"}```
* Si hay error en el momento que está guardando el documento en MongoDB, la respuesta será la siguiente: 
  ```{"message": "Error inserting result into collection!"}```  
* Si no hay mensaje y se logra insertar correctamente el documento, la respuesta será: ```Sucessfully added!  \ 
  {"message": `Succesfully inserted the array = ${newItem}`}```, donde ```newItem``` es el documento creado con el Schema que recibe al colección "culqi"  

El Schema utilizado para crear un documento:  
Al momento de crear el schema para los documentos, es importante definir de qué colección será parte.
```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const culqiSchema = new Schema ({
    _id: {type: String},
    output : {type: Array}
},{
    collection : "culqi"
});

module.exports = mongoose.model('Culqi', culqiSchema)
```

Endpoint:
```
router.post("/addResult", async (req, res) => {
    try{
        const {s, words} = req.body;
        const output = getIndexes.getIndexes(s,words);

        const newItem = new Culqi({
            _id: new mongoose.Types.ObjectId().toString(),
            output: output
        })
        await newItem.save(function (err) {
            if (err) {
                console.error(err.message);
                res.json({"message": "Error inserting result into collection!"})
            } else {
                console.log('Succesfully inserted!');
                res.json({"message": `Succesfully inserted the array = ${newItem}`})
            }
        })

    }catch(err){
        res.json({"meesage":"Error!"})
        console.error(err.message)
    }
});
```
### 2.9 Revisión de la estructura en Windows PowerShell
#### 2.9.1 Comando para visualizar los contenedores creados en Docker
```
docker ps
```
Al utilizar el comando se visualizará en la línea de comandos la información en formato tabla con los siguientes encabezados:
```
CONTAINER ID   IMAGE    COMMAND    CREATED   STATUS  PORTS     NAMES
```
#### 2.9.2 Comandos para llegar a la base de datos en el contenedor de MongoDB
#### 2.9.2.1 Paso 1
El siguiente comando utilizado permite correr comandos en el entorno del contenedor indicado. Para este caso, el nombre del contenedor de MongoDB en este caso es: ```db_container```
```
docker exec -it db_container bash
```
#### 2.9.2.2 Paso 2
Para ingresar al entorno de interacción con el contenedor de MongoDB se utiliza el siguiente comando:
```
mongosh
```
#### 2.9.2.3 Paso 3
El siguiente comando permite ver la estructura del contenedor de MongoDB:
```
show dbs
```
Ejemplo de la espuesta (el almacenamiento puede variar):
```
PruebaCulqi  80.00 KiB
admin        40.00 KiB
config       72.00 KiB
local        88.00 KiB
```
#### 2.9.2.4 Paso 4
El comando permite ingresar a la base de datos ```PruebaCulqi``` y correr comandos dentro de la misma. Eso es especialmente útil para realizar consultas directamente con la base de datos como traer todo los elementos de una colección, borrar toda una colección, etc.
```
use PruebaCulqi
```
#### 2.9.2.5 Paso 5
El comando permite visualizar las colecciones que tiene la base de datos.
```
show collections
```
#### 2.9.2.6 Paso 6
Por último, este comando permite visualizar todos los documentos almacenados en la base de datos ```PruebaCulqi``` dentro de la colección ```culqi```.
```
db.culqi.find()
```
Ejemplo de resuesta:
```
[
  { _id: '66207c6d2066727bda55c27e', output: [ 0, 9 ], __v: 0 },
  { _id: '66207c7e2066727bda55c280', output: [ 0, 6 ], __v: 0 },
  { _id: '66208d986e15d7c7d3ddaf2f', output: [], __v: 0 },
  { _id: '66208d9e6e15d7c7d3ddaf31', output: [ 0, 6 ], __v: 0 }
]
```
## 3. Especificaciones sobre la creación de contenedores
### 3.1 Dockerfile
En el ```Dockerfile```:
* Se define la versión de node que se utilizará
* Se define el directorio de trabajo (```WORKDIR```) dentro del contenedor de NodeJS
* Se define que se copien todos los package .json al contenedor (esto con el fin de mantener las dependencias y sus versiones utilizadas)
* Se corre el comando ```npm ci``` **(esto es una buena práctica en entornos virtuales en comparación a npm install)**
* Copiar todos los archivos del proyecto al entorno de Docker
* Correr el comando ```start``` definido en el package.json, el cual inicializa el **app.js**
```
FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm","start"]
```

### 3.2 docker-compose.yml
En el ```docker-compose.yml```
* Definir la versión de docker-compose a utilizar
* Creación de los servicios/contenedores
  * ```mongo_db```
    * Se define como nombre del contenedor ```db_container```
    * La imagen a utilizar es la versión más reciente de mongo (oficial de la página de [docker hub](#https://hub.docker.com/_/mongo/tags)) ```mongo:latest```
    * Se define que siempre debe reiniciarse si es que se detiene el servicio de mongo_db
    * **Volumes** permite definir el directorio dentro de la base de datos de MongoDB donde se guardarán los datos, esto con el fin de evitar pérdida de data cada que se detenga y vuelva a levantar el servicio
  * ```api```
    * Usar el contexto actual del directorio actual
    * Se define que el puerto 4000 es para localhost y la api se conectará con Docker por el puerto 3000
    * Se definen las diferentes variables de entorno a utilizar dentro del contenedor de NodeJS. Aquí se define la URI la base de datos y el nombre de la base de datos.
    * :warning: :warning: **Es importante que el contenedor de NodeJS dependa del contenedor de MongoDB para poder hacer la conexión entre ambos dentro del docker-compose**
```
version: '3'

services:
  # MongoDB service
  mongo_db:
    container_name: db_container
    image: mongo:latest
    restart: always
    volumes:
      - mongo_db:/data/db
   
#node api   
  api:
    build: .
    ports:
      - 4000:3000
    environment:
      PORT: 3000
      MONGODB_URI: mongodb://mongo_db:27017
      DB_NAME: PruebaCulqi
    depends_on:
      - mongo_db

volumes:
  mongo_db: {}
```
### ¡GRACIAS!
