"use client";
import React, { useState } from "react";
import { excluirProduto } from "../actions";

export default function BotaoExcluir({
  id,
  carregarProdutos,
  setMessage,
  setMessageBG,
}) {
  const [loading, setLoading] = useState(false);

  const handleExcluir = async (event) => {
    event.preventDefault(); // Evita o comportamento padrão do formulário
    //Funções da page.js sendo usadas em um componente - Reutilização de Código
    setLoading(true);
    setMessageBG("bg-red-800");
    setMessage("Excluindo Produto");
    const id = event.target.value;
    console.log(id);
    const res = await excluirProduto(id);

    if (res.status) {
      carregarProdutos(); // Atualiza a listagem após a exclusão
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleExcluir}
      className="text-white p-2 bg-red-600 hover:bg-red-800 rounded"
      title="Excluir Produto"
      disabled={loading}
      value={id}
    >
      {loading ? "Excluindo..." : "Excluir"}
    </button>
  );
}
