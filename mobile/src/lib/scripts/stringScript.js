export function strip(s) {
  return (s.toString() || '').replace(/\s+/g, '');
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
