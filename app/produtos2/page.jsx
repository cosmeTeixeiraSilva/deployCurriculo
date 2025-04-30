"use client"; // Garante que o código roda no lado do cliente
import { useState, useEffect } from "react";
import { criarProduto, ListarProdutos } from "./actions";
import ListagemProdutos from "./_components/listaProdutos";
import Mobile from "@/lib/utils";
import Link from "next/link";
import MenuPrincipal from "@/app/produtos2/_components/menu";
import CardProdutos from "./_components/cardProdutos";

export default function Page() {
  const [produtos, setProdutos] = useState([]);

  const carregarProdutos = async () => {
    const { produtos } = await ListarProdutos();
    if (produtos.length > 0) {
      setProdutos(produtos);
    } else {
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
    //Chamando a Server Action para Registrar o produto no Banco de Dados no arquivo action.js
    const res = await criarProduto(formData);
    // Reseta os campos do formulário
    event.target.reset();
    carregarProdutos();
  };

  return (
    <div>
      <MenuPrincipal />
      <p className="text-md m-4 text-slate-200 font-semibold">
        App Gestão Produto.
      </p>
      <div className="flex items-center justify-center flex-col">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center justify-center bg-[#121212] w-[85vw] p-4 mt-4 rounded border-4 border-orange-400"
        >
          <h2 className="text-lg font-bold text-orange-400">
            Cadastrando Produto:
          </h2>

          <input
            type="text"
            name="descricao"
            placeholder="Descrição Curta do Produto..."
            required
            className="p-2 rounded text-black border border-black w-full text-sm"
          />
          <input
            type="text"
            name="qtd"
            placeholder="Quantidade de Entrada..."
            required
            className="p-2 rounded text-black border border-black w-full text-sm"
          />
          <input
            type="text"
            name="fornecedor"
            placeholder="Fornecedor do Produto..."
            required
            className="p-2 rounded text-black border border-black w-full text-sm"
          />

          {/* Botão  */}
          <button
            type="submit"
            name="actionType"
            value="produto1"
            className={`bg-blue-600 p-3 rounded w-full text-bold  text-white font-bold text-xl hover:opacity-55 `}
          >
            Adicionar
          </button>
        </form>
        {Mobile ? (
          <CardProdutos
            produtos={produtos}
            carregarProdutos={carregarProdutos}
          />
        ) : (
          <ListagemProdutos
            produtos={produtos}
            carregarProdutos={carregarProdutos}
          />
        )}
      </div>
    </div>
  );
}
