-- init.sql
-- Create the user_daily_intake_summary view if it doesn't already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_views WHERE viewname = 'user_daily_intake_summary'
  ) THEN
    EXECUTE $$
      CREATE VIEW user_daily_intake_summary AS
      SELECT
        u.user_id,
        u.name,
        i.date,
        SUM(i.amount_ml) AS total_intake_ml,
        COUNT(i.id) AS log_count
      FROM users u
      JOIN intake_logs i ON u.user_id = i.user_id
      GROUP BY u.user_id, u.name, i.date
      ORDER BY i.date DESC;
    $$;
  END IF;
END$$;
