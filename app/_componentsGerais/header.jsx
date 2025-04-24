import Image from "next/image";

export default function Header() {
  const agora = new Date();
  //jogar na lib como função auxiliar de Datas
  const dataAtual = agora.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    //hour: '2-digit',
    //minute: '2-digit'
  });

  return (
    <div className="flex items-center justify-center w-full my-2 mx-auto gap-x-4  rounded">
      <Image
        src={"/semanaS.svg"}
        alt="foguete"
        width={150}
        height={50}
        className="w-[30vw] sm:w-[150px]"
      />
      <Image src={"/foguete.png"} alt="foguete" width={70} height={50}   className="w-[20vw] sm:w-[70px]"/>
      <Image src={"/logosenac.png"} alt="foguete" width={150} height={50}  className="w-[30vw] sm:w-[150px]"/>
    </div>
  );
}
