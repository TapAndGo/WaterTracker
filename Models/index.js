import user from '../Models/user.Model.js';
import hydration_goals from '../Models/hydration_goals.Model.js';
import IntakeLog from '../Models/intake_logs.Model.js';
import DailySummary from '../Models/daily_summary.Model.js';
import hydration_reminder from '../Models/hydration_reminders.Model.js';


// Define Relations
user.hasMany(hydration_goals, { foreignKey: 'user_id' });
hydration_goals.belongsTo(user, { foreignKey: 'user_id' });

user.hasMany(IntakeLog, { foreignKey: 'user_id' });
IntakeLog.belongsTo(user, { foreignKey: 'user_id' });

user.hasMany(DailySummary, { foreignKey: 'user_id' });
DailySummary.belongsTo(user, { foreignKey: 'user_id' });

user.hasMany(hydration_reminder, { foreignKey: 'user_id' });
hydration_reminder.belongsTo(user, { foreignKey: 'user_id' });


export { user, hydration_goals , IntakeLog , DailySummary , hydration_reminder };