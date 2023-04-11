import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';
import BaseModel from './BaseModel';
import { roles } from '../constants';

export default class User extends BaseModel {
  static modelName = 'user';

  static tableName = 'users';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
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
    progress: {
      type: DataTypes.STRING,
      defaultValue: 1,
    },
    office: {
      type: DataTypes.STRING,
    },
    telegram: {
      type: DataTypes.STRING,
    },
  };

  static Settings = {
    // define validators, indexes, hooks and etc here
    hooks: {
      async beforeCreate(user) {
        user.id = uuid();
      },
    },
  };

  static setupScopes() {
    this.addScope('data', () => ({
      attributes: ['id', 'name', 'email',
        'birthday', 'position', 'grade',
        'workProject', 'phone', 'hobbies',
        'hardSkills', 'description', 'progress',
        'office', 'telegram',
      ],
    }));
  }
}
