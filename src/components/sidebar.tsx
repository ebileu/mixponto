import Image from "next/image";
import Link from "next/link";

type SidebarProps = {
  ativo?: "inicio" | "cadastro";
  cadastroAtivo?: string;
};

const itensCadastro: Array<{ nome: string; href: string }> = [
  { nome: "Empresa", href: "/cadastro/empresa" },
  { nome: "Horário", href: "#" },
  { nome: "Função", href: "#" },
  { nome: "Departamento", href: "#" },
  { nome: "Funcionário", href: "#" },
  { nome: "Feriado", href: "#" },
  { nome: "Justificativa", href: "#" },
];

export default function Sidebar({
  ativo = "inicio",
  cadastroAtivo,
}: SidebarProps) {
  const cadastroSelecionado = ativo === "cadastro";

  return (
    <aside className="barraLateral">
      <nav aria-label="Menu principal">
        <h1>MIXPONTO</h1>

        <ul className="menu-lateral">
          <li>
            <Link
              href="/"
              className={`item-menu ${
                ativo === "inicio" ? "item-menu-ativo" : ""
              }`}
              aria-current={ativo === "inicio" ? "page" : undefined}
            >
              <Image src="/inicio-icon.svg" alt="" width={18} height={18} />
              Início
            </Link>
          </li>

          <li>
            <Link href="#" className="item-menu">
              <Image
                src="/movimentacao-icon.svg"
                alt=""
                width={18}
                height={18}
              />
              Movimentações
            </Link>
          </li>

          <li className="grupo-cadastro">
            <Link
              href="/cadastro/empresa"
              className={`item-menu ${
                cadastroSelecionado ? "item-menu-ativo" : ""
              }`}
              aria-current={cadastroSelecionado ? "page" : undefined}
            >
              <span className="icone-cadastro-menu" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M19 8v6" />
                  <path d="M22 11h-6" />
                </svg>
              </span>
              Cadastro
            </Link>

            <ul className="submenu-cadastro" aria-label="Submenu de cadastro">
              {itensCadastro.map((item) => (
                <li key={item.nome}>
                  <Link
                    href={item.href}
                    className={
                      cadastroAtivo === item.nome ? "submenu-ativo" : undefined
                    }
                  >
                    <span className="icone-cadastro-menu" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M19 8v6" />
                        <path d="M22 11h-6" />
                      </svg>
                    </span>
                    {item.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
