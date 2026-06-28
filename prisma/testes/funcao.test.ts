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
            numero: '123',
        },
    });
        
    return {empresa};
    
}

describe('Função Model Tests', () => {
    it('Deve criar um função válido', async () => {
        const {empresa} = await criarBase();
        const funcao = await prisma.funcao.create({
            data: {
                descricao: 'Suporte',
                fk_id_empresa: empresa.id,
            }
        });
        expect(funcao.id).toBeDefined();
    })

    it('Deve falhar ao criar um função sem descrição', async () => {
        const {empresa} = await criarBase();
        await expect(prisma.funcao.create({
            data: {
                descricao: null as any,
                fk_id_empresa: empresa.id,
            }
        })).rejects.toThrow(Prisma.PrismaClientValidationError);
    })

    it('Não deve permitir descrição duplicada para a mesma empresa', async () => {
        const {empresa} = await criarBase();
        await prisma.funcao.create({
            data: {
                descricao: 'Suporte',
                fk_id_empresa: empresa.id,
            }
        });
        await expect(prisma.funcao.create({
            data: {
                descricao: 'Suporte',
                fk_id_empresa: empresa.id,
            }
        })).rejects.toMatchObject({
            code: 'P2002'
        })
    })

    it ('Não deve criar função com empresa inexistente', async () => {
        await expect(prisma.funcao.create({
            data: {
                descricao: 'Suporte',
                fk_id_empresa: 999, // ID de empresa inexistente
            }
        })).rejects.toMatchObject({
            code: 'P2003'
        });
    })

    it ('Deve permitir mesma descrição em empresas diferentes', async () => {
        const {empresa} = await criarBase();
        const outraEmpresa = await prisma.empresa.create({
            data: {
                razaoSocial: 'OUTRA EMPRESA',
                cnpj: '98765432000188',
                endereco: 'Rua Teste, 456',
                bairro: 'Bairro Teste',
                cidade: 'Cidade Teste',
                cep: '09876543',
                estado: 'ST',
                pais: 'Brasil',
                numero: '456',
            }
        });
        await prisma.funcao.create({
            data: {
                descricao: 'Suporte',
                fk_id_empresa: empresa.id,
            }
        });
        const funcao = await prisma.funcao.create({
            data: {
                descricao: 'Suporte',
                fk_id_empresa: outraEmpresa.id,
            }
        });
        expect(funcao.id).toBeDefined();
    })
})