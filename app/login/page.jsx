"use client";
import Formlogin from "./_components/formlogin";
import Image from "next/image";
import HeaderLogin from "./_components/header";

export default function Login() {
  return (
    <div className="w-full h-[90vh] flex flex-col items-center  overflow-hidden">
      <HeaderLogin />
      <Formlogin />
      <div className=" w-[80vw] sm:w-1/4"></div>
      <Image
        src={"/semanaS.svg"}
        alt="Logo Semana S"
        width={250}
        height={250}
        className="mx-auto     mt-20 " // Adicionando drop-shadow-2xl
      />
    </div>
  );
}
