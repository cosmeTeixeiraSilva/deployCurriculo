"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { getTotalGeralPontos } from "@/app/_services/votarServices";

export default function Cards1({ qtdJurados, qtdPontos }) {
  const [loading, setLoading] = useState(false);

  const [total, setTotal] = useState([]);
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
  //use Effect
  useEffect(() => {
    async function carregarDados() {
      try {
        const total = await getTotalGeralPontos();
        console.log(total);
        if (total.status) {
          setTotal(total.total);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  return (
    <div className="mt-16">
      {/* Botão para atualizar os dados */}
      <p className=" text-sm text-slate-200 text-center mx-4 py-4">
        Atualizado em: {ultimaAtualizacao || "Desatualizado"}
      </p>
      <div className="w-full  flex gap-4  items-center justify-around m-4 px-2 sm:flex-row mx-auto ">
        <Button
          disabled={loading}
          className="bg-green-600 text-white px-4  rounded w-1/3 sm:w-1/2 text-xl border-2"
        >
          {loading ? "Atualizando..." : "Atualizar"}
        </Button>
        <Button className="bg-blue-400 text-white px-4  rounded w-1/3 sm:w-1/2  text-xl border-2 ">
          Imprimir
        </Button>
      </div>
      {/* Card 1 - Total de Tarefas */}
      <div className="flex items-center sm:w-full justify-between text-center gap-2  mx-auto w-[85%]">
        <Card className=" bg-orange-500 text-white animate-pulse flex flex-col items-center justify-center">
          <CardHeader>
            <CardTitle>Pontos Registrados:</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold">{qtdPontos} </p>
          </CardContent>
        </Card>

        {/* Card 2 - Tarefas Pendentes */}
        <Card className=" bg-blue-500 text-white animate-pulse flex flex-col items-center justify-center">
          <CardHeader>
            <CardTitle>Jurados Cadastrados:</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold">{qtdJurados} </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
