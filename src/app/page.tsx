"use client";
import { useState } from "react";

export default function CalculadoraRanked() {
  const [vitorias, setVitorias] = useState<number | "">("");
  const [derrotas, setDerrotas] = useState<number | "">("");
  const [resultado, setResultado] = useState("");


  const niveis = [
    { min: 0,   max: 10,  nome: "Ferro" },
    { min: 11,  max: 20,  nome: "Bronze" },
    { min: 21,  max: 50,  nome: "Prata" },
    { min: 51,  max: 80,  nome: "Ouro" },
    { min: 81,  max: 90,  nome: "Diamante" },
    { min: 91,  max: 100, nome: "Lendário" },
    { min: 101, max: Infinity, nome: "Imortal" },
  ];

  function calcularRank(v: number, d: number) {

    const vit = Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0;
    const der = Number.isFinite(d) && d >= 0 ? Math.floor(d) : 0;

    const saldoVitorias = vit - der;

    let i = 0;
    let nivel = "Ferro"; 
    while (i < niveis.length) {
     const faixa = niveis[i];
      if (saldoVitorias >= faixa.min && saldoVitorias <= faixa.max) {
      nivel = faixa.nome;
      break;
      }
     i++;
    }

    return { saldoVitorias, nivel };
  }

  const classificar = () => {
    if (vitorias === "" || derrotas === "") return;
    const { saldoVitorias, nivel } = calcularRank(Number(vitorias), Number(derrotas));
    setResultado(`O Herói tem saldo de ${saldoVitorias} vitórias e está no nível de ${nivel}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100 text-white">
      <div className="bg-black shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Calculadora de Partidas Rankeadas</h1>

        <div className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="Vitórias"
            value={vitorias}
            onChange={(e) => setVitorias(e.target.value === "" ? "" : Number(e.target.value))}
            className="border rounded-lg px-3 py-2"
            min={0}
          />
          <input
            type="number"
            placeholder="Derrotas"
            value={derrotas}
            onChange={(e) => setDerrotas(e.target.value === "" ? "" : Number(e.target.value))}
            className="border rounded-lg px-3 py-2"
            min={0}
          />
          <button onClick={classificar} className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Classificar
          </button>
        </div>

        {resultado && (
          <p className="mt-4 text-lg font-medium text-center text-white">{resultado}</p>
        )}
      </div>
    </main>
  );
}



