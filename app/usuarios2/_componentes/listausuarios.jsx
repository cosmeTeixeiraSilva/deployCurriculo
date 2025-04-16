"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SheetUsuario from "./sheetUser";
import { findUsuario } from "@/app/_services/usersServices";
export default function Listausuarios({ usuarios }) {
  //Para controlar o SheetUsuario
  const [open, setOpen] = useState(false);
  // Estado para o id do usuário selecionado
  const [usuario, setUsuario] = useState([]);
  //Função Editar Usuario:
  const handleDetalhes = async (id) => {
    //busca o usuário
    const res = await findUsuario(id);
    setUsuario(res.usuario);

    console.log(`Editando o usuario ${id}`);
    //Abrindo o sheet
    setOpen(true);
  };

  return (
    <div className="text-white">
      <hr className="mt-2" />

      <ul className="flex gap-y-3 flex-col text-sm sm:text-xl sm:w-full w-[90vw] mt-8">
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="flex items-center justify-between">
            <div>
              <span className="ml-2">
                {usuario.nome.toUpperCase()} -
                {usuario.nivel === 3
                  ? " Admin"
                  : usuario.nivel === 1
                  ? " Competidor"
                  : usuario.nivel === 2
                  ? " Jurado"
                  : " Desconhecido"}
              </span>
            </div>

            <Button
              onClick={() => handleDetalhes(usuario.id)}
              className="bg-blue-800 text-slate-200 border font-bold w-[150px] h-10 mr-2 text-md sm:text-xl hover:bg-blue-800 hover:opacity-50"
            >
              Detalhes
            </Button>
          </li>
        ))}
      </ul>
      {/* Componente Sheet aberto via props */}
      <SheetUsuario open={open} setOpen={setOpen} usuario={usuario} />
    </div>
  );
}
