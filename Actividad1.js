/*/Ejercicio 1. Contando con los siguientes cursos que se encuentran dentro de un arreglo de objetos: 

{ titulo: 'React Avanzado', categoria: 'Desarrollo', esGratis: false, tieneCertificado: true },  
{ titulo: 'Introducción a UX/UI', categoria: 'Diseño', esGratis: true, tieneCertificado: false },  
{ titulo: 'Node.js y MongoDB', categoria: 'Desarrollo', esGratis: true, tieneCertificado: true },  
{ titulo: 'Figma para Principiantes', categoria: 'Diseño', esGratis: false, tieneCertificado: false} 
Definir lo siguiente: 
1.	Encontrar los cursos de la categoría “Desarrollo y que además tengan certificado. 
2.	Buscar cursos completamente gratis o que pertenezcan a la categoría “Diseño”. 
3.	Encontrar una lista de cursos, que no tengan certificado. 
4.	Encuentra los cursos que sean de Desarrollo y que cumplan la siguiente condición de beneficio: (que sean Gratis o que si tengan certificado).

Ejercicio 2. Teniendo la tabla de hechos 
 
{ padre: 'Juan', hijo: 'Luis' }  
{ padre: 'Juan', hijo: 'Pedro' } 
{ padre: 'Abraham', hijo: 'JUan'  
Realizar la búsqueda teniendo las siguientes reglas. 
1.	Dos personas son hermanos si tienen el mismo padre y son personas diferentes. 
2.	A es abuelo de C, Si A es padre de B y B es padre de C. 
Realiza las funciones lógicas para determinar el resultado esperado. */

const cursos=[
    { titulo: "React Avanzado", 
        categoria: "Desarrollo", 
        esGratis: false, 
        tieneCertificado: true },  
    { titulo: "Introducción a UX/UI", 
        categoria: "Diseño", 
        esGratis: true, 
        tieneCertificado: false },
    { titulo: "Node.js y MongoDB", 
        categoria: "Desarrollo", 
        esGratis: true, 
        tieneCertificado: true },
    { titulo: "Figma para Principiantes", 
        categoria: "Diseño", 
        esGratis: false, 
        tieneCertificado: false }];
        

///actividad 1
const cursosDesarrolloCertificado=curso=>curso.categoria==="Desarrollo" && curso.tieneCertificado===true;        
const cursosCertificado=cursos.filter(cursosDesarrolloCertificado).map(titulo=>titulo.titulo)
    console.log(cursosCertificado);
///actividad 2
const cursosGratisDiseño=curso=>curso.esGratis===true||curso.categoria==="Diseño";     
const gratis=cursos.filter(cursosGratisDiseño).map(titulo=>titulo.titulo)
    console.log(gratis);
///actividad 3
const cursosSinCertificado=curso=>curso.tieneCertificado===false;
const sertificadono=cursos.filter(cursosSinCertificado).map(titulo=>titulo.titulo)
console.log(sertificadono);
/////actividad 4
const desarolloBeneficio=curso=>curso.categoria==="Desarrollo" && curso.esGratis===true || curso.tieneCertificado===true;
const cursoBeneficio=cursos.filter(desarolloBeneficio).map(titulo=>titulo.titulo)
console.log(cursoBeneficio);

//Ejercicio 2
const hechos=[
    {Padre: "Juan", Hijo: "Luis" },
    {Padre: "Juan", Hijo: "Pedro"},
    {Padre: "Abraham", Hijo:"Juan"}]

const padreLuis = hechos.filter(datos=>datos.Hijo==="Luis");
console.log(padreLuis);
//Dos personas son hermanos si tienen el mismo padre y son personas diferentes. 
const HijosPadre = hechos.filter(
    datos => datos.Padre === padreLuis[0].Padre
);
console.log(HijosPadre);
//A es abuelo de C, Si A es padre de B y B es padre de C. 

function EsAbuelo(abuelo, nieto){

    const hijos = hechos.filter(dato => dato.Padre === abuelo);

    const resultado = hechos.filter(dato => dato.Padre === hijos[0].Hijo &&dato.Hijo === nieto);

    return resultado.length > 0;
}



console.log("¿Abraham es abuelo de Luis? -> " + EsAbuelo("Abraham", "Luis"));

console.log("¿Abraham es abuelo de Pedro? -> " + EsAbuelo("Abraham", "Pedro"));

console.log("¿Juan es abuelo de Luis? -> " + EsAbuelo("Juan", "Luis"));