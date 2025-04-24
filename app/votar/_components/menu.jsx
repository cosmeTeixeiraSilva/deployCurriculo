"use client";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { validarToken } from "@/app/_services/authServices";
export default function Menu() {
  const [usuario, setUsuario] = useState();
  const [nivel, setNivel] = useState();
  const [idJurado, setidJurado] = useState();
  //pegando os dados do usuario

  useEffect(() => {
    const dadosUsuario = async () => {
      const resultado = await validarToken();
      //console.log(resultado);
      if (resultado.status) {
        const userLogado = resultado.usuario;
        setUsuario(userLogado.nome);
        setNivel(userLogado.nivel);
        setidJurado(userLogado.id);
        //console.log("Usuario Menu:");
      }
    };

    dadosUsuario();
  }, []);
  return (
    <nav className="bg-[#004A8D] py-2   sm:w-full w-screen flex  items-center px-4 justify-between border-b-2 ">
      <div className="text-white text-sm sm:text-xl font-bold uppercase flex flex-col items-start">
        <span>{usuario} </span>
        <span>{nivel}</span>
        <span className="hidden">{idJurado}</span>
      </div>

      <Link href={"/home"}>
        <Button className="bg-[#F7941D] text-xl h-12 border-2 w-[30vw] mr-4 sm:w-[10vw] font-bold hover:opacity-60 hover:bg-[#F7941D]">
          Home
        </Button>
      </Link>
    </nav>
  );
}
