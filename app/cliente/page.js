
//atualiza o cache a cada 5 segundos 



import Link from "next/link";

//export const dynamic = "force-dinamic";
export const revalidate = 10;

export default function Pageclient() {
  return (
    <div className="text-white   font-semibold  flex  flex-col  text-2xl text-center items-center">
      <h1>Senac Lavras MG - Ano de 2025</h1>
      <Link href={"/"} className="bg-blue-800 rounded p-3 m-3 w-full text-center">Voltar </Link>
    </div>
  );
}
