import Link from "next/link";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

const indicadores = [
  { rotulo: "Empresas", valor: "0", detalhe: "unidades cadastradas" },
  { rotulo: "Funcionários", valor: "0", detalhe: "colaboradores ativos" },
  { rotulo: "Pendências", valor: "0", detalhe: "ajustes em aberto" },
];

export default function Home() {
  return (
    <div className="app-shell">
      <Sidebar ativo="inicio" />

      <div className="area-principal">
        <Header />

        <main className="conteudo-home">
          <section className="painel-boas-vindas" aria-labelledby="titulo-home">
            <div>
              <span className="eyebrow-home">Visão geral</span>
              <h2 id="titulo-home">MIXPONTO</h2>
              <p>
                Acompanhe os cadastros principais e acesse rapidamente as telas
                de configuração do Mixponto.
              </p>
            </div>

            <Link className="botao-primario botao-home" href="/cadastro/empresa">
              Ver Empresas
            </Link>
          </section>

          <section className="grade-indicadores" aria-label="Indicadores gerais">
            {indicadores.map((indicador) => (
              <article className="cartao-indicador" key={indicador.rotulo}>
                <span>{indicador.rotulo}</span>
                <strong>{indicador.valor}</strong>
                <p>{indicador.detalhe}</p>
              </article>
            ))}
          </section>

          <section className="cartao-form atalhos-home">
            <div className="cabecalho-cartao">
              <span className="icone-cartao" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </span>
              <h3>Cadastros</h3>
            </div>

            <div className="grade-atalhos">
              <Link href="/cadastro/empresa">Empresa</Link>
              <Link href="#">Horário</Link>
              <Link href="#">Função</Link>
              <Link href="#">Departamento</Link>
              <Link href="#">Funcionário</Link>
              <Link href="#">Feriado</Link>
              <Link href="#">Justificativa</Link>
            </div>
          </section>
        </main>

        <footer className="rodape">
          Sistema de ponto © 2024 - Gestão inteligente de recursos humanos
        </footer>
      </div>
    </div>
  );
}
