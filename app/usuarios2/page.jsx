import Header from "../_componentsGerais/header";
import { listarUsuarios } from "../_services/usersServices";
import BotaoNovo from "./_componentes/botaoNovo";
import Listausuarios from "./_componentes/listausuarios";

export default async function VotacaoJurado() {
  //pegando a lista de usuários do lado do servidor e exporta para o client pronta a página
  const usuarios = await listarUsuarios();
  return (
    <div className="w-1/2 mx-auto py-4 text-white  flex flex-col overflow-hidden bg-[#121212] text-start mt-12 ">
      <Header />
      <hr />
      <div className="text-xl text-white flex items-center justify-between p-2 font-bold">
        Usuários Cadastrados: <BotaoNovo />
      </div>

      <Listausuarios usuarios={usuarios.data} />
    </div>
  );
}
