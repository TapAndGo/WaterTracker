import user from '../Models/user.Model.js';
import hydration_goals from '../Models/hydration_goals.Model.js';
import CustomCup from './custom_cups.Model.js';

// Define Relations
user.hasMany(hydration_goals, { foreignKey: 'user_id' });
hydration_goals.belongsTo(user, { foreignKey: 'user_id' });

user.hasMany(CustomCup, { foreignKey: 'user_id' });
CustomCup.belongsTo(user, { foreignKey: 'user_id' });

export { user, hydration_goals, CustomCup };