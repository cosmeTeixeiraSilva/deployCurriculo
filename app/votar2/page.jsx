"use client";
import { useState } from "react";
import Menu from "./_components/menu";
import { Card, CardContent } from "@/components/ui/card";
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
import Image from "next/image";
import { X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import Header from "../_componentsGerais/header";
export default function VotacaoJurado() {
  const votos = [
    { quesito: "Criatividade", nota: 7 },
    { quesito: "Técnica", nota: 6 },
    { quesito: "Apresentação", nota: 8 },
    { quesito: "Inovação", nota: 7 },
    { quesito: "Sustentabilidade", nota: 8 },
    { quesito: "Tecnologias", nota: 6 },
    { quesito: "Originalidade", nota: 6 },
  ];

  // Adicione no topo do componente
  const [quesitoSelecionado, setQuesitoSelecionado] = useState(null);

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
      descricao: "Avalia o uso adequado e inteligente de tecnologias.",
    },
  };
  const total = votos.reduce((acc, v) => acc + v.nota, 0);

  const [nota, setNota] = useState([0]); // valor inicial
  //Função Registrar Nota

  async function handleRegistroNota(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dados = Object.fromEntries(formData.entries());

    //validando os dados no FrontEnd
    if (!dados.equipe || !dados.nota || !dados.quesito) {
      window.alert("Favor Preencher os 3 campos");
      return;
    }
    const fraseRegistro = `Nota Confirmada: \n\nEquipe: ${dados.equipe} \n\nQuesito: ${dados.quesito} \n\nNota: ${dados.nota}`;
    window.alert(fraseRegistro);
  }

  return (
    <div className="w-full    min-h-screen flex flex-col gap-y-4  ">
      <Menu />
      <Header />
      <form
        onSubmit={handleRegistroNota}
        className="flex flex-col gap-2  sm:p-0 w-[90vw] sm:w-1/2 mx-auto "
      >
        <label className="font-bold text-xl  text-orange-500">Equipe:</label>
        <select
          name="equipe"
          className=" text-blue-400 rounded px-3 py-2 text-xl border  bg-slate-200"
        >
          <option value={1}>Equipe 1</option>
          <option value={2}>Equipe 2</option>
          <option value={3}>Equipe 3</option>
          <option value={4}>Equipe 4</option>
          <option value={5}>Equipe 5</option>
          <option value={6}>Equipe 6</option>
          <option value={7}>Equipe 7</option>
          <option value={8}>Equipe 8</option>
          <option value={9}>Equipe 9</option>
          <option value={10}>Equipe 10</option>
          <option value={11}>Equipe 11</option>
          <option value={12}>Equipe 12</option>
        </select>

        <label className="font-bold  mt-2 text-orange-500 text-xl ">
          Quesito:
        </label>
        <div className="w-full flex items-center justify-between gap-x-4">
          <select
            name="quesito"
            className="bg-zinc-900 rounded px-2 py-2 text-md border w-[70vw]"
          >
            <option value={1}>Clareza na Apresentação</option>
            <option value={2}>Original e Criativa</option>
            <option value={3}>Trabalho em Equipe</option>
            <option value={4}>Nível de Inovação</option>
            <option value={5}>Consciência Sustentável</option>
            <option value={6}>Impacto Social</option>
            <option value={7}>Uso de Tecnologias</option>
          </select>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="w-[20vw] bg-blue-600 hover:bg-blue-600 hover:opacity-50 text-sm"
                type="button"
                onClick={() => {
                  const select = document.querySelector("select[name=quesito]");
                  setQuesitoSelecionado(detalhesQuesitos[select.value]);
                }}
              >
                Detalhes
              </Button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="p-6 bg-zinc-900 flex flex-col items-center justify-center"
            >
              <SheetHeader className="text-start w-full sm:w-1/2 border p-2 sm:p-4 rounded">
                <SheetTitle className="text-orange-500 text-xl font-bold">
                  {quesitoSelecionado?.nome}
                </SheetTitle>
                <SheetDescription className="text-white mt-2">
                  {quesitoSelecionado?.descricao}
                </SheetDescription>
              </SheetHeader>
              <SheetClose asChild>
                <Button
                  autoFocus
                  className="mt-4 bg-orange-500 text-white w-full sm:w-1/2 p-2 font-bold border-2 text-md hover:bg-orange-500 hover:opacity-50"
                >
                  Fechar
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex  items-center justify-between mt-4 bg-[#121212]">
          <label className="text-5xl  text-orange-500 font-bold mt-2 w-1/2">
            Nota:
          </label>
          <div className="bg-slate-200 text-orange-500 py-1 w-1/2 rounded text-5xl  font-bold border-2 text-center border-orange-500 h-16">
            {nota[0]}
          </div>
        </div>

        <Slider
          name="nota"
          min={0}
          max={10}
          step={1}
          defaultValue={[0]}
          value={nota}
          onValueChange={setNota}
          className="
    [&_[role=slider]]:bg-orange-500
    [&_[role=slider]]:h-8
    [&_[role=slider]]:w-8
    [&_[data-part=track]]:bg-neutral-300
    [&_[data-part=range]]:bg-orange-500
    mt-6 bg-white rounded"
        />

        <Button
          type="submit"
          className=" text-xl font-bold  bg-orange-500 hover:opacity-50 hover:bg-orange-500 text-white w-full mt-6 border-2 mx-auto h-12"
        >
          Confirmar
        </Button>
      </form>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="text-xl sm:text-xl border-white border-2 mt-2 h-12 text-white bg-blue-500 hover:bg-blue-500 hover:opacity-50 w-[90vw] sm:w-[50vw] mx-auto font-bold"
          >
            Notas Registradas
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="bg-zinc-900 rounded-2xl  p-6 m-auto flex flex-col items-center justify-start  border-2"
        >
          <SheetClose asChild>
            <button
              className="absolute right-3 top-3 text-orange-400 hover:opacity-70 border-none outline-none focus:ring-0 focus:outline-none shadow-none "
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
          </SheetClose>

          <SheetHeader className="w-full mt-1">
            <SheetTitle className="text-slate-200 text-sm font-bold text-start">
              Resumo de Notas.
            </SheetTitle>
            <SheetDescription className="text-slate-200 font-bold text-sm w-full text-end">
              <p className="text-sm text-end font-bold  text-orange-400">
                {total} pontos em {votos.length} quesitos
              </p>
            </SheetDescription>
          </SheetHeader>
          <div className="w-full">
            <Card className="p-1 space-y-3 bg-transparent w-full border-0">
              {votos.map((v, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border p-2 rounded"
                >
                  <div className="text-sm font-bold text-slate-200">
                    <p>{v.quesito}</p>
                    <p className="text-orange-400">Nota: {v.nota}</p>
                  </div>
                  <button className="text-sm text-red-600 hover:opacity-50 hover:cursor-pointer border-2 border-red-600 px-3 py-1 rounded">
                    Excluir
                  </button>
                </div>
              ))}
            </Card>

            <Button
              autoFocus
              className="bg-red-800 text-white font-bold text-sm w-full mt-4 border-2 hover:bg-red-800 hover:opacity-50"
            >
              Excluir todas Notas
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
