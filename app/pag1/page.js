import Image from "next/image";

import Link from "next/link";

export default function Pag1() {
  return (
    <div className="text-white text-center flex flex-col h-full w-full text-4xl justify-center items-center">
      <h1>Senac Lavras MG</h1>
      <Image src="/image1.png" alt="image1" width="500" height="500"></Image>

      <Link
        href={"/pag2"}
        className=" text-white p-3 border border-orange-700 w-82"
      >
        Acessar a Página 2
      </Link>
    </div>
  );
}
