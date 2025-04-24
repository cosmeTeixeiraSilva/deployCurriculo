// app/api/logout/route.js
import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: "Logout realizado com sucesso" });

    response.cookies.set('token', '', {
        httpOnly: true,
        secure: true,
        path: '/',
        expires: new Date(0), // expira imediatamente
    });
    console.log("Logout Feito e removido o token...")
    return response;
}
