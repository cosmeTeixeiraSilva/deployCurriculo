"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Calculadora() {
    const [valor1, setValor1] = useState(0);
    const [valor2, setValor2] = useState(0);
    const [resultado, setResultado] = useState(0);

    // Corrigindo a declaração da função
    const Calcular = () => {
        // Converter os valores para números antes de realizar a operação
        setResultado(Number(valor1) + Number(valor2));
    }

    return (
        <div className='text-white font-bold text-center mt-8 bg-orange-300 p-2 rounded w-1/2 flex flex-col gap-y-2 border-4'>
            Minha Calculadora Senac MG
            <Input
                type="text"
                className=" bg-white border-2 border-black text-blue-400 text-center text-xl appearance-none"
                onChange={(e) => setValor1(e.target.value)}
                value={valor1}
            />
            <Input
                type="text"
                className=" bg-white border-2 border-black text-blue-400 text-center text-xl appearance-none"
                onChange={(e) => setValor2(e.target.value)}
                value={valor2}
            />
            <div className="bg-blue-400 p-2 w-full text-center rounded ">
                {resultado && <p>{resultado}</p>}
            </div>
            <Button onClick={Calcular}>Calcular Soma (+)</Button>
        </div>
    );
}
