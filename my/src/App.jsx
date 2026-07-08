import { useMemo, useState } from "react";
import { analizarCodigo } from "./lectura/lexico";

function App() {

  const [codigo, setCodigo] = useState(`funcion suma(a,b){
    x = 10 + 5;
    return x;
    christian
}`);

  const tokens = useMemo(() => analizarCodigo(codigo), [codigo]);

 const coloresTokens = {
  palabraClave: 'bg-orange-200 text-orange-800 border border-orange-400',
  numero: 'bg-amber-200 text-amber-800 border border-amber-400',
  operador: 'bg-green-200 text-green-800 border border-green-400',
  delimitador: 'bg-purple-200 text-purple-800 border border-purple-400',
  texto: 'bg-blue-200 text-blue-800 border border-blue-400',
  desconocido: 'bg-gray-200 text-gray-800 border border-gray-400'
};

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">

        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Analizador Léxico
          </h1>

          <p className="text-gray-600">
            Clasificación de tokens mediante expresiones regulares.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Código Fuente */}

          <div>

            <label className="block mb-2 font-semibold">
              Código fuente
            </label>

            <textarea
              className="w-full h-[500px] p-4 rounded-lg bg-gray-900 text-white font-mono border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Escribe tu código..."
            />

          </div>

          {/* Tokens */}

          <div>

            <label className="block mb-2 font-semibold">
              Tokens encontrados
            </label>

            <div className="h-[500px] overflow-y-auto border rounded-lg p-4 bg-gray-100">

              {tokens.length > 0 ? (

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                  {tokens.map((token) => (

                    <div
                      key={token.id}
                      className={`rounded-lg shadow-md p-3 text-center transition hover:scale-105 ${coloresTokens[token.tipo] || coloresTokens["Desconocido"]}`}
                    >

                      <p className="text-xs font-bold uppercase mb-2">
                        {token.tipo}
                      </p>

                      <p className="text-lg font-mono break-all">
                        {token.valor}
                      </p>

                    </div>

                  ))}

                </div>

              ) : (

                <div className="text-center text-gray-500 italic mt-10">
                  No hay tokens para analizar.
                </div>

              )}

            </div>

          </div>

        </div>
      <div className="mt-6 border-t pt-4">
  <p className="text-gray-700 font-medium">
    Total de tokens encontrados: <span className="font-bold">{tokens.length}</span>
  </p>
</div>

      </div>

    </div>
  );
}

export default App;
