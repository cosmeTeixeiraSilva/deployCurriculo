'use server';
import prisma from '@/lib/db';


export async function criarProduto(formData) {
    const descricao = formData.get('descricao');
    const qtd = Number(formData.get('qtd'));
    const fornecedor = formData.get('fornecedor');

    try {
        const result = await prisma.produtos.create({
            data: { descricao, qtd, fornecedor }
        });
        console.log("Produto Criado...");
        return { status: true, message: `${descricao} criado...` };

    } catch (error) {
        console.log("Erro ao criar produto:", error);
        return { status: false, message: "Erro ao criar produto. Tente novamente." };
    }
}

export async function ListarProdutos() {
    try {
        const produtos = await prisma.produtos.findMany({
            orderBy: {
                fornecedor: 'asc', // Ordena o status em ordem decrescente
            },
        });
        return { status: true, produtos }
    } catch (error) {
        console.log("Erro ao listar produtos:", error);
        return { status: false, message: "Erro ao listar produtos. Tente novamente." };
    }
}

export async function excluirProduto(id) {
    try {

        console.log(`Excluindo  ${id}`)
        await prisma.produtos.delete({
            where: { id }
        });
        console.log(`Excluido  ${id}`)
        return { status: true, message: "Produto Excluido...", }

    } catch (error) {

        return { status: false, message: "Erro ao excluir", error };
    }
}

export async function findProduto(id) {
    try {

        console.log(`Procurando  ${id}`)
        const produto = await prisma.produtos.findFirst({
            where: { id }
        });
        console.log(`Encontrado  ${id}`);
        console.log(produto)

        return { status: true, message: "Produto Excluido...", produto }

    } catch (error) {

        return { status: false, message: "Erro ao procurar Tarefa", error };
    }
}

export async function updateProduto(produto) {
    try {
        const id = produto.id;
        const descricao = produto.descricao;
        const qtd = Number(produto.qtd);
        const fornecedor = produto.fornecedor;;

        const produtoAtualizado = await prisma.produtos.update({
            where: { id: id },
            data: {
                descricao,
                qtd,
                fornecedor,
            },
        });

        return {
            status: true,
            message: "Produto atualizado com sucesso.",
            produto: produtoAtualizado,
        };
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        return {
            status: false,
            message: "Erro ao atualizar produto",
            error,
        };
    }
}







