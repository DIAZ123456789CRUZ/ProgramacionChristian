/*/
Ejercicio. 1 combinaciones lazy y programación funcional. 
Una empresa procesa un flujo constante de transacciones bancarias. Para mitigar fraudes, 
se requiere diseñar un sistema de detección temprana que analice de forma perezosa las transacciones y 
dispare alertas inmediatas ante movimientos sospechosos. 
1.	Inmutabilidad: Aplica un congelamiento profundo al arreglo de transacciones. 
2.	Lógica de Predicados: Define los predicados atómicos: esRetiro(t), esMontoSospechoso(t) (monto mayor o igual a $50,000), 
y esZonaDeRiesgo(t) (país de origen distinto a "México", es decir, usando NOT). 
3.	Regla de Negocio: Combina los predicados para crear la regla alertaFraude(t): 
La transacción es un Retiro AND (Es Monto Sospechoso OR Es Zona de Riesgo). 
4.	Evaluación Perezosa: Crea un generador perezoso que reciba las transacciones y 
filtre usando la regla alertaFraude. Consume el flujo únicamente hasta detectar las primeras 2 alertas. 

*/
// Arreglo de transacciones
function deepFreeze(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    Object.freeze(obj);
    Object.getOwnPropertyNames(obj).forEach(prop => {
        deepFreeze(obj[prop]);
    });
    return obj;
}
const transacciones = [
    { id: 101, tipo: "deposito", monto: 60000, pais: "México" },
    { id: 102, tipo: "retiro", monto: 15000, pais: "Colombia" },
    { id: 103, tipo: "retiro", monto: 12000, pais: "México" },
    { id: 104, tipo: "retiro", monto: 55000, pais: "México" },
    { id: 105, tipo: "deposito", monto: 90000, pais: "Francia" },
    { id: 106, tipo: "retiro", monto: 75000, pais: "España" }
];
deepFreeze(transacciones);

const esRetiro = t => t.tipo === "retiro";
const esMontoSospechoso = t => t.monto >= 50000;
const esZonaDeRiesgo = t => t.pais !== "México";
const alertaFraude = t =>
    esRetiro(t) &&
    (esMontoSospechoso(t) ||esZonaDeRiesgo(t));

function* detectarFraudes(transacciones) {
    for (const transaccion of transacciones) {
        if (alertaFraude(transaccion)) {
            yield transaccion;
        }
    }
}
const flujoFraudes = detectarFraudes(transacciones);
console.log(flujoFraudes.next().value);
console.log(flujoFraudes.next().value);

/*/Ejercicio 2 Admiision universitaria
Una universidad recibe solicitudes de ingreso. 
-El sistema debe calcular el puntaje final ponderado de cada aspirante,
-filtrar de forma perezosa a los que aprueban el perfil de beca, 
-y calcular de manera síncrona el promedio de puntajes del grupo de becados. 
Inmutabilidad: Aplica deepFreeze al arreglo de aspirantes. 
Procesamiento Lineal (map): Genera una nueva lista inmutable donde transformes los datos de los 
estudiantes agregando la propiedad puntajeFinal, calculada con la fórmula: puntajeFinal=(examen X 0.70) + (entrevista X 0.30). 
Lógica de Predicados: Define el predicado: calificaParaBeca(e) que evalúa si el puntajeFinal es mayor o igual a 85 
Y el aspirante cuenta con estudioSocioeconomico aprobado. 
Evaluación Perezosa: Implementa un generador perezoso que evalúe la lista transformada
y emita a los becados uno a uno. Toma únicamente los primeros 2 becados y, usando reduce, calcula el promedio de sus puntajes. 
*/
const aspirantes = [ 
  { nombre: 'Luis',  examen: 90, entrevista: 80, estudioSocioeconomico: true },   
  { nombre: 'Elena', examen: 70, entrevista: 90, estudioSocioeconomico: true },   
  { nombre: 'Pedro', examen: 95, entrevista: 90, estudioSocioeconomico: false },  
  { nombre: 'María', examen: 85, entrevista: 95, estudioSocioeconomico: true },   
  { nombre: 'Iván',  examen: 90, entrevista: 90, estudioSocioeconomico: true }   
]; 
deepFreeze (aspirantes);
const aspirantesTransformados = aspirantes.map(
    aspirante => ({...aspirante,
        puntajeFinal:
        aspirante.examen * 0.70 +
        aspirante.entrevista * 0.30
     })
    );
const calificaParaBeca = e => e.puntajeFinal>=85 && e.estudioSocioeconomico===true;

function* obtenerBecados(aspirantesTransformados){
    for (const aspirante of aspirantesTransformados){
        if (calificaParaBeca(aspirante)) {
            yield aspirante
        }
    }
}
const flujoBeca = obtenerBecados(aspirantesTransformados);

console.log(flujoBeca.next().value);
console.log(flujoBeca.next().value);
/*/ 
Ejercicio 3. Optimizador de despacho de inventario.0 
Un sistema logístico de envíos maneja un lote de paquetes listos para despacho. 
El camión repartidor tiene espacio limitado y solo puede llevar 2 paquetes de categoría pesada en este viaje. 
Inmutabilidad: Asegura la inmutabilidad total de la base de datos de paquetes. 
Predicados Atómicos: Define: 
•	esDestinoLocal(p): El estado es igual a "Tabasco". 
•	esPesado(p): El peso es mayor o igual a 15 (kg). 
-Regla de Negocio: Define la regla envioPrioritarioLocal(p): 
El paquete NO es de destino local AND Es Pesado. (Es decir, envíos foráneos grandes que urgen salir). 
Evaluación Perezosa: Pasa los paquetes por un generador perezoso que valide la regla anterior 
y extrae únicamente los 2 primeros paquetes idóneos para llenar el espacio del camión. 
*/
const paquetes = [ 
  { tracking: 'ZA1', estado: 'Tabasco', peso: 20 }, 
  { tracking: 'ZA2', estado: 'Veracruz', peso: 18 }, 
  { tracking: 'ZA3', estado: 'Chiapas', peso: 5 }, 
  { tracking: 'ZA4', estado: 'Yucatán',  peso: 25 },  
  { tracking: 'ZA5', estado: 'Tabasco', peso: 10 }, 
  { tracking: 'ZA6', estado: 'Oaxaca',   peso: 30 }  
]; 
deepFreeze(paquetes);
const esDestinoLocal = p => p.estado==="Tabasco";
const esPesado = p =>p.peso>=15;

const envioPrioritarioLocal = p => !esDestinoLocal(p) && esPesado(p);

function* detectarPaquetes(paquetes){
    for(const paquete of paquetes){
        if(envioPrioritarioLocal(paquete)){
            yield paquete;
        }
    }
}
const flujoPaquetes = detectarPaquetes(paquetes);

console.log(flujoPaquetes.next().value);
console.log(flujoPaquetes.next().value);