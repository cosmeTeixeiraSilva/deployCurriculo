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
        <div className=" flex flex-col items-center  sm:w-1/2 w-[90vw] mx-auto mt-1">

            <div className="flex items-center justify-between">

                <Image
                    src={"/semanaS.svg"}
                    alt="foguete"
                    width={180}
                    height={50}
                    className=" p-2    "  // Adicionando drop-shadow-2xl
                />

                <Image
                    src={"/foguete.png"}
                    alt="foguete"
                    width={70}
                    height={50}
                    className=" p-2    "  // Adicionando drop-shadow-2xl
                />
            </div>

        </div>
    )
}
