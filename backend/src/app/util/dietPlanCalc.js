export function defineDifficulty(calorieIntake, calorieGoal) {
  const ratio = Math.round((calorieGoal / calorieIntake) * 100) / 100;
  const percentage = Math.abs(1 - ratio) * 100;

  if (percentage >= 30) return 'hard';
  if (percentage >= 20) return 'medium';
  return 'easy';
}
