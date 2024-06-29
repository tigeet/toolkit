export function formatDate(date: Date): string {
  const formatInt = (num: number) => (num < 10 ? "0" + num : num);

  const day = formatInt(date.getDate());
  const month = formatInt(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = formatInt(date.getHours());
  const minutes = formatInt(date.getMinutes());

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
