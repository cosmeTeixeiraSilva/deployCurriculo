'use server';
import prisma from "@/lib/db";
import bcrypt from 'bcryptjs';
export async function criarUsuario(dados) {

    try {


        const nome = (dados.nome).toUpperCase().trim();
        const celular = String(dados.celular).trim();
        const nivel = Number(dados.nivel);
        //Criptografando a Senha 
        const senhaCripto = await bcrypt.hash(celular, 10);
        //console.log(dados);
        const result = await prisma.usuarios.create({
            data: { nome, celular, nivel, senhaCripto }
        });
        //console.log(result);
        //console.log("Usuario Criado...");

        return { status: true, message: `${nome} criado!`, result };

    } catch (error) {

        console.log("Erro ao criar usuario:", error);
        return { status: false, message: "Erro ao criar usuario. Tente novamente." };
    }
}



export async function listarUsuarios(texto = "") {
    try {

        const usuarios = await prisma.usuarios.findMany({
            where: texto
                ? {
                    nome: {
                        contains: texto,
                        mode: "insensitive", // ignora maiúsculas/minúsculas
                    },
                }
                : undefined,
            orderBy: [
                { nivel: "desc" },
                { nome: "asc" },
            ],
        });

        return {
            success: true,
            data: usuarios,
        };
    } catch (error) {
        console.log("Erro ao listar usuários:", error);

        return {
            success: false,
            message: "Erro ao listar usuários. Tente novamente.",
        };
    }
}


export async function excluirUsuario(id) {
    try {
        const [usuario] = await prisma.$transaction([
            prisma.usuarios.findUnique({
                where: { id },
            }),
            // Vamos deixar o delete depois, só se o usuário existir
        ]);

        if (!usuario) {
            return {
                status: false,
                message: "Usuário não encontrado para exclusão.",
            };
        }

        // Agora sim, executa find + delete em uma única transação
        await prisma.$transaction([
            prisma.usuarios.delete({
                where: { id },
            }),
        ]);

        return {
            status: true,
            message: `Usuário '${usuario.nome}' foi excluído com sucesso.`,
            nome: usuario.nome,
        };
    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        return {
            status: false,
            message: "Erro ao excluir usuário.",
            error,
        };
    }
}


export async function findUsuario(id) {
    try {


        const usuario = await prisma.usuarios.findUnique({
            where: { id }
        });
        console.log(`Usuário Encontrado:  ${id}`)
        //console.log(usuario);
        return { status: true, message: "Usuário Localizado", usuario }

    } catch (error) {

        return { status: false, message: "Erro ao localizar o  Usuário...", error };
    }
}


export async function findUsuarioByNome(nomeRecebido) {
    try {
        if (!nomeRecebido || typeof nomeRecebido !== "string") {
            return { status: false, message: "Nome de usuário inválido" };
        }

        const nome = nomeRecebido.trim().toUpperCase();

        const usuario = await prisma.usuarios.findFirst({
            where: { nome },
            select: {
                id: true,
                nome: true,
                nivel: true,
                senhaCripto: true
                // ⚠️ NÃO inclua senha, token ou dados sensíveis aqui
            },
        });

        if (!usuario) {
            return { status: false, message: "Usuário não encontrado" };
        }

        return { status: true, message: "Usuário localizado", usuario };
    } catch (error) {
        console.error("Erro ao buscar usuário:", error.message);
        return {
            status: false,
            message: "Erro interno ao buscar usuário",
        };
    }
}


export async function updateUsuario(dados) {
    try {

        const id = (dados.id).trim();
        const nome = (dados.nome).toUpperCase().trim();
        const celular = String(dados.celular).trim();
        const nivel = Number(dados.nivel);

        if (!id || !nome || !celular || isNaN(nivel)) {
            return {
                status: false,
                message: "Todos os campos são obrigatórios e nível deve ser um número válido.",
            };
        }

        //Criptografando a Senha 
        const senhaCripto = await bcrypt.hash(celular, 10);
        const usuario = await prisma.usuarios.update({
            where: { id },
            data: { nome, celular, nivel, senhaCripto },
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
