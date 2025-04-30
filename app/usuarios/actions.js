'use server';
import prisma from "@/lib/db";

export async function criarUsuario(dados) {

    try {
        const nome = (dados.nome).toUpperCase();
        const celular = String(dados.celular);
        const nivel = Number(dados.nivel);
        const senhaCripto = "12345678";

        console.log(dados);
        const result = await prisma.usuarios.create({
            data: { nome, celular, nivel, senhaCripto }
        });
        console.log(result);
        console.log("Usuario Criado...");

        return { status: true, message: `${nome} criado!`, result };

    } catch (error) {

        console.log("Erro ao criar usuario:", error);
        return { status: false, message: "Erro ao criar usuario. Tente novamente." };
    }
}
export async function listarUsuarios() {

    try {



        const usuarios = await prisma.usuarios.findMany({
            orderBy: { nome: "asc" }
        });
        return { status: true, usuarios: usuarios };

    } catch (error) {


        return { status: false, message: "Erro ao listar Usuários. Tente novamente." };
    }
}

export async function excluirUsuario(id) {
    try {

        console.log(`Excluindo  ${id}`)
        await prisma.usuarios.delete({
            where: { id }
        });
        console.log(`Excluido  ${id}`)
        return { status: true, message: "Usuário Excluido com Sucesso...", }

    } catch (error) {

        return { status: false, message: "Erro ao excluir Usuário...", error };
    }
}

export async function findUsuario(id) {
    try {

        console.log(`Excluindo  ${id}`)
        const usuario = await prisma.usuarios.findFirst({
            where: { id }
        });
        console.log(`Encontrado  ${id}`)
        console.log(usuario);
        return { status: true, message: "Usuário Excluido com Sucesso...", usuario }

    } catch (error) {

        return { status: false, message: "Erro ao excluir Usuário...", error };
    }
}

export async function updateUsuario(dados) {
    try {
        const { id, nome } = dados;

        const nivel = parseInt(dados.nivel); // <-- Aqui converte pra int
        const celular = String(dados.celular); // <-- Aqui converte pra int
        if (!id || !nome || !celular || isNaN(nivel)) {
            return {
                status: false,
                message: "Todos os campos são obrigatórios e nível deve ser um número válido.",
            };
        }

        const usuario = await prisma.usuarios.update({
            where: { id },
            data: { nome, celular, nivel },
        });

        return {
            status: true,
            message: `${nome} editado com sucesso!`,
            usuario,
        };
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);

        return {
            status: false,
            message: "Erro ao editar usuário.",
            error: error.message || error,
        };
    }
}
