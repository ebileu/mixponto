export default function Header() {
return (
<header className="cabecalho">
    <nav className="menu">
        <form className="formPesquisa">
            <label htmlFor="search"> 
                <img src="/lupa-icon.svg" alt="icone da lupa" className="lupaPesquisa"/> 
            </label>

            <input className="inputPesquisa" type="search" placeholder="Pesquisar" />
        </form>

    
        <div className="infoUsuario">
        <img id="notificacao-icon" src="/notificacao-icon.svg" alt="icone de notificação" />
        <div className="perfilTexto">
            <p className="cargo">Administrador</p>
            <p className="nomeUsuario">Joãozinho do RH</p>
        </div>
        <img id="foto-usuario" src="/foto-usuario.png" alt="Foto do usuario"/>
        </div>
    </nav>
</header>
);
}