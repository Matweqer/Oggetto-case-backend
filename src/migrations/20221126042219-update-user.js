import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.addColumn('users', 'progress', {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    }, { transaction });
    await queryInterface.addColumn('users', 'office', {
      type: DataTypes.STRING,
    }, { transaction });
    await queryInterface.addColumn('users', 'telegram', {
      type: DataTypes.STRING,
    }, { transaction });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}

export async function down(queryInterface) {
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.removeColumn('users', 'progress', { transaction });
    await queryInterface.removeColumn('users', 'office', { transaction });
    await queryInterface.removeColumn('users', 'telegram', { transaction });

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}
