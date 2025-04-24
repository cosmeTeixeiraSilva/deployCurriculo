"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function Cards1({ qtdJurados, qtdPontos }) {
  const [loading, setLoading] = useState(false);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(""); // Estado para armazenar a hora

  // Função para formatar data e hora
  const formatarDataHora = () => {
    const agora = new Date();
    return agora.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-2 mt-12">
      {/* Card 1 - Total de Tarefas */}
      <Card className="w-[90vw] sm:w-full h-44 bg-orange-500 text-white m-auto animate-bounce">
        <CardHeader>
          <CardTitle>Pontos Registrados:</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-semibold">{qtdPontos} pontos</p>
        </CardContent>
      </Card>

      {/* Card 2 - Tarefas Pendentes */}
      <Card className="w-[90vw] sm:w-full h-44 bg-blue-500 text-white animate-pulse">
        <CardHeader>
          <CardTitle>Jurados Cadastrados:</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-semibold">{qtdJurados} Jurado(s)</p>
        </CardContent>
      </Card>

      {/* Botão para atualizar os dados */}
      <div className="w-full col-span-1 sm:col-span-3 flex flex-col items-center mt-4">
        <Button
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded w-1/2 text-2xl"
        >
          {loading ? "Atualizando..." : "Atualizar"}
        </Button>
        <Button className="bg-blue-400 text-white px-4 py-2 rounded w-1/2 text-2xl mt-4">
          Imprimir PDF
        </Button>
        <p className="mt-4 text-xl text-slate-200">
          Última atualização: {ultimaAtualizacao || "Ainda não atualizado"}
        </p>
      </div>
    </div>
  );
}
