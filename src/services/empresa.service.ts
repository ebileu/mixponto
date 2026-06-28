import { prisma } from "@/libs/prisma";
import {
    validarCamposObrigatoriosEmpresa,
    validarCNPJ,
} from "@/validators/empresa.validator";

export type EmpresasProps ={
    razaoSocial: string;
    nomeFantasia?: string;
    cnpj: string;
    inscricaoEstadual?: string;

    cep: string;
    endereco: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    pais: string;

    responsavelNome?: string;
    responsavelEmail?: string;
    responsavelCargo?: string;
}

export async function criarEmpresa(dados: EmpresasProps){
    validarCamposObrigatoriosEmpresa(dados);

    const cnpjValidado = validarCNPJ(dados.cnpj)

    const empresaExistente = await prisma.empresa.findUnique({
        where: {
            cnpj: cnpjValidado,
        },
    })

    if (empresaExistente) {
        throw new Error("Já existe uma empresa cadastrada com esse CNPJ")
    }

    return prisma.empresa.create({
        data: {
            razaoSocial: dados.razaoSocial.trim(),
            nomeFantasia: dados.nomeFantasia?.trim() || null,
            cnpj: cnpjValidado,
            inscricaoEstadual: dados.inscricaoEstadual?.trim() || null,
            cep: dados.cep.replace(/\D/g, ""),
            numero: dados.numero.trim(),
            bairro: dados.bairro.trim(),
            cidade: dados.cidade.trim(),
            estado: dados.estado.trim(),
            endereco: dados.endereco.trim(),
            pais: dados.pais.trim(),
            responsavelNome: dados.responsavelNome?.trim() || null,
            responsavelCargo: dados.responsavelCargo?.trim() || null,
            responsavelEmail: dados.responsavelEmail?.trim() || null,
        },
    });
}
