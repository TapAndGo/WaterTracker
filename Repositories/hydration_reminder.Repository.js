import {hydration_reminder} from '../Models/index.js';
import { Op } from "sequelize";

export async function generateHydrationRemindersRepository(user) {
  const { user_id, wake_up_time, sleep_time } = user;

  // Fetch goal from user or hydration_goals table
  const goalMl = user.hydration_goal || 1000; // default 1L if not set

  // Calculate total awake time in hours
  const awakeHours = getAwakeHours(wake_up_time, sleep_time);

  // --- Smart logic ---
  // We want at least one reminder every 1.5–3 hours, depending on total awake time.
  // e.g. 16 awake hours → about 6–10 reminders.
  const minInterval = 1.5; // hours
  const maxInterval = 3; // hours
  const estimatedReminders = Math.round(awakeHours / 2); // average every 2 hours
  const reminderCount = Math.max(3, estimatedReminders); // at least 3 reminders

  // Dynamically compute equal interval (in hours)
  const intervalHours = awakeHours / reminderCount;

  // Dynamically compute how much to drink each reminder
  const amountPerReminder = Math.round(goalMl / reminderCount);

  const reminders = [];
  let currentTime = parseTime(wake_up_time);

  for (let i = 0; i < reminderCount; i++) {
    reminders.push({
      user_id,
      reminder_time: formatTime(currentTime),
      amount_ml: amountPerReminder
    });
    currentTime = addHours(currentTime, intervalHours);
  }

  // Delete existing reminders for today
  await hydration_reminder.destroy({
    where: { user_id, reminder_time: { [Op.ne]: null } }
  });

  // Save new reminders
  await hydration_reminder.bulkCreate(reminders);
  return reminders;
}

// --- Helpers ---
const getAwakeHours = (wake, sleep) => {
  const [wH, wM, wS] = wake.split(":").map(Number);
  const [sH, sM, sS] = sleep.split(":").map(Number);

  let wakeDate = new Date(0, 0, 0, wH, wM, wS);
  let sleepDate = new Date(0, 0, 0, sH, sM, sS);
  if (sleepDate <= wakeDate) sleepDate.setDate(sleepDate.getDate() + 1);

  return (sleepDate - wakeDate) / (1000 * 60 * 60);
};

const parseTime = (time) => {
  const [h, m, s] = time.split(":").map(Number);
  return new Date(0, 0, 0, h, m, s || 0);
};

const formatTime = (date) => {
  return date.toTimeString().split(" ")[0].slice(0, 8);
};

const addHours = (date, hours) => {
  const newDate = new Date(date);
  newDate.setTime(newDate.getTime() + hours * 60 * 60 * 1000);
  return newDate;
};
