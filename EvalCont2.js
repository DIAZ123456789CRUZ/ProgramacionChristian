/*/ 
1.	Inmutabilidad. 
Implementar un mecanismo de congelamiento profundo (deepFreeze) sobre el arreglo peticionesHttp
 para asegurar que ninguna petición pueda ser alterada de forma imperativa durante el análisis. 

2.	Predicados atómicos. 
•esMetodoEscritura(x): Verdadero si el método es "POST". 
•esLatenciaAlta(x): Verdadero si la latenciaMs es estrictamente mayor o igual a 2000 ms. 
•esPayloadSospechoso(x): Verdadero si el payload de la petición incluye palabras clave de ataque como "DROP",
 "SELECT" o "MaliciousScript". 

 3.	Reglas lógicas. 
Regla detectarAmenazaPotencial(x): Una petición representa un riesgo informático inminente si:
 Es un Método de Escritura AND (Tiene Latencia Alta OR Tiene un Payload Sospechoso). 

 4.	Optimización lazy.
•	Pipeline de Evaluación Perezosa: Crear una función generadora llamada analizadorSeguridadLazy(flujo,
 regla) que examine las peticiones de una en una, aplicando la regla de la Fase 3 y 
 suspendiendo la ejecución con yield al detectar una amenaza. 
•	Consumo Controlado: Consumir el flujo del generador utilizando
 .next().value únicamente hasta capturar las primeras 2 amenazas. 
•	Reducción de Datos Funcional (reduce): Tomar las 2 amenazas capturadas y 
calcular de forma declarativa el promedio de tamaño de payload (en KB) de los incidentes detectados. 

*/
const peticionesHttp = [ 
  { id: "REQ-01", metodo: "GET",  ipOrigen: "192.168.1.50", latenciaMs: 45,   tamanioPayloadKb: 2,    payload: "SELECT * FROM users" }, 
  { id: "REQ-02", metodo: "POST", ipOrigen: "185.220.10.1", latenciaMs: 2500, tamanioPayloadKb: 1500, payload: "DROP TABLE users;--" },  
  { id: "REQ-03", metodo: "GET",  ipOrigen: "192.168.1.55", latenciaMs: 12,   tamanioPayloadKb: 1,    payload: "ping" }, 
  { id: "REQ-04", metodo: "POST", ipOrigen: "185.220.10.1", latenciaMs: 1800, tamanioPayloadKb: 950,  payload: "normal_profile_update" }, 
  { id: "REQ-05", metodo: "POST", ipOrigen: "192.168.1.70", latenciaMs: 3100, tamanioPayloadKb: 1200, payload: "upload_heavy_image" },    
  { id: "REQ-06", metodo: "GET",  ipOrigen: "172.16.25.40", latenciaMs: 50,   tamanioPayloadKb: 500,  payload: "exec MaliciousScript" }  
]; 
function deepFreeze(obj){
    if(obj===null ||typeof obj!=="object"){
        return obj;
    }
    Object.freeze(obj);
    Object.getOwnPropertyNames(obj).forEach(prop=>{
        deepFreeze(obj[prop]);
    });
    return obj;
}
deepFreeze(peticionesHttp);
const esMetodoEscritura = x =>x.metodo==="POST";
const esLatenciaAlta = x => x.latenciaMs>=2000;
const esPayloadSospechoso = x => x.payload.includes("DROP") ||x.payload.includes("SELECT")|| x.payload.includes("MaliciousScript");

const detectarAmenazaPotencial = x => esMetodoEscritura(x) && (esLatenciaAlta(x) || esPayloadSospechoso(x));

function* analizadorSeguridadLazy(flujo,regla){
    for(const peticion of flujo ){
        if (regla(peticion)){
            yield peticion;
        }
    }
}

const  flujoOrdenes = analizadorSeguridadLazy(peticionesHttp,detectarAmenazaPotencial);
const amenaza1 = flujoOrdenes.next().value;
const amenaza2 = flujoOrdenes.next().value;

const amenazas = [
    amenaza1,
    amenaza2
];
console.log(amenazas)
const sumaPayload = amenazas.reduce(
    (acumulador, amenaza)=>
        acumulador + amenaza.tamanioPayloadKb,
    0
    );

