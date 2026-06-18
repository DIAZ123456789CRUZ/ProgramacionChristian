/*/Ejercicio 5. De una lista de transacciones bancarias, un sistema de prevención de fraudes necesita:
{ id: 1, tipo: 'deposito', monto: 10000 }
 { id: 2, tipo: 'retiro', monto: 6000 }
 { id: 3, tipo: 'retiro', monto: 1500 }
{ id: 4, tipo: 'retiro', monto: 8000 }
1.	Filtrar solo las transacciones que sean de tipo "retiro" y superen los $5,000.
2.	Aplicarles una tarifa/multa de penalización del 5% por movimiento de alto riesgo.
3.	Calcular el monto total de dinero penalizado que el banco recaudará.*/

const hechos=[
    { id: 1, tipo: 'deposito', monto: 10000 },
    { id: 2, tipo: 'retiro', monto: 6000 },
    { id: 3, tipo: 'retiro', monto: 1500 },
    { id: 4, tipo: 'retiro', monto: 8000 },
]




///ejercicio 1 Filtrar solo las transacciones que sean de tipo "retiro" y superen los $5,000.
const filtrar=transacciones=>transacciones.tipo==="retiro" && transacciones.monto>5000;
//ejercicio 2 Aplicarles una tarifa/multa de penalización del 5% por movimiento de alto riesgo.
const prueba=hechos.filter(filtrar).map(transacciones=>transacciones.monto * 0.05);
console.log(prueba)
/// ejercicio 3 Calcular el monto total de dinero penalizado que el banco recaudará.
const prueba2=prueba.reduce((a,valor)=>a+valor);
console.log(prueba2)