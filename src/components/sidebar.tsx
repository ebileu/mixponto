export default function Sidebar() {
  return (
<aside className="barraLateral">
        
        <nav>
            <h1>Sistema de Ponto</h1>

            <ul>
                <div className="sessao-inicio">
                    <li>
                        <a href="#"><img src="/inicio-icon.svg" alt="" className="img-home" />Inicio</a>
                    </li>
                </div>

                <div className="sessao-movimentacao">
                    <li>
                        <a href=""><img src="/movimentacao-icon.svg" alt="" className="img-movimentacao"/> Movimentações</a>
                    </li>
                </div>

                <div className="sessao-configuracao">
                    <li>
                        <a href=""><img src="/configuracoes-icon.svg" alt="" className="img-config"/>Configurações</a>
                        <ul>
                        </ul>
                    </li>
                </div>
            </ul>
        </nav>
    </aside>

  );
} 