export function calculateHydrationGoal(user_age, gender, activity_level, climate) {

  let baseGoal;

  const ageNum = getAge(user_age);
    
  if (age < 13) base = 1800;
  else if (age < 19) base = gender === "male" ? 2400 : 2000;
  else if (age < 56) base = gender === "male" ? 3000 : 2200;
  else base = 2000;


  if (gender.toLowerCase() === 'male') baseGoal *= 1.1;

  switch (activity_level.toLowerCase()) {
    case 'moderate':
      baseGoal *= 1.2;
      break;
    case 'active':
      baseGoal *= 1.4;
      break;
    case 'very active':
      baseGoal *= 1.6;
      break;
    case 'low':
      baseGoal *= 0.8;
      break;
    default:
      break;
  }


  switch (climate.toLowerCase()) {
    case 'cold':
      baseGoal *= 0.9;
      break;
    case 'hot':
      baseGoal *= 1.25;
      break;
    case 'warm':
      baseGoal *= 1.1;
      break;
    default:
      break;
  }

  
  return Math.round(baseGoal / 50) * 50;
}

  const getAge = (dob) => {
    if (typeof dob === 'number') return dob;
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };
