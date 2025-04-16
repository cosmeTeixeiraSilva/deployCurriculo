"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function Cards1() {
  const [dados, setDados] = useState({
    qtdTarefas: 0,
    qtdTarefasPendentes: 0,
    qtdTarefasConcluidas: 0,
    qtdTarefasAndamento: 0,
  });

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

  // Função para buscar os dados da API
  const fetchDados = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/tarefas");
      const data = await res.json();
      setDados(data);
      setUltimaAtualizacao(formatarDataHora()); // Atualiza a data e hora
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDados();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 px-2 mt-12">
      {/* Card 1 - Total de Tarefas */}
      <Card className="w-[90vw] sm:w-full h-44 bg-orange-500 text-white m-auto animate-bounce">
        <CardHeader>
          <CardTitle>Tarefas Registradas:</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-semibold">{dados.qtdTarefas} tarefas</p>
        </CardContent>
      </Card>

      {/* Card 2 - Tarefas Pendentes */}
      <Card className="w-[90vw] sm:w-full h-44 bg-blue-500 text-white animate-pulse">
        <CardHeader>
          <CardTitle>Tarefas Pendentes:</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-semibold">
            {dados.qtdTarefasPendentes} tarefas
          </p>
        </CardContent>
      </Card>

      {/* Card 3 - Tarefas Concluídas */}
      <Card className="w-[90vw] sm:w-full h-44 bg-purple-600 text-white m-auto animate-pulse">
        <CardHeader>
          <CardTitle>Concluídas:</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-semibold">
            {dados.qtdTarefasConcluidas} tarefas
          </p>
        </CardContent>
      </Card>

      {/* Card 4 - Tarefas em Andamento */}
      <Card className="w-[90vw] sm:w-full h-44 bg-blue-800 text-white m-auto animate-bounce">
        <CardHeader>
          <CardTitle>Em Andamento:</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-semibold">
            {dados.qtdTarefasAndamento} tarefas
          </p>
        </CardContent>
      </Card>

      {/* Botão para atualizar os dados */}
      <div className="w-full col-span-1 sm:col-span-4 flex flex-col items-center mt-4">
        <Button
          onClick={fetchDados}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded w-1/2 text-2xl"
        >
          {loading ? "Atualizando..." : "Atualizar"}
        </Button>
        <p className="mt-4 text-xl text-slate-200">
          Última atualização: {ultimaAtualizacao || "Ainda não atualizado"}
        </p>
      </div>
    </div>
  );
}
