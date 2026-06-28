import { notFound } from "next/navigation";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { prisma } from "@/libs/prisma";
import { editarEmpresa } from "./action";
import styles from "../../../empresa/adicionar/page.module.css";
import Link from "next/link";


const cx = (...classes: string[]) => classes.join(" ");

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

export default async function EditarEmpresa({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const empresa = await prisma.empresa.findUnique({
    where: { id: Number(id) },
  });

  if (!empresa) {
    notFound();
  }

  return (
    <div className="app-shell">
      <Sidebar ativo="cadastro" cadastroAtivo="Empresa" />

      <div className="area-principal">
        <Header />

        <main className={styles.conteudoCadastro}>
          <div className={styles.breadcrumb}>
            <span>Cadastro</span>
            <span>/</span>
            <strong>Empresa</strong>
          </div>

          <section className={styles.tituloPagina} aria-labelledby="titulo-cadastro">
            <h2 id="titulo-cadastro">Dados Cadastrais</h2>
            <p>
              Preencha as informações abaixo para registrar uma nova unidade
              corporativa.
            </p>
          </section>

          <form className={styles.formularioEmpresa} action={editarEmpresa}>
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
                <label className={cx(styles.campo, styles.campoMaior)}>
                  <span>Nome da Empresa</span>
                  <input
                    type="text"
                    name="razaoSocial"
                    defaultValue={empresa.razaoSocial}
                  />
                </label>

                <label className={cx(styles.campo, styles.campoMaior)}>
                  <span>Código da Empresa</span>
                  <input
                    type="text"
                    name="id"
                    defaultValue={empresa.id}
                    readOnly
                  />
                </label>

                <label className={cx(styles.campo, styles.campoMaior)}>
                  <span>Nome Fantasia</span>
                  <input
                    type="text"
                    name="nomeFantasia"
                    defaultValue={empresa.nomeFantasia ?? ""}
                  />
                </label>

                <label className={styles.campo}>
                  <span>CNPJ/CPF</span>
                  <input
                    type="text"
                    name="cnpj"
                    defaultValue={empresa.cnpj}
                  />
                </label>

                <label className={styles.campo}>
                  <span>Inscrição Estadual</span>
                  <input
                    type="text"
                    name="inscricaoEstadual"
                    defaultValue={empresa.inscricaoEstadual ?? ""}
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
                  <label className={styles.campo}>
                    <span>CEP</span>
                    <input type="text" name="cep" defaultValue={empresa.cep} />
                  </label>
                  

                  <label className={cx(styles.campo, styles.campoAmplo)}>
                    <span>Logradouro</span>
                    <input
                      type="text"
                      name="endereco"
                      defaultValue={empresa.endereco}
                      placeholder="Rua, Avenida, Praça..."
                    />
                  </label>

                  <label className={styles.campo}>
                    <span>Número</span>
                    <input type="text" name="numero" defaultValue={empresa.numero} placeholder="S/N" />
                  </label>

                  <label className={styles.campo}>
                    <span>País</span>
                    <input type="text" name="pais" defaultValue={empresa.pais} placeholder="Brasil" />
                  </label>

                  <label className={cx(styles.campo, styles.campoAmplo)}>
                    <span>Bairro</span>
                    <input type="text" name="bairro" defaultValue={empresa.bairro} placeholder="Centro" />
                  </label>

                  <label className={cx(styles.campo, styles.campoCidade)}>
                    <span>Cidade</span>
                    <input type="text" name="cidade" defaultValue={empresa.cidade} placeholder="São Paulo" />
                  </label>

                  <label className={styles.campo}>
                    <span>UF</span>
                    <select name="estado" defaultValue={empresa.estado}>
                      {estados.map((estado) => (
                        <option key={estado} value={estado}>
                          {estado}
                        </option>
                      ))}
                    </select>
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
                      defaultValue={empresa.responsavelNome ?? ""}
                      placeholder="Nome Completo"
                    />
                  </label>

                  <label className={styles.campo}>
                    <span>Cargo</span>
                    <input
                      type="text"
                      name="responsavelCargo"
                      defaultValue={empresa.responsavelCargo ?? ""}
                      placeholder="Diretor, Gerente..."
                    />
                  </label>

                  <label className={styles.campo}>
                    <span>E-mail</span>
                    <input
                      type="email"
                      name="responsavelEmail"
                      defaultValue={empresa.responsavelEmail ?? ""}
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
              <button type="submit" className={styles.botaoPrimario}>
                <span aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
                    <path d="M17 21v-8H7v8" />
                    <path d="M7 3v5h8" />
                  </svg>
                </span>
                Salvar Empresa
              </button>
            </div>
          </form>
        </main>

        <footer className="rodape">
          Sistema de ponto © 2024 - Gestão inteligente de recursos humanos
        </footer>
      </div>
    </div>
  );
}