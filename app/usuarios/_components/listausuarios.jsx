import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { listarUsuarios } from "@/app/_services/usersServices";

export default function ListagemUsuarios({ abrirSheet }) {
  const [loading, setLoading] = useState(false); // Para controle de carregamento
  const [error, setError] = useState(null); // Para exibir mensagens de erro

  const [usuarios, setUsuarios] = useState([]);
  //Carrega os Usuários quando inicia
  useEffect(() => {
    const carregarUsuarios = async () => {
      const { success, data, message } = await listarUsuarios();
      if (success) {
        setUsuarios(data); // atualiza o estado com os usuários recebidos
      } else {
        console.error("Erro ao listar usuários:", message);
      }
    };

    carregarUsuarios();
  }, []); // executa

  function buscarUsuario(id) {
    console.log("Buscar usuário com id:", id);
    abrirSheet(id);
  }

  if (loading) {
    return <div>Carregando...</div>; // Exibe uma mensagem de carregamento
  }

  if (error) {
    return <div>{error}</div>; // Exibe uma mensagem de erro
  }

  return (
    <ul className="flex gap-y-3 flex-col text-sm sm:text-xl sm:w-1/3 w-[90vw] mx-auto">
      {usuarios.map((usuario) => (
        <li key={usuario.id} className="flex items-center justify-between">
          <div>
            <span>
              {usuario.nome.toUpperCase()} -
              {usuario.nivel === 3
                ? " Admin"
                : usuario.nivel === 1
                ? " Competidor"
                : usuario.nivel === 2
                ? " Jurado"
                : "Desconhecido"}
            </span>
          </div>

          <Button
            onClick={() => buscarUsuario(usuario.id)}
            className="bg-orange-400 text-slate-200 border-2 font-bold w-[100px] h-10 text-md sm:text-xl hover:bg-orange-400 hover:opacity-50"
          >
            Ver
          </Button>
        </li>
      ))}
    </ul>
  );
}
