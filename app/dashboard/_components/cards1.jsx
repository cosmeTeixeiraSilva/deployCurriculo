"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { getTotalGeralPontos } from "@/app/_services/votarServices";
import { delay, formatarData } from "@/lib/utils";
import { useRouter } from "next/navigation";
export default function Cards1({ qtdJurados, qtdPontos, onAtualizar }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState([]);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(""); // Estado para armazenar a hora

  // Função para formatar data e hora
  const handleAtualizarDados = async () => {
    setLoading(true);
    await delay(1500); //aguardando  1.5 segundos simulando atraso
    try {
      await carregarDados(); // espera os dados locais
      await onAtualizar(); // espera a atualização do pai (Ranking)
      const agora = new Date();
      const dataBrasil = formatarData(agora);
      setUltimaAtualizacao(dataBrasil);
      router.refresh(); // só faz refresh depois
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    } finally {
      setLoading(false); // agora sim, loading só encerra no final
    }
  };

  //busca Dados no Banco
  async function carregarDados() {
    try {
      const total = await getTotalGeralPontos();
      //console.log(total);
      if (total.status) {
        setTotal(total.total);
      }
    } catch (error) {
      //console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  }
  //use Effect
  useEffect(() => {
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
          onClick={() => handleAtualizarDados()}
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
