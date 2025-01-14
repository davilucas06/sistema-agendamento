-- CreateTable
CREATE TABLE "Servicos" (
    "id" SERIAL NOT NULL,
    "tipoServico" TEXT NOT NULL,

    CONSTRAINT "Servicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agendamento" (
    "id" SERIAL NOT NULL,
    "nomeCliente" TEXT NOT NULL,
    "dataAgen" TEXT NOT NULL,
    "horaAgen" TEXT NOT NULL,
    "idServico" INTEGER NOT NULL,
    "idSalao" INTEGER NOT NULL,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Salao" (
    "id" SERIAL NOT NULL,
    "nomeSalao" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "Salao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_idServico_fkey" FOREIGN KEY ("idServico") REFERENCES "Servicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_idSalao_fkey" FOREIGN KEY ("idSalao") REFERENCES "Salao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
