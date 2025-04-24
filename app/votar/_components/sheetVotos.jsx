"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { listarVotos, deletarVoto } from "@/app/_services/votarServices";

export function VotosSheet({ idJurado, idCompetidor, atualizarQuesitos }) {
  //array de votos
  const [votos, setVotos] = useState([]);
  const [idjurado, setIdJurado] = useState();
  //controla a abertura do Sheet
  const [open, setOpen] = useState(false);
  //para atualizar a rota
  const router = useRouter();
  const buscaVotos = async () => {
    //mostrando no console
    //console.log(idJurado);
    setVotos([]); //zerando o array de votos quando abre
    setIdJurado(idJurado);
    //console.log(idCompetidor);

    const resultado = await listarVotos({ idJurado, idCompetidor });
    if (resultado.status) {
      setVotos(resultado.result);
    }
  };
  //excluir voto lançado
  // excluir voto lançado
  const excluirvoto = async (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este voto?"
    );

    if (!confirmar) return; // cancela a ação se o usuário não confirmar

    console.log("ID do voto a excluir:", id);

    const resultado = await deletarVoto({ id });

    if (resultado.status) {
      window.alert(resultado.message);
      buscaVotos(); // recarrega os votos atualizados
      //atualiza os quesitos por props
      atualizarQuesitos(idJurado, idCompetidor);
      //Fechar o Sheet apos a exclusão
      setOpen(false);
    } else {
      window.alert("Erro: " + resultado.message);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          onClick={buscaVotos}
          className="text-xl sm:text-xl border-white px-4 border-2 h-12 text-white bg-[#004A8D] hover:bg-[#004A8D] hover:opacity-50 w-[90vw] sm:w-1/2  font-bold"
        >
          Notas Lançadas
        </Button>
      </SheetTrigger>

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
        <SheetHeader className="w-full mt-1">
          <SheetTitle className="text-slate-200 text-sm font-bold text-start">
            Notas Equipe: {idCompetidor}.
          </SheetTitle>
          <SheetDescription className="text-slate-200 font-bold text-sm w-full text-end" />
        </SheetHeader>

        <div className="w-full flex flex-col items-center justify-center">
          <Card className="p-1 space-y-3 bg-transparent w-full border-0">
            {votos.map((v, i) => (
              <div
                key={i}
                className="flex justify-between items-center border p-2 rounded"
              >
                <div className="text-sm font-bold text-slate-200 flex flex-col items-start">
                  <span>{v.quesito.titulo}</span>
                  <span className="text-orange-400">Nota: {v.voto}</span>
                </div>
                <FaRegTrashAlt
                  className=" font-bold text-red-600 hover:opacity-50 hover:cursor-pointer px-3 py-1 rounded"
                  size={52}
                  onClick={() => excluirvoto(v.id)}
                />
              </div>
            ))}
          </Card>

          <div className="flex flex-col items-end w-full">
            <Button className="bg-red-800 w-[90vw] sm:w-1/3    text-white font-bold text-sm mt-4 border-2 hover:bg-red-800 hover:opacity-50">
              Excluir todas Notas
            </Button>
            <span className="text-red-500 mt-4 text-end w-full text-sm mr-8">
              {idjurado}
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
