'use server';
import prisma from "@/lib/db";

export async function votar(dados, nomeJurado) {
    try {
        const id_jurado = dados.idJurado;
        const id_competidor = parseInt(dados.competidor);
        const id_quesito = parseInt(dados.quesito);
        const voto = parseInt(dados.nota);
        const id_competicao = 1;

        //console.log(dados);

        // 🔐 Verifica se o usuário tem nível 2 (jurado)
        const usuario = await prisma.usuarios.findUnique({
            where: {
                id: id_jurado,
            },
        });

        if (!usuario || usuario.nivel !== 2) {
            return {
                status: false,
                message: "Apenas jurados podem votar na competição.",
            };
        }

        // 🔍 Validações básicas
        if (isNaN(id_competidor) || isNaN(id_quesito) || isNaN(voto)) {
            return {
                status: false,
                message: "Dados inválidos: certifique-se de preencher todos os campos corretamente.",
            };
        }

        // 🧱 Validação de faixa da nota
        if (voto < 0 || voto > 10) {
            return {
                status: false,
                message: "A nota deve estar entre 0 e 10.",
            };
        }

        // ❌ Verifica se o jurado já votou nesse quesito e competidor
        const votoExistente = await prisma.votos.findFirst({
            where: {
                id_jurado,
                id_competicao,
                id_quesito,
                id_competidor,
            },
        });

        if (votoExistente) {
            return {
                status: false,
                message: `Este jurado já votou neste quesito para este competidor.`,
            };
        }

        // ✅ Cria o voto
        const result = await prisma.votos.create({
            data: {
                id_jurado,
                id_competicao,
                id_quesito,
                id_competidor,
                voto,
            },
        });

        console.log(`Jurado ${usuario.nome}  votou quesito ${id_quesito} equipe ${id_competidor} nota ${voto}.`);

        return {
            status: true,
            message: `${voto} ponto(s) na equipe ${id_competidor} foi registrado.`,
            result,
        };
    } catch (error) {
        console.error("Erro ao registrar voto:", error);
        return {
            status: false,
            message: `Erro ao registrar a nota: ${error.message}`,
        };
    }
}
//pegando o total geral de pontos 
export async function getTotalGeralPontos() {
    try {
        const resultado = await prisma.votos.aggregate({
            _sum: {
                voto: true,
            },
        });
        console.log(resultado._sum.voto);
        return {
            status: true,
            total: resultado._sum.voto || 0,
        };
    } catch (error) {
        console.error("Erro ao calcular total geral de pontos:", error);
        return {
            status: false,
            message: "Erro ao calcular total geral de pontos.",
        };
    }
}

//total por equipe
export async function getSomatorioPorEquipe() {
    try {
        const resultados = await prisma.votos.groupBy({
            by: ['id_competidor'],
            _sum: {
                voto: true,
            },
            orderBy: {
                _sum: {
                    voto: 'desc',
                },
            },
        });

        // Junta com nomes das equipes
        const equipesComNomes = await Promise.all(resultados.map(async (equipe) => {
            const competidor = await prisma.competidores.findUnique({
                where: { id: equipe.id_competidor },
                select: { nome: true },
            });

            return {
                id_competidor: equipe.id_competidor,
                nome: competidor?.nome || "Equipe desconhecida",
                total: equipe._sum.voto,
            };
        }));

        return {
            status: true,
            equipes: equipesComNomes,
        };
    } catch (error) {
        console.error("Erro ao buscar somatório de pontos:", error);
        return {
            status: false,
            message: "Erro ao buscar somatório.",
        };
    }
}
//ranking de equipes 
export async function getTop3Equipes() {
    try {
        const top = await prisma.votos.groupBy({
            by: ['id_competidor'],
            _sum: {
                voto: true,
            },
            orderBy: {
                _sum: {
                    voto: 'desc',
                },
            },
            take: 3,
        });

        // Mapeia os dados para retornar apenas os campos desejados
        const top3 = top.map(item => ({
            id_competidor: item.id_competidor,
            total: item._sum.voto,
        }));

        return {
            status: true,
            top3,
        };
    } catch (error) {
        console.error("Erro ao buscar top 3 equipes:", error);
        return {
            status: false,
            message: "Erro ao buscar ranking.",
        };
    }
}


