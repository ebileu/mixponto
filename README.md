# Mixponto
Começo de desenvolvimento do software de ponto web para a empresa Mix Telecomunicações, este documento apresenta os requisitos funcionais do sistema de controle de jornada a ser desenvolvido, seguindo boas práticas de arquitetura e design de software. O sistema de ponto tem como objetivo gerenciar o controle de jornada de trabalho de funcionários de diferentes empresas, com a possibilidade de registrar entradas e saídas de forma eficiente, gerar relatórios de cálculos de horas, permitir justificativas e fornecer funcionalidades de administração e edição de registros de ponto.. 

### Escopo
O sistema terá uma estrutura simples, com um número reduzido de entidades e funcionalidades focadas no controle de jornada. Algumas limitações serão aplicadas, como a ausência de escalas ou ciclos de trabalho complexos e cálculos de banco de horas. Entre as principais funcionalidades previstas estão:
 - Cadastro de funcionários, horários e justificativas;
 - Gerenciamento de horários de trabalho;
 - Controle de horas da jornada de trabalho do funcinonário;
 - Geração de relatórios personalizados;

## Requisitos Funcionais
### RF001 – Cadastro de Empresas
 - O sistema deve permitir o cadastro e edição de uma ou mais empresas
 - **Entrada:** Nome, inscrição estadual, CNPJ/CPF, campos de endereço, nome, cargo e e-mail do responsável pela assinatura de relatórios.
 - **Processamento:** Validação de campos obrigatórios e checagem de duplicidade.
 - **Saída:** Cadastrado com sucesso ou erro.
### RF002 – Cadastro de Horários
 - O sistema deve permitir o cadastro e edição de horários, sendo eles por carga diária ou definindo as entradas e saídas, controle de tolerâncias e compensação.
 - Entrada: Descrição, entradas e saídas (máximo de cinco) ou carga diária, informar o dia que é extra ou folga
 - Processamento: Validação de campos obrigatórios, confirmação se os horários inseridos estão no formato correto.
 - Saída: Cadastrado com sucesso ou erro.
### RF003 – Cadastro de Funções
 - O sistema deve permitir o cadastro e edição de funções.
 - Entrada: Descrição
 - Processamento: Checagem de duplicidade.
 - Saída: Cadastrado com sucesso ou erro.
### RF004 – Cadastro de Departamentos
 - O sistema deve permitir o cadastro e edição de departamentos.
 - Entrada: Descrição
 - Processamento: Checagem de duplicidade.
 - Saída: Cadastrado com sucesso ou erro.
### RF005 – Cadastro de Feriados
 - O sistema deve permitir o cadastro e edição de feriados.
 - Entrada: Descrição, data, informar se será para uma empresa específica.
 - Processamento: Checagem de duplicidade.
 - Saída: Cadastrado com sucesso ou erro.
### RF006 – Cadastro de Justificativas
 - O sistema deve permitir o cadastro e edição de justificativas
 - Entrada: Nome abreviado e completo, descrição, informar se será contabilizado como falta em vez de abonar.
 - Processamento: Checagem de duplicidade.
 - Saída: Cadastrado com sucesso ou erro.
### RF007 – Cadastro de Funcionários
 - O sistema deve permitir o cadastro e edição de funcionários.
 - Entrada: Número de folha, nome, cpf, admissão, vincular a: empresa, horário, cargo, departamento, etc.
 - Processamento: Validação de campos obrigatórios e checagem de duplicidade.
 - Saída: Cadastrado com sucesso ou erro.
### RF008 – Gerenciamento de Funcionários Demitidos
 - O sistema deve permitir que o usuário possa listar, editar e até possívelmente reativar os funcionários que foram desligados da empresa.
 - Entrada: Data de demissão, data de admissão.
 - Processamento: Validação do campo de data.
 - Saída: Cadastrado com sucesso ou erro.
### RF009 – Inclusão de Afastamentos
 - O sistema deve permitir inclusão de afastamentos dentro da tela de cadastro do funcionário.
 - Entrada: Selecionar a justificativa, data inicial, data final e observação opcional.
 - Processamento: Validação se não há afastamentos ou abonos no período selecionado.
 - Saída: Incluído com sucesso ou erro.
### RF010 – Inclusão/Exclusão de Registros Manuais
 - O sistema deve permitir inclusão de batidas manuais na tela de cartão ponto.
 - Entrada: Horário, motivo da inclusão manual.
 - Processamento: Validação se o horário está no formato correto.
 - Saída: Incluído com sucesso ou erro.
### RF011 – Exclusão de Registros Originais
 - O sistema deve permitir a exclusão de batidas originais e manter um backup para futuras recuperações.
 - Entrada: Motivo da exclusão.
 - Processamento: Validação se o campo já está vazio.
 - Saída: Exclusão bem-sucedida.
### RF012 – Gerar Relatório de Cálculos
 - O sistema deve permitir gerar relatórios em pdf ou excel da tela de cálculos onde o usuário informa quais colunas devem ir para o relatório.
 - Entrada: Colunas: Horas normais, horas extras, horas faltas, carga horaria, noturno, horas noturnas extras, total,.
 - Processamento: Gerar arquivo e permitir salvar e selecionar diretório na máquina
 - Saída: Relatório gerado com sucesso.
### RF013 – Gerenciamento de Usuários
 - O sistema deve permitir cadastrar usuários de acesso ao sistema.
 - Entrada: Nome, senha, nível de permissão.
 - Processamento: Validação de campos obrigatórios e checagem de duplicidade.
 - Saída: Usuário cadastrado com sucesso.
### RF014 – Registro de Ponto via Aplicativo
 - O sistema deve receber os registros de ponto incluídos no aplicativo.
 - Entrada: Batidas.
 - Processamento: Validação do intervalo mínimo de 5 minutos entre uma batida e outra.
 - Saída: Registros sincronizados.

## Requisitos Não Funcionais
### RNF001 – Aplicação Desktop e Mobile
- O sistema será uma aplicação desktop, com um aplicativo mobile disponível apenas para os funcionários registrarem o ponto.
### RNF002 – Segurança dos Registros de Ponto
- O sistema deve ser seguro, garantindo que apenas administradores possam realizar alterações nos registros de ponto.
### RNF003 – Gestão de Múltiplas Empresas
- O sistema deve permitir a gestão de múltiplas empresas de forma independente.
### RNF004 – Interface Intuitiva
- A interface do usuário deve ser intuitiva e de fácil navegação.
### RNF005 – Exportação de Relatórios
- O sistema deve permitir a exportação de relatórios em formato PDF.

### Tecnologias a utilizar
 - NODE JS (Versão 25.9)
 - TYPESCRIPT (Para desenvolvimento do back e front end, podendo criar rotas / endpoints) 
 - POSTGRESSSQL (Para gerenciamento do banco de dados e relacionamento das entidades)
 - POSTMAN (Para testar as rotas de API que foram criadas)
 - VITEST (Para testar as regras de negócios)



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# orn
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
