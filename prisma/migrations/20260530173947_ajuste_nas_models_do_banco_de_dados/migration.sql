/*
  Warnings:

  - A unique constraint covering the columns `[fk_id_empresa,descricao]` on the table `Departamento` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fk_id_empresa,descricao]` on the table `Funcao` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fk_id_empresa,descricao]` on the table `Horario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fk_id_empresa` to the `Departamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_id_empresa` to the `Funcao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_id_empresa` to the `Horario` table without a default value. This is not possible if the table is not empty.
  - Made the column `compensacao` on table `Horario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Departamento" ADD COLUMN     "fk_id_empresa" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Empresa" ALTER COLUMN "inscricaoEstadual" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Funcao" ADD COLUMN     "fk_id_empresa" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Horario" ADD COLUMN     "fk_id_empresa" BIGINT NOT NULL,
ALTER COLUMN "compensacao" SET NOT NULL;

-- CreateTable
CREATE TABLE "HorarioDia" (
    "id" BIGSERIAL NOT NULL,
    "fk_id_horario" BIGINT NOT NULL,
    "diaSemana" SMALLINT NOT NULL,
    "entrada1" TIME,
    "saida1" TIME,
    "entrada2" TIME,
    "saida2" TIME,
    "folga" BOOLEAN NOT NULL DEFAULT false,
    "extra" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "HorarioDia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Departamento_fk_id_empresa_idx" ON "Departamento"("fk_id_empresa");

-- CreateIndex
CREATE UNIQUE INDEX "Departamento_fk_id_empresa_descricao_key" ON "Departamento"("fk_id_empresa", "descricao");

-- CreateIndex
CREATE INDEX "Funcao_fk_id_empresa_idx" ON "Funcao"("fk_id_empresa");

-- CreateIndex
CREATE UNIQUE INDEX "Funcao_fk_id_empresa_descricao_key" ON "Funcao"("fk_id_empresa", "descricao");

-- CreateIndex
CREATE INDEX "Funcionario_fk_id_empresa_idx" ON "Funcionario"("fk_id_empresa");

-- CreateIndex
CREATE INDEX "Funcionario_fk_id_horario_idx" ON "Funcionario"("fk_id_horario");

-- CreateIndex
CREATE INDEX "Funcionario_fk_id_funcao_idx" ON "Funcionario"("fk_id_funcao");

-- CreateIndex
CREATE INDEX "Funcionario_fk_id_departamento_idx" ON "Funcionario"("fk_id_departamento");

-- CreateIndex
CREATE INDEX "Horario_fk_id_empresa_idx" ON "Horario"("fk_id_empresa");

-- CreateIndex
CREATE UNIQUE INDEX "Horario_fk_id_empresa_descricao_key" ON "Horario"("fk_id_empresa", "descricao");

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_fk_id_empresa_fkey" FOREIGN KEY ("fk_id_empresa") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorarioDia" ADD CONSTRAINT "HorarioDia_fk_id_horario_fkey" FOREIGN KEY ("fk_id_horario") REFERENCES "Horario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcao" ADD CONSTRAINT "Funcao_fk_id_empresa_fkey" FOREIGN KEY ("fk_id_empresa") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departamento" ADD CONSTRAINT "Departamento_fk_id_empresa_fkey" FOREIGN KEY ("fk_id_empresa") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
