import { Button } from "@/components/ui/button";
import { excluirUsuario } from "@/app/_services/usersServices";
import { IoTrashOutline } from "react-icons/io5";
export default function Btnexcluir({ id, setOpen }) {
  async function ExcluirUsuario() {
    console.log(id);
    const res = await excluirUsuario(id);
    setOpen(false);
    console.log(res);

    // Se quiser atualizar a lista de usuários após a exclusão
    if (atualizar_Usuarios) {
      atualizar_Usuarios();
    }
  }

  return (
    <div className="text-5xl rounded bg-slate-200">
      <IoTrashOutline
        onClick={ExcluirUsuario}
        className=" text-red-600 bg-tranparent border-2 border-red-600 rounded px-1"
      />
    </div>
  );
}
