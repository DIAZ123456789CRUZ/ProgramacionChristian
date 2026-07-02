/*/ 
Ejercicio 1. Analizador de sensores.
Un sensor en una fábrica de fundición de acero emite lecturas de temperatura cada milisegundo.
Necesitamos capturar las anomalías térmicas críticas y convertirlas a grados Fahrenheit para el
sistema de emergencias, deteniendo el análisis al contener las primeras 2 alertas.
*/
console.log("Ejercicio1-----");
const lecturasSensor = Object.freeze([
 { id: 1, tempC: 150, estado: "estable" },
 { id: 2, tempC: 850, estado: "estable" },
 { id: 3, tempC: 920, estado: "mantenimiento" },
 { id: 4, tempC: 120, estado: "estable" },
 { id: 5, tempC: 1100, estado: "estable" },
 { id: 6, tempC: 1300, estado: "crítico" }
]);
const temperaturaCritica = l =>l.tempC>=800;
const estaEstable = l =>l.estado==="estable";
const convertirFahrenheit = c => (c * 9/5) + 32;
const emergencia = l =>temperaturaCritica(l)&&estaEstable(l);

function* detectarEmergencias(flujo){
    for(const lectura of flujo  ){
        if(emergencia(lectura)){
            yield {...lectura,tempF: convertirFahrenheit(lectura.tempC)
            };

        }
    }
}
const flujo = detectarEmergencias(lecturasSensor, emergencia);

const alerta1 = flujo.next().value;
const alerta2 = flujo.next().value;
console.log(alerta1);
console.log(alerta2);
/*/
Ejercicio 2. Streaming de vídeo.
Una plataforma de streaming procesa fragmentos de video (chunks). Si un fragmento es pesado y
su formato no está optimizado, debe pasar por un proceso perezoso de reducción de calidad para
evitar el almacenamiento excesivo.
*/
console.log("Ejercicio2--");
const chunksVideo = Object.freeze([
 { n: 1, sizeMb: 4, codec: "h264" },
 { n: 2, sizeMb: 25, codec: "raw" },
 { n: 3, sizeMb: 12, codec: "h265" },
 { n: 4, sizeMb: 40, codec: "raw" },
 { n: 5, sizeMb: 50, codec: "webm" }
]);
const fragmentoPesado = c => c.sizeMb >=20;
const formatoNoOptimizado = c =>c.codec==="raw";
const formatoPesadoOptimizado = c =>fragmentoPesado(c)&&formatoNoOptimizado(c);

function* reduccionCalidad(flujo,regla){
    for(const chunks of flujo){
        if(regla(chunks)){
            yield {...chunks,sizeMb:chunks.sizeMb / 2
            };

        }
    }
}
const flujovideo = reduccionCalidad(chunksVideo, formatoPesadoOptimizado);
const alertavideo1 = flujovideo.next().value;
const alertavideo2 = flujovideo.next().value;
console.log(alertavideo1);
console.log(alertavideo2);
/*/ 
Ejercicio 3. Sistema marítimo de carga.
Un puerto marítimo recibe contenedores. Debemos escanear la lista de manera perezosa
buscando contenedores con destino a "Rotterdam" que no excedan el peso máximo de seguridad
del brazo mecánico. Capturaremos 2 contenedores aptos y calcularemos su peso combinado final
con un reduce.
*/
console.log("Ejercicio3--------");
const aduanaPuerto = Object.freeze([
 { manifiesto: "C-01", destino: "Rotterdam", pesoToneladas: 12 },
 { manifiesto: "C-02", destino: "Tokio", pesoToneladas: 45 },
 { manifiesto: "C-03", destino: "Rotterdam", pesoToneladas: 60 },
 { manifiesto: "C-04", destino: "Rotterdam", pesoToneladas: 18 },
 { manifiesto: "C-05", destino: "Lisboa", pesoToneladas: 22 }
]);
const destinoRotterdam = a =>a.destino==="Rotterdam";
const pesoMaximo = a =>a.pesoToneladas<=20;
const contenedorApto = a=>destinoRotterdam(a)&&pesoMaximo(a);

function* escanearContenedores(flujo,regla){
     let contador = 0;
    for (const contenedor of flujo){
        if(regla (contenedor)){
            yield contenedor;
            contador++;
            if(contador ===2){
                return;
            }
        }
    }
}
const flujoContenedor = escanearContenedores(aduanaPuerto, contenedorApto);

const contenedor1 = flujoContenedor.next().value;
const contenedor2 = flujoContenedor.next().value;

console.log(contenedor1);
console.log(contenedor2);
const pesoTotal = [contenedor1, contenedor2].reduce(
    (total, contenedor) => total + contenedor.pesoToneladas,0);

console.log("Peso combinado:", pesoTotal);