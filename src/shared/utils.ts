export function formatDate(date: Date | string): string {
  if (typeof date === "string") date = new Date(date);
  const formatInt = (num: number) => (num < 10 ? "0" + num : num);

  const day = formatInt(date.getDate());
  const month = formatInt(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = formatInt(date.getHours());
  const minutes = formatInt(date.getMinutes());

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export const debounced = <T>(
  fn: (value: T) => void,
  timeout = 300
): ((value: T) => void) => {
  let id: number | null = null;
  return (args: T) => {
    if (id !== null) clearInterval(id);

    id = setTimeout(() => fn(args), timeout) as unknown as number;
  };
};

export const normalizeSizeProp = (size: string | number | undefined) => {
  if (typeof size === "string") return size;
  if (size === undefined) return undefined;
  return `${size}px`;
};
