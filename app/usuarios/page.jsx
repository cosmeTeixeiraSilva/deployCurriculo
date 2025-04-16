"use client";
import { useRouter } from "next/navigation";
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
import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Header from "../_componentsGerais/header";
import { Input } from "@/components/ui/input";
import {
  criarUsuario,
  findUsuario,
  listarUsuarios,
  updateUsuario,
} from "../_services/usersServices";

import ListagemUsuarios from "./_components/listausuarios";
import Btnexcluir from "./_components/btnexcluir";
export default function VotacaoJurado() {
  //para Atualizações
  const router = useRouter();
  //Editar Usuário
  const [usuarioSelecionado, setUsuarioSelecionado] = useState({
    nome: "",
    celular: "",
    nivel: 0,
  });
  //Controla o Sheet
  const [open, setOpen] = useState(false);
  //Controla o objeto de Usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [idSelecionado, setIdSelecionando] = useState(null);
  //carregando lista atualizada
  async function carregarUsuarios() {
    const res = await listarUsuarios();
    if (res.success) {
      setUsuarios(res.data); // atualiza estado com os usuários do backend
    } else {
      console.error("Erro ao listar usuários:", res.message);
    }
  }
  //atualiza os dados quando a pagina é requisitada
  useEffect(() => {
    carregarUsuarios(); // carrega ao abrir a página
  }, []);

  async function handleSalvar(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dados = Object.fromEntries(formData.entries());
    //validando os dados no FrontEnd
    if (!dados.nome || !dados.celular || !dados.nivel) {
      window.alert("Favor Preencher os 3 campos");
      return;
    }

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
        nome: "",
        celular: "",
        outroCampo: "",
      });
      console.log(res);
      if (res.status === true) {
        window.alert(res.message);
      }
    }
    await carregarUsuarios(); // Recarrega a lista
    //router.refresh();
    setOpen(false);
  }
  async function AbrirSheet(id) {
    setIdSelecionando(id);
    //Antes de Abrir o sheet verifica se tem um ID selecionado
    if (id) {
      setIdSelecionando(id);
      const res = await findUsuario(id);
      console.log(res);
      if (res.usuario) {
        setUsuarioSelecionado(res.usuario);
        console.log("O usuário selecionado foi:");
        console.log(usuarioSelecionado);
      }
      console.log(id);
    } else {
      console.log("sem ID para Buscar no Sheet...");
    }
    setOpen(true);
  }

  // O useEffect abaixo Carrega os produtos ao abrir a página
  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <div className="w-screen py-4 text-white  flex flex-col mx-auto overflow-hidden bg-[#121212] ">
      <Menu />

      <Header />
      <Button
        variant="outline"
        onClick={() => {
          setIdSelecionando(null); // limpa ID, se for criar novo
          setUsuarioSelecionado({ nome: "", celular: "", nivel: "" }); // limpa dados
          setOpen(true); // abre o Sheet
        }}
        className="border-white border-2 m-4 text-white bg-blue-500
    hover:bg-blue-500 hover:opacity-50 w-[90vw] sm:w-1/3 mx-auto text-2xl h-12 font-bold"
      >
        Novo Usuário
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <hr className="text-slate-200 w-[90vw] mb-3 text-bold mx-auto" />
        <span className="text-md sm:text-xl text-center font-bold ">
          Usuários Cadastrados
        </span>
        <hr className="text-slate-200 w-[90vw] my-3 text-bold mx-auto" />
        <SheetContent
          side="right"
          className="bg-zinc-900 rounded-2xl h-[90%] sm:h-[60%] p-6 m-auto flex flex-col items-center justify-start border-2"
        >
          <SheetClose asChild>
            <button
              className="absolute right-3 top-3 text-orange-400 hover:opacity-70 border-none outline-none focus:ring-0 focus:outline-none shadow-none"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
          </SheetClose>

          <SheetHeader className="text-start w-full ">
            <hr className="mt-8" />
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <SheetTitle className="text-orange-400 text-xl sm:text-xl">
                  Usuário
                </SheetTitle>
                <SheetDescription className=" text-slate-200 flex w-full justify-start items-center text-md sm:text-xl">
                  Dados do Usuário
                </SheetDescription>
              </div>
              <Btnexcluir id={idSelecionado} setOpen={setOpen} />
            </div>
            <hr className="w-full" />
          </SheetHeader>
          <div className="w-full">
            <form
              onSubmit={handleSalvar}
              className="flex flex-col gap-6 text-xl"
            >
              {/* Formulário de Cadastro User */}
              <Input
                className="text-white text-md sm:text-xl h-12 bg-zinc-800 p-2 rounded-md w-full hidden"
                name="id"
                type="text"
                defaultValue={usuarioSelecionado?.id || ""}
              />

              <Input
                placeholder="Nome Usuário..."
                className="text-white text-md sm:text-xl h-12  bg-zinc-800 p-2 rounded-md w-full"
                name="nome"
                autoFocus
                type="text"
                value={usuarioSelecionado?.nome}
                onChange={(e) =>
                  setUsuarioSelecionado({
                    ...usuarioSelecionado,
                    nome: e.target.value.toUpperCase(),
                  })
                }
              />
              <Input
                placeholder="Celular Usuário..."
                name="celular"
                type="number"
                value={usuarioSelecionado?.celular || ""}
                className="text-white text-md sm:text-xl h-12 bg-zinc-800 p-2 rounded-md w-full"
                onChange={(e) =>
                  setUsuarioSelecionado({
                    ...usuarioSelecionado,
                    celular: e.target.value,
                  })
                }
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
              <hr className="w-full" />
              <Button
                type="submit"
                className="bg-blue-500 text-white border-2 text-md sm:text-xl h-12 hover:bg-blue-500 hover:opacity-50"
              >
                Salvar
              </Button>
            </form>

            {/*<SheetClose asChild>
              <Button
                autoFocus
                className="bg-orange-400 text-white border-2 text-md sm:text-xl h-12 font-semibold w-full mt-6 hover:bg-orange-400 hover:opacity-50"
                onClick={() => setOpen(false)}
              >
                Fechar
              </Button>
            </SheetClose> */}
          </div>
        </SheetContent>
      </Sheet>

      {/* Lista de Usuários  */}
      <ListagemUsuarios usuarios={usuarios} abrirSheet={AbrirSheet} />
    </div>
  );
}
