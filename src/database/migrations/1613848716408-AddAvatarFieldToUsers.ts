import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddAvatarFieldToUsers1613848716408 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.addColumn(
        'users',
        new TableColumn({
          name: 'avatar',
          type: 'varchar',
          isNullable: true, // coluna nova tem que permitir null se não da problema com os existentes
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('users', 'avatar');
    }

}
