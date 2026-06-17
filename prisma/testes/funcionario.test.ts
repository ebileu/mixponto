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
        },
    });
        
    const horario = await prisma.horario.create({
        data: {
            descricao: 'Horário Padrão',
            tolerancia: 5,
            fk_id_empresa: empresa.id,
        }
    })

    const funcao = await prisma.funcao.create({
        data: {
            descricao: 'Atendente',
            fk_id_empresa: empresa.id,
        }
    })

    const departamento = await prisma.departamento.create({
        data: {
            descricao: 'Suporte',
            fk_id_empresa: empresa.id,
        }     
    })

    return {empresa, horario, funcao, departamento};
    
}


describe('Funcionario Model Tests', () => {
    it('Deve criar um funcionario valido', async () => {
        const {empresa, horario, funcao, departamento} = await criarBaseFuncionario();
        const funcionario = await prisma.funcionario.create({
            data:{
                nome: 'Funcionario Teste',
                cpf: '12345678901',
                dataAdmissao: new Date('2026-06-04'),
                fk_id_empresa: empresa.id,
                fk_id_horario: horario.id,
                fk_id_funcao: funcao.id,
                fk_id_departamento: departamento.id,
            }
        })

        expect(funcionario.id).toBeDefined();
        expect(funcionario.fk_id_empresa).toBe(empresa.id);
        expect(funcionario.fk_id_horario).toBe(horario.id);
        expect(funcionario.fk_id_funcao).toBe(funcao.id);
        expect(funcionario.fk_id_departamento).toBe(departamento.id);
    })

    it ('Nao deve criar um funcionario com CPF duplicado', async () => {
        const {empresa, horario, funcao, departamento} = await criarBaseFuncionario();
        await prisma.funcionario.create({
            data:{
                nome: 'Funcionario Teste',
                cpf: '12345678901',
                dataAdmissao: new Date('2026-06-04'),
                fk_id_empresa: empresa.id,
                fk_id_horario: horario.id,
                fk_id_funcao: funcao.id,
                fk_id_departamento: departamento.id,
            }
        });

        await expect(prisma.funcionario.create({
            data:{
                nome: 'Funcionario Teste 2',
                cpf: '12345678901',
                dataAdmissao: new Date('2026-06-04'),
                fk_id_empresa: empresa.id,
                fk_id_horario: horario.id,
                fk_id_funcao: funcao.id,
                fk_id_departamento: departamento.id,
            }
        })).rejects.toMatchObject({code: 'P2002'});
    })

    it ('Deve criar funcionário com o PIS e data de demissão vazias', async () => {
        const {empresa, horario, funcao, departamento} = await criarBaseFuncionario();
        const funcionario = await prisma.funcionario.create({
            data:{
                nome: 'Funcionario Teste',
                cpf: '12345678901',
                dataAdmissao: new Date('2026-06-04'),
                fk_id_empresa: empresa.id,
                fk_id_horario: horario.id,
                fk_id_funcao: funcao.id,
                fk_id_departamento: departamento.id,
                pis: null,
                dataDemissao: null
            }
        })

        expect(funcionario.id).toBeDefined();
        expect(funcionario.pis).toBeNull();
        expect(funcionario.dataDemissao).toBeNull();
    })

    it ('Não deve criar um funcionario com CPF vazio ou inválido', async () => {
        const {empresa, horario, funcao, departamento} = await criarBaseFuncionario();

        await expect(
                prisma.funcionario.create({
                data: {
                    nome: 'Funcionario Teste',
                    cpf: null as any,
                    dataAdmissao: new Date('2026-06-04'),
                    fk_id_empresa: empresa.id,
                    fk_id_horario: horario.id,
                    fk_id_funcao: funcao.id,
                    fk_id_departamento: departamento.id,
                },
            })
        ).rejects.toThrow(Prisma.PrismaClientValidationError);
    })

    it('Não deve associar funcionário a uma empresa inexistente', async() => {
        const {horario, funcao, departamento} = await criarBaseFuncionario();
        await expect(
            prisma.funcionario.create({
                data: {
                    nome: 'Funcionario Teste',
                    cpf: '12345678901',
                    dataAdmissao: new Date('2026-06-04'),
                    fk_id_empresa: 999,
                    fk_id_horario: horario.id,
                    fk_id_funcao: funcao.id,
                    fk_id_departamento: departamento.id,
                }
            })
        ).rejects.toMatchObject({code: 'P2003'});
    })
})


    
