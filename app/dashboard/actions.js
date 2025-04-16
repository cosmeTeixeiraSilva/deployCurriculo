'use server';
import { TarefaService } from '../../lib/TarefaService';

export async function total_Tarefas() {
    try {
        const tarefaService = new TarefaService();
        // Busca o total no Banco
        let total = await tarefaService.totalTarefas();

        // Verifica se total é um número válido
        if (typeof total !== "number" || isNaN(total)) {
            total = 0;
        }

        // Converte para string e adiciona um zero à esquerda se necessário
        return total.toString().padStart(3, "0");
    } catch (error) {
        console.error("Erro ao buscar total de tarefas:", error);
        return "Erro";
    }
}

export async function total_TarefasPendentes() {
    try {
        const tarefaService = new TarefaService();
        // Busca o total no Banco
        let total = await tarefaService.totalTarefasPendentes();

        // Verifica se total é um número válido
        if (typeof total !== "number" || isNaN(total)) {
            total = 0;
        }

        // Converte para string e adiciona um zero à esquerda se necessário
        return total.toString().padStart(3, "0");
    } catch (error) {
        console.error("Erro ao buscar total de tarefas:", error);
        return "Erro";
    }
}
export async function total_TarefasConcluidas() {
    try {
        const tarefaService = new TarefaService();
        // Busca o total no Banco
        let total = await tarefaService.totalTarefasConcluida();

        // Verifica se total é um número válido
        if (typeof total !== "number" || isNaN(total)) {
            total = 0;
        }

        // Converte para string e adiciona um zero à esquerda se necessário
        return total.toString().padStart(3, "0");
    } catch (error) {
        console.error("Erro ao buscar total de tarefas:", error);
        return "Erro";
    }
}
export async function total_TarefasAndamento() {
    try {
        const tarefaService = new TarefaService();
        // Busca o total no Banco
        let total = await tarefaService.totalTarefasAndamento();

        // Verifica se total é um número válido
        if (typeof total !== "number" || isNaN(total)) {
            total = 0;
        }

        // Converte para string e adiciona um zero à esquerda se necessário
        return total.toString().padStart(3, "0");
    } catch (error) {
        console.error("Erro ao buscar total de tarefas:", error);
        return "Erro";
    }
}



