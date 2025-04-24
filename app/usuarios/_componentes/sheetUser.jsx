"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useToast } from "@/hooks/use-toast";
import { criarUsuario, updateUsuario } from "@/app/_services/usersServices";
import { useRouter } from "next/navigation";

export default function SheetUsuario({ open, setOpen, usuario }) {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState({
    id: "",
    nome: "",
    celular: "",
    nivel: 0,
  });
  const [idUsuario, setIDUsuario] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  //console.log(idUsuario);
  //para atualizar a rota
  const router = useRouter();
  const { toast } = useToast(); // aqui pega a função
  const handleSalvar = async (event) => {
    event.preventDefault();
    //pegando os dados do lado do cliente e tratando
    const form = event.target;
    const formData = new FormData(form);
    const dados = Object.fromEntries(formData.entries());

    // Validando os dados no Frontend
    if (!dados.nome || !dados.celular || !dados.nivel) {
      toast({
        title: "Alerta!",
        description: "Favor preencher os 3 campos obrigatórios",
        variant: "destructive", // ou "destructive", "success", etc.
        duration: 3000, // desaparece em 3 segundos
      });

      return;
    }

    //console.log("Salvando...", dados);
    if (dados.id) {
      console.log(`Editando Registro ${dados.nome}`);
      const res = await updateUsuario(dados);
      //console.log(res);
      if (res.status === true) {
        toast({
          title: "Sucesso!",
          description: res.message,
          variant: "default",
          duration: 3000,
        });
      } else {
        toast({
          title: "Alerta!",
          description: res.message,
          variant: "destructive",
          duration: 3000,
        });
      }
    } else {
      const res = await criarUsuario(dados);
      setOpen(false);
      setUsuarioSelecionado({
        id: "",
        nome: "",
        celular: "",
        outroCampo: "",
      });
      //console.log(res);
      if (res.status === true) {
        toast({
          title: "Sucesso!",
          description: res.message,
          variant: "default",
          duration: 3000,
        });
      } else {
        toast({
          title: "Alerta!",
          description: res.message,
          variant: "destructive",
          duration: 3000,
        });
      }
    }
    form.reset(); // limpa o formulário
    setUsuarioSelecionado({
      id: "",
      nome: "",
      celular: "",
      nivel: "",
    });

    setOpen(false); // fecha o Sheet ou modal
    //atualiza a tela do cliente
    router.refresh();
  };

  //USEFFECT QDO ABRIR O SHEET
  useEffect(() => {
    // Aqui você pode buscar os dados do usuário usando o idSelecionado
    console.log("ID recebido na Sheet:", usuario);
    //atualiza o usuario no sheet
    setUsuarioSelecionado(usuario);
    setIDUsuario(usuario.id);
  }, [usuario]);

  return (
    <>
      {/* Botão fora do <Sheet>, mas no mesmo componente */}

      {/* Sheet controlado localmente */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="top"
          className="bg-zinc-900 rounded-2xl w-full mt-2 sm:w-2/3  p-6 m-auto flex flex-col items-center justify-start  border-2"
        >
          <SheetClose asChild>
            <IoMdCloseCircleOutline
              className="absolute right-3 top-3 bg-orange-500 text-white hover:opacity-70 border  rounded cursor-pointer text-[32px]"
              aria-label="Fechar"
            />
          </SheetClose>

          <SheetHeader className="text-slate-200 w-full sm:w-1/2 ">
            <SheetTitle className="text-orange-400 font-bold  flex items-start justify-between gap-2">
              <span>Dados:</span>
            </SheetTitle>
          </SheetHeader>

          <form
            onSubmit={handleSalvar}
            className="flex flex-col gap-4 mt-4 text-md w-full sm:w-1/2"
          >
            <Input
              name="id"
              value={usuarioSelecionado.id || ""}
              readOnly
              className="text-black !text-md sm:!text-xl h-12 bg-zinc-800  rounded-md  hidden"
            />
            <Input
              ref={inputRef}
              name="nome"
              value={usuarioSelecionado.nome || ""}
              onChange={(e) =>
                setUsuarioSelecionado({
                  ...usuarioSelecionado,
                  nome: e.target.value.toUpperCase(),
                })
              }
              placeholder="Nome Completo"
              className="text-black bg-slate-200 border-2 border-orange-500 !text-md sm:!text-xl h-12  rounded-md w-full "
            />
            <input
              name="celular"
              placeholder="Celular com DDD"
              type="text"
              inputMode="numeric"
              maxLength={11}
              value={usuarioSelecionado.celular || ""}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
                setUsuarioSelecionado({
                  ...usuarioSelecionado,
                  celular: onlyNums,
                });
              }}
              className="text-black !text-md sm:!text-xl h-12 bg-slate-200 border-2 border-orange-500 p-2 rounded-md w-full"
            />
            <select
              className="text-black !text-md sm:!text-xl h-12 bg-slate-200 border-2 border-orange-500 p-2 rounded-md w-full"
              value={usuarioSelecionado?.nivel || ""}
              name="nivel"
              type="text"
              onChange={(e) =>
                setUsuarioSelecionado({
                  ...usuarioSelecionado,
                  nivel: parseInt(e.target.value),
                })
              }
            >
              <option value="" disabled></option>
              {/*Valores como Int como no Banco de Dados - value={2}*/}
              <option value={3}>Administrador</option>
              <option value={1}>Competidor</option>
              <option value={2}>Jurado</option>
            </select>

            <Button
              type="submit"
              className="hover:bg-blue-500 bg-blue-500 hover:opacity-50 text-white border font-bold text-md"
            >
              Salvar
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
