import Image from "next/image";

//recarregando o cache em 10 segundos 
export const revalidate = 10;
export default function Home() {
  return (
    <div className="flex flex-col justify-center items-start w-[90vw] mx-auto ">
      {/*buton1*/}

      <a href={"/cliente"} className="bg-blue-800 rounded p-3 m-3 text-white min-w-40 text-center ">Clientes</a>

      <div className="relative w-1/2 max-w-1/2 h-80 bg-white mx-auto rounded border border-white overflow-hidden ">
        <Image
          src="/uber1.jpg"
          alt="image1"
          layout="fill" // Faz a imagem ocupar todo o container
          objectFit="cover" // Ajusta a imagem proporcionalmente para cobrir o container
          className="absolute top-0 left-0 z-0"
        />
        <span className="absolute z-10 bg-white/60 text-black p-4 rounded bottom-5 right-5 font-bold text-xl">
          Com Uber você vai mais longe...
        </span>
      </div>

    </div>
  );
}
