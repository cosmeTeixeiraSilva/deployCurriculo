"use client";

import { Input } from "@/components/ui/input";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";


export default function BuscaUser() {
  const { toast } = useToast(); // aqui pega a função

  const handleBusca = async () => {
    toast({
      title: "Busca realizada!",
      description: "Você clicou no botão de buscar.",
      variant: "default", // ou "destructive", "success", etc.
      duration: 3000, // desaparece em 3 segundos
    });
  };

  return (
    <div className="flex items-center justify-end w-full px-2 my-4 ">
      <Input
        placeholder="Buscar Nome..."
        className="bg-slate-100 mx-2 w-2/3 sm:w-1/2  border-2 border-orange-500 h-12 !text-xl text-black hidden"
      />
      <div className="flex gap-x-4 mr-2">
        <FaSearch
          className="text-orange-500 bg-white p-2 rounded border-2 border-orange-500  ml-2 cursor-pointer mr-2 hidden"
          size={52}
          onClick={handleBusca}
        />
       
      </div>

    </div>
  );
}
