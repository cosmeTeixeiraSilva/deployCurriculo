import Menu from "./_components/menu";
import { validarToken } from "../_services/authServices";

import { redirect } from "next/navigation";
export default async function Layout({ children }) {
  const resultado = await validarToken();
  if (!resultado.status) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-start sm:w-[90vw] w-screen bg-[#121212] h-screen   sm:shadow-lg sm:shadow-[#F7941D] mx-auto overflow-hidden">
      {resultado.status && <Menu />}

      <div className="h-full">{children}</div>
    </div>
  );
}
