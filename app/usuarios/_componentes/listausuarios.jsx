"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SheetUsuario from "./sheetUser";
import { findUsuario, excluirUsuario } from "@/app/_services/usersServices";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useToast } from "@/hooks/use-toast";
export default function Listausuarios({ usuarios }) {
  //Para controlar o SheetUsuario
  const [open, setOpen] = useState(false);
  // Estado para o id do usuário selecionado
  const [usuario, setUsuario] = useState([]);
  //para atualizar a rota
  const router = useRouter();
  const { toast } = useToast(); // aqui pega a função
  //Função Editar Usuario:
  const handleDetalhes = async (id) => {
    //busca o usuário
    const res = await findUsuario(id);
    setUsuario(res.usuario);
    //console.log(`Editando o usuario ${id}`);
    //Abrindo o sheet
    setOpen(true);
  };
  //Deltando Usuário
  const handleDeletar = async (id) => {
    const res = await excluirUsuario(id);
    console.log(res);
    //atualiza a tela do cliente
    toast({
      title: "Exclusão Com Sucesso!",
      description: res.message,
      variant: "destructive", // ou "destructive", "success", etc.
      duration: 3000, // desaparece em 3 segundos
    });
    router.refresh();
  };

  return (
    <div className="text-white p-2 w-full ">
      <ul className="flex gap-y-4 flex-col w-full items-center justify-between text-sm sm:text-xl  mt-2">
        {usuarios.map((usuario) => (
          <li
            key={usuario.id}
            className="flex items-end justify-between  w-full"
          >
            <div className="flex flex-col   items-start justify-end w-full ">
              <span className="ml-2">Nome: {usuario.nome.toUpperCase()}</span>
              <span
                className={
                  usuario.nivel === 3
                    ? "text-orange-500 bg-white p-2  text-center w-[210px]  rounded border-2 border-orange-400 ml-2 font-bold"
                    : usuario.nivel === 1
                    ? "text-blue-600 bg-white text-center p-2 w-[210px]  rounded border-2 border-blue-600 ml-2 font-bold"
                    : usuario.nivel === 2
                    ? "text-black bg-white p-2 text-center w-[210px] rounded ml-2 font-bold"
                    : "text-gray-400 "
                }
              >
                {usuario.nivel === 3
                  ? "ADMINISTRADOR"
                  : usuario.nivel === 1
                  ? "COMPETIDOR"
                  : usuario.nivel === 2
                  ? "JURADO"
                  : "DESCONHECIDO"}
              </span>
            </div>

            <MdOutlineRemoveRedEye
              onClick={() => handleDetalhes(usuario.id)}
              size={42}
              className=" text-blue-500 font-bold mr-6 hover:opacity-50 "
            />

            <FaRegTrashAlt
              onClick={() => handleDeletar(usuario.id)}
              className=" text-red-700 mr-4 hover:opacity-50 "
              size={42}
              title="Excluir o Usuário?"
            />
          </li>
        ))}
      </ul>
      {/* Componente Sheet aberto via props */}
      <SheetUsuario open={open} setOpen={setOpen} usuario={usuario} />
    </div>
  );
}
