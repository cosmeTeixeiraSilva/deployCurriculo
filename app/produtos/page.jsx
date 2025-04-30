"use client"; // Garante que o código roda no lado do cliente
import { useState, useEffect } from "react";
import { criarProduto, ListarProdutos } from "./actions";
import ListagemProdutos from "./_components/listaProdutos";
import { delay } from "@/lib/utils";

import MenuPrincipal from "@/app/produtos2/_components/menu";

export default function Page() {
  const [message, setMessage] = useState("Meus Produtos Cadastrados");
  const [messageBG, setMessageBG] = useState("bg-green-500");
  const [produtos, setProdutos] = useState([]);
  const [msg, setMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [btnOpacity, setbtnOpacity] = useState("opacity-100");

  const carregarProdutos = async () => {
    await delay(1500); // Espera 3 segundos antes de carregar os dados
    const { produtos } = await ListarProdutos();
    if (produtos.length > 0) {
      setProdutos(produtos);
      console.log("Tem Produtos na Tabela");
      setMsg(true);
      setLoading2(false);
    } else {
      console.log("Não tem Produtos na Tabela");
      setMsg(false);
      setProdutos([]);
    }
  };
  // O useEffect abaixo Carrega os produtos ao abrir a página
  useEffect(() => {
    carregarProdutos();
  }, []);

  //Função executada quando clica no botão
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne recarregar a página automaticamente
    const formData = new FormData(event.target);
    const qtd = formData.get("qtd");

    //verificando se foi inserido um número na input
    if (!Number(qtd)) {
      setMessageBG("bg-red-800");
      setMessage("Campo quantidade deve ser numérico.");
      return;
    } else {
      setMessageBG("bg-green-500");
    }
    setLoading(true);
    setbtnOpacity("opacity-50");
    //Trocando a mensagem na tela
    setMessage("Processando requisição...");

    //Chamando a Server Action para Registrar o produto no Banco de Dados no arquivo action.js
    const res = await criarProduto(formData);

    //Verificando o retorno da Server Action que fica no arquivo actions.js
    if (res.status === true) {
      console.log(res.message);
      setMessage(res.message);
      // Atualiza a lista de produtos após adicionar
      carregarProdutos();
      // Simulando o atraso de 3 segundos - crie a função delay em ./lib/utils.js na raiz do projeto
      await delay(2000);
      setLoading(false);
      setbtnOpacity("opacity-100");
    }
    // Reseta os campos do formulário
    event.target.reset();
  };

  // Função que faz  a mensagem sumir após 3 segundos
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("Meus Produtos Cadastrados"); // Limpa a mensagem após 3 segundos
        setMessageBG("bg-green-500");
      }, 2000);

      return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
    }
  }, [message]);

  return (
    <>
      <MenuPrincipal />
      <div className="w-full m-auto flex items-center justify-center flex-col">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center justify-center bg-white w-1/3 p-4 mt-16 rounded"
        >
          <h2 className="text-lg font-bold">Cadastrando Produto:</h2>

          <input
            type="text"
            name="descricao"
            placeholder="Descrição Curta do Produto..."
            required
            className="p-2 rounded text-black border border-black w-full"
          />
          <input
            type="text"
            name="qtd"
            placeholder="Quantidade de Entrada..."
            required
            className="p-2 rounded text-black border border-black w-full"
          />
          <input
            type="text"
            name="fornecedor"
            placeholder="Fornecedor do Produto..."
            required
            className="p-2 rounded text-black border border-black w-full"
          />

          {/* Botão  */}
          <button
            type="submit"
            name="actionType"
            value="produto1"
            disabled={loading}
            className={`bg-orange-500 p-2 rounded w-full text-bold text-sm text-white font-bold sm:text-xl hover:opacity-55 ${btnOpacity}`}
          >
            Adicionar Produto.
          </button>
        </form>

        {/* Mensagem de sucesso/erro */}
        {message && (
          <h1
            className={`text-white text-center text-xl font-semibold mt-8 p-4 border border-white rounded w-1/3 ${messageBG}`}
          >
            {message}
          </h1>
        )}
        {/* Suspense para carregar os produtos */}
        {loading2 ? (
          <p className="text-white text-xl">Carregando produtos...</p>
        ) : (
          <ListagemProdutos
            produtos={produtos}
            carregarProdutos={carregarProdutos}
            setMessage={setMessage}
            setMessageBG={setMessageBG}
          />
        )}

        <h1 className="text-white text-xl mt-4">{msg ? "" : "Aguarde...."}</h1>
      </div>
    </>
  );
}
