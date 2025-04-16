"use client";
import { useState } from "react";
import Menu from "./_components/menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Header from "../_componentsGerais/header";
import { Input } from "@/components/ui/input";

export default function VotacaoJurado() {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState({
    nome: "",
    celular: "",
    outroCampo: "",
  });
  const [open, setOpen] = useState(false);

  async function buscarUsuario(id) {
    //const res = await fetch(`/api/usuarios?nome=${id}`);
    //const data = await res.json();
    //setUsuarioSelecionado(data);
    setOpen(true);
  }

  return (
    <div className="w-screen py-4 text-white   flex flex-col overflow-hidden ">
      <Menu />

      <Header />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="border-white border-2 m-4 text-white bg-blue-500 hover:bg-blue-500 hover:opacity-50 w-[80vw] sm:w-1/3
             mx-auto h-12 text-2xl font-bold"
          >
            Nova Competição
          </Button>
        </SheetTrigger>
        <hr className="text-slate-200 w-[80vw] mb-3 text-bold mx-auto" />
        <span className="text-xl text-center font-bold text-orange-400">
          Competições Cadastradas
        </span>
        <hr className="text-slate-200 w-[80vw] my-3 text-bold mx-auto" />
        <SheetContent
          side="right"
          className="bg-zinc-900 rounded-2xl h-[90%] sm:h-[60%] p-6 m-auto flex flex-col items-center justify-start"
        >
          <SheetClose asChild>
            <button
              className="absolute right-3 top-3 text-orange-400 hover:opacity-70 border-none outline-none focus:ring-0 focus:outline-none shadow-none"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
          </SheetClose>

          <SheetHeader className="text-start w-full">
            <hr className="mt-8" />
            <SheetTitle className="text-orange-400 text-2xl">
              Competição
            </SheetTitle>
            <SheetDescription className=" text-slate-200 flex w-full justify-start items-center text-2xl">
              Dados da Competição.
            </SheetDescription>
            <hr className="w-full" />
          </SheetHeader>
          <div className="w-full">
            <form className="flex flex-col gap-6">
              {/* Formulário de Cadastro User */}

              <Input
                placeholder="Nome Competição..."
                className="text-white  text-2xl h-12"
                value={usuarioSelecionado?.nome}
                onChange={(e) =>
                  setUsuarioSelecionado({
                    ...usuarioSelecionado,
                    nome: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Cidade"
                className="text-white text-2xl h-12"
                value={usuarioSelecionado?.nome}
                onChange={(e) =>
                  setUsuarioSelecionado({
                    ...usuarioSelecionado,
                    nome: e.target.value,
                  })
                }
              />
              <Input
                type="date"
                placeholder="Cidade"
                className="text-white text-2xl h-12"
              />

              <Button className="bg-blue-500 text-white h-12 text-2xl border-2 font-bold">
                Salvar
              </Button>
            </form>

            <SheetClose asChild>
              <Button
                autoFocus
                className="bg-orange-400 text-white border-2 h-12 text-2xl font-semibold w-full mt-6 hover:bg-orange-400 hover:opacity-50"
                onClick={() => setOpen(false)}
              >
                Fechar
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      {/* Lista de Usuários  */}
      <ul className="flex gap-y-3 flex-col text-xl sm:w-1/3 w-[90vw] mx-auto">
        <li className="flex items-center justify-between">
          <span>Cosme Teixeira Silva </span>{" "}
          <Button
            onClick={() => buscarUsuario("Cosme Teixeira Silva")}
            className="bg-orange-400 text-black font-semibold w-[60px] h-10 text-xl hover:bg-orange-400 hover:opacity-50"
          >
            Ver
          </Button>
        </li>
        <li className="flex items-center justify-between">
          <span>João Costa Silva</span>{" "}
          <Button
            onClick={() => buscarUsuario("Cosme Teixeira Silva")}
            className="bg-orange-400 text-black font-semibold w-[60px] h-12 text-xl hover:bg-orange-400 hover:opacity-50"
          >
            Ver
          </Button>
        </li>
        <li className="flex items-center justify-between">
          <span>Pablo Costa Rezende </span>{" "}
          <Button
            onClick={() => buscarUsuario("Cosme Teixeira Silva")}
            className="bg-orange-400 text-black font-semibold w-[60px] h-12 text-xl hover:bg-orange-400 hover:opacity-50"
          >
            Ver
          </Button>
        </li>
      </ul>
    </div>
  );
}
