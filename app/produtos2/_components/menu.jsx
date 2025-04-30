import React from "react";
import Link from "next/link";
export default function MenuPrincipal() {
  return (
    <div>
      <nav className="bg-blue-600 p-2 flex  flex-col items-center justify-center  w-screen z-50 border-b-2 ">
        <Link href="/home">
          <button className="p-2 mt-1 rounded text-white font-bold border-2  bg-orange-500 w-[80vw] text-md">
            Voltar a Aplicativos
          </button>
        </Link>
      </nav>
    </div>
  );
}
