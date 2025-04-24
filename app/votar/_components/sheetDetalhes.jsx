"use client";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";

import { useState, useRef } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useToast } from "@/hooks/use-toast";

export default function DetalhesSheet() {
  const detalhesQuesitos = {
    1: {
      nome: "Clareza na Apresentação",
      descricao:
        "Avalia o quão clara e compreensível foi a apresentação do projeto.",
    },
    2: {
      nome: "Original e Criativa",
      descricao:
        "Verifica se a ideia apresentada é inovadora e criativa, comparativo com soluções existentes e concorrentes ",
    },
    3: {
      nome: "Trabalho em Equipe",
      descricao: "Observa a colaboração entre os membros da equipe.",
    },
    4: {
      nome: "Nível de Inovação",
      descricao: "Mede o grau de inovação no projeto.",
    },
    5: {
      nome: "Consciência Sustentável",
      descricao: "Avalia se o projeto considera impactos ambientais.",
    },
    6: {
      nome: "Impacto Social",
      descricao: "Verifica o potencial de impacto social do projeto.",
    },
    7: {
      nome: "Uso de Tecnologias",
      descricao:
        "Avalia o uso adequado e inteligente de tecnologias (IA/Programação/Recursos Digitais).",
    },
  };

  const [quesitoSelecionado, setQuesitoSelecionado] = useState(null);
  const botaoRef = useRef();
  const { toast } = useToast(); // aqui pega a função
  const handleAbrirSheet = (e) => {
    const select = document.querySelector("select[name=quesito]");
    const valorSelecionado = select?.value;

    if (!valorSelecionado || !detalhesQuesitos[valorSelecionado]) {
      e.preventDefault(); // impede a abertura do Sheet
      toast({
        title: "Alerta!",
        description: `Por favor, selecione um quesito antes de abrir os detalhes.`,
        variant: "destructive",
        duration: 3000,
      });

      return;
    }

    setQuesitoSelecionado(detalhesQuesitos[valorSelecionado]);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          onClick={handleAbrirSheet}
          ref={botaoRef}
          title="Ver Detalhes do Quesito"
        >
          <MdOutlineRemoveRedEye
            size={52}
            className="hover:opacity-50 text-orange-500"
          />
        </button>
      </SheetTrigger>

      <SheetContent
        side="top"
        className="bg-zinc-900 rounded-xl w-full mt-2 sm:w-2/3 p-6 m-auto flex flex-col items-center justify-start border-2"
      >
        <SheetClose asChild>
          <IoMdCloseCircleOutline
            className="absolute right-3 top-3 bg-orange-500 text-white hover:opacity-70 border rounded cursor-pointer text-[32px]"
            aria-label="Fechar"
          />
        </SheetClose>

        <SheetHeader className="text-start w-full sm:w-1/2 sm:p-4">
          <SheetTitle className="text-orange-500 text-sm font-bold">
            {quesitoSelecionado?.nome}
          </SheetTitle>
          <SheetDescription className="text-white mt-2 text-sm text-justify">
            {quesitoSelecionado?.descricao}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
