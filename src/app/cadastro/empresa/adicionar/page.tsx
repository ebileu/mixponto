import Link from "next/link";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import styles from "./page.module.css";

import FormularioEmpresa from "./form";

export default function CadastroEmpresa() {
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

          <FormularioEmpresa></FormularioEmpresa>
        </main>

        <footer className="rodape">
          Sistema de ponto © 2024 - Gestão inteligente de recursos humanos
        </footer>
      </div>
    </div>
  );
}
