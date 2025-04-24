"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { validarToken } from "@/app/_services/authServices";
import React, { useState } from "react";
import { useEffect } from "react";
export default function Menu() {
  const router = useRouter();
  const [usuario, setUsuario] = useState();
  const [nivel, setNivel] = useState();
  //pegando os dados do usuario

  useEffect(() => {
    const dadosUsuario = async () => {
      const resultado = await validarToken();
      //console.log(resultado);
      if (resultado.status) {
        const userLogado = resultado.usuario;
        setUsuario(userLogado.nome);
        setNivel(userLogado.nivel);
        //console.log("Usuario Menu:");
      }
    };

    dadosUsuario();
  }, []);
  const handleLogout = async () => {
    const confirmLogout = confirm("Tem certeza que deseja sair?");
    if (!confirmLogout) return;

    try {
      // Remove localStorage se usar também
      localStorage.removeItem("token");

      // Faz a requisição para a rota de logout
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include", // garante envio e remoção do cookie HttpOnly
      });

      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <nav className="bg-[#F7941D] p-1 flex items-center justify-between sm:w-[100%] w-screen z-50 border-b-2 px-4">
      <div className="text-white text-sm sm:text-xl font-bold uppercase flex flex-col items-start">
        <span>{usuario} </span>
        <span>{nivel}</span>
      </div>
      <Button
        onClick={handleLogout}
        className="bg-[#004A8D] border-2 text-xl mr-4 h-12 w-[30vw] sm:w-[10vw] font-bold hover:opacity-60 hover:bg-[#004A8D]"
      >
        SAIR
      </Button>
    </nav>
  );
}
