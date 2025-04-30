// app/tarefas/actions.js
"use server"
import { AuthObject } from '@/lib/Auth';

export async function Autenticando(formData) {
    const auth = new AuthObject();
    const user = formData.get("user");
    const senha = formData.get("senha");

    const res = await auth.Autenticar(user, senha);

    if (res.isAutenticado) {
        console.log(res.user);
        return { ok: true, user: res.user }; // ✔️ retornando sucesso
    } else {
        return { ok: false, message: "Usuário ou senha inválidos.", user: null }; // ✔️ retornando erro
    }
}
