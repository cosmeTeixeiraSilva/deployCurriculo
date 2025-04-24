'use server';
import prisma from "@/lib/db";


export async function busca_qtdJurados() {

    try {
        const quantidade = await prisma.usuarios.count({
            where: {
                nivel: 2,
            },
        });

        return {
            success: true,
            data: quantidade.toString(), // retorna como string
        };
    } catch (error) {
        console.log("Erro ao contar jurados:", error);

        return {
            success: false,
            message: "Erro ao contar jurados. Tente novamente.",
        };
    }
}

export async function busca_qtdPontos() {
    try {
        const resultado = await prisma.votos.aggregate({

            _sum: {
                voto: true, // substitua "ponto" pelo nome real da coluna de pontuação
            },
        });
        console.log(resultado);
        return {
            success: true,
            data: (resultado._sum.voto ?? 0), // retorna a soma como string
        };
    } catch (error) {
        console.log("Erro ao somar pontos:", error);
        return {
            success: false,
            message: "Erro ao somar pontos. Tente novamente.",
        };
    }
}
