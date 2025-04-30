"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { autenticarUsuario } from "@/app/_services/authServices";
import { Button } from "@/components/ui/button"; // Ajuste se você tiver outro botão
import { useToast } from "@/hooks/use-toast";

export default function Formlogin() {
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [autenticando, setAutenticando] = useState(false);
  const router = useRouter();
  const { toast } = useToast(); // aqui pega a função
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setAutenticando(true);
    const form = event.target;
    const formData = new FormData(form);
    const dados = Object.fromEntries(formData.entries());
    const result = await autenticarUsuario(dados);
   
    //retorno da Server Action de Login
    if (result.error) {
      console.log(result.error);
      toast({
        title: "Alerta!",
        description: result.error,
        variant: "destructive",
        duration: 3000,
      });

      setAutenticando(false);
      router.refresh();     // Só então atualiza os dados
  
    } else {
      router.push("/home");
    }
    
    
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center space-y-6 w-screen sm:w-1/2 mx-auto"
    >
  
      <input
        type="text"
        name="user"
        placeholder="Usuário..."
        value={user}
        onChange={(e) => setUser(e.target.value.toLowerCase().trim())}
        autoFocus
        className="rounded bg-slate-200 p-2 w-full   text-blue-500 text-xl h-12 border-4 border-orange-400"
      />
      <input
        type="password"
        inputMode="numeric" // Sugere teclado numérico em mobile
        pattern="[0-9]*" // Ajuda em alguns navegadores
        name="senha"
        placeholder="Senha..."
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="rounded bg-slate-200 p-2 w-full sm:w-full text-blue-500 text-xl h-12 border-4 border-orange-400"
      />

      <Button
        type="submit"
        className="rounded p-2 bg-[#004A8D] w-full sm:w-full font-bold text-white text-xl h-12 hover:cursor-pointer hover:opacity-50 hover:bg-orange-400 border-2"
      >
        {autenticando ? "Autenticando..." : "ENTRAR"}
      </Button>
      {mensagem && (
        <p className="text-red-500 bg-white p-2 rounded mt ">{mensagem}</p>
      )}
    </form>
  );
}
