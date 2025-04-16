"use client";
import React, { useState } from "react";
import SheetUsuario from "./sheetUser";
import { Button } from "@/components/ui/button";

export default function BotaoNovo() {
  //Para controlar o SheetUsuario
  const [open, setOpen] = useState(false);
  const [usuario, setUsuarioSelecionado] = useState();
  return (
    <div>
      <Button
        variant="outline"
        onClick={() => {
          setUsuarioSelecionado({ nome: "", celular: "", nivel: "" }); // limpa dados
          setOpen(true); // abre o Sheet
        }}
        className="border-white border-2 m-4 text-white bg-blue-800
     hover:bg-blue-800 hover:opacity-50 w-[150px]  mx-auto text-2xl  font-bold hover:text-white p-2"
      >
        Adicionar
      </Button>
      {/* Componente Sheet aberto via props */}
      <SheetUsuario open={open} setOpen={setOpen} usuario={[]} />
    </div>
  );
}
