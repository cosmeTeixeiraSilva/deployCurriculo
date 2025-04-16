"use client";

import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { criarUsuario, updateUsuario } from "@/app/_services/usersServices";
import { useRouter } from "next/navigation";

export default function SheetUsuario({ open, setOpen, usuario }) {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState({
    id: "",
    nome: "",
    celular: "",
    nivel: 0,
  });
  //para atualizar a rota
  const router = useRouter();

  const handleSalvar = async (e) => {
    e.preventDefault();
    //pegando os dados do lado do cliente e tratando
    const form = e.target;
    const formData = new FormData(form);
    const dados = Object.fromEntries(formData.entries());

    // Validando os dados no Frontend
    if (!dados.nome || !dados.celular || !dados.nivel) {
      window.alert("Favor preencher os 3 campos obrigatórios");
      return;
    }

    //console.log("Salvando...", dados);
    if (dados.id) {
      console.log(`Editando Registro ${dados.nome}`);
      const res = await updateUsuario(dados);
      console.log(res);
      if (res.status === true) {
        window.alert(res.message);
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
      console.log(res);
      if (res.status === true) {
        window.alert(res.message);
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
  }, [usuario]);

  return (
    <>
      {/* Botão fora do <Sheet>, mas no mesmo componente */}

      {/* Sheet controlado localmente */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="bg-zinc-900 border">
          <SheetClose asChild>
            <button
              className="absolute right-3 top-3 text-orange-400"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
          </SheetClose>

          <SheetHeader className="text-slate-200">
            <SheetTitle className="text-orange-400 font-bold">
              Usuário
            </SheetTitle>
            <SheetDescription>Edite os dados abaixo</SheetDescription>
          </SheetHeader>

          <form
            onSubmit={handleSalvar}
            className="flex flex-col gap-4 mt-4 text-md"
          >
            <Input
              name="id"
              value={usuarioSelecionado.id || ""}
              readOnly
              className="text-white text-md sm:text-xl h-12 bg-zinc-800 p-2 rounded-md w-full hidden"
            />
            <Input
              autoFocus
              name="nome"
              value={usuarioSelecionado.nome || ""}
              onChange={(e) =>
                setUsuarioSelecionado({
                  ...usuarioSelecionado,
                  nome: e.target.value.toUpperCase(),
                })
              }
              placeholder="Nome Completo"
              className="text-white text-md sm:text-xl h-12 bg-zinc-800 p-2 rounded-md w-full"
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
              className="text-white text-md sm:text-xl h-12 bg-zinc-800 p-2 rounded-md w-full"
            />
            <select
              className="text-white text-md sm:text-xl h-12 bg-zinc-800 p-2 rounded-md w-full"
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
              <option value="" disabled>
                Nível...
              </option>
              {/*Valores como Int como no Banco de Dados - value={2}*/}
              <option value={3}>Administrador</option>
              <option value={1}>Competidor</option>
              <option value={2}>Jurado</option>
            </select>

            <Button
              autoFocus
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
