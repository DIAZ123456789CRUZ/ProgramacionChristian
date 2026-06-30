//combinar programacion lazy con funcional
//definir los predicados atomicos
const esPar=n=>n%2===0;
const multiploCinco=n=>n%5===0;
//definimos la funcion
function* filtrarNumeros(iterable,predicado ){
    for(let datos of iterable){
        if(predicado(datos)){
            yield datos;
        }
    }
}

function* generarNumeros(){
    let i=0;
    while (true) yield i++
}

//generar los numeros a traves de una variable
const numerosAleatorios=generarNumeros();
const generarPares=filtrarNumeros
(numerosAleatorios,multiploCinco);
console.log("Primer numero par:", generarPares.next().value)
console.log("Primer numero par:", generarPares.next().value)
console.log("Primer numero par:", generarPares.next().value)
console.log("Primer numero par:", generarPares.next().value)
//multiplos de 5*/
