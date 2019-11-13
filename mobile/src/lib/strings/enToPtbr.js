export function translatedDifficulty(level) {
  switch (level) {
    case 'easy':
      return 'Fácil';
    case 'medium':
      return 'Médio';
    case 'hard':
      return 'Difícil';
    default:
      break;
  }
  return '';
}

export function translatedObjective(level) {
  switch (level) {
    case 'gainMuscle':
      return 'Ganhar Massa Muscular';
    case 'maintainWeight':
      return 'Manter o Peso';
    case 'weightLoss':
      return 'Perder Peso';
    default:
      break;
  }
  return '';
}

export function translatedActivity(level) {
  switch (level) {
    case 'light':
      return 'Leve';
    case 'moderate':
      return 'Moderado';
    case 'high':
      return 'Elevado';
    case 'intense':
      return 'Intenso';
    default:
      break;
  }
  return '';
}