export async function listarVotos({ idJurado, idCompetidor }) {
    try {
        const id_jurado = idJurado
        const id_competidor = idCompetidor
        const id_competicao = 1;
        console.log(id_jurado);
        console.log(id_competidor)

        // ⚠️ Verifica se os dados vieram corretamente
        if (!id_jurado || isNaN(id_competidor)) {
            return {
                status: false,
                message: "Dados inválidos: jurado ou competidor não informado.",
            };
        }

        const result = await prisma.votos.findMany({
            where: {
                id_jurado,
                id_competicao,
                id_competidor,
            },
            include: {
                quesito: true, // Aqui vai incluir o nome do quesito na resposta
            },
            orderBy: { id_quesito: "asc" }
        });
        //console.log(result);
        return {
            status: true,
            message: `Dados Recuperados...`,
            result,
        };
    } catch (error) {
        console.log("Erro ao recuperar votos:", error);
        return {
            status: false,
            message: `Erro ao recuperar os votos: ${error.message}`,
        };
    }
}
//Busca quesitos não votados 
export async function listarQuesitosNaoVotados({ idJurado, idCompetidor, idCompeticao = 1 }) {
    try {
        //console.log("=== [DEBUG] Buscar Quesitos Não Votados ===");
        //console.log("idJurado:", idJurado);
        //console.log("idCompetidor:", idCompetidor);

        // 1. Busca todos os votos já feitos pelo jurado para esse competidor
        const votosFeitos = await prisma.votos.findMany({
            where: {
                id_jurado: idJurado,
                id_competidor: idCompetidor,
                id_competicao: idCompeticao,
            },
            select: {
                id_quesito: true,
            },
        });

        // 2. Extrai os IDs dos quesitos já votados
        const quesitosVotados = votosFeitos.map(voto => voto.id_quesito);
        console.log(`✅ Quesitos votados (${quesitosVotados.length}):`, quesitosVotados);

        // 3. Busca todos os quesitos que ainda NÃO foram votados
        const quesitosNaoVotados = await prisma.quesitos.findMany({
            where: {
                id: {
                    notIn: quesitosVotados,
                },
            },
            select: {
                id: true,
                titulo: true,
                descricao: true,
            },
        });

        const idsNaoVotados = quesitosNaoVotados.map(q => q.id);
        const tituloNaoVotados = quesitosNaoVotados.map(q => q.titulo);
        //////console.log(`❌ Quesitos NÃO votados (${idsNaoVotados.length}):`, idsNaoVotados);
        //console.log(`❌ Quesitos NÃO votados (${idsNaoVotados.length}):`, tituloNaoVotados);

        return {
            status: true,
            data: quesitosNaoVotados,
        };
    } catch (error) {
        console.error("🚨 Erro ao buscar quesitos não votados:", error);
        return {
            status: false,
            message: "Erro ao buscar quesitos não votados.",
            error: error.message,
        };
    }
}
// No backend (server action ou service)
export async function deletarVoto({ id }) {
    try {
        console.log(`Voto a ser deletado = ${id}`);

        const voto = await prisma.votos.findUnique({
            where: { id },
        });

        if (!voto) {
            return {
                status: false,
                message: "Voto não encontrado.",
            };
        }

        await prisma.votos.delete({
            where: { id },
        });

        return {
            status: true,
            message: "Voto deletado com sucesso.",
        };
    } catch (error) {
        console.error("Erro ao deletar voto:", error);
        return {
            status: false,
            message: "Erro interno ao tentar deletar o voto.",
        };
    }
}
