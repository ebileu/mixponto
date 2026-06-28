import Link from "next/link";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { prisma } from "@/libs/prisma";
import { desativarEmpresa, reativarEmpresa } from "./deletar/action";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

type EmpresasProps = {
  searchParams: Promise<{
    status?: string;
  }>;
};

function formatarDocumento(cnpj: string) {
  const apenasNumeros = cnpj.replace(/\D/g, "");

  if (apenasNumeros.length === 14) {
    return apenasNumeros.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5",
    );
  }

  if (apenasNumeros.length === 11) {
    return apenasNumeros.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
      "$1.$2.$3-$4",
    );
  }

  return cnpj;
}

export default async function Empresas({ searchParams }: EmpresasProps) {
  const { status } = await searchParams;
  const mostrarInativas = status === "inativas";

  const empresas = await prisma.empresa.findMany({
    where: { ativo: !mostrarInativas },
    orderBy: {
      razaoSocial: "asc",
    },
    select: {
      id: true,
      razaoSocial: true,
      nomeFantasia: true,
      cnpj: true,
      cidade: true,
      estado: true,
      responsavelNome: true,
      responsavelEmail: true,
      ativo: true,
    },
  });

  return (
    <div className="app-shell">
      <Sidebar ativo="cadastro" cadastroAtivo="Empresa" />

      <div className="area-principal">
        <Header />

        <main className={styles.conteudoCadastro}>
          <div className={styles.breadcrumb}>
            <span>Cadastro</span>
            <span>/</span>
            <strong>Empresas</strong>
          </div>

          <section className={styles.cabecalhoListagem} aria-labelledby="titulo-empresas">
            <div>
              <h2 id="titulo-empresas">
                {mostrarInativas ? "Empresas desativadas" : "Empresas ativas"}
              </h2>
              <p>
                {mostrarInativas
                  ? "Consulte empresas ocultas da operação principal."
                  : "Consulte as unidades corporativas cadastradas no sistema."}
              </p>
            </div>

            <div className={styles.acoesTopo}>
              <nav className={styles.filtroStatus} aria-label="Filtro de empresas">
                <Link
                  className={!mostrarInativas ? styles.filtroAtivo : undefined}
                  href="/cadastro/empresa?status=ativas"
                >
                  Ativas
                </Link>
                <Link
                  className={mostrarInativas ? styles.filtroAtivo : undefined}
                  href="/cadastro/empresa?status=inativas"
                >
                  Desativadas
                </Link>
              </nav>

              <Link className={styles.botaoPrimario} href="/cadastro/empresa/adicionar">
                Adicionar Empresa
              </Link>
            </div>
          </section>

          <section className={styles.cartaoForm}>
            {empresas.length > 0 ? (
              <div className={styles.tabelaEmpresas}>
                <div className={styles.linhaCabecalho}>
                  <span>Empresa</span>
                  <span>CNPJ/CPF</span>
                  <span>Localização</span>
                  <span>Responsável</span>
                  <span>Ações</span>
                </div>

                {empresas.map((empresa) => (
                  <article className={styles.linhaEmpresa} key={empresa.id}>
                    <div>
                      <strong>{empresa.razaoSocial}</strong>
                      <small>{empresa.nomeFantasia || "Sem nome fantasia"}</small>
                      <small>ID {empresa.id}</small>
                    </div>

                    <span>{formatarDocumento(empresa.cnpj)}</span>
                    <span>
                      {empresa.cidade} / {empresa.estado}
                    </span>

                    <div>
                      <strong>{empresa.responsavelNome || "Não informado"}</strong>
                      <small>{empresa.responsavelEmail || "Sem e-mail"}</small>
                    </div>

                    <div className={styles.acoesLinha}>
                      <Link className={styles.linkEditar} href={`/cadastro/empresa/${empresa.id}/editar`}>
                        Editar
                      </Link>

                      <form action={empresa.ativo ? desativarEmpresa : reativarEmpresa}>
                        <input type="hidden" name="id" value={empresa.id} />
                        <button
                          className={
                            empresa.ativo
                              ? styles.botaoDesativar
                              : styles.botaoReativar
                          }
                          type="submit"
                        >
                          {empresa.ativo ? "Desativar" : "Reativar"}
                        </button>
                      </form>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className={styles.estadoVazio}>
                <span className={styles.iconeCartao} aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
                    <path d="M16 8h2a2 2 0 0 1 2 2v11" />
                    <path d="M8 7h1" />
                    <path d="M8 11h1" />
                    <path d="M8 15h1" />
                    <path d="M3 21h18" />
                  </svg>
                </span>
                <h3>
                  {mostrarInativas
                    ? "Nenhuma empresa desativada"
                    : "Nenhuma empresa cadastrada"}
                </h3>
                <p>
                  {mostrarInativas
                    ? "Empresas desativadas aparecerão aqui quando forem ocultadas da listagem principal."
                    : "Adicione a primeira empresa para começar a estruturar os cadastros."}
                </p>
                {!mostrarInativas && (
                  <Link className={styles.botaoPrimario} href="/cadastro/empresa/adicionar">
                    Adicionar Empresa
                  </Link>
                )}
              </div>
            )}
          </section>
        </main>

        <footer className="rodape">
          Sistema de ponto © 2024 - Gestão inteligente de recursos humanos
        </footer>
      </div>
    </div>
  );
}
