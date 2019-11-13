export function calcBasalMetabolicRate(gender, age, height, weight) {
  // https://www.calculator.net/bmr-calculator
  let BMR = null;
  if (gender === 'male') {
    const a = 13.397 * weight; // weight in kg
    const b = 4.799 * height; // height in cm
    const c = 5.677 * age; // age in years
    BMR = 88.362 + a + b - c;
  }
  if (gender === 'female') {
    const a = 9.247 * weight;
    const b = 3.098 * height;
    const c = 4.33 * age;
    BMR = 447.593 + a + b - c;
  }
  return BMR;
}

export default function calculateCalories(data) {
  // ref https://www.mundoboaforma.com.br/quantas-calorias-por-dia-para-perder-peso/
  let multiplier = 1;
  if (data.physicalActivity === 'light') {
    multiplier = 1.2;
  } else if (data.physicalActivity === 'moderate') {
    multiplier = 1.375;
  } else if (data.physicalActivity === 'high') {
    multiplier = 1.55;
  } else if (data.physicalActivity === 'intense') {
    multiplier = 1.725;
  }
  const BMR = calcBasalMetabolicRate(
    data.gender,
    data.age,
    data.height,
    data.weight
  );
  const calcutedKcal = Math.floor(BMR * multiplier);
  return calcutedKcal;
}

export function calculateCaloriesGoal(objective, difficulty, calorieIntake) {
  if (objective === 'lossWeight') {
    if (difficulty === 'easy') {
      return calorieIntake - 300;
    }
    if (difficulty === 'medium') {
      return calorieIntake - 500;
    }
    if (difficulty === 'hard') {
      return calorieIntake - 800;
    }
  } else if (objective === 'gainMuscle') {
    if (difficulty === 'easy') {
      return calorieIntake + 300;
    }
    if (difficulty === 'medium') {
      return calorieIntake + 500;
    }
    if (difficulty === 'hard') {
      return calorieIntake + 800;
    }
  }
  return '';
}
