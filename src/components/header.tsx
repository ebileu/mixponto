import Image from "next/image";

export default function Header() {
  return (
    <header className="cabecalho">
      <nav className="menu" aria-label="Barra superior">
        <form className="formPesquisa">
          <label htmlFor="search">
            <Image
              src="/lupa-icon.svg"
              alt=""
              width={24}
              height={18}
              className="lupaPesquisa"
            />
          </label>

          <input
            id="search"
            className="inputPesquisa"
            type="search"
            placeholder="Buscar funcionário..."
          />
        </form>

        <div className="infoUsuario">
          <button
            className="botao-notificacao"
            type="button"
            aria-label="Notificações"
          >
            <Image
              id="notificacao-icon"
              src="/notificacao-icon.svg"
              alt=""
              width={20}
              height={20}
            />
          </button>

          <div className="divisor-header" aria-hidden="true" />

          <div className="perfilTexto">
            <p className="nomeUsuario">Joãozinho do RH</p>
            <p className="cargo">Administrador</p>
          </div>

          <Image
            id="foto-usuario"
            src="/foto-usuario.png"
            alt="Foto do usuário"
            width={40}
            height={40}
          />
        </div>
      </nav>
    </header>
  );
}
