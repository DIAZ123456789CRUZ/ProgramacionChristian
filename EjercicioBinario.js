const historialCommits = [  
{ version: 1.0, ambiente: "desarrollo" }, //0
{ version: 1.1, ambiente: "desarrollo" },  //1
{ version: 1.2, ambiente: "testing" },  //2
{ version: 1.3, ambiente: "testing" },  //3
{ version: 2.0, ambiente: "produccion" },  //4
{ version: 2.1, ambiente: "produccion" },  //5
{ version: 2.2, ambiente: "produccion" } ] //6
/*/predicado atomico revisa si responde verdadero o falso a que el 
commit pertenece a produccion*/ 
const esProduccion = c => c.ambiente === "produccion";
//se convierte la busqaueda en una funcionn
function buscarPrimerCommit(historial,predicado){ 
//estas son variables de busqueda binaria 
let izquierda = 0;//empieza desde el primer elemento del arereglo
let derecha = historial.length - 1;//el segundo empieza desde el ultimo elemento
let respuesta = -1;//y el ultimo guarda la respuesta de la busqueda binaria, si no encuentra el elemento buscado devuelve -1
//miestras la izquierda sea menor o igual a la derecha se seguira ejecutando el ciclo
while(izquierda<=derecha){
    let medio = Math.floor((izquierda + derecha)/2);//encuetra el punto medio para aco0rtar distancias y no tener que empezar desde 0
    /*/ en este caso es donde se aplica el predicado*/
if(predicado(historial[medio])) {
    respuesta = medio;
    derecha = medio -1;
} else {
    izquierda = medio +1;
    }
}
return respuesta; 
}

const esTesting = c =>
    c.ambiente === "testing" ||
    c.ambiente === "produccion";

// Buscar el primer commit en testing
const primerTesting =
    buscarPrimerCommit(historialCommits, esTesting);

// Buscar el primer commit en producción
const primerProduccion =
    buscarPrimerCommit(historialCommits, esProduccion);

const evaluaciones= Math.ceil(Math.log2(1000000));
console.log(evaluaciones);
/*
Fórmula de la búsqueda binaria
Número máximo de evaluaciones = ⌈log₂(n)⌉
Donde:
n = número de elementos del arreglo
Si existen 1,000,000 de commits:
log₂(1,000,000) ≈ 19.93
Redondeando hacia arriba:
20 evaluaciones como máximo.
Complejidad temporal:
O(log n)
*/