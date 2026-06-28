export type CampoErroEmpresa = Partial<
    Record<
        | "razaoSocial"
        | "cnpj"
        | "cep"
        | "endereco"
        | "numero"
        | "bairro"
        | "cidade"
        | "estado"
        | "pais",
        string
    >
>;

type DadosObrigatoriosEmpresa = {
    razaoSocial: string;
    cnpj: string;
    cep: string;
    endereco: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    pais: string;
};

export class EmpresaValidationError extends Error {
    erros: CampoErroEmpresa;

    constructor(erros: CampoErroEmpresa) {
        super("Existem campos obrigatorios nao preenchidos.");
        this.name = "EmpresaValidationError";
        this.erros = erros;
    }
}

export function validarCamposObrigatoriosEmpresa(
    dados: DadosObrigatoriosEmpresa,
): void {
    const erros: CampoErroEmpresa = {};
    const mensagemObrigatoria = "Campo obrigatorio.";

    if (!dados.razaoSocial.trim()) erros.razaoSocial = mensagemObrigatoria;
    if (!dados.cnpj.trim()) erros.cnpj = mensagemObrigatoria;
    if (!dados.cep.trim()) erros.cep = mensagemObrigatoria;
    if (!dados.endereco.trim()) erros.endereco = mensagemObrigatoria;
    if (!dados.numero.trim()) erros.numero = mensagemObrigatoria;
    if (!dados.bairro.trim()) erros.bairro = mensagemObrigatoria;
    if (!dados.cidade.trim()) erros.cidade = mensagemObrigatoria;
    if (!dados.estado.trim()) erros.estado = mensagemObrigatoria;
    if (!dados.pais.trim()) erros.pais = mensagemObrigatoria;

    if (Object.keys(erros).length > 0) {
        throw new EmpresaValidationError(erros);
    }
}

export function validarCNPJ(cnpj: string): string{
    const apenasNumeros = cnpj.replace(/\D/g, "");

    if (apenasNumeros.length !== 14) {
        throw new Error("CNPJ não válido, por favor, preencha novamente.")
    }

    return apenasNumeros;
}
