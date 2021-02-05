// history of changes on database

import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAppointments1608763005909 implements MigrationInterface {

    // criar mudancas - crie campo, mudei de string para int
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'appointments',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()', // necessario para gerar uuid aparentemente
            },
            {
              name: 'provider',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'date',
              type: 'timestamp with time zone',
              isNullable: false,
            }
          ]
        })
      )
    }

    // voltar das mudancas - deletei campo, voltei de int para string
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('appointments');
    }
}

// Example of flow

// yarn typeorm migration:create -n CreateAppointments para criar aqui, e config de orm e packjson

// yarn typeorm migration:run -> cria uma versão

// -- SE NÃO TIVER SUBIDO EM ALGUM REPO TIPO GIT E A VERSAO ESTIVER APENAS LOCALMENTE
// -- PODE REVERTER A MIGRACAO COMO ABAIXO
// yarn typeorm migration:revert -> reverter a ultima migração
// yarn typeorm migration:show -> mostrar migrações e verá q ta sem a versao anterior


// --- entendendo migrations ---
// Linha do tempo
// 1ª semana: Tabela Agendamentos
// 2ª semana: Tabela de user
// (NOVO DEV) 3ª semana: Mudanca no tipo de dado de agendamento
// 4ª semana: Tabela de compras
// Migrations mantem todas as versões do banco de dados (tipo git local para database)
