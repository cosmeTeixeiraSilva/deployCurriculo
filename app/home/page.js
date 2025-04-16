"use client"

import Link from 'next/link'
import { useAuth } from "@/context/autContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "../_componentsGerais/header";

export default function Page() {
    const { user } = useAuth();
    return (
        <div className='mt-4 flex flex-col bg-[#121212]  items-center justify-start  gap-y-2 m-auto '>
            <Header />
            <Link href={"/votar"}>
                <Button className="w-[80vw] sm:w-[30vw] text-xl font-bold sm:text-2xl h-12  border-4 border-white-400 bg-blue-600 hover:opacity-50 hover:bg-blue-500 flex items-center justify-center">
                    <span>Vamos Votar</span>

                </Button>
            </Link>

          

            {/* Só "admin" vê isso */}
            {user === "admin" && (
                <div className=" flex flex-col items-center justify-start gap-y-2 mt-4 min-h-[50vh] overflow-y-hidden">
                    <Link href={"/usuarios"}>
                        <Button className="w-[80vw] sm:w-[30vw] text-xl font-bold sm:text-2xl h-12 border-4 border-white-400 bg-orange-500 hover:opacity-50 hover:bg-orange-500 flex items-center justify-center">

                            <span>Usuários</span>

                        </Button>
                    </Link>
                    <Link href={"#"}>
                        <Button className="w-[80vw] sm:w-[30vw] text-xl font-bold sm:text-2xl h-12 border-4 border-white-400 bg-orange-500 hover:opacity-50 hover:bg-orange-500 flex items-center justify-center mt-4">
                            <span>Resultados</span>

                        </Button>
                    </Link>
                    <Link href={"/competicoes"} className="hidden">
                        <Button className="w-[80vw] sm:w-[30vw] text-xl font-bold  h-12 border-4 border-white-400 bg-orange-500 hover:opacity-50 hover:bg-orange-500 flex items-center justify-center mt-4">

                            <span>Competições</span>

                        </Button>
                    </Link>
                    <Link href={"#"}>
                        <Button className="w-[80vw] sm:w-[30vw] text-xl font-bold  h-12 border-4 border-white-400 bg-orange-500 hover:opacity-50 hover:bg-orange-500 flex items-center justify-center mt-4">
                            <span>Relatórios</span>

                        </Button>
                    </Link>
                </div>

            )}



        </div >
    )
}

