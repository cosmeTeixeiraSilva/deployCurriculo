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
    <div className="w-screen flex  m-auto items-center justify-center bg-[#121212] sm:w-[90vw] h-screen">
      <div className="bg-[#004A8D] text-xl p-6 h-16 flex items-center justify-center sm:justify-between gap-4 fixed top-0 z-50 w-[90vw] border-b-2 text-white font-bold ">
        DashBoard Geral
        <div className="flex flex-col gap-x-2">
          <Link href="/home">
            <Button
              className="px-8 rounded text-xl text-orange-400 font-bold border border-orange-400 bg-[#121212] h-12"
              title="Voltar"
            >
              Home
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <motion.h1
          initial={{ x: "-100vw" }}
          animate={{ x: "100vw" }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          className="text-white mt-20 w-[300px] text-center text-xl rounded bg-orange-500 "
        >
          CEP LAVRAS - MG
        </motion.h1>
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: "-100vw" }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          className="text-xl text-orange-500 w-[300px] text-center  rounded bg-slate-200 "
        >
          Transformando vidas
        </motion.div>
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: "-100vw" }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          className="text-xl text-orange-500 w-[300px] text-center  rounded bg-[#004A8D] "
        >
          Maker
        </motion.div>
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: "-100vw" }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          className="text-xl text-orange-500 w-[300px] text-center  rounded bg-[#004A8D] "
        >
          Inteligencia Artificial
        </motion.div>
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: "-100vw" }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          className="text-xl text-orange-500 w-[300px] text-center  rounded bg-[#004A8D]"
        >
          IOT
        </motion.div>
        {/* Cards com os Resultados  */}
        <Cards1 qtdJurados={Jurados} qtdPontos={Pontos} />
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: "-100vw" }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          className="text-xl text-orange-500 w-[300px] text-center  rounded bg-[#004A8D]  mt-4"
        >
          Programação
        </motion.div>

        <motion.h1
          initial={{ x: "-100vw" }}
          animate={{ x: "100vw" }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          className="text-white mt-8 w-[300px] text-center text-xl rounded bg-orange-500 "
        >
          SESC - MG
        </motion.h1>
        <motion.h1
          initial={{ x: "90vw" }}
          animate={{ x: "-90vw" }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          className="text-white mt-8 mb-20 w-[300px] text-center text-xl rounded bg-orange-500 "
        >
          FECOMERCIO - MG
        </motion.h1>
      </div>
    </div>
  );
}
