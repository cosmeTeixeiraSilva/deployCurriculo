"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import Header from "../_componentsGerais/header";
import { VotosSheet } from "./_components/sheetVotos";
import DetalhesSheet from "./_components/sheetDetalhes";

import Image from "next/image";
import { validarToken } from "../_services/authServices";
import { useToast } from "@/hooks/use-toast";
import { votar, listarQuesitosNaoVotados } from "../_services/votarServices";
import { useRouter } from "next/navigation";

export default function VotacaoJurado() {
  const [nota, setNota] = useState([0]); // valor inicial
  const [idJurado, setidJurado] = useState();
  const [idCompetidor, setCompetidor] = useState(1);
  const [quesitos, setQuesitos] = useState([]);
  const [quesitoSelecionado, setQuesitoSelecionado] = useState("");
  const { toast } = useToast(); // aqui pega a função

  //Buscar ID Jurado no Token
  useEffect(() => {
    const checkAuth = async () => {
      const resultado = await validarToken();
      //console.log("Resultado da validação:", resultado);

      if (!resultado.status) {
        router.push("/login"); // redireciona se não autenticado
      } else {
        //liberando o acesso e pega o ID do Jurado
        //console.log(resultado.usuario.id);

        setidJurado(resultado.usuario.id);
        console.log("1 Effect:");
        console.log(resultado.usuario.id);
        setAutorizado(true);
        handleAtualizaQuesitos(resultado.usuario.id, idCompetidor);
      }
      // SEMPRE parar o loading, mesmo se não autorizado
      setLoading(false);
    };

    checkAuth();
  }, []);
  // Carrega os quesitos ao montar o componente
  useEffect(() => {
    if (idJurado && idCompetidor) {
      handleAtualizaQuesitos(idJurado, idCompetidor);
    }
  }, [idJurado, idCompetidor]);

  //funcao atualiza Quesitos
  async function handleAtualizaQuesitos(juradoId, competidorId) {
    try {
      const res = await listarQuesitosNaoVotados({
        idJurado: juradoId,
        idCompetidor: competidorId,
      });
      const data = res.data;
      setQuesitos(data);
      console.log("Quesitos não votados", data);
    } catch (error) {
      console.error("Erro ao carregar quesitos:", error);
    }
  }

  //trocaEquipe
  function handleTrocaEquipe(idJurado, equipe) {
    setCompetidor(equipe);
    if (idJurado && equipe) {
      handleAtualizaQuesitos(idJurado, equipe);
      //atualiza a rota
      router.refresh();
    }
  }

  //Função Registrar Nota

  async function handleRegistroNota(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const dados = Object.fromEntries(formData.entries());
    dados.idJurado = idJurado;
    console.log(idJurado);
    // Verificando se todos os campos obrigatórios estão preenchidos
    if (!dados.competidor || !dados.nota || !dados.quesito || !dados.idJurado) {
      toast({
        title: "Alerta!",
        description: `Selecione todos os campos (Equipe e Quesito) por favor`,
        variant: "destructive",
        duration: 3000,
      });
      //await delay(1000);
      return; // importante: para a execução aqui
    }

    try {
      const res = await votar(dados);
      if (res.status === true) {
        toast({
          title: "Sucesso!",
          description: res.message,
          variant: "default",
          duration: 3000,
        });
        //atualiza a rota
        handleAtualizaQuesitos(idJurado, idCompetidor);
        setQuesitoSelecionado("");
      } else {
        toast({
          title: "Alerta!",
          description: res.message,
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Erro!",
        description: `Erro ao tentar gravar nota...${error}`,
        variant: "destructive",
        duration: 3000,
      });
    }

    setNota([0]);
  }

  //verifica autenticado
  const router = useRouter();
  const [autorizado, setAutorizado] = useState(false);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center  w-full bg-[#121212] text-[#F7941D] text-md overflow-hidden">
        <Image
          src={"/semanaS.svg"}
          alt="semanaS"
          width={150}
          height={150}
          className="mb-4" // Adicionando drop-shadow-2xl
        />
        <span>Validando acesso</span>
        <span>Aguarde por favor...</span>
        <span className="mt-4 animate-spin inline-block w-8 h-8 border-2 border-t-transparent border-[#F7941D] rounded-full" />
      </div>
    );
  }

  if (!autorizado) {
    return null; // ou uma tela de bloqueio temporária
  }

  return (
    <div className="sm:w-2/3 w-screen  text-white bg-[#121212] min-h-screen flex flex-col gap-y-2 mx-auto">
      <Header />
      <form
        onSubmit={handleRegistroNota}
        className="flex flex-col gap-2  sm:p-0 w-[90vw] sm:w-2/3 mx-auto  "
      >
        <label className="font-bold text-xl  text-[#F7941D]">Equipe:</label>
        <select
          name="competidor"
          className="bg-slate-200 text-blue-700 rounded px-3 py-2 text-md border-2 border-[#F7941D] "
          onChange={(e) =>
            handleTrocaEquipe(idJurado, parseInt(e.target.value))
          }
          value={idCompetidor}
        >
          <option value="">Selecione uma equipe</option>
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

        <label className="font-bold  mt-2 text-[#F7941D] text-xl ">
          Quesito:
        </label>
        <div className="w-full flex items-center justify-between gap-x-4">
          <select
            name="quesito"
            value={quesitoSelecionado}
            onChange={(e) => setQuesitoSelecionado(e.target.value)}
            className="bg-slate-200 text-md text-blue-700 rounded px-2 py-2 text-md border-2 border-[#F7941D] w-[70vw]"
          >
            <option value="">Selecione um quesito</option>
            {Array.isArray(quesitos) &&
              quesitos.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.titulo}
                </option>
              ))}
          </select>
          <DetalhesSheet />
        </div>
        <div className="flex  items-center justify-between mt-4 bg-[#121212]">
          <label className="text-5xl  text-[#F7941D] font-bold mt-2 w-1/2">
            Nota:
          </label>
          <div className="bg-slate-200 text-[#F7941D] py-1 w-1/2 rounded text-5xl  font-bold border-2 text-center border-bg-[#F7941D] h-16">
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
    [&_[role=slider]]:bg-[#F7941D]
    [&_[role=slider]]:h-8
    [&_[role=slider]]:w-8
    [&_[data-part=track]]:bg-neutral-300
    [&_[data-part=range]]:bg-[#F7941D]
    mt-6 bg-white rounded"
        />
        <div className="flex items-center justify-between mt-8 flex-col sm:flex-row gap-6">
          <Button
            type="submit"
            className=" text-xl font-bold  bg-[#F7941D] hover:opacity-50 hover:bg-[#F7941D] text-white w-[90vw] sm:w-1/2  border-2  h-12"
          >
            Registrar Nota
          </Button>
          <VotosSheet
            idJurado={idJurado}
            idCompetidor={idCompetidor}
            atualizarQuesitos={handleAtualizaQuesitos}
          />
        </div>
      </form>
    </div>
  );
}
