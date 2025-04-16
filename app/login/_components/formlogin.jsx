"use client";
import React, { useState } from "react";
import { Autenticando } from "../../_services/authServices";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/autContext";

export default function Formlogin() {
  const { login } = useAuth();
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const res = await Autenticando(formData);

    if (res.ok) {
      login(res.user); // <-- aqui corrigido
      window.location.href = "/home";
    } else {
      alert(res.message);
    }

    console.log("Resposta do login:", res);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center space-y-4 w-[90vw]   sm:w-1/2  bg-[#121212]"
    >
      <input
        type="text"
        name="user"
        placeholder="Usuário..."
        value={user}
        onChange={(e) => setUser(e.target.value.toLowerCase().trim())}
        autoFocus
        className="rounded p-2 w-full sm:w-1/2 text-blue-500  text-xl h-12"
      />
      <input
        type="password"
        name="senha"
        placeholder="Senha..."
        value={senha}
        onChange={(e) => setSenha(e.target.value.toLowerCase().trim())}
        className="rounded p-2 w-full sm:w-1/2 text-blue-500 text-xl h-12"
      />

      <Button
        autoFocus
        type="submit"
        className="rounded p-2 bg-blue-500 w-full sm:w-1/2 font-bold  text-white text-xl h-12 hover:cursor-pointer hover:opacity-50 hover:bg-orange-400 border-2 "
      >
        Entrar
      </Button>
    </form>
  );
}
