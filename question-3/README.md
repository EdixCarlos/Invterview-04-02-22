# Enunciado 3

> Implementar un método de verificación lógica de paréntesis. Es decir, implementar el método `parenthesisChecker(str)` que recibe un `string` como parámetro y devuelve un `boolean`. La respuesta del método debe ser `true` si la cadena de `string` es válida en términos de paréntesis (`( )`, `[ ]`, `{ }`), i.e. cada apertura de paréntesis se cierra correctamente. A continuación se muestran ejemplos de `string` válidos e inválidos.
> 
> **Ejemplos válidos**: la función debe devuelve `true`.
>
> - `parenthesisChecker('a * (b + c)')` → `true`
> - `parenthesisChecker('a * (b + c * [d])')` → `true`
> - `parenthesisChecker('[]{}()abc{([])}')` → `true`
>
> **Ejemplos válidos**: la función debe devuelve `false`.
>
> - `parenthesisChecker('(()')` → `false`
> - `parenthesisChecker('(([))')` → `false`
> - `parenthesisChecker('([)]')` → `false`

# Razonamiento

_Escribir aquí los supuestos asumidos, reflexiones y explicaciones de la solución_

Necesitaremos pasar sobre todo el string, y recolectar los parentesis, corchetes y llaves, en un array, entonces lo caracteres siguientes si son de cierre entonces los extraeremos de la matriz pero si el caracter emergente es de inicio correspondiente, entonces bien de lo contrario no estan equilibrados y si al final queda algun corchete, parentesis o llave, el string no esta equilibrado.

ya tenemos la funcion entonces creamos nuestro arreglo, y dos objtos de cierre y abierto.
```
const array = [];
  const open = {
    '{': '}',
    '[': ']',
    '(': ')'    
  };
  const closed = {
    '}': true,
    ']': true,
    ')': true
  }
```
definiremos un ciclo for para el string `for (let i = 0; i < str.length; i++)`, seguidamente si el caracte actual `let char = str[i];` es un parentesis de inicio entonces lo mandamos a nuestro array con el metodo push. 
si el caracte actual es un corchete de cierre, entonces lo extraemos del array `if (open[char])array.push(char);` y si el caracter emergente es el corchete de inicio correspondiente, entonces bien, de lo contrario, los parentesis no estan equilibrados.`else if (closed[char]) {
      if (open[array.pop()] !== char){
      	return false;
      }
      `
finalmente despues de que se agote el bucle si queda algun suporte en la matriz, entonces no esta equilibrado.`return array.length === 0;`
```
for (let i = 0; i < str.length; i++) {
    let char = str[i];
    
    if (open[char]) {
      array.push(char);
    } else if (closed[char]) {
      if (open[array.pop()] !== char){
      	return false;
      }
    }
  }
  return array.length === 0;  
```