const promedio = sumaPayload / amenazas.length;
console.log("Promedio de payload:", promedio);
//ejercicio 2
/*/
Caso de estudio 2. 
Una plataforma de comercio electrónico maneja miles de despachos de mercancía diariamente. Durante las horas pico, 
la base de datos central en MongoDB se satura debido a que los algoritmos tradicionales 
leen e intentan enrutar todas las órdenes del almacén simultáneamente. Se te pide desarrollar un servicio en 
JavaScript funcional que analice de forma perezosa el inventario de paquetes y asigne de manera inmediata las órdenes a
 los repartidores motorizados, deteniendo el flujo en cuanto un camión complete su capacidad. 
1.	Inmutabilidad. 
Implementar la función de congelamiento profundo (deepFreeze) para asegurar que el arreglo ordenesEnvio, 
sus objetos internos y propiedades no puedan sufrir alteraciones en memoria durante el proceso de asignación. 
2.	Predicados atómicos. 
•	esEnvioExpress(x): Verdadero si el tipo de orden es "express". 
•	esPaquetePesado(x): Verdadero si el pesoKg es estrictamente mayor o igual a 15 kg. 
•	esRutaForanea(x): Verdadero si el destino NO es local, es decir, diferente a "Tabasco" (aplicando la negación lógica NOT). 
3.	Reglas. 
Regla esDespachoPrioritario(x): Una orden debe salir inmediatamente en el primer camión si:
 Es un Envío Express AND (Es un Paquete Pesado OR Es una Ruta Foránea). 
4.	Optimización del flujo lazy. 
•	Pipeline Lazy: Crear una función generadora llamada despachadorOrdenesLazy(flujo, regla) 
que recorra el inventario de una en una, aplicando la regla de la Fase 3 y pausando con yield al encontrar un paquete prioritario. 
•	Consumo por Demanda: Consumir el flujo del generador con .next().value estrictamente hasta seleccionar 
los primeros 2 paquetes requeridos para llenar la ruta del camión actual. 
•	Reducción Funcional (reduce): Con las 2 órdenes prioritarias capturadas, calcular el promedio de distancia en 
kilómetros de la ruta de despacho. 
*/
const ordenesEnvio = [ 
  { id: "ORD-101", tipo: "estandar", destino: "Tabasco", pesoKg: 4,   distanciaKm: 8,   asegurado: false }, 
  { id: "ORD-102", tipo: "express",  destino: "Veracruz", pesoKg: 22,  distanciaKm: 120, asegurado: true },   
  { id: "ORD-103", tipo: "estandar", destino: "Tabasco", pesoKg: 1.5, distanciaKm: 15,  asegurado: false }, 
  { id: "ORD-104", tipo: "express",  destino: "Tabasco", pesoKg: 5,   distanciaKm: 3,   asegurado: false }, 
  { id: "ORD-105", tipo: "express",  destino: "Yucatán",  pesoKg: 18,  distanciaKm: 250, asegurado: false },  
  { id: "ORD-106", tipo: "express",  destino: "Chiapas",  pesoKg: 35,  distanciaKm: 190, asegurado: true }    
]; 
function deepFreeze(obj){
    if(obj===null ||typeof obj!=="object"){
        return obj;
    }
    Object.freeze(obj);
    Object.getOwnPropertyNames(obj).forEach(prop=>{
        deepFreeze(obj[prop]);
    });
    return obj;
}
deepFreeze(ordenesEnvio);
const esEnvioExpress = x => x.tipo==="express";
const esPaquetePesado = x => x.pesoKg>=15;
const esRutaForanea = x => !(x.destino==="Tabasco");

const esDespachoPrioritario = x =>esEnvioExpress(x)&& (esPaquetePesado(x)||esRutaForanea(x));
function* despachadorOrdenesLazy (flujo,regla){
    for(const peticion of flujo){
        if (regla(peticion )){
            yield peticion
        }
    }
}

const  flujo = despachadorOrdenesLazy(ordenesEnvio,esDespachoPrioritario);
const paquete1 = flujo.next().value;
const paquete2 = flujo.next().value;

const paquetes = [
    paquete1,
    paquete2
];
console.log(paquetes)
const sumaPaquetes = paquetes.reduce(
    (acumulador, paquete)=>
        acumulador + paquete.distanciaKm,
    0
);

const ruta = sumaPaquetes / paquetes.length;
console.log("Promedio de distancia:", ruta);
