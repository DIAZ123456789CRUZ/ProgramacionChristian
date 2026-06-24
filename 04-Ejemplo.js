const datos = {
    nombre: "Dany",
    edad: 40,
    ciudad: "Balancan",
    intereses: ["React", "JS"],
};

// Ocultar propiedad edad
Object.defineProperty(datos, "edad", {
    enumerable: false
});
console.log(Object.keys(datos));
console.log(Object.getOwnPropertyNames(datos));//esto muestra todas las propiedades del objetos
function deepFreeze(obj) {
    // Caso base
    if (
        obj === null ||
        typeof obj !== "object" ||
        Object.isFrozen(obj)
    ) {
        return obj;
    }
    // Obtener nombres de propiedades
    const propiedadesObjeto = Object.getOwnPropertyNames(obj);
    // Recorrer propiedades
    for (let nombre of propiedadesObjeto) {
        const propiedadHijo = obj[nombre];
        // Si la propiedad es un objeto o arreglo
        if (
            propiedadHijo &&
            typeof propiedadHijo === "object"
        ) {
            deepFreeze(propiedadHijo);
        }
    }
    // Congelar objeto actual
    return Object.freeze(obj);
}
const nuevoNombre = datosInmutables.cuidad="Tenosique";
const newIntereses=datosInmutables.intereses.push("Java");

console.log(nuevoNombre);
console.log(newIntereses);