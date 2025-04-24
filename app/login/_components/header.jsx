"use client";
import Image from "next/image";

export default function HeaderLogin() {
  return (
    <div className=" flex flex-col items-center sm:w-full w-[90vw] mx-auto mt-2 mb-10">
      <div className="flex items-center justify-around">
        <Image
          src={"/foguete.png"}
          alt="foguete"
          width={100}
          height={50}
          className="mx-auto  p-2    " // Adicionando drop-shadow-2xl
        />
        <p className=" text-3xl font-bold mt-2  text-white ">SENAC X</p>
        <Image
          src={"/foguete.png"}
          alt="foguete"
          width={100}
          height={50}
          className="mx-auto  p-2    " // Adicionando drop-shadow-2xl
        />
      </div>
    </div>
  );
}
