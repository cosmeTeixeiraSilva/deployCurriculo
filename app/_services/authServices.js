'use server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { findUsuarioByNome } from './usersServices';
//senha gerada com criptografia 
const JWT_SECRET = process.env.NEXTAUTH_SECRET;

/*const userFaker = {
    email: 'cosme',
    passwordHash: '$2b$10$.mItp3HClpR1e1UiUAfqWeSYaVfenu3lpmhek0uGQEK9u1VIBoN5.', // <-- novo hash gerado agora
};*/

export async function autenticarUsuario(formData) {
    const user = formData.user?.toUpperCase();
    const senha = formData.senha;
    let nivel = "";
    if (!user || !senha) {
        return { error: 'Usuário e senha são obrigatórios.' };
    }

    // Busca o usuário no banco de dados
    const res = await findUsuarioByNome(user);

    if (!res.status || !res.usuario) {
        return { error: 'Usuário não encontrado' };
    }

    const usuario = res.usuario;

    // Confirmação do nome (pode ser desnecessária, mas fica como camada extra)
    if (user !== usuario.nome) {
        return { error: 'Usuário não encontrado.' };
    }

    // Compara a senha com o hash armazenado
    const match = await bcrypt.compare(senha, usuario.senhaCripto);

    if (!match) {
        console.log("Usuário NÃO autenticado...");
        return { error: 'Favor Verificar sua Senha...' };
    }
    if (usuario.nivel === 1) {
        nivel = "Competidor";

    } else if (usuario.nivel === 2) {
        nivel = "Jurado";
    } else if (usuario.nivel === 3) {
        nivel = "Administrador";

    } else {
        nivel = "Desconhecido"
    }
    // Gera o token JWT com ID, Nome e o Nivel 
    const token = jwt.sign({ id: usuario.id, nome: usuario.nome, nivel: nivel }, JWT_SECRET, {
        expiresIn: '1h',
    });

    // Salva o token no cookie
    const cookieStore = await cookies(); // Server Action, não precisa de `await` mais aqui
    cookieStore.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: "strict",
        maxAge: 60 * 60, // 1 hora
    });

    console.log(`Token para ${usuario.nome} criado com sucesso.`);
    return { success: true };
}



// Função para validar o token

export async function validarToken() {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');

    if (!tokenCookie || typeof tokenCookie.value !== 'string') {
        return {
            status: false,
            message: 'Token não fornecido ou inválido',
            usuario: null
        };
    }

    try {
        const decoded = jwt.verify(tokenCookie.value, JWT_SECRET);
        //console.log("Autenticado com sucesso:", decoded);

        return {
            status: true,
            message: "Usuário logado",
            usuario: decoded
        };
    } catch (error) {
        console.log('Erro ao validar token:', error.message);

        return {
            status: false,
            message: 'Token inválido ou expirado',
            usuario: null
        };
    }
}

