export function calculateGrade(assignments: any[]) {
  let earned = 0;
  let total = 0;

  assignments.forEach((a) => {
    if (a.score !== undefined) {
      earned += (a.score * a.weight) / 100;
    }
    total += a.weight;
  });

  return total === 0 ? 0 : (earned / total) * 100;
}

export function neededOnFinal(current: number, target: number, finalWeight: number) {
  return (target - current * (1 - finalWeight / 100)) / (finalWeight / 100);
}