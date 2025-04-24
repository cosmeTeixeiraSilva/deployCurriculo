"use client";
import React, { useState } from "react";
import SheetUsuario from "./sheetUser";
import { IoPersonAdd } from "react-icons/io5";
export default function BotaoNovo() {
  //Para controlar o SheetUsuario
  const [open, setOpen] = useState(false);
  const [usuario, setUsuarioSelecionado] = useState();

  return (
    <div>
      <IoPersonAdd
        autoFocus
        onClick={() => {
          setUsuarioSelecionado({ nome: "", celular: "", nivel: "" });
          setOpen(true);
        }}
        size={52}
        className=" text-orange-500 hover:opacity-50 cursor-pointer  bg-white p-2 rounded border-2 border-orange-400"
      />

      {/* Componente Sheet aberto via props */}
      <SheetUsuario open={open} setOpen={setOpen} usuario={[]} />
    </div>
  );
}
