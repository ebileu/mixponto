import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){

    await prisma.horarioDia.deleteMany();
    await prisma.funcionario.deleteMany();
    await prisma.departamento.deleteMany();
    await prisma.funcao.deleteMany();
    await prisma.horario.deleteMany();
    await prisma.empresa.deleteMany();


    const empresa = await prisma.empresa.create({
        data: {
            razaoSocial: 'MIX TELECOMUNICAÇÕES',
            cnpj: '25003759000159',
            endereco: 'Av. Joao Durval Carneiro',
            bairro: 'Ponto Central',
            cidade: 'Feira de Santana',
            cep: '44076000',
            estado: 'BA',
            pais: 'Brasil',
            nomeFantasia: 'MIXCOM',
        }
    })

    const horario = await prisma.horario.create({
        data: {
            descricao: 'HORARIO TESTE',
            compensacao: false,
            carga: 'SEMANAL',
            tolerancia: 5,
            fk_id_empresa: empresa.id

        }
    })

    const funcao = await prisma.funcao.create({
        data: {
            descricao: "Suporte Tecnico",
            fk_id_empresa: empresa.id
        }
    })

    const departamento = await prisma.departamento.create({
        data: {
            descricao: "Suporte",
            fk_id_empresa: empresa.id
        }
    })

    const funcionario = await prisma.funcionario.create({
        data: {
            nome: 'Gabriel Menezes',
            cpf: '81251191088',
            pis: '62404387098',
            dataAdmissao: new Date(),

            fk_id_empresa: empresa.id,
            fk_id_horario: horario.id,
            fk_id_funcao: funcao.id,
            fk_id_departamento: departamento.id
        }
    })
    console.log("Seed executada com sucesso! 🌱")
}

main()
    .catch((e) => {console.error(e); process.exit(1)})
    .finally(async () => {await prisma.$disconnect()})
