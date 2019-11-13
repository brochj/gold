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
