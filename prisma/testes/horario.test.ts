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

async function criarBase(){
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
        },
    });
        
    return {empresa};
    
}

describe('Horario Model Testes', () => {
    it('Deve criar um horário válido', async () => {
        const {empresa} = await criarBase();
        const horario = await prisma.horario.create({
            data: {
                descricao: 'Horário Padrão',
                tolerancia: 5,
                fk_id_empresa: empresa.id,
            }
        });
        expect(horario.id).toBeDefined();
    })

    it('Deve ter compensação e carga como padrão', async () => {
        const {empresa} = await criarBase();
        const horario = await prisma.horario.create({
            data: {
                descricao: 'Horário Padrão',
                tolerancia: 5,
                fk_id_empresa: empresa.id,
            }
        });

        expect(horario.compensacao).toBe(false);
        expect(horario.carga).toBe('SEMANAL');
    })

    it('Não deve criar um horário sem descrição', async () => {
        const {empresa} = await criarBase();
        await expect(prisma.horario.create({
            data: {
                descricao: null as any,
                tolerancia: 5,
                fk_id_empresa: empresa.id,
            }
        })).rejects.toThrow(Prisma.PrismaClientValidationError);
    });

    it('Não deve permitir tolerância nula', async () => {
        const {empresa} = await criarBase();
        await expect(prisma.horario.create({
            data: {
                descricao: 'Horario Teste',
                tolerancia: null as any,
                fk_id_empresa: empresa.id,
            }
        })).rejects.toThrow(Prisma.PrismaClientValidationError);
    });

    it('Não deve permitir criar com empresa inexistente', async () => {
        const {empresa} = await criarBase();
        await expect(prisma.horario.create({
            data: {
                descricao: 'Horario Teste',
                tolerancia: 5,
                fk_id_empresa: 999,
            }
        })).rejects.toMatchObject({
            code: 'P2003',
        });
    });

    it('Não deve permitir descrição duplicada dentro da mesma empresa', async () => {
        const {empresa} = await criarBase();
        await prisma.horario.create({
            data: {
                descricao: 'Horario Teste',
                tolerancia: 5,
                fk_id_empresa: empresa.id,
            }
        });
        await expect(prisma.horario.create({
            data: {
                descricao: 'Horario Teste',
                tolerancia: 5,
                fk_id_empresa: empresa.id,
            }
        })).rejects.toMatchObject({
            code: 'P2002',
        });
    });

    it ('Permite descrições iguais em empresas diferentes', async () => {
        const empresa1 = await prisma.empresa.create({
            data: {
                razaoSocial: 'EMPRESA TESTE 1',
                cnpj: '12345678000298',
                endereco: 'Rua Teste, 123',
                bairro: 'Bairro Teste', 
                cidade: 'Cidade Teste',
                cep: '12345000',
                estado: 'ST',
                pais: 'Brasil',
            },
        });

        const {empresa} = await criarBase();

        const horario1 = await prisma.horario.create({
            data: {
                descricao: 'Horario Teste',
                tolerancia: 5,
                fk_id_empresa: empresa1.id,
            }
        });
        const horario2 = await prisma.horario.create({
            data: {
                descricao: 'Horario Teste', 
                tolerancia: 5,
                fk_id_empresa: empresa.id,
            }
        });
        expect(horario1.id).toBeDefined();
        expect(horario2.id).toBeDefined();
    });
})