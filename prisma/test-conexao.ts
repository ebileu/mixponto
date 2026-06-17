import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); 

async function testarConexao(){
    await prisma.$connect(); 
    console.log("Conexao OK");
}

testarConexao()
    .catch(console.error)
    .finally(() => prisma.$disconnect());