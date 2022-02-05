# Enunciado 2

> En la carpeta [question-2](https://bitbucket.org/vestua-com/questions/src/main/question-2/) se ha exportado eventos de navegación de usuarios anonimizados de la plataforma Vestuá. Se le pide al equipo de Ingeniería que hagan un análisis sobre los datos de navegación. En particular se solicita:
>
> - Calcular la cantidad de visitas únicas por cada producto.
> - Calcular la cantidad de clicks únicos por cada producto.
> - Calular el CTR (*Clickthrough Rate*) de cada producto.
> 
> El set de datos contiene la siguiente estructura:
> 
> - `user`: id del usuario que ejecutó el evento.
> - `entityId`: id de la entidad al que el usuario ejecutó el evento.
> - `entityType`: tipo de entidad al que se ejecutó el evento.
> - `eventType`: tipo de evento. Puede ser `impression` o `click`.
> 
> Como miembro del equipo de ingeniería, te solicitan modificar el archivo [script.js](https://bitbucket.org/vestua-com/questions/src/main/question-2/script.js) para que pueda leer el set de datos y generar un archivo `output.csv` con las siguientes columnas:
> 
> - `productId`: id del producto.
> - `clicks`: cantidad de *clicks* únicos que tiene el producto
> - `impressions`: cantidad de impresiones únicas que tiene el producto.
> - `ctr`: métrica CTR del producto.

# Razonamiento

_Escribir aquí los supuestos asumidos, reflexiones y explicaciones de la solución_

Necesitariamos calcular el ctr, leer el archivo, procesar los clicks y impressions por prudctId, crear un stringtemplate para escribir el archivo de salida y ya estaria.

primero importamos el fileSystem para abrir el archivo tambien instanciaremos el metodo promises ya que necesitaremos trabjar con promesas para esperar a para escribir, abrir o leer el archivo csv.
tambien definimos la constante que contendra el path del archivo pasado como argumento.
finalmente definiremos nuestra funcion asyncrona para implementar la logica.
```
const fs = require('fs');
const fsPromises = fs.promises;
const args = process.argv.slice(-1);
const arr = []
const doReadFile = async (arg)=>{}
```
definios una variable que contendra el archivo abierto con la opcion `'r+'` para ser leido, implementamos un try catch para controlar la ejecucion, entonces almacenamos los datos leidos en la variable datos `var datos = await (await filehandle.readFile("utf-8")).split('\r\n');` seguidamente lo convertimos en un objeto para manipularlo facilmente.
```
let filehandle = null;
    try{
        filehandle= await fsPromises.open(arg.toString(),'r+')
        var datos = await (await filehandle.readFile("utf-8")).split('\r\n');
        const [header,...data]= datos
        for(const i of data){
            const splitFiles = i.split(",")
            arr.push({
                user:splitFiles[0],
                entityId:splitFiles[1],
                entityType:splitFiles[2],
                eventType:splitFiles[3],
            })
        }
    }catch(e){
        console.log("error",e)
    }
```
En este punto debemos escribir el archivo `output.csv`, para hacer esto crearemos un array para almacenar los datos de salida y luego iterarlo para escribir el csv de salida.
defiremos un ciclo for para recorrer los elementos de nuestro objeto `const arr = [...]`, entonces validamos que el productId ya este en nuetro array de salida `var productsId=[]` si existe usaremos el metodo some para buscar dentro del arreglo `productsId` un dato se se identico al elemento actual en su atributo `entityId` ya que si exsite verificaremos el tipo de evento y sumaremos mas 1 en el atributo `impressions` o `clicks` en el elemento actual `productsId[index]`. En su defecto sino existe se agregara al final del array de salida mediante la funcion `push`con los atributos necesarios
```
for(let i=0;i<arr.length-1;i++){
            if(productsId.some(e=>e.productId===arr[i].entityId)){
                productsId.some((_,idx)=>{
                    index=idx
                    return _.productId===arr[i].entityId
                })
                if(arr[i].eventType==='impression')
                    productsId[index].impressions++
                else{
                    productsId[index].clicks++
                }

            }else{
                productsId.push({
                    productId:arr[i].entityId,
                    clicks:arr[i].eventType==='click'?1:0,
                    impressions:arr[i].eventType==='impression'?1:0,
                    cdr:0
                })
            }   
        }
```
finalmente recorreremos nuestro array que contiene nuestros datos de salida y los acomodamos en un stringtemplate que seran escritos con nuestro metodo `fileSustem.promises.writeFile` en el archivo output.csv
```
productsId.forEach(e=>{
            e.cdr=e.clicks/e.impressions
        })
        filehandle =await fsPromises.open("./output.csv",'a+')
        productsId.forEach(async (val,index,array)=>{
             await filehandle.writeFile(`${val.productId}, ${val.clicks}, ${val.impressions}, ${val.cdr===Infinity?1:val.cdr}\n`)
        })
```