export function durationString(duration: number, secondsCeil = false): string {
  const minutes = Math.floor(duration / 60);
  const seconds = secondsCeil ? Math.ceil(duration % 60) : Math.floor(duration % 60);

  return `${minutes}:${seconds > 10 ? seconds : '0' + seconds}`;
}
