import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen overflow-y-hidden bg-[#121212] h-screen">
      <nav className="bg-blue-600 py-1 flex items-center justify-end border-b-4">
        <Link href="/login">
          <button autoFocus className="border-white p-2 mr-4 mt-2 rounded text-white font-bold border-2 border-orange-400 bg-orange-400 ">Entrar</button>
        </Link>
      </nav>


      <div className="rounded  justify-center items-start  m-auto flex flex-col   mt-20 gap-8 ">
        <Image
          src={"/foguete.png"}
          alt="foguete"
          width={100}
          height={100}
          className="p-2  text-start  mx-auto  "  // Adicionando drop-shadow-2xl
        />
        <Image
          src={"/senacx.png"}
          alt="Descrição do SVG"
          width={200}
          height={200}
          className=" mx-auto p-2 rounded bg-white border-4 border-orange-400 mb-4"  // Adicionando drop-shadow-2xl
        />
        <Image
          src={"/semanaS.svg"}
          alt="logoSenac"
          width={200}
          height={200}
          className="mx-auto mt-2"
        // Adicionando drop-shadow-2xl
        />


      </div>

    </div>



  );
}
