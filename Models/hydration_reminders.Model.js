// models/hydration_reminder.js
import { DataTypes } from 'sequelize';
import sequelize from '../Utils/db.js';
import user from './user.Model.js';

const hydration_reminder = sequelize.define('hydration_reminder', {
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
  reminder_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  amount_ml: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: { type: DataTypes.ENUM('pending', 'sent', 'completed'), defaultValue: 'pending' },
}, {
  tableName: 'hydration_reminders',
  timestamps: false,
  indexes: [
    { fields: ['user_id'] },
    { fields: ['reminder_time'] }
  ]
});

export default hydration_reminder;
