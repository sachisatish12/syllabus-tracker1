export function getUrgency(date?: string) {
  if (!date) return "gray";

  const diff =
    (new Date(date).getTime() - new Date().getTime()) /
    (1000 * 60 * 60 * 24);

  if (diff < 3) return "red";
  if (diff < 7) return "yellow";
  return "green";
}