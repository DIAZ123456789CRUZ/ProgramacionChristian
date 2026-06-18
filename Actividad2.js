/*Ejercicio 3. Con la siguiente información presentada 
{ nombre: 'Ana', edad: 25, rol: 'admin', activo: true }, 
{ nombre: 'Carlos', edad: 17, rol: 'user', activo: true }, 
{ nombre: 'Beto', edad: 30, rol: 'user', activo: false } 
Realizar lo siguiente. 
1.	Se necesita enviar un correo a los usuarios que tienen su cuenta deshabilitada. 
2.	Para poder entrar a una sección el usuario debe cumplir con dos condiciones estrictas: ser mayor de edad y tener cuenta activa. 
3.	Se requiere una lista de usuarios especiales, si cuenta con un rol de admin y si es menor edad. 
4.	Queremos saber quiénes tienen permiso para editar, la regla dicta que, el usuario debe estar activo (o debe ser administrador o mayor de edad).*/
const hechos=[
    { nombre: 'Ana', edad: 25, rol: 'admin', activo: true }, 
    { nombre: 'Carlos', edad: 17, rol: 'user', activo: true }, 
    { nombre: 'Beto', edad: 30, rol: 'user', activo: false } 
]
const cuentaDesabilitada=usuario=>usuario.activo===false;//reglas
const enviarcorreo=hechos.filter(cuentaDesabilitada).map(usuario=>usuario.nombre);//busquedas
console.log(enviarcorreo);
///////////////////2do ejercicio
const seccionPermiso=usuario=>usuario.edad>=18 && usuario.activo===true;
const permiso=hechos.filter(seccionPermiso).map(usuario=>usuario.nombre);
console.log(permiso);
//////////3r ejercicio
const usuarioLista=usuario=>usuario.rol==="admin" && usuario.edad<=18;
const lista=hechos.filter(usuarioLista).map(usuario=>usuario.nombre)
console.log(lista)
/////////4to ejercicio
const permisoEditar=usuario=>usuario.activo===true && usuario.rol==="admin" || usuario.edad>=18;
const editar=hechos.filter(permisoEditar).map(usuario=>usuario.nombre);
console.log(editar)
console.log("/////Actividad4/////")
/* Ejercicio 4. Teniendo la lista de clientes. 
 { nombre: 'Luis', historialLimpio: true, ingresosEstables: true } 
 { nombre: 'María', historialLimpio: true, ingresosEstables: false } 
{ nombre: 'Jorge', historialLimpio: false, ingresosEstables: true } 
1.	El banco ofrece una tarjeta de crédito "Black" de alta seguridad. Para calificar, el cliente debe demostrar una 
estabilidad total: tener un historial crediticio limpio y percibir ingresos estables. 
2.	El banco quiere lanzar un programa de reactivación financiera y apoyo. Se busca a clientes que tengan problemas en al menos una de sus áreas: 
que no tengan un historial limpio o que no tengan ingresos estables. 
3.	El departamento de cobranza e inversiones quiere identificar clientes de riesgo medio para un producto de reestructuración. 
Buscan perfiles que tengan ingresos estables, pero que no tengan un historial limpio. 
4.	Auditoría interna quiere saber si la sucursal está en riesgo operativo. 
El sistema disparará una alerta general si existe al menos un cliente en la base de datos que tenga un historial manchado 
y también carezca de ingresos estables (Riesgo Crítico). 
5.	Para que el banco reciba una certificación internacional de calidad de cartera, se requiere que todos los clientes 
cumplan con NO ser un perfil fraudulento. Un cliente es seguro si no ocurre que tenga el historial manchado y carezca de ingresos al mismo tiempo.*/
const clientes = [
     { nombre: "Maria", 
        historialLimpio: true, 
        ingresosEstables: false, }, 
    { nombre: "Jorge", 
        historialLimpio: false, 
        ingresosEstables: true, }, 
    { nombre: "Luis", 
        historialLimpio: true, 
        ingresosEstables: true, }, 
];
////////////ejercicio 1
const targetablack=usuario=>usuario.historialLimpio===true && usuario.ingresosEstables===true;
const black=clientes.filter(targetablack).map(usuario=>usuario.nombre)
console.log(black)
//////////ejercicio 2
const reactivacionFinanciera=usuario=>usuario.historialLimpio===false || usuario.ingresosEstables===false;
const reactivacion=clientes.filter(reactivacionFinanciera).map(usuario=>usuario.nombre)
console.log(reactivacion) 
////////ejercicio 3
const riesgoMedio=usuario=>usuario.ingresosEstables===true && usuario.historialLimpio===false;
const riesgo=clientes.filter(riesgoMedio).map(usuario=>usuario.nombre)
console.log(riesgo)
/////ejercicio 4
const riesgoCritico=usuario=>usuario.historialLimpio===false && usuario.ingresosEstables===false;
const alerta=clientes.some(riesgoCritico);//some= busca elementos que cumplan con la condicion y devuelve un valor  true/false booleano
console.log("Existe algun riesgo critico: " + alerta);
///ejercicio 5
const perfilFraudulento=usuario=>usuario.historialLimpio===false && usuario.ingresosEstables===false;//! =negacion del operador, se utiliza para negar una condicion o invertir su valor logico, en este caso se niega la condicion de perfil fraudulento para obtener un perfil seguro
const certificacion=clientes.every(usuario=>!perfilFraudulento(usuario));////every=checa si todos los elementos cumplen con la condicion y devuelve un valor booleano true/false
console.log("Todos los clientes cumplen con el perfil seguro: " + certificacion);