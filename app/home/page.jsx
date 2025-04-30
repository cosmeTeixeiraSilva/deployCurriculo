"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "../_componentsGerais/header";
import { validarToken } from "../_services/authServices";
import Image from "next/image";

export default function Page() {
  const router = useRouter();
  const [autorizado, setAutorizado] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nivel, setNivel] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      const resultado = await validarToken();

      // Adiciona delay artificial (caso você queira um efeito visual)
      //await delay(1500);

      if (!resultado.status) {
        router.push("/"); // redireciona se não autenticado
      } else {
        // Libera o acesso e define usuário logado
        //setusarioLogado(resultado.usuario);
        const userLogado = resultado.usuario;
        //console.log(userLogado.nivel);
        setNivel(userLogado.nivel);
        setAutorizado(true);
      }

      setLoading(false); // Sempre para o loading
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#121212] text-orange-500 text-md">
        <Image
          src={"/semanaS.svg"}
          alt="semanaS"
          width={150}
          height={150}
          className="mb-4" // Adicionando drop-shadow-2xl
        />
        <span>Validando acesso</span>
        <span>Aguarde por favor...</span>
        <span className="mt-4 animate-spin inline-block w-8 h-8 border-2 border-t-transparent border-orange-500 rounded-full" />
      </div>
    );
  }

  if (!autorizado) return null;

  return (
    <div className="mx-auto mt-4 flex flex-col bg-[#121212] sm:w-full w-screen items-center justify-between gap-y-2 m-auto">
      <Header />
      <Link href={"/votar"}>
        <Button className="w-[80vw] sm:w-[30vw] text-xl font-bold sm:text-2xl h-12 border-2 border-white-400 bg-[#004A8D] hover:opacity-50 hover:bg-[#004A8D] flex items-center justify-center">
          <span>Vamos Votar</span>
        </Button>
      </Link>
      {nivel === "Administrador" ? (
        <div className="flex flex-col items-center justify-start gap-y-2 mt-4 min-h-[50vh] overflow-y-hidden">
          <Link href={"/usuarios"}>
            <Button className="w-[80vw] sm:w-[30vw] text-xl font-bold sm:text-2xl h-12 border-2 border-white-400 bg-[#F7941D] hover:opacity-50 hover:bg-[#F7941D] flex items-center justify-center">
              <span>Usuários</span>
            </Button>
          </Link>
          <Link href={"/dashboard"}>
            <Button className="w-[80vw] sm:w-[30vw] text-xl font-bold sm:text-2xl h-12 border-2 border-white-400 bg-[#F7941D] hover:opacity-50 hover:bg-[#F7941D] flex items-center justify-center mt-4">
              <span>DashBoard</span>
            </Button>
          </Link>
          <Link href={"/competicoes"} className="hidden">
            <Button className="w-[80vw] sm:w-[30vw] text-xl font-bold h-12 border-2 border-white-400 bg-[#F7941D] hover:opacity-50 hover:bg-[#F7941D] flex items-center justify-center mt-4">
              <span>Competições</span>
            </Button>
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
