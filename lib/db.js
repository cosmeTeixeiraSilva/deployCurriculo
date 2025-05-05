import {PrismaClient } from "@prisma/client";
//Criando uma constante Prisma
const prisma = new PrismaClient()
//Exportando para uso na Aplicação
export default prisma