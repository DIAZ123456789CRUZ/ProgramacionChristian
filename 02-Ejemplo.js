//Hechos
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
//Reglas
const  cursoDesarrollo=curso=>curso.
categoria==="Desarrollo";
const certificadoTrue=curso=>curso.
tieneCertificado===true;
//conbinaciones de hechos
const 
desarrolloAndCertificado=cursos=>cursoDesarrollo(cursos)&&certificadoTrue(cursos);
//Consultas
const resultado=cursos.filter
(desarrolloAndCertificado);
console.log(resultado);