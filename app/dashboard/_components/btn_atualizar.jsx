// app/components/btn_atualizar.js

'use client'; // Se for necessário marcar este componente como cliente

import { useState } from 'react';

export default function BtnAtualizar() {
    const [isLoading, setIsLoading] = useState(false);

    // Função que chama a Server Action
    async function handleUpdate() {
        setIsLoading(true);


        if (res.ok) {
            alert('Página revalidada com sucesso!');
        } else {
            alert('Erro ao revalidar a página.');
        }
        setIsLoading(false);
    }

    return (
        <div>
            <button
                onClick={handleUpdate}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                {isLoading ? 'Revalidando...' : 'Revalidar Página'}
            </button>
        </div>
    );
}
