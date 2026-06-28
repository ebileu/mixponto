import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest';
import { PrismaClient } from '@prisma/client';

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

describe('Empresa Model Tests', () => {
    it('Deve criar uma empresa valida', async () => {
        const empresa = await prisma.empresa.create({
            data: {
                razaoSocial: 'EMPRESA TESTE',
                cnpj: '12345678000199',
                endereco: 'Rua Teste, 123',
                bairro: 'Bairro Teste',
                cidade: 'Cidade Teste',
                cep: '12345000',
                estado: 'ST',
                pais: 'Brasil',
                numero: '123',
            },
        });

        expect(empresa.id).toBeDefined();
        expect(empresa.razaoSocial).toBe('EMPRESA TESTE');
    });

    it('Nao deve criar um CNPJ duplicado', async () => {
        await prisma.empresa.create({
            data: {
                razaoSocial: 'EMPRESA TESTE',
                cnpj: '12345678000199',
                endereco: 'Rua Teste, 123',
                bairro: 'Bairro Teste',
                cidade: 'Cidade Teste',
                cep: '12345000',
                estado: 'ST',
                pais: 'Brasil',
                numero: '123',
            },
        });

        await expect(
            prisma.empresa.create({
                data: {
                    razaoSocial: 'EMPRESA TESTE',
                    cnpj: '12345678000199',
                    endereco: 'Rua Teste, 123',
                    bairro: 'Bairro Teste',
                    cidade: 'Cidade Teste',
                    cep: '12345000',
                    estado: 'ST',
                    pais: 'Brasil',
                    numero: '123',
                },
            })
        ).rejects.toMatchObject({
            code: 'P2002',
        });
    });

    it('Deve permitir criar uma empresa sem nome fantasia e inscricao estadual', async () => {
        const empresa = await prisma.empresa.create({
            data: {
                razaoSocial: 'EMPRESA TESTE',
                cnpj: '12345678000199',
                endereco: 'Rua Teste, 123',
                bairro: 'Bairro Teste',
                cidade: 'Cidade Teste',
                cep: '12345000',
                estado: 'ST',
                pais: 'Brasil',
                nomeFantasia: null,
                inscricaoEstadual: null,
                numero: '123',
            },
        });

        expect(empresa.id).toBeDefined();
        expect(empresa.nomeFantasia).toBeNull();
        expect(empresa.inscricaoEstadual).toBeNull();
    });

    it('Nao deve permitir criar uma empresa sem CNPJ', async () => {
        await expect(
            prisma.empresa.create({
                data: {
                    razaoSocial: 'EMPRESA TESTE',
                    cnpj: null as any,
                    endereco: 'Rua Teste, 123',
                    bairro: 'Bairro Teste',
                    cidade: 'Cidade Teste',
                    cep: '12345000',
                    estado: 'ST',
                    pais: 'Brasil',
                    numero: '123',
                },
            })
        ).rejects.toThrow('Argument `cnpj` must not be null');
    });

    
});
