import styles from "@/style/pagina-inicial.module.css";

export default function Home() {
return (
  <main>
    <section className={styles.containerCards}>
      <article  className={styles.card}>
        <div className={styles.cardHeader}>
          <img src="/trabalhando-icon.svg" alt="icone de trabalho"className={styles.icon} />
        </div>
        <h2>Trabalhando</h2>
        <p>147</p>
      </article >
        <article className={styles.card}>
        <img src="/faltantes-icon.svg" alt="icone de faltantes "className={styles.icon}/>
        <h2>Faltantes</h2>
        <p>08</p>
      </article>
        <article className={styles.card}>
        <img src="/feriados-icon.svg" alt="icone de feriados"className={styles.icon}/>
        <h2>Feriados</h2>
        <p>20</p>
      </article>
        <article className={styles.card}>
        <img src="/folga-icon.svg" alt="icone de folga"className={styles.icon}/>
        <h2>Folga</h2>
        <p>19</p>
      </article>
      
    </section>
    <section className={styles.containerGrafico}>
      <article  className={styles.grafico}>
            <h2>Presença semanal</h2>
          <div className={styles.diaSemanas}>
            <span>SEG</span>
            <span>TER</span>
            <span>QUA</span>
            <span>QUI</span>
            <span>SEX</span>
            <span>SAB</span>
            <span>DOM</span>
          </div>
      </article>

          <article className={styles.filtroData}>
            <input type="date" id="dataInicial"/>
            <p>Até</p>
            <input type="date" id="dataFinal" />
          </article>

      <article className={styles.atividadesRecentes}>
        <h2>Atividades Recentes</h2>
        <p>Acompanhe suas últimas atividades de ponto, incluindo registros de entrada e saída, faltas e folgas.</p>
      </article>
    </section>

    <section className={styles.containerFechamentoMensal}>
      <article className={styles.fechamentoMensal}>
        <h2>Fechamento Mensal</h2>
        <p>Confira um resumo do seu fechamento mensal, incluindo total de horas trabalhadas, faltantes, feriados e folgas.</p>
      </article>
    </section>
  </main>
);
}