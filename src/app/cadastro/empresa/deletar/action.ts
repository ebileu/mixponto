"use server"; 

import { prisma } from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export async function desativarEmpresa(formData: FormData) {
    const id = Number(formData.get("id"));

    if (!id) {
        throw new Error("ID da empresa não foi informado.");
    }

    await prisma.empresa.update({
        where: { id },
        data: { ativo: false }
    });
    
    revalidatePath("/cadastro/empresa");
}

export async function reativarEmpresa(formData: FormData) {
    const id = Number(formData.get("id"));

    if (!id) {
        throw new Error("ID da empresa não foi informado.");
    }

    await prisma.empresa.update({
        where: { id },
        data: { ativo: true }
    });

    revalidatePath("/cadastro/empresa");
}
