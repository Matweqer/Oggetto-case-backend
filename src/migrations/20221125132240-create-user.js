import { DataTypes } from 'sequelize';
import { roles } from '../constants';

export async function up(queryInterface) {
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      role: {
        type: DataTypes.ENUM(...Object.values(roles)),
        allowNull: false,
        defaultValue: roles.user,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        protected: true,
      },
      birthday: {
        type: DataTypes.DATEONLY,
      },
      position: {
        type: DataTypes.STRING,
      },
      grade: {
        type: DataTypes.STRING,
      },
      workProject: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      hobbies: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      hardSkills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      description: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
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
    await queryInterface.dropTable('users', { transaction });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}
