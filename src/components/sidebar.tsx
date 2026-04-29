export default function Sidebar() {
return (
    <aside className="barraLateral">
        <nav>
            <h1>Sistema de Ponto</h1>

            <ul>
                <li className="sessao-inicio">
                    <a href="/teste.tsx"><img src="/inicio-icon.svg" alt="Início" /> Início</a>
                </li>
                <li className="sessao-movimentacao">
                    <a href="#"><img src="/movimentacao-icon.svg" alt="Movimentações" /> Movimentações</a>
                </li>
                <li className="sessao-configuracao">
                    <a href="#"><img src="/configuracoes-icon.svg" alt="Configurações" /> Configurações</a>
                </li>
            </ul>
        </nav>
    </aside>
);
} 