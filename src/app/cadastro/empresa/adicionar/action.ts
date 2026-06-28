"use server";

import { criarEmpresa } from "@/services/empresa.service";
import {
    EmpresaValidationError,
    type CampoErroEmpresa,
} from "@/validators/empresa.validator";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export type EstadoCadastro = { 
    erros?: CampoErroEmpresa;
}

export async function cadastrarEmpresa(
    estadoAnterior: EstadoCadastro,
    formData: FormData,
): Promise<EstadoCadastro> {
    try{
        await criarEmpresa({
        razaoSocial: String(formData.get("razaoSocial") ?? "").trim(),
        nomeFantasia: String(formData.get("nomeFantasia") ?? "").trim(),
        cnpj: String(formData.get("cnpj") ?? "").replace(/\D/g, ""),
        inscricaoEstadual: String(formData.get("inscricaoEstadual") ?? "").trim(),
        cep: String(formData.get("cep") ?? "").replace(/\D/g, ""),
        endereco: String(formData.get("endereco") ?? "").trim(),
        numero: String(formData.get("numero") ?? "").trim(),
        bairro: String(formData.get("bairro") ?? "").trim(),
        cidade: String(formData.get("cidade") ?? "").trim(),
        estado: String(formData.get("estado") ?? "").trim(),
        pais: String(formData.get("pais") ?? "Brasil").trim(),
        responsavelNome: String(formData.get("responsavelNome") ?? "").trim(),
        responsavelCargo: String(formData.get("responsavelCargo") ?? "").trim(),
        responsavelEmail: String(formData.get("responsavelEmail") ?? "").trim(),
    });
    } catch (erro){
        if (erro instanceof EmpresaValidationError) {
            return {
                erros: erro.erros,
            };
        }

        return {
            erros: {
                cnpj:
                    erro instanceof Error
                    ? erro.message
                    : "Não foi possível validar o CNPJ",
            },
        };
    }


    revalidatePath("/cadastro/empresa");
    redirect("/cadastro/empresa");
}





