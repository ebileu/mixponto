export default function Home() {
return (
  <main>
    <section className="containerCards">
      <article  className="card">
        <h2>Trabalhando</h2>
        <p>Registre seu ponto de entrada e saída de forma rápida e fácil.</p>
      </article >
        <article className="card">
        <h2>Faltantes</h2>
        <p>Registre seu ponto de entrada e saída de forma rápida e fácil.</p>
      </article>
        <article className="card">
        <h2>Feriados</h2>
        <p>Registre seu ponto de entrada e saída de forma rápida e fácil.</p>
      </article>
        <article className="card">
        <h2>Folga</h2>
        <p>Registre seu ponto de entrada e saída de forma rápida e fácil.</p>
      </article>
      
    </section>
    <section className="containerGrafico">
      <article  className="grafico">
        <h2>Gráfico de Horas</h2>
        <p>Visualize suas horas trabalhadas, faltantes, feriados e folgas em um gráfico interativo.</p>
      </article>

      <article className="atividadesRecentes">
        <h2>Atividades Recentes</h2>
        <p>Acompanhe suas últimas atividades de ponto, incluindo registros de entrada e saída, faltas e folgas.</p>
      </article>
    </section>

    <section className="containerFechamentoMensal">
      <article className="fechamentoMensal">
        <h2>Fechamento Mensal</h2>
        <p>Confira um resumo do seu fechamento mensal, incluindo total de horas trabalhadas, faltantes, feriados e folgas.</p>
      </article>
    </section>
  </main>
);
}