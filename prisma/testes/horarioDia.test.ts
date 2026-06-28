import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function limparBanco() {
    await prisma.horarioDia.deleteMany();
    await prisma.funcionario.deleteMany();
    await prisma.departamento.deleteMany();
    await prisma.funcao.deleteMany();
    await prisma.horario.deleteMany();
    await prisma.empresa.deleteMany();
}

beforeEach(async () => {
    await limparBanco();
});

afterEach(async () => {
    await limparBanco();
});

afterAll(async () => {
    await prisma.$disconnect();
});

async function criarBaseFuncionario(){
    const empresa = await prisma.empresa.create({
        data: {
            razaoSocial: 'EMPRESA TESTE',
            cnpj: '12345678000299',
            endereco: 'Rua Teste, 123',
            bairro: 'Bairro Teste',
            cidade: 'Cidade Teste',
            cep: '12345000',
            estado: 'ST',
            pais: 'Brasil',
            numero: '123',
        },
    });

    const horario = await prisma.horario.create({
        data: {
            descricao: 'Horário Padrão',
            tolerancia: 5,
            fk_id_empresa: empresa.id,
        }
    })

    return {horario, empresa};
    
}

describe('HorarioDia Model Test', () => { 
    it('Deve criar um horarioDia', async () => {
        const {horario} = await criarBaseFuncionario();
        const horarioDia = await prisma.horarioDia.create({
            data: {
                diaSemana: 1,
                fk_id_horario: horario.id,
            }
        })
        expect(horarioDia.folga).toBe(false);
        expect(horarioDia.extra).toBe(false);
        expect(horarioDia.entrada1).toBeNull();
        expect(horarioDia.saida1).toBeNull();
        expect(horarioDia.entrada2).toBeNull();
        expect(horarioDia.saida2).toBeNull();
    })

    it('Deve criar um horarioDia com folga e extra', async () => {
        const {horario} = await criarBaseFuncionario();
        const horarioDia = await prisma.horarioDia.create({
            data: {
                diaSemana: 1,
                fk_id_horario: horario.id,
                folga: true,
                extra: true,
            }
        })
        expect(horarioDia.folga).toBe(true);
        expect(horarioDia.extra).toBe(true);
        expect(horarioDia.entrada1).toBeNull();
        expect(horarioDia.saida1).toBeNull();
        expect(horarioDia.entrada2).toBeNull();
        expect(horarioDia.saida2).toBeNull();
    })

    it('Não deve criar um horarioDia com um horario inexistente', async () => {
        await expect(prisma.horarioDia.create({
            data: {
                diaSemana: 1,
                fk_id_horario: 999, // ID inexistente
            }
        })).rejects.toMatchObject({
            code: 'P2003',
        });
    });
});