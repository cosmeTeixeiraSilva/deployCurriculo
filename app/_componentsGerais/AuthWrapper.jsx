"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { validarToken } from "../_services/authServices";
import Menu from "../home/_components/menu";
import { useRouter } from "next/navigation";

export default function AuthWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const [autenticado, setAutenticado] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const validar = async () => {
      const resultado = await validarToken();
      if (!resultado.status) {
        router.push("/login");
      } else {
        setAutenticado(true);
      }
      setLoading(false);
    };
    validar();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#121212] text-orange-500 text-md">
        <Image
          src={"/semanaS.svg"}
          alt="semanaS"
          width={150}
          height={150}
          className="mb-4"
        />
        <span>Validando acesso</span>
        <span>Aguarde por favor...</span>
        <span className="mt-4 animate-spin inline-block w-8 h-8 border-2 border-t-transparent border-orange-500 rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start sm:w-2/3 w-screen bg-[#121212] h-screen sm:border-r-2 sm:border-orange-500 sm:border-l-2 sm:shadow-lg sm:shadow-orange-400 mx-auto overflow-hidden">
      {autenticado && <Menu />}
      <div className="h-full w-full">{children}</div>
    </div>
  );
}
