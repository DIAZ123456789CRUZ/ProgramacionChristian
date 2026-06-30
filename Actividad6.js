/*/ Ejercicios Lazy. Transformar códigos imperativos a código perezoso. 
1.	Ejercicio . Generador de ID únicos para una base de datos. 
// --- CÓDIGO INICIAL (A TRANSFORMAR) ---  function generarIds() {  const ids = [];  for (let i = 1; i <= 100; i++) { 
ids.push(`TEC-2026-${i}`);  
} 
return ids; // Retorna los 100 IDs saturando memoria de inmediato  
} */
function* generarIdsLayzy (){
let contador=1;
while(contador <= 100){
    yield `Tec 2026:${contador}`;
    contador ++;
    }
}
const ids=generarIdsLayzy();
console.log(ids.next().value);
console.log(ids.next().value);
console.log(ids.next().value);
console.log(ids.next().value);
console.log(ids.next().value);
/*/
2.	Ejercicio. Paginación infinita, al hacer scroll, se va cargando de 3 en 3. // --- 
// CÓDIGO INICIAL (A TRANSFORMAR) 
// --- const dbPosts = ["Post 1", "Post 2", "Post 3", "Post 4", "Post 5", "Post 6"]; function obtenerTodoElFeed(posts) 
// {   console.log("-> Procesando e indexando todos los posts en el cliente...");   return posts.map(p => `<html>${p}</html>`); 
*/
    function* obtenerFeed(posts){

    for(let i = 0; i < posts.length; i += 3){
        const lote = posts.slice( i, i+3);
        yield lote;
    }

}
const dbPosts = [
    "Post 1",
    "Post 2",
    "Post 3",
    "Post 4",
    "Post 5",
    "Post 6",
    "Post 7",
    "Post 8",
    "Post 9"
];

const post = obtenerFeed(dbPosts);

console.log(post.next().value)
console.log(post.next().value)
console.log(post.next().value)
/*/3.	Ejercicio. Buscador de errores críticos en logs de un servidor. // --- CÓDIGO INICIAL (A TRANSFORMAR) --- 
const logsServidor = ["200 OK", "200 OK", "500 ERROR", "200 OK", "500 ERROR", "404 NOT FOUND"]; 
function buscarTodosLosErrores(logs) {   return logs.filter(log => log.includes("500")); // Retorna un array con todos 
} 
 */
function* buscarErrores(logs) {
    for (let log of logs) {
        if (log.includes("500")) {
            console.log("Error crítico detectado:", log);
            yield log;
        }
    }
}

const logsServidor = [
    "200 OK",
    "200 OK",
    "500 ERROR",
    "200 OK",
    "500 ERROR",
    "404 NOT FOUND"
];

const errores = buscarErrores(logsServidor);
console.log(errores.next().value);
console.log(errores.next().value);
/*/4.	Generador de la serie de Fibonacci. 
// --- CÓDIGO INICIAL (A TRANSFORMAR) --- function serieFibonacciEager(limite) 
// {   let secuencia = [0, 1];   for (let i = 2; i < limite; i++) { 
    secuencia.push(secuencia[i - 1] + secuencia[i - 2]); 
  } 
  return secuencia; // Si pides un límite muy grande, truena la memoria 
} 
 */
function* fibonacci() {
    let a = 0, b = 1;

    while (true) {
        console.log("Generando:", a);
        yield a;

        let siguiente = a + b;
        a = b;
        b = siguiente;
    }
}

const fib = fibonacci();

console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
/*/5.	Simulador de carrito de compras: Tienes un lote inmenso de productos y quieres aplicarles un IVA o descuento, 
pero el cliente en caja va pagando uno por uno de forma síncrona. 
// --- CÓDIGO INICIAL (A TRANSFORMAR) --- const preciosAlmacen = [100, 200, 300, 400, 500]; function aplicarIvaATodo(precios) 
// {   const procesados = [];   for(let precio of precios) {     procesados.push(precio * 1.16); 
  } 
  return procesados; 
} 
 */

function* aplicarIva(precios) {
    for (let precio of precios) {
        const conIva = precio * 1.16;

        console.log("Procesando precio:", precio, "=>", conIva);

        yield conIva;
    }
}

const preciosAlmacen = [100, 200, 300, 400, 500];

const carrito = aplicarIva(preciosAlmacen);

console.log(carrito.next().value);
console.log(carrito.next().value);
console.log(carrito.next().value);