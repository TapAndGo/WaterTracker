// models/intake_logs.js
import { DataTypes } from 'sequelize';
import sequelize from '../Utils/db.js';
import user from './user.Model.js';

const IntakeLog = sequelize.define('IntakeLog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: user,
      key: 'user_id'
    }
  },
  amount_ml: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'intake_logs',
  timestamps: false,
  indexes: [
    { fields: ['user_id'] },
    { fields: ['date'] }
  ]
});

export default IntakeLog;
