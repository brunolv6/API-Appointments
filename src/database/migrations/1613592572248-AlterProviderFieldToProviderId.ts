import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AlterProviderFieldToProviderId1613592572248 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('appointments', 'provider');

      await queryRunner.addColumn(
        'appointments',
        new TableColumn({
          name: 'provider_id',
          type: 'uuid',
          isNullable: true, // CASCADE, permite caso o provider delte a conta
      }));

      await queryRunner.createForeignKey(
        'appointments',
        new TableForeignKey({
          name: 'AppointmentProvider', // name to use as reference in the future or in the function down at bottom
          columnNames: ['provider_id'], // nome da coluna desta tabela que recebera a foreign key
          referencedColumnNames: ['id'], // nome na outra tabelas, que no caso é no users
          referencedTableName: 'users', // nome da outra tabela
          onDelete: 'SET NULL',  // se o usuario for deletado, aqui a foreign key será null
          onUpdate: 'CASCADE' // se ocorrer mudanca no id da tabela users, neste caso, isto mudará o provider_id nesta tabela appointment
        }),
      );
    }

    // em ordem inversa do function up
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

      await queryRunner.dropColumn('appointments', 'provider_id');

      await queryRunner.addColumn(
        'appointments',
        new TableColumn({
          name: 'provider',
          type: 'varchar'
        }),
      );
    }
}
