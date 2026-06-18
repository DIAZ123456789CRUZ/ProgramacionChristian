/*/1. Define las reglas o predicados atómicos.
estaActivo(x): Devuelve si el servicio está operativo.
esZonaUS(x): Devuelve si el servicio corre en alguna zona de Estados Unidos (us-east o us-west).
esAltaCarga(x): Devuelve si las consultasPorMinuto son mayores o iguales a 10,000.
usaNode(x): Devuelve si el servicio incluye 'Node' dentro de su arreglo de tecnologías. (Tip: deben usar el método .includes())
2. Composición de reglas
Regla A: requiereMantenimientoUrgente
Lógica: El servicio NO está activo Y es de Alta Carga.
Regla B: esServicioCriticoUS
Lógica: El servicio está Activo Y (corre en Zona US OR es de Alta Carga).
Regla C: migrarACloudflare
Lógica: El servicio corre en Zona US Y usa Node, pero NO debe ser de Alta Carga.

3. Transformación y métodos de orden superior
Filtrar y Mapear: Crear una lista que contenga únicamente los nombres de los servicios que cumplen con la regla de esServicioCriticoUS.
Filtrar y Mapear: Crear una lista con los nombres de los servicios que cumplen con requiereMantenimientoUrgente.
Reducción de Datos (reduce): Calcular de forma declarativa el total acumulado de consultas por minuto únicamente de los servicios que se encuentran activos.*/
const servicios = [
  {
    id: 1,
    nombre: "Autenticación",
    zona: "us-east",
    consultasPorMinuto: 12000,
    activo: true,
    tecnologias: ["Node", "Redis"]
  },
  {
    id: 2,
    nombre: "Procesamiento Pagos",
    zona: "us-west",
    consultasPorMinuto: 4500,
    activo: true,
    tecnologias: ["Java", "Spring"]
  },
  {
    id: 3,
    nombre: "Recomendaciones AI",
    zona: "us-east",
    consultasPorMinuto: 25000,
    activo: false,
    tecnologias: ["Python", "TensorFlow"]
  },
  {
    id: 4,
    nombre: "Notificaciones",
    zona: "eu-central",
    consultasPorMinuto: 8500,
    activo: true,
    tecnologias: ["Node", "RabbitMQ"]
  },
  {
    id: 5,
    nombre: "Reportes Históricos",
    zona: "us-west",
    consultasPorMinuto: 500,
    activo: false,
    tecnologias: ["Python", "MongoDB"]
  }
]
////parte 1 definicion de reglas
const estaActivo =(servicio)=> servicio.activo; 
const esZonaUS =(servicio)=>servicio.zona==="us-east" || servicio.zona==="us-west";
const consultaAlta=(servicio)=>servicio.consultasPorMinuto>=10000;
const usaNode=servicio=>servicio.tecnologias.includes("Node");
////parte 2 composicion de reglas
const requiquiereMantenimiento=servicio=>servicio.activo===false && servicio.cargaAlta(servicio);
const esServiciosCriricosUS=servicio=>servicio.activo && eszonaUS(servicio) || cargaAlta(servicio);
const mirgrarACloudflare =servicio=>eszonaUs(servicio) && usaNode(servicio) && !cargaAlta(servicio);
//parte 3 transformacion y metodos de orden superior
//const serviciosCriticoUS=servicios.filter(esServiciosCriticoUS).map(servicio=>servicio.nombre); 
console.log("Servicios Críticos US:", nombresCriticosUS);
console.log("Requieren Mantenimiento Urgente:", nombresMantenimientoUrgente);
console.log("Total Consultas Activos:", totalConsultasActivos); 