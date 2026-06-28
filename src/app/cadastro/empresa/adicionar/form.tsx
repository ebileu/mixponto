"use client";

import { useActionState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { cadastrarEmpresa, type EstadoCadastro } from "./action";

const estadoInicial: EstadoCadastro = {};

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

type CampoEmpresa = keyof NonNullable<EstadoCadastro["erros"]>;

const estados = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

function MensagemErro({
  id,
  mensagem,
}: {
  id: string;
  mensagem?: string;
}) {
  return (
    <p
      id={id}
      className={cx(styles.mensagemErro, !mensagem && styles.mensagemErroVazia)}
      role={mensagem ? "alert" : undefined}
      aria-live="polite"
    >
      {mensagem}
    </p>
  );
}

export default function FormularioEmpresa() {
  const [estado, formAction, pending] = useActionState(
    cadastrarEmpresa,
    estadoInicial,
  );

  const erroCampo = (campo: CampoEmpresa) => estado.erros?.[campo];
  const idErro = (campo: CampoEmpresa) => `erro-${campo}`;
  const classeCampo = (
    campo: CampoEmpresa,
    ...classesExtras: Array<string | false | undefined>
  ) =>
    cx(
      styles.campo,
      styles.campoComFeedback,
      ...classesExtras,
      erroCampo(campo) && styles.campoComErro,
    );
  const propsErro = (campo: CampoEmpresa) => {
    const mensagem = erroCampo(campo);

    return {
      "aria-invalid": Boolean(mensagem),
      "aria-describedby": mensagem ? idErro(campo) : undefined,
    };
  };

  return (
    <form className={styles.formularioEmpresa} action={formAction}>
      <section className={cx(styles.cartaoForm, styles.cartaoGeral)}>
        <div className={styles.cabecalhoCartao}>
          <span className={styles.iconeCartao} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
              <path d="M16 8h2a2 2 0 0 1 2 2v11" />
              <path d="M8 7h1" />
              <path d="M8 11h1" />
              <path d="M8 15h1" />
              <path d="M12 7h1" />
              <path d="M12 11h1" />
              <path d="M12 15h1" />
              <path d="M3 21h18" />
            </svg>
          </span>
          <h3>Informações Gerais</h3>
        </div>

        <div className={cx(styles.gradeForm, styles.gradeGeral)}>
          <label className={classeCampo("razaoSocial", styles.campoMaior)}>
            <span>Nome da Empresa</span>
            <input
              type="text"
              name="razaoSocial"
              placeholder="Ex: sua razão social aqui"
              {...propsErro("razaoSocial")}
            />
            <MensagemErro
              id={idErro("razaoSocial")}
              mensagem={erroCampo("razaoSocial")}
            />
          </label>

          <label className={cx(styles.campo, styles.campoMaior)}>
            <span>Nome Fantasia</span>
            <input
              type="text"
              name="nomeFantasia"
              placeholder="Ex: nome fantasia da empresa"
            />
          </label>

          <label className={classeCampo("cnpj")}>
            <span>CNPJ/CPF</span>
            <input
              type="text"
              name="cnpj"
              placeholder="00.000.000/0000-00"
              {...propsErro("cnpj")}
            />
            <MensagemErro id={idErro("cnpj")} mensagem={erroCampo("cnpj")} />
          </label>

          <label className={styles.campo}>
            <span>Inscrição Estadual</span>
            <input
              type="text"
              name="inscricaoEstadual"
              placeholder="Isento ou Nº"
            />
          </label>
        </div>
      </section>

      <div className={styles.gradeCartoes}>
        <section className={styles.cartaoForm}>
          <div className={styles.cabecalhoCartao}>
            <span className={styles.iconeCartao} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <h3>Localização</h3>
          </div>

          <div className={cx(styles.gradeForm, styles.gradeLocalizacao)}>
            <label className={classeCampo("cep")}>
              <span>CEP</span>
              <input
                type="text"
                name="cep"
                placeholder="00000-000"
                {...propsErro("cep")}
              />
              <MensagemErro id={idErro("cep")} mensagem={erroCampo("cep")} />
            </label>

            <label className={classeCampo("endereco", styles.campoAmplo)}>
              <span>Logradouro</span>
              <input
                type="text"
                name="endereco"
                placeholder="Rua, Avenida, Praça..."
                {...propsErro("endereco")}
              />
              <MensagemErro
                id={idErro("endereco")}
                mensagem={erroCampo("endereco")}
              />
            </label>

            <label className={classeCampo("numero")}>
              <span>Número</span>
              <input
                type="text"
                name="numero"
                placeholder="S/N"
                {...propsErro("numero")}
              />
              <MensagemErro
                id={idErro("numero")}
                mensagem={erroCampo("numero")}
              />
            </label>

            <label className={classeCampo("pais")}>
              <span>País</span>
              <input
                type="text"
                name="pais"
                placeholder="Brasil"
                {...propsErro("pais")}
              />
              <MensagemErro id={idErro("pais")} mensagem={erroCampo("pais")} />
            </label>

            <label className={classeCampo("bairro", styles.campoAmplo)}>
              <span>Bairro</span>
              <input
                type="text"
                name="bairro"
                placeholder="Centro"
                {...propsErro("bairro")}
              />
              <MensagemErro
                id={idErro("bairro")}
                mensagem={erroCampo("bairro")}
              />
            </label>

            <label className={classeCampo("cidade", styles.campoCidade)}>
              <span>Cidade</span>
              <input
                type="text"
                name="cidade"
                placeholder="São Paulo"
                {...propsErro("cidade")}
              />
              <MensagemErro
                id={idErro("cidade")}
                mensagem={erroCampo("cidade")}
              />
            </label>

            <label className={classeCampo("estado")}>
              <span>UF</span>
              <select name="estado" defaultValue="SP" {...propsErro("estado")}>
                {estados.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
              <MensagemErro
                id={idErro("estado")}
                mensagem={erroCampo("estado")}
              />
            </label>
          </div>
        </section>

        <section className={styles.cartaoForm}>
          <div className={styles.cabecalhoCartao}>
            <span className={styles.iconeCartao} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
                <path d="M8 7h6" />
                <path d="M8 11h4" />
                <path d="m15 19 2 2 4-4" />
                <path d="M16 15h5v5" />
              </svg>
            </span>
            <h3>Assinatura</h3>
          </div>

          <div className={cx(styles.gradeForm, styles.gradeAssinatura)}>
            <label className={styles.campo}>
              <span>Nome do Responsável</span>
              <input
                type="text"
                name="responsavelNome"
                placeholder="Nome Completo"
              />
            </label>

            <label className={styles.campo}>
              <span>Cargo</span>
              <input
                type="text"
                name="responsavelCargo"
                placeholder="Diretor, Gerente..."
              />
            </label>

            <label className={styles.campo}>
              <span>E-mail</span>
              <input
                type="email"
                name="responsavelEmail"
                placeholder="responsavel@empresa.com.br"
              />
            </label>

            <p className={styles.avisoAssinatura}>
              <span aria-hidden="true">i</span>
              Este responsável será o contato principal para assinaturas
              digitais de documentos de RH.
            </p>
          </div>
        </section>
      </div>

      <div className={styles.acoesFormulario}>
        <Link href="/cadastro/empresa" className={styles.botaoSecundario}>
          Cancelar
        </Link>
        <button
          type="submit"
          className={styles.botaoPrimario}
          disabled={pending}
        >
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
              <path d="M17 21v-8H7v8" />
              <path d="M7 3v5h8" />
            </svg>
          </span>
          {pending ? "Salvando..." : "Salvar Empresa"}
        </button>
      </div>
    </form>
  );
}
