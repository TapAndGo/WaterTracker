import sequelize from "../Utils/db.js";

export default async function ensureViewExists() {
  const [result] = await sequelize.query(`
    SELECT 1 FROM pg_views WHERE viewname = 'user_daily_intake_summary';
  `);

  if (!result || result.length === 0) {
    console.log("🔧 View missing — recreating user_daily_intake_summary...");
    await sequelize.query(`
      CREATE OR REPLACE VIEW user_daily_intake_summary AS
      SELECT
        u.user_id,
        i.date,
        SUM(i.amount_ml) AS total_intake_ml,
        COUNT(i.id) AS log_count
      FROM users u
      JOIN intake_logs i ON u.user_id = i.user_id
      GROUP BY u.user_id, i.date
      ORDER BY i.date DESC;
    `);
  } else {
    console.log("✅ View user_daily_intake_summary exists.");
  }
}
