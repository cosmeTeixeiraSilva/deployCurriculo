"use client"; // Agora esse componente é interativo

import { atualizarTarefa, excluirTarefa } from "../actions";
import { FaRegTrashCan } from "react-icons/fa6";
import BotaoEditar from "./botaoEditar";
import { useState } from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import BotaoExcluir from "./botaoExcluir";

export default function CardProdutos({ produtos, carregarProdutos }) {
  return (
    <>
      {produtos.map((produto) => (
        <Card
          key={produto.id}
          className="my-4 w-[85vw] border-4 border-orange-400"
        >
          <CardTitle className="p-2 text-start text-xl mt-1">
            Fornecedor(a): <p className="text-blue-500">{produto.fornecedor}</p>
          </CardTitle>

          <CardHeader className="p-2 text-start text-xl mt-1">
            Produto: <p className="text-blue-500">{produto.descricao}</p>
          </CardHeader>

          <CardContent className="p-2 text-start text-xl mt-1">
            Quantidade:
            <p className="text-blue-500">{produto.qtd} unidade(s)</p>
          </CardContent>

          <CardFooter className=" p-2 flex justify-around gap-x-2 flex-col">
            <BotaoEditar id={produto.id} carregarProdutos={carregarProdutos} />

            <BotaoExcluir id={produto.id} carregarProdutos={carregarProdutos} />
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
