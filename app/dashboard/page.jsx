"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Cards1 from "./_components/cards1";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { validarToken } from "../_services/authServices";
import {
  busca_qtdJurados,
  busca_qtdPontos,
} from "../_services/dashboardServices";
import Ranking from "./_components/grafico";

export default function Page() {
  const [txtBtn, settxtBtn] = useState("Atualizar");
  const [Jurados, setJurados] = useState();
  const [Pontos, setPontos] = useState();
  const router = useRouter();
  useEffect(() => {
    const atualizarDash = async () => {
      const resultado = await validarToken();

      if (!resultado.status) {
        router.push("/"); // redireciona se não autenticado
      } else {
        const userLogado = resultado.usuario;
        try {
          const resultadoJurados = await busca_qtdJurados(); // essa função deve retornar uma string
          setJurados(resultadoJurados.data); // atualiza o estado com a string
          //console.log("Qtd de jurados:", resultadoJurados.data);
          //quantidade de pontos
          const resultadoPontos = await busca_qtdPontos(); // essa função deve retornar uma string
          //setPontos(resultadoPontos); // atualiza o estado com a string
          //console.log("Pontos Acumulados:", resultadoPontos.data);
          setPontos(resultadoPontos.data);
        } catch (err) {
          //console.error("Erro ao buscar pontos:", err);
          setJurados("0"); // fallback em caso de erro
        }
      }

      // Remova ou declare o loading, conforme o caso:
      // setLoading(false);
    };

    atualizarDash();
  }, []);

  return (
    <div className="w-screen flex  mx-auto items-start justify-center bg-[#121212] sm:w-[90vw] h-screen overflow-hidden ">
      <div className="bg-orange-500 text-sm sm:text-xl p-6 h-16 flex items-center justify-between sm:justify-between gap-4 fixed top-0 z-50 w-screen sm:w-[90vw] border-b-2 text-white font-bold ">
        DashBoard Geral
        <div className="flex flex-col gap-x-2">
          <Link href="/home">
            <Button
              className="px-8 rounded text-sm sm:text-xl text-white font-bold border-2  bg-[#004A8D] hover:bg-[#004A8D] hover:opacity-50 "
              title="Voltar"
            >
              Home
            </Button>
          </Link>
        </div>
      </div>

      <div className="w-[95vw] sm:w-1/2">
        <Cards1 qtdJurados={Jurados} qtdPontos={Pontos} />
        {/* Cards com os Resultados  */}

        <Ranking />
      </div>
    </div>
  );
}
