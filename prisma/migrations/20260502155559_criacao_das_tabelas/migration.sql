-- CreateEnum
CREATE TYPE "TipoCarga" AS ENUM ('DIARIA', 'SEMANAL', 'MENSAL', 'CICLICA');

-- CreateTable
CREATE TABLE "Funcionario" (
    "id" BIGSERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "cpf" CHAR(11) NOT NULL,
    "pis" CHAR(11) NOT NULL,
    "dataAdmissao" DATE NOT NULL,
    "dataDemissao" DATE,
    "fk_id_empresa" BIGINT NOT NULL,
    "fk_id_horario" BIGINT NOT NULL,
    "fk_id_funcao" BIGINT NOT NULL,
    "fk_id_departamento" BIGINT NOT NULL,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" BIGSERIAL NOT NULL,
    "razaoSocial" VARCHAR(255) NOT NULL,
    "cnpj" CHAR(14) NOT NULL,
    "endereco" VARCHAR(255) NOT NULL,
    "bairro" VARCHAR(255) NOT NULL,
    "cidade" VARCHAR(255) NOT NULL,
    "cep" CHAR(8) NOT NULL,
    "estado" CHAR(2) NOT NULL,
    "pais" VARCHAR(255) NOT NULL,
    "nomeFantasia" VARCHAR(255) NOT NULL,
    "inscricaoEstadual" INTEGER,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horario" (
    "id" BIGSERIAL NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "compensacao" BOOLEAN NOT NULL DEFAULT false,
    "carga" "TipoCarga" NOT NULL DEFAULT 'SEMANAL',
    "tolerancia" SMALLINT NOT NULL,

    CONSTRAINT "Horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcao" (
    "id" BIGSERIAL NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,

    CONSTRAINT "Funcao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departamento" (
    "id" BIGSERIAL NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_cpf_key" ON "Funcionario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_pis_key" ON "Funcionario"("pis");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cnpj_key" ON "Empresa"("cnpj");

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_fk_id_empresa_fkey" FOREIGN KEY ("fk_id_empresa") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_fk_id_horario_fkey" FOREIGN KEY ("fk_id_horario") REFERENCES "Horario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_fk_id_funcao_fkey" FOREIGN KEY ("fk_id_funcao") REFERENCES "Funcao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_fk_id_departamento_fkey" FOREIGN KEY ("fk_id_departamento") REFERENCES "Departamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
