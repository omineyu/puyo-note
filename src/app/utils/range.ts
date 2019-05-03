export function range(start: number, stop: number): number[] {
  return Array.from(Array(stop - start).keys()).map(i => i + start);
}
