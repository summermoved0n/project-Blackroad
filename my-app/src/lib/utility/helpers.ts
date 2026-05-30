export function formatPathname(pathname: string) {
  return pathname
    .replace(/\//g, " ")
    .replace(/_/g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export const calculateNights = (checkIn: Date, checkOut: Date) => {
  const diff = checkOut.getTime() - checkIn.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}