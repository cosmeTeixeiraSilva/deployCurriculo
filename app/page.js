import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" sm:w-2/3 w-screen h-screen bg-[#121212]  overflow-hidden">
      <nav className="bg-[#004A8D] py-1 flex items-center justify-end border-b-2 border-white">
        <Link href="/login">
          <button autoFocus className="p-2 mr-4 mt-2 rounded text-white font-bold border-2 bg-orange-400">
            Entrar
          </button>
        </Link>
      </nav>

      <div className="rounded justify-center items-start m-auto flex flex-col px-4">
        {/* Foguete */}
        <div className="flex w-full items-center justify-between mx-auto">
          <div className="relative w-1/2 sm:w-[300px] aspect-[3/2] mx-auto">
            <Image
              src="/foguete.png"
              alt="foguete"
              fill
              className="object-contain"
            />
          </div>
          {/* logosenac.png */}
          <div className="relative w-[80vw] sm:w-[400px] mx-auto aspect-[1/1]">
            <Image
              src="/semanaS.svg"
              alt="logoSenac"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Imagens lado a lado ou empilhadas */}
        <div className="flex flex-col sm:flex-row items-center justify-center w-full">
          {/* senacx.png */}
          <div className="relative w-[85vw]  sm:w-[500px] aspect-[4/3] border-4 border-orange-400 bg-white">
            <Image
              src="/senacx.png"
              alt="Descrição do SVG"
              fill
              className="object-contain"
            />
          </div>

          {/* semanaS.svg */}
          <div className="relative w-[70vw] sm:w-[500px] aspect-[1/1]">
            <Image
              src="/logosenac.png"
              alt="logoSenac"
              fill
              className="object-contain"
            />
          </div>
        </div>


      </div>
    </div>
  );
}
