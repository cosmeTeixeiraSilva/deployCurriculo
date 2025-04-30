import Image from "next/image"

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


        <div className="flex items-center justify-between mx-auto  w-full sm:w-1/2 px-2 mt-4">

            <Image
                src={"/semanaS.svg"}
                alt="foguete"
                width={150}
                height={50}
                className=" px-2    "  // Adicionando drop-shadow-2xl
            />

            <Image
                src={"/foguete.png"}
                alt="foguete"
                width={80}
                height={50}
                className=" px-2    "  // Adicionando drop-shadow-2xl
            />
        </div>


    )
}
