//Obtener turnos
let contador=1;
function obtenerTurno(){
    const turno=`Turno 
    ${contador}`;
    contador++;
    return turno;
}
console.log(obtenerTurno())
console.log(obtenerTurno())
function* obtenerTurnoY(){
    let contador=1;
    while(true){
        yield `Turno 
        ${contador}`;
        contador++;
    }
}

const cajero=obtenerTurnoY();
console.log(cajero.next().value);
console.log(cajero.next().value);
console.log(cajero.next().value);

//Procesador de palabras
function procesarPalabra(frase){
    const palabras=frase.split("");
    const resultado=[];
    for(let palabra of palabras)
        console.log(`Procesado completo: ${palabra}`);
    resultado.push(palabra.toUpperCase);
    (palabra.toUpperCase());
    return resultado;
}
const palabrasEscritas=procesarPalabra
("Programacion con JS")
console.log("Resultado:",
    palabrasEscritas[0]);

function* procesarDatos(frase){
    const palabras=frase.split("");
    for(let palabra of palabras)
        console.log(`Procesado de datos ${palabra}`)
    yield palabra.toUpperCase();
}
("Programacion con JS");
console.log("Solo da lectura a la primera");
console.log("Resultado",textoLeido.next().value);
console.log("Solo da lectura a la segunda");
console.log("Resultado",textoLeido.next().value);