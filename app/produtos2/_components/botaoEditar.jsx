"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { findProduto, updateProduto } from "../actions";
import { delay } from "@/lib/utils";

export default function BotaoEditar({ id, carregarProdutos }) {
  const [open, setOpen] = useState(false);
  const [produto, setProduto] = useState({
    descricao: "",
    qtd: "",
    fornecedor: "",
  });
  const handleOpen = async () => {
    const { status, produto } = await findProduto(id);
    if (status) {
      setProduto(produto);
      console.log(produto);
      delay(1000);
      setOpen(true);
    }
  };

  const handleSalvar = async () => {
    console.log(`Editando o produto ${produto.descricao} `);
    console.log(produto);
    const res = await updateProduto(produto);
    console.log(res);
    carregarProdutos();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          onClick={handleOpen}
          className="text-white  bg-orange-400 hover:opacity-70 py-6 rounded text-xl w-full font-bold"
        >
          Editar
        </Button>
      </SheetTrigger>

      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Editar Produto</SheetTitle>
        </SheetHeader>

        <div className="space-y-2">
          <label>Descrição</label>
          <input
            value={produto.descricao}
            onChange={(e) =>
              setProduto({ ...produto, descricao: e.target.value })
            }
            className="w-full border p-2 rounded text-black"
          />

          <label>Quantidade</label>
          <input
            type="number"
            value={produto.qtd}
            onChange={(e) => setProduto({ ...produto, qtd: e.target.value })}
            className="w-full border p-2 rounded text-black"
          />

          <label>Fornecedor</label>
          <input
            value={produto.fornecedor}
            onChange={(e) =>
              setProduto({ ...produto, fornecedor: e.target.value })
            }
            className="w-full border p-2 rounded text-black"
          />

          <Button
            onClick={handleSalvar}
            className="mt-4 w-full bg-green-600 hover:opacity-80"
          >
            Salvar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
