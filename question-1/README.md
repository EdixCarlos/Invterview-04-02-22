# Enunciado 1

> Estás subiendo una escalera de N peldaños. En cada momento, puedes subir 1 o 2 peldaños. ¿En cuántas formas diferentes puedes subir las escalera?

# Razonamiento

_Escribir aquí el razonamiento al puzzle_

Primero si la escalera solo fuera de dos escalones entonces solo habria dos formas de subir la escalera.
ya que hay muchas maneras de resolver este problema optare por el clasico, con los numero de fibonaci
ya que la secuencia comienza con f0=0 y f1=1,
eso significa que f2=1 porque f1+f0=1 tambien f3=2 porque f2+f1=2 con f4=3 iguamente porque f3+f2=3, asi con los siguientes numeros, ya que la secuencia puede continuar infinitamente.

Entonce sahora que conocemos el patron de la salida empezaremos con el codigo:

Como sabemos las primeras entradas son iguales a sus salidas entonces `if (n < 3) return n;`lo resuelve
```
const climbStairs=(n)=>
    {
        //las primeras 3 tres entradas son iguales que sus salidas.
        if (n < 3) return n;
    }
```
En este punto definimos `let first = 1;` y `let second = 2;` necesitaremos sumar estas dos variables para obtener el numero actual.
```
const climbStairs=(n)=>{
        if (n < 3) return n;
        let first = 1;
        let second = 2;
}
```
Finalmente dentro del ciclo for deiniremos la variable que tendra el valor actual para asi poder igualar la primera `first`variable con la segunda`second` y esta sera igual al valor actual`current`.
```
const climbStairs=(n)=>{
        if (n < 3) return n;
        let first = 1;
        let second = 2;
        for (let i = 2; i < n; i++) {
          const current = first + second;
          first = second;
          second = current;
        }
        return second;   
}
```
Finalizado el ciclo for retornaremos la segunda variable`second`.
##### Para mostrar los datos en un archivo output.txt
eliminamos los argumentos node y el path -> `node script.js` con `process.argv.slice(2)`
despues importamos fileSystem y iteramos los argumentos con `process.argv.slice(2).forEach`
por ultimo escribimos en el archivos con opciones como `utf-8`, `flag: "a+"`, etc. para no sobreescribirlo y demas.
```
const args =  process.argv.slice(2);
console.log(`Running question #1 with args ${args}`)
const fs = require('fs');
process.argv.slice(2).forEach((val,index,array)=>{
    console.log(`${index} : ${val} = ${climbStairs(parseInt(val))}`)
    fs.writeFile('output.txt',`-------\n${index} : ${val} = ${climbStairs(parseInt(val))}\n`,{
        encoding: "utf8",
        flag: "a+",
        mode: 0o666
      },(err)=> {if(err) console.log(err)})
})
```