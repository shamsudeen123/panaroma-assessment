import { Sequelize, DataTypes } from 'sequelize';

// Database configuration
export const sequelize = new Sequelize('panaromaAssessment', 'root', 'Shamsudeen123%', {
    host: 'localhost',
    dialect: 'mysql',
  });
  
  // model for User
  export const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user', // Default role is 'user'
    },
  });
  
  // models for Task
  export const Task = sequelize.define('task', {
    taskName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  