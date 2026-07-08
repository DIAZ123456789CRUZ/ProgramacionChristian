export const palabraClave = (texto) => {
  return ["if", "for", "else", "funcion", "function", "return"].includes(texto);
};

export const esNumero = (texto) => {
  return /^[0-9]+$/.test(texto);
};

export const esOperador = (texto) => {
  return [
    "=",
    "+",
    "-",
    "*",
    "/",
    "<",
    ">",
    "<=",
    ">=",
    "==",
    "!="
  ].includes(texto);
};

export const esDelimitador = (texto) => {
  return [
    "(",
    ")",
    "{",
    "}",
    "[",
    "]",
    ";",
    ",",
    "."
  ].includes(texto);
};

export const esTexto = (texto) => {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(texto);
};

export const analizarCodigo = (codigoFuente) => {

  if (!codigoFuente) return [];

  // IMPORTANTE
  const revisor =
    codigoFuente.match(/\w+|==|!=|<=|>=|[(){}[\];,.]|[-+*/=<>]/g) || [];

  console.log(revisor); // <-- déjalo por ahora

  return revisor.map((pieza, index) => {

    let tipo = "desconocido";

    if (palabraClave(pieza))
      tipo = "palabraClave";
    else if (esNumero(pieza))
      tipo = "numero";
    else if (esOperador(pieza))
      tipo = "operador";
    else if (esDelimitador(pieza))
      tipo = "delimitador";
    else if (esTexto(pieza))
      tipo = "texto";

    return {
      id: index,
      valor: pieza,
      tipo: tipo
    };
  });

};