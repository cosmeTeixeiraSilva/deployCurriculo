"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { findProduto, updateProduto } from "../actions";


export default function BotaoEditar2({ id, carregarProdutos }) {
  const [open, setOpen] = useState(false);
  const [produto, setProduto] = useState({
    descricao: "",
    qtd: "",
    fornecedor: "",
  });

  const handleOpen = async () => {
    const { status, produto } = await findProduto(id);
    if (status) {
      setProduto({
        descricao: produto.descricao || "",
        qtd: produto.qtd || "",
        fornecedor: produto.fornecedor || "",
      });
     
      setOpen(true);
    }
  };

  const handleSalvar = async () => {
    const res = await updateProduto({ ...produto, id });
    carregarProdutos();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleOpen}
          className="text-white px-2 bg-blue-500   hover:opacity-70 rounded text-xl p-2"
        >
          Modal Editar
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
          <DialogDescription>
            Altere os campos abaixo e clique em <strong>Salvar</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <label>Descrição</label>
          <input
            value={produto.descricao}
            onChange={(e) =>
              setProduto({ ...produto, descricao: e.target.value })
            }
            className="w-full border px-2 rounded text-black"
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
        </div>

        <DialogFooter className="pt-4">
          <Button
            onClick={handleSalvar}
            className="bg-green-600 text-white hover:opacity-80"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
