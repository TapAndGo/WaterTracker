export function calculateHydrationGoal(
  user_age,
  gender,
  activity_level,
  climate,
  user_weight,
  user_height,
  wake_up_time,   // format: "HH:MM:SS" (from Sequelize TIME)
  sleep_time      // format: "HH:MM:SS"
) {
  const age = getAge(user_age);

  // --- Base Goal by Age & Gender ---
  let baseGoal;
  if (age < 13) baseGoal = 1800;
  else if (age < 19) baseGoal = gender === "male" ? 2400 : 2000;
  else if (age < 56) baseGoal = gender === "male" ? 3000 : 2200;
  else baseGoal = 2000;

  // --- Gender Adjustment ---
  if (gender.toLowerCase() === "male") baseGoal *= 1.05;

  // --- Weight Adjustment (average ~35ml/kg rule) ---
  if (user_weight) {
    const weightFactor = user_weight * 35;
    baseGoal = (baseGoal + weightFactor) / 2;
  }

  // --- Height Adjustment ---
  if (user_height) {
    if (user_height > 180) baseGoal *= 1.1;
    else if (user_height < 150) baseGoal *= 0.9;
  }

  // --- Activity Level Adjustment ---
  switch (activity_level.toLowerCase()) {
    case "moderate":
      baseGoal *= 1.2;
      break;
    case "active":
      baseGoal *= 1.4;
      break;
    case "very active":
      baseGoal *= 1.6;
      break;
    case "low":
      baseGoal *= 0.9;
      break;
  }

  // --- Climate Adjustment ---
  switch (climate.toLowerCase()) {
    case "cold":
      baseGoal *= 0.9;
      break;
    case "warm":
      baseGoal *= 1.1;
      break;
    case "hot":
      baseGoal *= 1.25;
      break;
  }

  // --- Awake Hours Adjustment (uses DataTypes.TIME format "HH:MM:SS") ---
  if (wake_up_time && sleep_time) {
    const awakeHours = getAwakeHours(wake_up_time, sleep_time);
    const awakeFactor = awakeHours / 16; // 16 hours baseline
    baseGoal *= awakeFactor;
  }

  // Round to nearest 50ml
  return Math.round(baseGoal / 50) * 50;
}

// --- Helpers ---

const getAge = (dob) => {
  if (typeof dob === "number") return dob;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

const getAwakeHours = (wake, sleep) => {
  const [wH, wM, wS] = wake.split(":").map(Number);
  const [sH, sM, sS] = sleep.split(":").map(Number);

  let wakeDate = new Date(0, 0, 0, wH, wM, wS);
  let sleepDate = new Date(0, 0, 0, sH, sM, sS);

  // Handle overnight schedules (sleep time past midnight)
  if (sleepDate <= wakeDate) {
    sleepDate.setDate(sleepDate.getDate() + 1);
  }

  const diff = (sleepDate - wakeDate) / (1000 * 60 * 60); // hours
  return diff;
};
