import { NextResponse } from "next/server";
import { TarefaService } from "@/lib/TarefaService";

export async function GET() {
    const tarefaService = new TarefaService();
    const qtdTarefas = await tarefaService.totalTarefas();
    const qtdTarefasPendentes = await tarefaService.totalTarefasPendentes();
    const qtdTarefasConcluidas = await tarefaService.totalTarefasConcluida();
    const qtdTarefasAndamento = await tarefaService.totalTarefasAndamento();

    return NextResponse.json({

        qtdTarefas,
        qtdTarefasPendentes,
        qtdTarefasConcluidas,
        qtdTarefasAndamento,

    });
}
