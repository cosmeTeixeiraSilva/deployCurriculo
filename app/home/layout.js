"use client"
import Menu from "./_components/menu";
import { useAuth } from "@/context/autContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Layout({ children }) {
    const { user } = useAuth();
    console.log("Usuário logado:", user); // precisa exibir corretamente

    if (user === null) {
        return (
            <div className="text-white text-center p-8   bg-[#121212] h-screen">
                Sem usuário Autenticando...

                <nav className="bg-transparent p-2 flex  flex-col items-center justify-center  w-screen z-50 ">
                    <Link href={"/login"}>
                        <Button className="bg-orange-400 text-xl w-[50vw]  font-bold hover:opacity-60 hover:bg-orange-400">
                            Fazer Login
                        </Button>
                    </Link>
                </nav>


            </div>
        );
    }

    console.log({ user })
    return (

        <div className="flex flex-col items-center justify-start w-screen bg-[#121212] h-screen">
            <Menu />
            <div className="h-full">
                {children}
            </div>
        </div>
    )
}
