// lib/TarefaService.js
import prisma from './db';

export class UsuarioService {

    async criarUsuario(nome, celular, tipo) {
        return await prisma.usuarios.create({
            data: { nome, celular, tipo }
        });
    }

    async listarUsuarios(texto) {
        if (!texto) {
            return await prisma.usuarios.findMany({
                orderBy: {
                    descricao: 'asc',
                },
            });
        }

        return await prisma.usuarios.findMany({
            where: {
                nome: {
                    contains: texto, // equivale ao LIKE '%texto%'
                    mode: 'insensitive', // ignora maiúsculas/minúsculas
                },
            },
            orderBy: {
                descricao: 'asc',
            },
        });
    }



    async atualizarUsuario(uuid, status) {
        return await prisma.usuarios.update({
            where: { uuid },
            data: { status }
        });
    }

    async excluirUsuario(uuid) {
        return await prisma.usuarios.delete({
            where: { uuid }
        });
    }
    //Total de Tarefas
    async totalTarefas() {
        const qtdTarefas = await prisma.usuarios.count();
        return qtdTarefas;
    }
    // Total de Tarefas Pendentes
    async totalTarefasPendentes() {
        const qtdTarefas = await prisma.usuarios.count({
            where: {
                status: "Pendente"
            }
        });
        return qtdTarefas;
    }
    // Total de Tarefas Concluída
    async totalTarefasConcluida() {
        const qtdTarefas = await prisma.usuarios.count({
            where: {
                status: "Concluída"
            }
        });
        return qtdTarefas;
    }
    // Total de Tarefas Em Andamento
    async totalTarefasAndamento() {
        const qtdTarefas = await prisma.usuarios.count({
            where: {
                status: "Andamento"
            }
        });
        return qtdTarefas;
    }



}
