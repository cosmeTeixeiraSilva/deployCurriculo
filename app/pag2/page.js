import Image from "next/image";
import Link from "next/link";
{
  /*add imagem na tela passo 1 */
}

export default function Pag2() {
  return (
    <div className="text-white w-full  h-full text-4xl flex flex-col items-center justify-center space-y-4">
      <h1>Senac Lavras MG</h1>
      {/*add imagem na tela passo 2*/}
      <Image src="/image2.png" alt="image2" width="500" height="500"></Image>

      <Link
        href={"/pag3"}
        className=" text-white p-3 border border-orange-700 w-82"
      >
        Acessar a Página 3
      </Link>
    </div>
  );
}
