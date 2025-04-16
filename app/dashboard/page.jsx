"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Cards1 from "./_components/cards1";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Page() {
  const [txtBtn, settxtBtn] = useState("Atualizar");
  const router = useRouter();

  return (
    <div className="w-[90vw] flex  m-auto items-center justify-center">
      <div className="bg-blue-600 p-6 h-8 flex items-center justify-center sm:justify-between gap-4 fixed top-0 z-50 w-screen border-b-2 text-white font-bold ">
        DashBoard Geral
        <div className="flex flex-col gap-x-2">
          <Link href="/tarefas">
            <Button
              className="px-8 h-6 rounded text-orange-400 font-bold border border-orange-400 bg-[#121212]"
              title="Voltar"
            >
              Voltar
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <motion.h1
          initial={{ x: "-100vw" }}
          animate={{ x: "100vw" }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
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
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          className="text-xl text-orange-500 w-[300px] text-center  rounded bg-blue-400 "
        >
          Maker
        </motion.div>
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: "-100vw" }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          className="text-xl text-orange-500 w-[300px] text-center  rounded bg-blue-800 "
        >
          Inteligencia Artificial
        </motion.div>
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: "-100vw" }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          className="text-xl text-orange-500 w-[300px] text-center  rounded bg-blue-400 "
        >
          IOT
        </motion.div>
        {/* Cards com os Resultados  */}
        <Cards1 />
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: "-100vw" }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          className="text-xl text-orange-500 w-[300px] text-center  rounded bg-blue-400  mt-4"
        >
          Programação
        </motion.div>

        <motion.h1
          initial={{ x: "-100vw" }}
          animate={{ x: "100vw", rotate: 180 }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          className="text-white mt-8 w-[300px] text-center text-xl rounded bg-orange-500 "
        >
          CEP LAVRAS - MG
        </motion.h1>
        <motion.h1
          initial={{ x: "-100vw" }}
          animate={{ x: "100vw", rotate: 180 }}
          transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
          className="text-white mt-8 w-[300px] text-center text-xl rounded bg-orange-500"
        >
          SENAC - MG
        </motion.h1>
        <motion.h1
          initial={{ x: "-100vw" }}
          animate={{ x: "100vw" }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          className="text-white mt-8 w-[300px] text-center text-xl rounded bg-orange-500 "
        >
          SESC - MG
        </motion.h1>
        <motion.h1
          initial={{ x: "-100vw" }}
          animate={{ x: "100vw" }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          className="text-white mt-8 mb-20 w-[300px] text-center text-xl rounded bg-orange-500 "
        >
          FECOMERCIO - MG
        </motion.h1>
      </div>
    </div>
  );
}
