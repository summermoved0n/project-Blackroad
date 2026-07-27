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

export const parseBirthDate = (value: string) => {
  const [day, month, year] = value.split("/").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  const isRealDate =
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day;

  return isRealDate ? date : null;
};

export const calculateTotalPrice = (
  tourPrice: number,
  adults: string,
  children: string,
  rooms: string,
  roomType: string,
): { totalPrice: number; taxPrice: number } => {
  const taxValue = 0.15;

  const adultsPrice = tourPrice * Number(adults);
  const childrenPrice = tourPrice * Number(children);

  const roomPrice =
    roomType === "single" ? 500 : roomType === "double" ? 600 : 0;

  const roomsPrice = roomPrice * Number(rooms);

  const totalPrice = adultsPrice + childrenPrice + roomsPrice;

  return { totalPrice, taxPrice: totalPrice * taxValue };
};
