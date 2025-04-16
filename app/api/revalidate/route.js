import { revalidatePath } from "next/cache";

export async function POST(req) {
    try {
        // Simula um atraso de 3 segundos
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Revalida o cache da rota específica
        revalidatePath("/dashboard");

        return new Response(JSON.stringify({ message: "Revalidado com sucesso!" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Erro ao revalidar" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
