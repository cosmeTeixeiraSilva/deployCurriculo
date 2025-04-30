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
import { Button } from "@/components/ui/button";

export default function DetalhesSheet() {
  const detalhesQuesitos = {
    1: {
      nome: "Apresentação.",
      descricao:
        "Narrativa/Storytelling, capacidade de vender o negócio, percepção de conhecimento do mercado, convicção e motivação do apresentador, desing da apresentação e velocidade da fala.",
    },
    2: {
      nome: "Aplicabilidade/Exequibilidade.",
      descricao:
        "A solução inovadora possui potencial de aplicabilidade e/ou commercialização no comércio de bens, serviços e turismo?",
    },
    3: {
      nome: "Clareza das Informações.",
      descricao: "Definição do negócio e seu diferencial, descrição clara do problema, solução endereçada ao problema e definição de mercado.",
    },
    4: {
      nome: "Potencial Inovador.",
      descricao: "Nível de novidade ou aperfeiçoamento que resulte em melhorias em processos, produtos ou serviços.",
    },
    5: {
      nome: "Viabilidade Técnica.",
      descricao: "A solução apresentada é tecnicamente viável?",
    }

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
   

        <SheetHeader className="text-start w-full sm:w-1/2 sm:p-4">
          <SheetTitle className="text-orange-500 text-sm font-bold">
            {quesitoSelecionado?.nome}
          </SheetTitle>
          <SheetDescription className="text-white mt-2 text-sm text-justify">
            {quesitoSelecionado?.descricao}
          </SheetDescription>
        </SheetHeader>
        <SheetClose asChild>
          <Button
            className="bg-orange-500 text-white hover:opacity-70 border rounded cursor-pointer text-xl"
            aria-label="Fechar"

          >Fechar</Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
