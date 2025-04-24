// app/usuarios/page.jsx
import Header from "../_componentsGerais/header";
import { listarUsuarios } from "../_services/usersServices";
import Listausuarios from "./_componentes/listausuarios";
import Menu from "./_componentes/menu";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import BotaoNovo from "./_componentes/botaoNovo";

export default async function UsuariosPage() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");

  // 🔒 Verificando o token diretamente no server
  if (!tokenCookie || typeof tokenCookie.value !== "string") {
    return redirect("/login");
  }

  try {
    const decoded = jwt.verify(tokenCookie.value, process.env.NEXTAUTH_SECRET);
    //console.log("Usuário autenticado:", decoded);

    // ✅ Lista os usuários direto no server, sem useEffect

    const usuarios = await listarUsuarios();

    return (
      <div className="sm:w-2/3 w-screen  mx-auto text-white flex flex-col  h-screen bg-[#121212] text-start rounded  ">
        <Menu />

        <div className="flex w-full px-2 items-center justify-between mx-auto  my-3">
          <span className=" text-orange-400 text-xl font-bold">Usuários:</span>
          <BotaoNovo />
        </div>
        <hr className="my-2" />
        <Listausuarios usuarios={usuarios.data} />
      </div>
    );
  } catch (error) {
    console.log("Token inválido ou expirado:", error);
    return redirect("/login");
  }
}
