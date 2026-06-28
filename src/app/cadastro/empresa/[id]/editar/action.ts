"use server";

import { prisma } from "@/libs/prisma"; 
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editarEmpresa(formData: FormData){
    const id = Number(formData.get("id"));

    if (!id) {
        throw new Error("ID da empresa não foi informado.");
    }

    const razaoSocial = String(formData.get("razaoSocial") ?? "").trim();
    const nomeFantasia = String(formData.get("nomeFantasia") ?? "").trim();
    const cnpj = String(formData.get("cnpj") ?? "").replace(/\D/g, "");
    const inscricaoEstadual = String(formData.get("inscricaoEstadual") ?? "").trim();
    const cep = String(formData.get("cep") ?? "").replace(/\D/g, "");
    const endereco = String(formData.get("endereco") ?? "").trim();
    const numero = String(formData.get("numero") ?? "").trim();
    const bairro = String(formData.get("bairro") ?? "").trim();
    const cidade = String(formData.get("cidade") ?? "").trim();
    const estado = String(formData.get("estado") ?? "").trim();
    const pais = String(formData.get("pais") ?? "Brasil").trim();
    const responsavelNome = String(formData.get("responsavelNome") ?? "").trim();
    const responsavelCargo = String(formData.get("responsavelCargo") ?? "").trim();
    const responsavelEmail = String(formData.get("responsavelEmail") ?? "").trim();

    await prisma.empresa.update({
        where: { id },
        data: {
            razaoSocial,
            nomeFantasia: nomeFantasia || null,
            cnpj,
            inscricaoEstadual: inscricaoEstadual || null,
            cep,
            endereco,
            numero,
            bairro,
            cidade,
            estado,
            pais,
            responsavelNome: responsavelNome || null,
            responsavelCargo: responsavelCargo || null,
            responsavelEmail: responsavelEmail || null
        }
    });

    revalidatePath(`/cadastro/empresa`);
    redirect(`/cadastro/empresa`);
}